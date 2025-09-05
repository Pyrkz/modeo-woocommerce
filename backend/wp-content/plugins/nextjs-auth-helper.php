<?php
/**
 * Plugin Name: Next.js Authentication Helper
 * Description: Provides secure authentication status API for Next.js frontend integration  
 * Version: 2.0.0
 * Author: Modeo Development
 * Requires at least: 6.0
 * Tested up to: 6.8
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class NextJS_Auth_Helper {
    
    private $version = '2.0.0';
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_auth_endpoints'));
        add_action('wp_login', array($this, 'handle_user_login'), 10, 2);
        add_action('wp_logout', array($this, 'handle_user_logout'));
        add_action('init', array($this, 'setup_cors_headers'));
    }
    
    /**
     * Register REST API endpoints for authentication
     */
    public function register_auth_endpoints() {
        // Main auth status endpoint - compatible with existing frontend code
        register_rest_route('nextjs/v1', '/auth/status', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_auth_status'),
            'permission_callback' => '__return_true', // Public endpoint
        ));
        
        // Legacy compatibility endpoints
        register_rest_route('nextjs/v1', '/auth/check', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_auth_status_legacy'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('nextjs/v1', '/auth/me', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_current_user'),
            'permission_callback' => 'is_user_logged_in'
        ));
        
    }
    
    /**
     * Get authentication status - Main endpoint for frontend
     */
    public function get_auth_status($request) {
        $user = null;
        $method = 'none';
        $authenticated = false;
        
        // Check if user is logged in via WordPress session/cookies
        if (is_user_logged_in()) {
            $user = wp_get_current_user();
            $method = 'wordpress_session';
            $authenticated = true;
        }
        // Also check for our custom auth cookies (for cross-port access in development)
        else {
            $user_id = $this->check_development_auth();
            if ($user_id) {
                $user = get_user_by('id', $user_id);
                if ($user) {
                    $method = 'development_cookies';
                    $authenticated = true;
                }
            }
        }
        
        if ($authenticated && $user) {
            // Get user avatar URLs
            $avatar_urls = array();
            $avatar_sizes = array('24', '48', '96');
            foreach ($avatar_sizes as $size) {
                $avatar_urls[$size] = get_avatar_url($user->ID, array('size' => intval($size)));
            }
            
            return rest_ensure_response(array(
                'authenticated' => true,
                'method' => $method,
                'user' => array(
                    'id' => $user->ID,
                    'name' => $user->display_name,
                    'email' => $user->user_email,
                    'first_name' => $user->first_name ?: '',
                    'last_name' => $user->last_name ?: '',
                    'nickname' => $user->nickname,
                    'avatar_urls' => $avatar_urls,
                    'roles' => $user->roles,
                    'capabilities' => array_keys($user->caps ?: array()),
                ),
            ));
        }
        
        return rest_ensure_response(array(
            'authenticated' => false,
            'method' => 'none',
        ));
    }
    
    /**
     * Legacy compatibility for existing auth/check endpoint
     */
    public function get_auth_status_legacy($request) {
        $is_logged_in = is_user_logged_in();
        
        if (!$is_logged_in) {
            return array(
                'authenticated' => false,
                'message' => 'User not authenticated'
            );
        }
        
        $current_user = wp_get_current_user();
        
        return array(
            'authenticated' => true,
            'user_id' => $current_user->ID,
            'display_name' => $current_user->display_name,
            'message' => 'User authenticated successfully'
        );
    }
    
    /**
     * Get current user details (requires authentication)
     */
    public function get_current_user($request) {
        if (!is_user_logged_in()) {
            return new WP_Error('not_logged_in', 'User is not logged in', array('status' => 401));
        }
        
        $current_user = wp_get_current_user();
        
        return array(
            'id' => $current_user->ID,
            'name' => $current_user->display_name,
            'email' => $current_user->user_email,
            'first_name' => $current_user->first_name ?: '',
            'last_name' => $current_user->last_name ?: '',
            'nickname' => $current_user->user_nicename,
            'avatar_urls' => array(
                '24' => get_avatar_url($current_user->ID, array('size' => 24)),
                '48' => get_avatar_url($current_user->ID, array('size' => 48)),
                '96' => get_avatar_url($current_user->ID, array('size' => 96))
            ),
            'roles' => $current_user->roles,
            'capabilities' => $current_user->caps ?: array()
        );
    }

    
    /**
     * Handle user login events
     */
    public function handle_user_login($user_login, $user) {
        // Set authentication status cookies for development and production
        $secure = is_ssl();
        $expires = time() + DAY_IN_SECONDS;
        
        // Main authentication cookie
        $domain = defined('COOKIE_DOMAIN') ? COOKIE_DOMAIN : '';
        setcookie(
            'modeo_auth_status', 
            '1', 
            $expires, 
            '/', 
            $domain, 
            $secure, 
            true // HttpOnly
        );
        
        // Set special cookies for cross-port access (development)
        // This allows localhost:3000 to read cookies set by localhost:8080
        {
            // Set simple logged in flag for localhost
            setcookie(
                'modeo_logged_in', 
                '1', 
                $expires, 
                '/', 
                'localhost', // Works across ports
                false, // Don't require HTTPS in development
                false // Not HttpOnly so JavaScript can read it
            );
            
            // Set custom auth token with user info
            $auth_token = $this->create_auth_token($user->ID);
            setcookie(
                'modeo_nextjs_auth',
                $auth_token,
                $expires,
                '/',
                'localhost',
                false,
                false
            );
        }
    }
    
    /**
     * Handle user logout events
     */
    public function handle_user_logout() {
        $secure = is_ssl();
        $expired = time() - 3600;
        
        // Remove main authentication cookie
        $domain = defined('COOKIE_DOMAIN') ? COOKIE_DOMAIN : '';
        setcookie(
            'modeo_auth_status', 
            '', 
            $expired, 
            '/', 
            $domain, 
            $secure, 
            true
        );
        
        // Also clear localhost cookies (development)  
        {
            setcookie(
                'modeo_auth_status', 
                '', 
                $expired, 
                '/', 
                'localhost',
                false,
                true
            );
            
            setcookie(
                'modeo_logged_in', 
                '', 
                $expired, 
                '/', 
                'localhost',
                false,
                false
            );
            
            setcookie(
                'modeo_nextjs_auth',
                '',
                $expired,
                '/',
                'localhost',
                false,
                false
            );
        }
    }
    
    /**
     * Check development authentication via custom cookies
     * This handles cross-port cookie sharing in development
     */
    private function check_development_auth() {
        // Check for our custom auth cookie
        if (isset($_COOKIE['modeo_logged_in']) && $_COOKIE['modeo_logged_in'] === '1') {
            // Also check for the auth token cookie for additional verification
            if (isset($_COOKIE['modeo_nextjs_auth'])) {
                // Decode the auth token to get user ID
                $auth_data = $this->decode_auth_token($_COOKIE['modeo_nextjs_auth']);
                if ($auth_data && isset($auth_data['user_id'])) {
                    return intval($auth_data['user_id']);
                }
            }
            
            // If we don't have the auth token, check for WordPress logged_in cookie
            // and extract user ID from it
            foreach ($_COOKIE as $name => $value) {
                if (strpos($name, 'wordpress_logged_in_') === 0) {
                    // WordPress logged_in cookie format: username|expiration|hash|hmac
                    $cookie_elements = explode('|', $value);
                    if (count($cookie_elements) >= 2) {
                        $username = $cookie_elements[0];
                        $user = get_user_by('login', $username);
                        if ($user) {
                            return $user->ID;
                        }
                    }
                }
            }
        }
        
        return false;
    }
    
    /**
     * Create custom auth token for development
     */
    private function create_auth_token($user_id) {
        $payload = array(
            'user_id' => intval($user_id),
            'issued_at' => time(),
            'expires_at' => time() + DAY_IN_SECONDS,
            'nonce' => wp_create_nonce('modeo_auth_' . $user_id)
        );
        
        $encoded_payload = base64_encode(json_encode($payload));
        $signature = hash_hmac('sha256', $encoded_payload, wp_salt('auth'));
        
        return $encoded_payload . '.' . $signature;
    }
    
    /**
     * Decode our custom auth token
     */
    private function decode_auth_token($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return false;
        }
        
        $encoded_payload = $parts[0];
        $signature = $parts[1];
        
        // Verify signature
        $expected_signature = hash_hmac('sha256', $encoded_payload, wp_salt('auth'));
        if (!hash_equals($expected_signature, $signature)) {
            return false;
        }
        
        $payload = base64_decode($encoded_payload);
        $data = json_decode($payload, true);
        
        if (!$data || !isset($data['user_id'], $data['expires_at'])) {
            return false;
        }
        
        // Check if token has expired
        if (time() > $data['expires_at']) {
            return false;
        }
        
        return $data;
    }
    
    /**
     * Setup CORS headers for authentication endpoints
     */
    public function setup_cors_headers() {
        // Only add CORS headers for our auth endpoints
        $request_uri = $_SERVER['REQUEST_URI'] ?? '';
        if (strpos($request_uri, '/wp-json/nextjs/v1/auth/') !== false) {
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            
            // Define allowed origins based on environment
            $allowed_origins = array(
                'http://localhost:3000', // Development
                'http://localhost:3001', // Development alternative
                'https://nextmodeo.sitefy.pl', // Testing
                'https://modeo.pl',            // Production
                'https://www.modeo.pl',        // Production www
            );
            
            if (in_array($origin, $allowed_origins)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            }
            
            // Handle preflight requests
            if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                http_response_code(200);
                exit;
            }
        }
    }
}

// Initialize the plugin
new NextJS_Auth_Helper();

// Enhance WooCommerce Store API with user context
add_filter('woocommerce_store_api_add_to_cart_data', function($cart_item_data, $request = null) {
    // Add user context if authenticated (helps with cart persistence)
    if (is_user_logged_in()) {
        $cart_item_data['user_authenticated'] = true;
        $cart_item_data['user_id'] = get_current_user_id();
    }
    
    return $cart_item_data;
}, 10, 2);

/**
 * Plugin activation hook
 */
register_activation_hook(__FILE__, function() {
    // Flush rewrite rules to ensure new endpoints work
    flush_rewrite_rules();
});

/**
 * Plugin deactivation hook  
 */
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});