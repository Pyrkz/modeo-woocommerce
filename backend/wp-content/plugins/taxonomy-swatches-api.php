<?php
/**
 * Plugin Name: Taxonomy Swatches API
 * Plugin URI: https://modeo.pl
 * Description: API endpoint dla obrazków taksonomii (wzory, tekstury, materiały) dla headless Next.js
 * Version: 1.0.0
 * Author: Modeo Team
 * License: GPL v2 or later
 */

// Zapobiegaj bezpośredniemu dostępowi
if (!defined('ABSPATH')) {
    exit;
}

class TaxonomySwatchesAPI {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_action('init', array($this, 'register_taxonomy_meta'));
    }
    
    /**
     * Rejestruj metadane dla taksonomii (obrazki)
     */
    public function register_taxonomy_meta() {
        // Rejestruj meta pola dla obrazków taksonomii
        $taxonomies = ['pa_wzor', 'pa_pattern', 'pa_tekstura', 'pa_texture', 'pa_material', 'pa_kolor', 'pa_color'];
        
        foreach ($taxonomies as $taxonomy) {
            register_meta('term', 'swatch_type', array(
                'type' => 'string',
                'description' => 'Typ swatch (color, image, label)',
                'single' => true,
                'show_in_rest' => true,
            ));
            
            register_meta('term', 'swatch_value', array(
                'type' => 'string',
                'description' => 'Wartość swatch (hex color, image URL, label text)',
                'single' => true,
                'show_in_rest' => true,
            ));
            
            register_meta('term', 'image_id', array(
                'type' => 'integer',
                'description' => 'ID obrazka z Media Library',
                'single' => true,
                'show_in_rest' => true,
            ));
        }
    }
    
    /**
     * Rejestruj REST API routes
     */
    public function register_routes() {
        // Nowy endpoint dla wszystkich typów swatchów (kolory, obrazki, etc.)
        register_rest_route('modeo/v1', '/attribute-swatches', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_attribute_swatches'),
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
        
        // Endpoint dla konkretnego termu
        register_rest_route('modeo/v1', '/attribute-swatch/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_single_swatch'),
            'permission_callback' => '__return_true',
            'args' => array(
                'id' => array(
                    'description' => 'Term ID',
                    'type' => 'integer',
                    'required' => true,
                ),
            ),
        ));
        
        // NOWY: Endpoint dla obrazków wariantów produktu
        register_rest_route('modeo/v1', '/product-variations-images/(?P<product_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_product_variations_images'),
            'permission_callback' => '__return_true',
            'args' => array(
                'product_id' => array(
                    'description' => 'Product ID',
                    'type' => 'integer',
                    'required' => true,
                ),
            ),
        ));
    }
    
    /**
     * Pobierz wszystkie swatch data dla atrybutów
     */
    public function get_attribute_swatches($request) {
        $taxonomy_filter = $request->get_param('taxonomy');
        $ids_filter = $request->get_param('ids');
        
        // Określ które taksonomie sprawdzać
        $taxonomies = ['pa_wzor', 'pa_pattern', 'pa_tekstura', 'pa_texture', 'pa_material', 'pa_kolor', 'pa_color'];
        
        if ($taxonomy_filter) {
            $taxonomies = [$taxonomy_filter];
        }
        
        $results = array();
        
        foreach ($taxonomies as $taxonomy) {
            // Sprawdź czy taksonomia istnieje
            if (!taxonomy_exists($taxonomy)) {
                continue;
            }
            
            $args = array(
                'taxonomy' => $taxonomy,
                'hide_empty' => false,
                'meta_query' => array(
                    'relation' => 'OR',
                    array(
                        'key' => 'swatch_type',
                        'compare' => 'EXISTS'
                    ),
                    array(
                        'key' => 'image_id',
                        'compare' => 'EXISTS'
                    ),
                )
            );
            
            // Filtruj po ID jeśli podane
            if ($ids_filter) {
                $ids = array_map('intval', explode(',', $ids_filter));
                $args['include'] = $ids;
            }
            
            $terms = get_terms($args);
            
            if (!is_wp_error($terms) && !empty($terms)) {
                foreach ($terms as $term) {
                    $swatch_data = $this->get_term_swatch_data($term);
                    if ($swatch_data) {
                        $results[] = $swatch_data;
                    }
                }
            }
        }
        
        return new WP_REST_Response($results, 200);
    }
    
    /**
     * Pobierz swatch data dla pojedynczego termu
     */
    public function get_single_swatch($request) {
        $term_id = $request->get_param('id');
        $term = get_term($term_id);
        
        if (is_wp_error($term)) {
            return new WP_REST_Response(array('error' => 'Term not found'), 404);
        }
        
        $swatch_data = $this->get_term_swatch_data($term);
        
        if (!$swatch_data) {
            return new WP_REST_Response(array('error' => 'No swatch data found'), 404);
        }
        
        return new WP_REST_Response($swatch_data, 200);
    }
    
    /**
     * Pobierz obrazki wariantów dla konkretnego produktu
     * Mapuje kombinacje atrybutów na obrazki wariantów
     */
    public function get_product_variations_images($request) {
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
            
            // Pobierz featured image wariantu
            $image_id = $variation->get_image_id();
            
            if ($image_id) {
                $image_data = wp_get_attachment_image_src($image_id, 'full');
                $thumbnail_data = wp_get_attachment_image_src($image_id, 'thumbnail');
                
                if ($image_data) {
                    // Pobierz atrybuty wariantu
                    $variation_attributes = array();
                    foreach ($variation_data['attributes'] as $attr_name => $attr_value) {
                        // Znajdź term ID dla tej wartości
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
    
    /**
     * Pobierz swatch data dla termu
     */
    private function get_term_swatch_data($term) {
        $swatch_type = get_term_meta($term->term_id, 'swatch_type', true);
        $swatch_value = get_term_meta($term->term_id, 'swatch_value', true);
        $image_id = get_term_meta($term->term_id, 'image_id', true);
        
        // Jeśli nie ma żadnych danych swatch, pomiń
        if (empty($swatch_type) && empty($swatch_value) && empty($image_id)) {
            return null;
        }
        
        $data = array(
            'id' => $term->term_id,
            'name' => $term->name,
            'slug' => $term->slug,
            'taxonomy' => $term->taxonomy,
            'description' => $term->description,
            'swatch_type' => $swatch_type,
            'swatch_value' => $swatch_value,
        );
        
        // Dodaj informacje o obrazku jeśli istnieje
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'full');
            $thumbnail_data = wp_get_attachment_image_src($image_id, 'thumbnail');
            
            if ($image_data) {
                $data['image'] = array(
                    'id' => $image_id,
                    'url' => $image_data[0],
                    'width' => $image_data[1],
                    'height' => $image_data[2],
                    'thumbnail' => $thumbnail_data ? $thumbnail_data[0] : $image_data[0],
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $term->name,
                );
                
                // Jeśli nie ma swatch_type ale jest obrazek, ustaw jako image
                if (empty($data['swatch_type'])) {
                    $data['swatch_type'] = 'image';
                    $data['swatch_value'] = $data['image']['url'];
                }
            }
        }
        
        return $data;
    }
}

// Inicjalizuj plugin
new TaxonomySwatchesAPI();

/**
 * Helper funkcje dla łatwego dodawania metadanych w admin panel
 */

// Dodaj pola do formularza edycji taksonomii
add_action('pa_wzor_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_pattern_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_tekstura_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_texture_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_material_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_kolor_edit_form_fields', 'add_taxonomy_image_fields');
add_action('pa_color_edit_form_fields', 'add_taxonomy_image_fields');

function add_taxonomy_image_fields($term) {
    $swatch_type = get_term_meta($term->term_id, 'swatch_type', true);
    $swatch_value = get_term_meta($term->term_id, 'swatch_value', true);
    $image_id = get_term_meta($term->term_id, 'image_id', true);
    $image_url = '';
    
    if ($image_id) {
        $image_data = wp_get_attachment_image_src($image_id, 'thumbnail');
        if ($image_data) {
            $image_url = $image_data[0];
        }
    }
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="swatch_type">Typ Swatch</label>
        </th>
        <td>
            <select name="swatch_type" id="swatch_type">
                <option value="">-- Wybierz typ --</option>
                <option value="color" <?php selected($swatch_type, 'color'); ?>>Kolor</option>
                <option value="image" <?php selected($swatch_type, 'image'); ?>>Obrazek</option>
                <option value="label" <?php selected($swatch_type, 'label'); ?>>Etykieta tekstowa</option>
            </select>
            <p class="description">Typ reprezentacji wizualnej dla tego atrybutu.</p>
        </td>
    </tr>
    
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="swatch_value">Wartość Swatch</label>
        </th>
        <td>
            <input type="text" name="swatch_value" id="swatch_value" value="<?php echo esc_attr($swatch_value); ?>" />
            <p class="description">
                Dla koloru: hex kod (np. #FF0000)<br>
                Dla obrazka: zostanie automatycznie wypełnione<br>
                Dla etykiety: tekst do wyświetlenia
            </p>
        </td>
    </tr>
    
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="taxonomy_image">Obrazek</label>
        </th>
        <td>
            <div class="taxonomy-image-wrapper">
                <?php if ($image_url): ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="" style="max-width: 100px; max-height: 100px; display: block; margin-bottom: 10px;" />
                <?php endif; ?>
                <input type="hidden" name="image_id" id="image_id" value="<?php echo esc_attr($image_id); ?>" />
                <button type="button" class="button" id="upload_image_button">
                    <?php echo $image_id ? 'Zmień obrazek' : 'Wybierz obrazek'; ?>
                </button>
                <?php if ($image_id): ?>
                    <button type="button" class="button" id="remove_image_button">Usuń obrazek</button>
                <?php endif; ?>
            </div>
            <p class="description">Wybierz obrazek dla wzoru, tekstury lub materiału.</p>
        </td>
    </tr>
    
    <script>
    jQuery(document).ready(function($) {
        var mediaUploader;
        
        $('#upload_image_button').click(function(e) {
            e.preventDefault();
            
            if (mediaUploader) {
                mediaUploader.open();
                return;
            }
            
            mediaUploader = wp.media({
                title: 'Wybierz obrazek',
                button: {
                    text: 'Użyj tego obrazka'
                },
                multiple: false
            });
            
            mediaUploader.on('select', function() {
                var attachment = mediaUploader.state().get('selection').first().toJSON();
                $('#image_id').val(attachment.id);
                $('.taxonomy-image-wrapper img').remove();
                $('.taxonomy-image-wrapper').prepend('<img src="' + attachment.sizes.thumbnail.url + '" style="max-width: 100px; max-height: 100px; display: block; margin-bottom: 10px;" />');
                $('#upload_image_button').text('Zmień obrazek');
                if (!$('#remove_image_button').length) {
                    $('#upload_image_button').after('<button type="button" class="button" id="remove_image_button">Usuń obrazek</button>');
                }
                
                // Auto-set swatch type to image and value to URL
                $('#swatch_type').val('image');
                $('#swatch_value').val(attachment.url);
            });
            
            mediaUploader.open();
        });
        
        $(document).on('click', '#remove_image_button', function(e) {
            e.preventDefault();
            $('#image_id').val('');
            $('.taxonomy-image-wrapper img').remove();
            $('#upload_image_button').text('Wybierz obrazek');
            $(this).remove();
            $('#swatch_value').val('');
        });
    });
    </script>
    <?php
}

// Zapisz metadane taksonomii
add_action('edited_pa_wzor', 'save_taxonomy_image_fields');
add_action('edited_pa_pattern', 'save_taxonomy_image_fields');
add_action('edited_pa_tekstura', 'save_taxonomy_image_fields');
add_action('edited_pa_texture', 'save_taxonomy_image_fields');
add_action('edited_pa_material', 'save_taxonomy_image_fields');
add_action('edited_pa_kolor', 'save_taxonomy_image_fields');
add_action('edited_pa_color', 'save_taxonomy_image_fields');

function save_taxonomy_image_fields($term_id) {
    if (isset($_POST['swatch_type'])) {
        update_term_meta($term_id, 'swatch_type', sanitize_text_field($_POST['swatch_type']));
    }
    
    if (isset($_POST['swatch_value'])) {
        update_term_meta($term_id, 'swatch_value', sanitize_text_field($_POST['swatch_value']));
    }
    
    if (isset($_POST['image_id'])) {
        update_term_meta($term_id, 'image_id', intval($_POST['image_id']));
    }
}

// Dodaj kolumnę w liście taksonomii
add_filter('manage_edit-pa_wzor_columns', 'add_taxonomy_image_column');
add_filter('manage_edit-pa_pattern_columns', 'add_taxonomy_image_column');
add_filter('manage_edit-pa_tekstura_columns', 'add_taxonomy_image_column');
add_filter('manage_edit-pa_texture_columns', 'add_taxonomy_image_column');
add_filter('manage_edit-pa_material_columns', 'add_taxonomy_image_column');

function add_taxonomy_image_column($columns) {
    $columns['swatch'] = 'Swatch';
    return $columns;
}

// Wyświetl swatch w kolumnie
add_filter('manage_pa_wzor_custom_column', 'show_taxonomy_image_column', 10, 3);
add_filter('manage_pa_pattern_custom_column', 'show_taxonomy_image_column', 10, 3);
add_filter('manage_pa_tekstura_custom_column', 'show_taxonomy_image_column', 10, 3);
add_filter('manage_pa_texture_custom_column', 'show_taxonomy_image_column', 10, 3);
add_filter('manage_pa_material_custom_column', 'show_taxonomy_image_column', 10, 3);

function show_taxonomy_image_column($content, $column_name, $term_id) {
    if ($column_name === 'swatch') {
        $swatch_type = get_term_meta($term_id, 'swatch_type', true);
        $swatch_value = get_term_meta($term_id, 'swatch_value', true);
        $image_id = get_term_meta($term_id, 'image_id', true);
        
        if ($swatch_type === 'image' && $image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'thumbnail');
            if ($image_data) {
                $content = '<img src="' . esc_url($image_data[0]) . '" style="width: 40px; height: 40px; object-fit: cover;" />';
            }
        } elseif ($swatch_type === 'color' && $swatch_value) {
            $content = '<div style="width: 40px; height: 40px; background-color: ' . esc_attr($swatch_value) . '; border: 1px solid #ccc;"></div>';
        } elseif ($swatch_type === 'label' && $swatch_value) {
            $content = '<span style="padding: 5px 10px; background: #f0f0f0; border-radius: 3px;">' . esc_html($swatch_value) . '</span>';
        }
    }
    
    return $content;
}
?>