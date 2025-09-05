<?php
// CORS fix for Next.js development
add_action('rest_api_init', function() {
    // Enable CORS for all REST API requests
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            status_header(200);
            exit();
        }
        
        return $value;
    });
});