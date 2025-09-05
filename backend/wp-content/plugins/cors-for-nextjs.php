<?php
/**
 * Plugin Name: CORS for Next.js Development
 * Description: Enables CORS for Next.js development server
 * Version: 1.1
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define allowed origins
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://nextmodeo.sitefy.pl',
    'https://modeo.pl',
    'https://www.modeo.pl'
];

// Add CORS headers for REST API
add_action('rest_api_init', function() use ($allowed_origins) {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) use ($allowed_origins) {
        $origin = get_http_origin();
        
        // Check if origin is in allowed list
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, Nonce, X-WC-Store-API-Nonce');
            header('Access-Control-Allow-Credentials: true');
            
            // Handle preflight requests
            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
                status_header(200);
                exit();
            }
        }
        
        return $value;
    });
});

// Add CORS headers for admin-ajax
add_action('wp_loaded', function() use ($allowed_origins) {
    if (defined('DOING_AJAX') && DOING_AJAX) {
        $origin = get_http_origin();
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
        }
    }
});

// Add CORS headers for all requests
add_action('init', function() use ($allowed_origins) {
    $origin = get_http_origin();
    
    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-WC-Store-API-Nonce, Nonce');
        header('Access-Control-Allow-Credentials: true');
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            status_header(200);
            exit();
        }
    }
});