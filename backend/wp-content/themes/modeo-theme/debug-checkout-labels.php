<?php
/**
 * Debug script to analyze checkout form label issues
 * Usage: Add to theme directory and include in functions.php temporarily
 */

// Hook to analyze checkout fields structure
add_action('woocommerce_checkout_fields', 'debug_checkout_fields_structure', 999);
function debug_checkout_fields_structure($fields) {
    error_log('=== CHECKOUT FIELDS DEBUG ===');
    
    // Check billing fields
    if (isset($fields['billing'])) {
        error_log('BILLING FIELDS:');
        foreach ($fields['billing'] as $key => $field) {
            $id = isset($field['id']) ? $field['id'] : $key;
            error_log("Field key: $key, ID: $id");
            if (isset($field['label'])) {
                error_log("  Label: " . $field['label']);
            }
        }
    }
    
    // Check shipping fields
    if (isset($fields['shipping'])) {
        error_log('SHIPPING FIELDS:');
        foreach ($fields['shipping'] as $key => $field) {
            $id = isset($field['id']) ? $field['id'] : $key;
            error_log("Field key: $key, ID: $id");
            if (isset($field['label'])) {
                error_log("  Label: " . $field['label']);
            }
        }
    }
    
    return $fields;
}

// Hook to analyze form field arguments before rendering
add_filter('woocommerce_form_field_args', 'debug_form_field_args', 999, 3);
function debug_form_field_args($args, $key, $value) {
    // Only log billing and shipping fields
    if (strpos($key, 'billing_') === 0 || strpos($key, 'shipping_') === 0) {
        $id = isset($args['id']) ? $args['id'] : $key;
        error_log("Form field rendering - Key: $key, ID: $id");
        if ($id !== $key) {
            error_log("  WARNING: ID ($id) doesn't match key ($key)!");
        }
    }
    return $args;
}

// Add JavaScript to check label-input relationships in the browser
add_action('woocommerce_after_checkout_form', 'debug_checkout_labels_js');
function debug_checkout_labels_js() {
    ?>
    <script>
    jQuery(document).ready(function($) {
        console.log('=== CHECKOUT LABEL DEBUG ===');
        
        // Find all labels with 'for' attribute
        $('label[for]').each(function() {
            var forAttr = $(this).attr('for');
            var targetElement = $('#' + forAttr);
            
            if (targetElement.length === 0) {
                console.error('LABEL ERROR: Label with for="' + forAttr + '" has no matching element!');
                console.log('  Label text:', $(this).text());
                console.log('  Label HTML:', this.outerHTML);
                
                // Try to find similar IDs
                var similarIds = [];
                $('[id*="' + forAttr.replace('billing_', '').replace('shipping_', '') + '"]').each(function() {
                    similarIds.push(this.id);
                });
                if (similarIds.length > 0) {
                    console.log('  Possible matching IDs:', similarIds);
                }
            } else {
                console.log('OK: Label for="' + forAttr + '" matches element');
            }
        });
        
        // Find all form inputs without matching labels
        $('.form-row input[id], .form-row select[id], .form-row textarea[id]').each(function() {
            var id = $(this).attr('id');
            var matchingLabel = $('label[for="' + id + '"]');
            
            if (matchingLabel.length === 0) {
                console.warn('INPUT WITHOUT LABEL: Element with id="' + id + '" has no label!');
                console.log('  Element type:', this.tagName);
                console.log('  Element name:', $(this).attr('name'));
            }
        });
    });
    </script>
    <?php
}

// Add visual indicators on the checkout page
add_action('woocommerce_before_checkout_form', 'debug_checkout_notice');
function debug_checkout_notice() {
    ?>
    <div style="background: #fffbcc; border: 1px solid #e6db55; padding: 10px; margin: 10px 0;">
        <strong>Debug Mode Active:</strong> Check browser console for label-input relationship errors.
    </div>
    <?php
}