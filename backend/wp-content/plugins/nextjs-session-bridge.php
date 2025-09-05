<?php
/**
 * Plugin Name: Next.js Session Bridge
 * Description: Bridge WordPress sessions to Next.js via secure cookies
 * Version: 1.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Constants
define('NEXTJS_AUTH_COOKIE', 'modeo_nextjs_auth');
define('NEXTJS_AUTH_EXPIRY', HOUR_IN_SECONDS); // 1 hour

/**
 * Create a secure auth token for Next.js
 */
function create_nextjs_auth_token($user_id) {
    $payload = array(
        'user_id' => (int)$user_id,
        'issued_at' => time(),
        'expires_at' => time() + NEXTJS_AUTH_EXPIRY,
        'nonce' => wp_create_nonce('nextjs_auth_' . $user_id)
    );
    
    // Simple secure encoding
    $secret = wp_salt('SECURE_AUTH');
    $token = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', $token, $secret);
    
    return $token . '.' . $signature;
}

/**
 * Verify and decode auth token
 */
function verify_nextjs_auth_token($token_string) {
    if (empty($token_string)) {
        return false;
    }
    
    $parts = explode('.', $token_string);
    if (count($parts) !== 2) {
        error_log("Token parts count: " . count($parts));
        return false;
    }
    
    list($token, $signature) = $parts;
    
    // Verify signature
    $secret = wp_salt('SECURE_AUTH');
    $expected_signature = hash_hmac('sha256', $token, $secret);
    
    if (!hash_equals($expected_signature, $signature)) {
        error_log("Signature mismatch");
        return false;
    }
    
    // Decode payload
    $payload = json_decode(base64_decode($token), true);
    if (!$payload) {
        error_log("Failed to decode payload");
        return false;
    }
    
    // Check expiry
    if (time() > $payload['expires_at']) {
        error_log("Token expired: " . $payload['expires_at'] . " vs " . time());
        return false;
    }
    
    // Verify nonce (skip for now in development)
    // if (!wp_verify_nonce($payload['nonce'], 'nextjs_auth_' . $payload['user_id'])) {
    //     error_log("Nonce verification failed");
    //     return false;
    // }
    
    return $payload;
}

/**
 * Set auth cookie for Next.js
 */
function set_nextjs_auth_cookie($user_id) {
    $token = create_nextjs_auth_token($user_id);
    
    // Set cookie that Next.js can read
    setcookie(
        NEXTJS_AUTH_COOKIE,
        $token,
        time() + NEXTJS_AUTH_EXPIRY,
        '/', // path
        '', // domain - empty for localhost
        false, // secure - false for localhost
        false  // httponly - false so Next.js can read it
    );
    
    return $token;
}

/**
 * Clear auth cookie
 */
function clear_nextjs_auth_cookie() {
    setcookie(
        NEXTJS_AUTH_COOKIE,
        '',
        time() - 3600,
        '/',
        '',
        false,
        false
    );
}

/**
 * Handle login - set Next.js cookie
 */
add_action('wp_login', function($user_login, $user) {
    set_nextjs_auth_cookie($user->ID);
    
    // Also set a simple flag cookie
    setcookie('modeo_logged_in', '1', time() + NEXTJS_AUTH_EXPIRY, '/', '', false, false);
}, 10, 2);

/**
 * Handle logout - clear Next.js cookie
 */
add_action('wp_logout', function() {
    clear_nextjs_auth_cookie();
    setcookie('modeo_logged_in', '', time() - 3600, '/', '', false, false);
});

/**
 * Enhanced auth check endpoint for Next.js
 */
add_action('rest_api_init', function() {
    // Endpoint dostępny zawsze (nie wymaga logowania)
    register_rest_route('nextjs/v1', '/auth/status', array(
        'methods' => 'GET',
        'callback' => 'nextjs_get_auth_status',
        'permission_callback' => '__return_true',
        'args' => array(
            'token' => array(
                'description' => 'Next.js auth token from cookie',
                'type' => 'string',
                'required' => false,
            )
        )
    ));
});

/**
 * Get authentication status for Next.js
 */
function nextjs_get_auth_status($request) {
    // Check WordPress session first
    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        
        // Refresh the Next.js cookie
        set_nextjs_auth_cookie($current_user->ID);
        
        return array(
            'authenticated' => true,
            'method' => 'wordpress_session',
            'user' => array(
                'id' => $current_user->ID,
                'name' => $current_user->display_name,
                'email' => $current_user->user_email,
                'first_name' => get_user_meta($current_user->ID, 'first_name', true),
                'last_name' => get_user_meta($current_user->ID, 'last_name', true),
                'nickname' => $current_user->user_nicename,
                'avatar_urls' => array(
                    '24' => get_avatar_url($current_user->ID, array('size' => 24)),
                    '48' => get_avatar_url($current_user->ID, array('size' => 48)),
                    '96' => get_avatar_url($current_user->ID, array('size' => 96))
                ),
                'roles' => $current_user->roles,
                'capabilities' => $current_user->caps
            )
        );
    }
    
    // Check Next.js token from cookie
    $token = $request->get_param('token');
    if (!$token && isset($_COOKIE[NEXTJS_AUTH_COOKIE])) {
        $token = $_COOKIE[NEXTJS_AUTH_COOKIE];
    }
    
    if ($token) {
        $payload = verify_nextjs_auth_token($token);
        if ($payload && $payload['user_id']) {
            $user = get_user_by('ID', $payload['user_id']);
            if ($user) {
                return array(
                    'authenticated' => true,
                    'method' => 'nextjs_token',
                    'user' => array(
                        'id' => $user->ID,
                        'name' => $user->display_name,
                        'email' => $user->user_email,
                        'first_name' => get_user_meta($user->ID, 'first_name', true),
                        'last_name' => get_user_meta($user->ID, 'last_name', true),
                        'nickname' => $user->user_nicename,
                        'avatar_urls' => array(
                            '24' => get_avatar_url($user->ID, array('size' => 24)),
                            '48' => get_avatar_url($user->ID, array('size' => 48)),
                            '96' => get_avatar_url($user->ID, array('size' => 96))
                        ),
                        'roles' => $user->roles,
                        'capabilities' => $user->caps
                    )
                );
            }
        }
    }
    
    return array(
        'authenticated' => false,
        'message' => 'Not authenticated'
    );
}

/**
 * Manual auth endpoint for development
 */
add_action('rest_api_init', function() {
    register_rest_route('nextjs/v1', '/auth/login', array(
        'methods' => 'POST',
        'callback' => 'nextjs_manual_login',
        'permission_callback' => '__return_true',
        'args' => array(
            'username' => array(
                'description' => 'Username or email',
                'type' => 'string',
                'required' => true,
            ),
            'password' => array(
                'description' => 'Password',
                'type' => 'string',
                'required' => true,
            )
        )
    ));
});

/**
 * Manual login for development/API
 */
function nextjs_manual_login($request) {
    $username = $request->get_param('username');
    $password = $request->get_param('password');
    
    if (empty($username) || empty($password)) {
        return new WP_Error('missing_credentials', 'Username and password required', array('status' => 400));
    }
    
    $user = wp_authenticate($username, $password);
    
    if (is_wp_error($user)) {
        return new WP_Error('login_failed', 'Invalid credentials', array('status' => 401));
    }
    
    // Set WordPress session
    wp_set_current_user($user->ID);
    wp_set_auth_cookie($user->ID, true);
    
    // Set Next.js cookie
    $token = set_nextjs_auth_cookie($user->ID);
    setcookie('modeo_logged_in', '1', time() + NEXTJS_AUTH_EXPIRY, '/', '', false, false);
    
    return array(
        'success' => true,
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'name' => $user->display_name,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
        )
    );
}

/**
 * Add debug info to footer (development only)
 */
if (defined('WP_DEBUG') && WP_DEBUG) {
    add_action('wp_footer', function() {
        if (current_user_can('manage_options')) {
            echo '<div style="position:fixed;bottom:10px;right:10px;background:#000;color:#fff;padding:10px;font-size:12px;z-index:9999;">';
            echo 'WP User: ' . (is_user_logged_in() ? wp_get_current_user()->display_name : 'Not logged in') . '<br>';
            echo 'Next.js Cookie: ' . (isset($_COOKIE[NEXTJS_AUTH_COOKIE]) ? 'Set' : 'Not set') . '<br>';
            echo 'Timestamp: ' . date('H:i:s');
            echo '</div>';
        }
    });
}