<?php
/**
 * Plugin Name: Store API Nonce Helper
 * Description: Provides production-ready nonce handling for Store API
 * Version: 1.2
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Add endpoint for nonce
add_action('rest_api_init', function() {
    register_rest_route('wc/store', '/nonce', array(
        'methods' => 'GET',
        'callback' => function() {
            $nonce = wp_create_nonce('wc_store_api');
            error_log('WC Store API Nonce: Generated nonce: ' . substr($nonce, 0, 10) . '...');
            return array(
                'nonce' => $nonce,
                'wp_nonce' => wp_create_nonce('wp_rest')
            );
        },
        'permission_callback' => '__return_true'
    ));
});

// Smart nonce handling - disable for localhost, enable for production
$is_localhost = (
    isset($_SERVER['HTTP_HOST']) && 
    (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
     strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false)
);

if ($is_localhost) {
    // Development: disable nonce checks
    add_filter('woocommerce_store_api_disable_nonce_check', '__return_true');
    error_log('WC Store API Nonce: LOCALHOST detected - nonce checks DISABLED');
} else {
    // Production: enable nonce checks with proper headers
    add_filter('woocommerce_store_api_disable_nonce_check', '__return_false');
    error_log('WC Store API Nonce: PRODUCTION detected - nonce checks ENABLED with headers');
}

// Add nonce headers to all Store API responses
add_action('woocommerce_store_api_checkout_update_order_meta', function() {
    $nonce = wp_create_nonce('wc_store_api');
    header('X-WC-Store-API-Nonce: ' . $nonce);
    header('X-WP-Nonce: ' . wp_create_nonce('wp_rest'));
});

// Add nonce to cart endpoint responses
add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
    if (strpos($request->get_route(), '/wc/store/') === 0) {
        $nonce = wp_create_nonce('wc_store_api');
        $wp_nonce = wp_create_nonce('wp_rest');
        header('X-WC-Store-API-Nonce: ' . $nonce);
        header('X-WP-Nonce: ' . $wp_nonce);
        error_log('WC Store API: Sending nonces in headers - Store: ' . substr($nonce, 0, 10) . '... WP: ' . substr($wp_nonce, 0, 10) . '...');
    }
    return $served;
}, 10, 4);