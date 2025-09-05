<?php
/**
 * Plugin Name: Activate Taxonomy Swatches API
 * Description: Quick activation helper
 * Version: 1.0
 */

// Force activate the taxonomy-swatches-api plugin
if (!function_exists('activate_plugin')) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

// Activate the plugin
$plugin_path = 'taxonomy-swatches-api.php';
if (!is_plugin_active($plugin_path)) {
    $result = activate_plugin($plugin_path);
    if (is_wp_error($result)) {
        error_log('Failed to activate taxonomy-swatches-api: ' . $result->get_error_message());
    } else {
        error_log('Successfully activated taxonomy-swatches-api');
    }
}

// Also verify the plugin is loaded
add_action('init', function() {
    if (class_exists('TaxonomySwatchesAPI')) {
        error_log('TaxonomySwatchesAPI class is loaded');
    } else {
        error_log('TaxonomySwatchesAPI class NOT loaded - forcing include');
        include_once WP_PLUGIN_DIR . '/taxonomy-swatches-api.php';
    }
});