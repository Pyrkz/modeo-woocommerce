<?php
/**
 * Must-Use Plugin: Product Variation Images API
 * Description: Simple API endpoint for variation images that is always loaded
 */

// Add the REST API endpoint
add_action('rest_api_init', function() {
    register_rest_route('modeo/v1', '/product-variations-images/(?P<product_id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_product_variations_images',
        'permission_callback' => '__return_true',
        'args' => array(
            'product_id' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    
    // Add attribute-swatches endpoint that combines colors and variation images
    register_rest_route('modeo/v1', '/attribute-swatches', array(
        'methods' => 'GET',
        'callback' => 'get_attribute_swatches',
        'permission_callback' => '__return_true',
        'args' => array(
            'taxonomy' => array(
                'description' => 'Taxonomy slug to filter',
                'type' => 'string',
                'required' => false,
            ),
            'ids' => array(
                'description' => 'Term IDs to get (comma separated)',
                'type' => 'string', 
                'required' => false,
            ),
        ),
    ));
});

/**
 * Get attribute swatches (combines colors and other metadata)
 */
function get_attribute_swatches($request) {
    $taxonomy_filter = $request->get_param('taxonomy');
    $ids_filter = $request->get_param('ids');
    
    $results = array();
    
    // Get color terms directly from database
    $color_terms = get_terms(array(
        'taxonomy' => 'pa_kolor',
        'hide_empty' => false,
    ));
    
    if ($color_terms && !is_wp_error($color_terms)) {
        foreach ($color_terms as $term) {
            // Apply taxonomy filter if specified
            if ($taxonomy_filter && $taxonomy_filter !== 'pa_kolor') {
                continue;
            }
            
            // Apply ID filter if specified
            if ($ids_filter) {
                $ids = array_map('intval', explode(',', $ids_filter));
                if (!in_array($term->term_id, $ids)) {
                    continue;
                }
            }
            
            // Get attribute ID to determine swatch type from theme settings
            $attribute_name = substr('pa_kolor', 3); // 'kolor'
            $attribute = wc_get_attribute(wc_attribute_taxonomy_id_by_name($attribute_name));
            $attribute_id = $attribute ? $attribute->id : null;
            
            // Get swatch type from theme settings (Modeo_Attribute_Swatches)
            $swatch_type = $attribute_id ? get_option('modeo_attribute_swatch_type_' . $attribute_id, '') : '';
            $swatch_value = '';
            
            // Get actual swatch value from term meta based on type
            switch ($swatch_type) {
                case 'color':
                    $swatch_value = get_term_meta($term->term_id, 'swatch_color', true);
                    break;
                case 'image':
                    $image_id = get_term_meta($term->term_id, 'swatch_image', true);
                    $swatch_value = $image_id ? wp_get_attachment_url($image_id) : '';
                    break;
                case 'label':
                    $swatch_value = get_term_meta($term->term_id, 'swatch_label', true);
                    break;
                default:
                    // No swatch type set, default to color
                    $swatch_type = 'color';
                    $swatch_value = get_term_meta($term->term_id, 'swatch_color', true) ?: '#cccccc';
                    break;
            }
            
            // Add to results
            $results[] = array(
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
                'taxonomy' => 'pa_kolor',
                'description' => $term->description,
                'swatch_type' => $swatch_type ?: 'color',
                'swatch_value' => $swatch_value ?: '#cccccc',
            );
        }
    }
    
    // Add pattern/texture terms with variation images
    if (!$taxonomy_filter || $taxonomy_filter === 'pa_wzor') {
        $pattern_terms = get_terms(array(
            'taxonomy' => 'pa_wzor',
            'hide_empty' => false,
        ));
        
        if ($pattern_terms && !is_wp_error($pattern_terms)) {
            foreach ($pattern_terms as $term) {
                // Apply ID filter if specified
                if ($ids_filter) {
                    $ids = array_map('intval', explode(',', $ids_filter));
                    if (!in_array($term->term_id, $ids)) {
                        continue;
                    }
                }
                
                // Get attribute ID to determine swatch type from theme settings
                $attribute_name = substr('pa_wzor', 3); // 'wzor'
                $attribute = wc_get_attribute(wc_attribute_taxonomy_id_by_name($attribute_name));
                $attribute_id = $attribute ? $attribute->id : null;
                
                // Get swatch type from theme settings (Modeo_Attribute_Swatches)
                $swatch_type = $attribute_id ? get_option('modeo_attribute_swatch_type_' . $attribute_id, '') : '';
                $swatch_value = '';
                $image_id = null;
                
                // Get actual swatch value from term meta based on type
                switch ($swatch_type) {
                    case 'color':
                        $swatch_value = get_term_meta($term->term_id, 'swatch_color', true);
                        break;
                    case 'image':
                        $image_id = get_term_meta($term->term_id, 'swatch_image', true);
                        $swatch_value = $image_id ? wp_get_attachment_url($image_id) : '';
                        break;
                    case 'label':
                        $swatch_value = get_term_meta($term->term_id, 'swatch_label', true);
                        break;
                    default:
                        // No swatch type set - will use variation images if available
                        $swatch_type = null;
                        $swatch_value = null;
                        break;
                }
                
                $term_data = array(
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'taxonomy' => 'pa_wzor',
                    'description' => $term->description,
                    'swatch_type' => $swatch_type ?: null,
                    'swatch_value' => $swatch_value ?: null,
                );
                
                // Add image data if available
                if ($image_id) {
                    $image_data = wp_get_attachment_image_src($image_id, 'full');
                    $thumbnail_data = wp_get_attachment_image_src($image_id, 'thumbnail');
                    
                    if ($image_data) {
                        $term_data['image'] = array(
                            'id' => $image_id,
                            'url' => $image_data[0],
                            'width' => $image_data[1],
                            'height' => $image_data[2],
                            'thumbnail' => $thumbnail_data ? $thumbnail_data[0] : $image_data[0],
                            'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $term->name,
                        );
                        
                        // If no swatch_type but has image, set as image type
                        if (!$term_data['swatch_type']) {
                            $term_data['swatch_type'] = 'image';
                            $term_data['swatch_value'] = $term_data['image']['url'];
                        }
                    }
                }
                
                $results[] = $term_data;
            }
        }
    }
    
    return new WP_REST_Response($results, 200);
}

/**
 * Get variation images for a product
 */
function get_product_variations_images($request) {
    $product_id = $request->get_param('product_id');
    $product = wc_get_product($product_id);
    
    if (!$product || !$product->is_type('variable')) {
        return new WP_REST_Response(array('error' => 'Product not found or not variable'), 404);
    }
    
    $variations = $product->get_available_variations();
    $results = array();
    
    foreach ($variations as $variation_data) {
        $variation = wc_get_product($variation_data['variation_id']);
        
        if (!$variation) {
            continue;
        }
        
        // Get variation featured image
        $image_id = $variation->get_image_id();
        
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'full');
            $thumbnail_data = wp_get_attachment_image_src($image_id, 'thumbnail');
            
            if ($image_data) {
                // Get variation attributes
                $variation_attributes = array();
                foreach ($variation_data['attributes'] as $attr_name => $attr_value) {
                    // Find term ID for this value
                    $taxonomy = str_replace('attribute_', '', $attr_name);
                    $term = get_term_by('slug', $attr_value, $taxonomy);
                    
                    if ($term) {
                        $variation_attributes[] = array(
                            'taxonomy' => $taxonomy,
                            'term_id' => $term->term_id,
                            'name' => $term->name,
                            'slug' => $attr_value,
                        );
                    }
                }
                
                $results[] = array(
                    'variation_id' => $variation_data['variation_id'],
                    'attributes' => $variation_attributes,
                    'image' => array(
                        'id' => $image_id,
                        'url' => $image_data[0],
                        'width' => $image_data[1],
                        'height' => $image_data[2],
                        'thumbnail' => $thumbnail_data ? $thumbnail_data[0] : $image_data[0],
                        'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $variation->get_name(),
                    ),
                );
            }
        }
    }
    
    return new WP_REST_Response($results, 200);
}