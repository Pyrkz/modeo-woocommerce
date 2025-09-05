<?php
/**
 * Must-Use Plugin: Activate Taxonomy Swatches API
 * Description: Force activate the taxonomy-swatches-api plugin
 */

// Force activate the taxonomy-swatches-api plugin
add_action('init', function() {
    if (!function_exists('activate_plugin')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    
    $plugin_path = 'taxonomy-swatches-api.php';
    if (!is_plugin_active($plugin_path)) {
        $result = activate_plugin($plugin_path);
        if (is_wp_error($result)) {
            error_log('Failed to activate taxonomy-swatches-api: ' . $result->get_error_message());
        } else {
            error_log('Successfully activated taxonomy-swatches-api');
        }
    }
    
    // Also ensure the class is loaded
    if (!class_exists('TaxonomySwatchesAPI')) {
        include_once WP_PLUGIN_DIR . '/taxonomy-swatches-api.php';
    }
}, 1);