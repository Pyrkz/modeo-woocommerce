<?php
/**
 * Script to create WooCommerce pages programmatically
 */

// Bootstrap WordPress
require_once 'backend/wp-config.php';

// Create checkout page
$checkout_page = wp_insert_post(array(
    'post_title'     => 'Checkout',
    'post_name'      => 'checkout',
    'post_content'   => '[woocommerce_checkout]',
    'post_status'    => 'publish',
    'post_type'      => 'page',
    'post_author'    => 1,
));

// Create cart page  
$cart_page = wp_insert_post(array(
    'post_title'     => 'Cart',
    'post_name'      => 'cart', 
    'post_content'   => '[woocommerce_cart]',
    'post_status'    => 'publish',
    'post_type'      => 'page',
    'post_author'    => 1,
));

// Create shop page
$shop_page = wp_insert_post(array(
    'post_title'     => 'Shop',
    'post_name'      => 'shop',
    'post_content'   => '',
    'post_status'    => 'publish', 
    'post_type'      => 'page',
    'post_author'    => 1,
));

// Create my account page
$myaccount_page = wp_insert_post(array(
    'post_title'     => 'My Account',
    'post_name'      => 'my-account',
    'post_content'   => '[woocommerce_my_account]',
    'post_status'    => 'publish',
    'post_type'      => 'page', 
    'post_author'    => 1,
));

// Update WooCommerce options
if ($checkout_page) {
    update_option('woocommerce_checkout_page_id', $checkout_page);
    echo "Checkout page created with ID: $checkout_page\n";
}

if ($cart_page) {
    update_option('woocommerce_cart_page_id', $cart_page);
    echo "Cart page created with ID: $cart_page\n";
}

if ($shop_page) {
    update_option('woocommerce_shop_page_id', $shop_page);
    echo "Shop page created with ID: $shop_page\n";
}

if ($myaccount_page) {
    update_option('woocommerce_myaccount_page_id', $myaccount_page);
    echo "My Account page created with ID: $myaccount_page\n";
}

echo "WooCommerce pages created successfully!\n";