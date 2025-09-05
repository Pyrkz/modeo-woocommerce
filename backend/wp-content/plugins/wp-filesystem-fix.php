<?php
/**
 * Plugin Name: WordPress Filesystem Fix
 * Description: Naprawia problem z "WordPress filesystem could not be initialized"
 * Version: 1.0
 * Author: Modeo Dev
 */

// Sprawdź czy to admin i czy używamy importu
if (!is_admin()) {
    return;
}

// Dodaj stałe WordPress filesystem
add_action('init', function() {
    if (!defined('FS_METHOD')) {
        define('FS_METHOD', 'direct');
    }
    
    if (!defined('FS_CHMOD_DIR')) {
        define('FS_CHMOD_DIR', (0755 & ~ umask()));
    }
    
    if (!defined('FS_CHMOD_FILE')) {
        define('FS_CHMOD_FILE', (0644 & ~ umask()));
    }
});

// Napraw uprawnienia do uploadów
add_filter('wp_filesystem_method', function($method) {
    return 'direct';
});

// Zwiększ limity uploadów
add_filter('wp_max_upload_size', function($size) {
    return 100 * 1024 * 1024; // 100MB
});

// Fix dla importu produktów WooCommerce
add_action('init', function() {
    if (isset($_GET['page']) && $_GET['page'] === 'product_importer') {
        ini_set('upload_max_filesize', '100M');
        ini_set('post_max_size', '100M');
        ini_set('max_execution_time', 300);
        ini_set('memory_limit', '512M');
    }
});

// Debug info dla administratora
add_action('admin_notices', function() {
    if (current_user_can('manage_options') && isset($_GET['page']) && $_GET['page'] === 'product_importer') {
        $upload_max = ini_get('upload_max_filesize');
        $post_max = ini_get('post_max_size');
        $memory = ini_get('memory_limit');
        
        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>WordPress Filesystem Fix aktywny:</strong></p>';
        echo '<ul>';
        echo '<li>Upload max filesize: ' . $upload_max . '</li>';
        echo '<li>Post max size: ' . $post_max . '</li>'; 
        echo '<li>Memory limit: ' . $memory . '</li>';
        echo '<li>FS Method: direct</li>';
        echo '</ul>';
        echo '</div>';
    }
});

?>