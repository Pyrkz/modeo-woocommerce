<?php
/**
 * Script to install LiteSpeed Cache plugin programmatically
 * Upload to WordPress root and run once
 */

// Include WordPress
require_once('backend/wp-config.php');
require_once('backend/wp-admin/includes/plugin.php');
require_once('backend/wp-admin/includes/file.php');
require_once('backend/wp-admin/includes/misc.php');
require_once('backend/wp-admin/includes/class-wp-upgrader.php');

// Install plugin
$plugin_slug = 'litespeed-cache';
$plugin_zip = 'https://downloads.wordpress.org/plugin/litespeed-cache.latest-stable.zip';

echo "Installing LiteSpeed Cache plugin...\n";

$upgrader = new Plugin_Upgrader();
$result = $upgrader->install($plugin_zip);

if ($result) {
    echo "Plugin installed successfully!\n";
    
    // Activate plugin
    $plugin_path = 'litespeed-cache/litespeed-cache.php';
    if (!is_plugin_active($plugin_path)) {
        activate_plugin($plugin_path);
        echo "Plugin activated!\n";
    }
} else {
    echo "Plugin installation failed.\n";
}

echo "Done.\n";