<?php
/**
 * Attribute Swatches for WooCommerce
 * 
 * Adds swatch type selection for product attributes:
 * - none (default text)
 * - color 
 * - label
 * - image
 */

if (!defined('ABSPATH')) {
    exit;
}

class Modeo_Attribute_Swatches {
    
    private static $instance = null;
    
    /**
     * Get instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        // Admin hooks
        add_action('woocommerce_after_add_attribute_fields', array($this, 'add_attribute_fields'));
        add_action('woocommerce_after_edit_attribute_fields', array($this, 'edit_attribute_fields'));
        add_action('woocommerce_attribute_added', array($this, 'save_attribute_fields'), 10, 2);
        add_action('woocommerce_attribute_updated', array($this, 'save_attribute_fields'), 10, 2);
        
        // Term meta fields
        add_action('created_term', array($this, 'save_term_meta'), 10, 3);
        add_action('edited_term', array($this, 'save_term_meta'), 10, 3);
        
        // Admin scripts
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        
        // Taxonomy columns for swatch preview
        add_action('admin_init', array($this, 'setup_taxonomy_columns'), 20);
        
        // REST API
        add_filter('woocommerce_rest_prepare_pa_color', array($this, 'add_swatch_data_to_rest'), 10, 3);
        add_filter('woocommerce_rest_prepare_pa_kolor', array($this, 'add_swatch_data_to_rest'), 10, 3);
        
        // Custom REST routes
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Dynamic REST API filters for all attributes
        add_action('init', array($this, 'register_rest_filters'), 20);
        
        // Store API - modify product data to include swatch info in attributes
        add_filter('woocommerce_store_api_product_data', array($this, 'add_swatch_data_to_store_api'), 10, 3);
        add_filter('woocommerce_blocks_product_grid_item_html_data', array($this, 'add_swatch_data_to_store_api'), 10, 3);
        
        // Alternative hooks for Store API
        add_filter('woocommerce_rest_prepare_product_object', array($this, 'add_swatch_data_to_rest_product'), 10, 3);
    }
    
    /**
     * Register REST API filters for all product attributes
     */
    public function register_rest_filters() {
        // Check if WooCommerce is active
        if (!function_exists('wc_get_attribute_taxonomies')) {
            return;
        }
        
        $attribute_taxonomies = wc_get_attribute_taxonomies();
        foreach ($attribute_taxonomies as $attribute) {
            add_filter('woocommerce_rest_prepare_pa_' . $attribute->attribute_name, array($this, 'add_swatch_data_to_rest'), 10, 3);
        }
    }
    
    /**
     * Add fields to attribute add form
     */
    public function add_attribute_fields() {
        ?>
        <div class="form-field">
            <label for="attribute_swatch_type"><?php esc_html_e('Typ próbki', 'modeo'); ?></label>
            <select name="attribute_swatch_type" id="attribute_swatch_type">
                <option value=""><?php esc_html_e('Brak (domyślny tekst)', 'modeo'); ?></option>
                <option value="color"><?php esc_html_e('Kolor', 'modeo'); ?></option>
                <option value="label"><?php esc_html_e('Etykieta', 'modeo'); ?></option>
                <option value="image"><?php esc_html_e('Obrazek', 'modeo'); ?></option>
            </select>
            <p class="description"><?php esc_html_e('Wybierz jak mają być wyświetlane wartości tego atrybutu.', 'modeo'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Add fields to attribute edit form
     */
    public function edit_attribute_fields() {
        $edit = isset($_GET['edit']) ? absint($_GET['edit']) : 0;
        $swatch_type = '';
        
        if ($edit) {
            $swatch_type = get_option('modeo_attribute_swatch_type_' . $edit, '');
        }
        ?>
        <tr class="form-field">
            <th scope="row" valign="top">
                <label for="attribute_swatch_type"><?php esc_html_e('Typ próbki', 'modeo'); ?></label>
            </th>
            <td>
                <select name="attribute_swatch_type" id="attribute_swatch_type">
                    <option value="" <?php selected($swatch_type, ''); ?>><?php esc_html_e('Brak (domyślny tekst)', 'modeo'); ?></option>
                    <option value="color" <?php selected($swatch_type, 'color'); ?>><?php esc_html_e('Kolor', 'modeo'); ?></option>
                    <option value="label" <?php selected($swatch_type, 'label'); ?>><?php esc_html_e('Etykieta', 'modeo'); ?></option>
                    <option value="image" <?php selected($swatch_type, 'image'); ?>><?php esc_html_e('Obrazek', 'modeo'); ?></option>
                </select>
                <p class="description"><?php esc_html_e('Wybierz jak mają być wyświetlane wartości tego atrybutu.', 'modeo'); ?></p>
            </td>
        </tr>
        <?php
    }
    
    /**
     * Save attribute fields
     */
    public function save_attribute_fields($id, $data) {
        if (isset($_POST['attribute_swatch_type'])) {
            update_option('modeo_attribute_swatch_type_' . $id, sanitize_text_field($_POST['attribute_swatch_type']));
        }
    }
    
    /**
     * Add term meta fields based on swatch type
     */
    public function add_term_fields($taxonomy) {
        $attribute_id = $this->get_attribute_id_by_taxonomy($taxonomy);
        if (!$attribute_id) {
            return;
        }
        
        $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
        
        if (!$swatch_type || $swatch_type === '') {
            return;
        }
        
        switch ($swatch_type) {
            case 'color':
                $this->add_color_field();
                break;
            case 'image':
                $this->add_image_field();
                break;
            case 'label':
                $this->add_label_field();
                break;
        }
    }
    
    /**
     * Edit term meta fields based on swatch type
     */
    public function edit_term_fields($term, $taxonomy) {
        $attribute_id = $this->get_attribute_id_by_taxonomy($taxonomy);
        if (!$attribute_id) {
            return;
        }
        
        $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
        
        if (!$swatch_type || $swatch_type === '') {
            return;
        }
        
        $term_id = $term->term_id;
        
        switch ($swatch_type) {
            case 'color':
                $this->edit_color_field($term_id);
                break;
            case 'image':
                $this->edit_image_field($term_id);
                break;
            case 'label':
                $this->edit_label_field($term_id);
                break;
        }
    }
    
    /**
     * Add color field for new term
     */
    private function add_color_field() {
        ?>
        <div class="form-field">
            <label for="swatch_color"><?php esc_html_e('Kolor', 'modeo'); ?></label>
            <input type="text" name="swatch_color" id="swatch_color" class="modeo-color-picker" />
            <p class="description"><?php esc_html_e('Wybierz kolor dla tej wartości atrybutu.', 'modeo'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Edit color field for existing term
     */
    private function edit_color_field($term_id) {
        $color = get_term_meta($term_id, 'swatch_color', true);
        ?>
        <tr class="form-field">
            <th scope="row" valign="top"><label for="swatch_color"><?php esc_html_e('Kolor', 'modeo'); ?></label></th>
            <td>
                <input type="text" name="swatch_color" id="swatch_color" value="<?php echo esc_attr($color); ?>" class="modeo-color-picker" />
                <p class="description"><?php esc_html_e('Wybierz kolor dla tej wartości atrybutu.', 'modeo'); ?></p>
            </td>
        </tr>
        <?php
    }
    
    /**
     * Add image field for new term
     */
    private function add_image_field() {
        ?>
        <div class="form-field">
            <label for="swatch_image"><?php esc_html_e('Obrazek', 'modeo'); ?></label>
            <div class="modeo-image-upload">
                <input type="hidden" name="swatch_image" id="swatch_image" />
                <img src="" style="max-width: 100px; display: none;" />
                <button type="button" class="button modeo-upload-image"><?php esc_html_e('Wybierz obrazek', 'modeo'); ?></button>
                <button type="button" class="button modeo-remove-image" style="display: none;"><?php esc_html_e('Usuń obrazek', 'modeo'); ?></button>
            </div>
            <p class="description"><?php esc_html_e('Wybierz obrazek dla tej wartości atrybutu.', 'modeo'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Edit image field for existing term
     */
    private function edit_image_field($term_id) {
        $image_id = get_term_meta($term_id, 'swatch_image', true);
        $image_url = $image_id ? wp_get_attachment_url($image_id) : '';
        ?>
        <tr class="form-field">
            <th scope="row" valign="top"><label for="swatch_image"><?php esc_html_e('Obrazek', 'modeo'); ?></label></th>
            <td>
                <div class="modeo-image-upload">
                    <input type="hidden" name="swatch_image" id="swatch_image" value="<?php echo esc_attr($image_id); ?>" />
                    <img src="<?php echo esc_url($image_url); ?>" style="max-width: 100px; <?php echo $image_url ? '' : 'display: none;'; ?>" />
                    <button type="button" class="button modeo-upload-image"><?php esc_html_e('Wybierz obrazek', 'modeo'); ?></button>
                    <button type="button" class="button modeo-remove-image" style="<?php echo $image_url ? '' : 'display: none;'; ?>"><?php esc_html_e('Usuń obrazek', 'modeo'); ?></button>
                </div>
                <p class="description"><?php esc_html_e('Wybierz obrazek dla tej wartości atrybutu.', 'modeo'); ?></p>
            </td>
        </tr>
        <?php
    }
    
    /**
     * Add label field for new term
     */
    private function add_label_field() {
        ?>
        <div class="form-field">
            <label for="swatch_label"><?php esc_html_e('Etykieta', 'modeo'); ?></label>
            <input type="text" name="swatch_label" id="swatch_label" />
            <p class="description"><?php esc_html_e('Krótka etykieta (np. XL, 42).', 'modeo'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Edit label field for existing term
     */
    private function edit_label_field($term_id) {
        $label = get_term_meta($term_id, 'swatch_label', true);
        ?>
        <tr class="form-field">
            <th scope="row" valign="top"><label for="swatch_label"><?php esc_html_e('Etykieta', 'modeo'); ?></label></th>
            <td>
                <input type="text" name="swatch_label" id="swatch_label" value="<?php echo esc_attr($label); ?>" />
                <p class="description"><?php esc_html_e('Krótka etykieta (np. XL, 42).', 'modeo'); ?></p>
            </td>
        </tr>
        <?php
    }
    
    /**
     * Save term meta
     */
    public function save_term_meta($term_id, $tt_id, $taxonomy) {
        if (!str_starts_with($taxonomy, 'pa_')) {
            return;
        }
        
        // Save color
        if (isset($_POST['swatch_color'])) {
            update_term_meta($term_id, 'swatch_color', sanitize_hex_color($_POST['swatch_color']));
        }
        
        // Save image
        if (isset($_POST['swatch_image'])) {
            update_term_meta($term_id, 'swatch_image', absint($_POST['swatch_image']));
        }
        
        // Save label
        if (isset($_POST['swatch_label'])) {
            update_term_meta($term_id, 'swatch_label', sanitize_text_field($_POST['swatch_label']));
        }
    }
    
    /**
     * Get attribute ID by taxonomy
     */
    private function get_attribute_id_by_taxonomy($taxonomy) {
        if (!str_starts_with($taxonomy, 'pa_')) {
            return false;
        }
        
        // Check if WooCommerce functions are available
        if (!function_exists('wc_get_attribute') || !function_exists('wc_attribute_taxonomy_id_by_name')) {
            return false;
        }
        
        $attribute_name = substr($taxonomy, 3);
        $attribute = wc_get_attribute(wc_attribute_taxonomy_id_by_name($attribute_name));
        
        return $attribute ? $attribute->id : false;
    }
    
    /**
     * Enqueue admin scripts
     */
    public function admin_scripts($hook) {
        if (!in_array($hook, array('edit-tags.php', 'term.php', 'product_page_product_attributes'))) {
            return;
        }
        
        // Color picker
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');
        
        // Media uploader
        wp_enqueue_media();
        
        // Custom script
        wp_add_inline_script('wp-color-picker', '
            jQuery(document).ready(function($) {
                // Initialize color picker
                $(".modeo-color-picker").wpColorPicker();
                
                // Image upload
                $(document).on("click", ".modeo-upload-image", function(e) {
                    e.preventDefault();
                    var button = $(this);
                    var container = button.closest(".modeo-image-upload");
                    
                    var frame = wp.media({
                        title: "Wybierz obrazek",
                        button: {
                            text: "Użyj obrazka"
                        },
                        multiple: false
                    });
                    
                    frame.on("select", function() {
                        var attachment = frame.state().get("selection").first().toJSON();
                        container.find("input").val(attachment.id);
                        container.find("img").attr("src", attachment.url).show();
                        container.find(".modeo-remove-image").show();
                    });
                    
                    frame.open();
                });
                
                // Remove image
                $(document).on("click", ".modeo-remove-image", function(e) {
                    e.preventDefault();
                    var container = $(this).closest(".modeo-image-upload");
                    container.find("input").val("");
                    container.find("img").hide();
                    $(this).hide();
                });
            });
        ');
        
        // Dynamic term fields based on swatch type
        if (isset($_GET['taxonomy'])) {
            $taxonomy = sanitize_text_field($_GET['taxonomy']);
            add_action($taxonomy . '_add_form_fields', array($this, 'add_term_fields'), 10);
            add_action($taxonomy . '_edit_form_fields', array($this, 'edit_term_fields'), 10, 2);
        }
    }
    
    /**
     * Setup taxonomy columns for swatch preview
     */
    public function setup_taxonomy_columns() {
        // Check if WooCommerce is active
        if (!function_exists('wc_get_attribute_taxonomies')) {
            return;
        }
        
        $attribute_taxonomies = wc_get_attribute_taxonomies();
        foreach ($attribute_taxonomies as $attribute) {
            $taxonomy = 'pa_' . $attribute->attribute_name;
            
            // Check if this attribute has swatch type set
            $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute->attribute_id, '');
            if ($swatch_type && $swatch_type !== '') {
                add_filter("manage_edit-{$taxonomy}_columns", array($this, 'add_swatch_column'));
                add_filter("manage_{$taxonomy}_custom_column", array($this, 'display_swatch_column'), 10, 3);
            }
        }
    }
    
    /**
     * Add swatch column to taxonomy table
     */
    public function add_swatch_column($columns) {
        // Insert swatch column after 'name' column
        $new_columns = array();
        foreach ($columns as $key => $value) {
            $new_columns[$key] = $value;
            if ($key === 'name') {
                $new_columns['swatch'] = __('Próbka', 'modeo');
            }
        }
        return $new_columns;
    }
    
    /**
     * Display swatch in taxonomy column
     */
    public function display_swatch_column($content, $column_name, $term_id) {
        if ($column_name !== 'swatch') {
            return $content;
        }
        
        $term = get_term($term_id);
        if (!$term || is_wp_error($term)) {
            return $content;
        }
        
        $taxonomy = $term->taxonomy;
        $attribute_id = $this->get_attribute_id_by_taxonomy($taxonomy);
        
        if (!$attribute_id) {
            return $content;
        }
        
        $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
        
        switch ($swatch_type) {
            case 'color':
                $color = get_term_meta($term_id, 'swatch_color', true);
                if ($color) {
                    return sprintf(
                        '<div class="modeo-swatch-preview modeo-color-swatch" style="width: 30px; height: 30px; background-color: %s; border-radius: 50%%; border: 2px solid #ddd; display: inline-block;" title="%s"></div>',
                        esc_attr($color),
                        esc_attr($color)
                    );
                }
                break;
                
            case 'image':
                $image_id = get_term_meta($term_id, 'swatch_image', true);
                if ($image_id) {
                    $image_url = wp_get_attachment_image_url($image_id, 'thumbnail');
                    if ($image_url) {
                        return sprintf(
                            '<div class="modeo-swatch-preview modeo-image-swatch"><img src="%s" style="width: 30px; height: 30px; object-fit: cover; border-radius: 4px; border: 2px solid #ddd;" alt="%s" /></div>',
                            esc_url($image_url),
                            esc_attr($term->name)
                        );
                    }
                }
                break;
                
            case 'label':
                $label = get_term_meta($term_id, 'swatch_label', true);
                if ($label) {
                    return sprintf(
                        '<div class="modeo-swatch-preview modeo-label-swatch" style="display: inline-block; padding: 4px 8px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; font-weight: bold;">%s</div>',
                        esc_html($label)
                    );
                }
                break;
        }
        
        // Return dash if no swatch data
        return '<span class="dashicons dashicons-minus" style="color: #ccc;" title="' . __('Brak próbki', 'modeo') . '"></span>';
    }
    
    /**
     * Add swatch data to REST API response
     */
    public function add_swatch_data_to_rest($response, $item, $request) {
        $data = $response->get_data();
        
        // Get attribute info
        $taxonomy = $request->get_param('attribute');
        if (!$taxonomy) {
            // Try to extract from route
            $route = $request->get_route();
            if (preg_match('/attributes\/(\d+)\/terms/', $route, $matches)) {
                $attribute_id = $matches[1];
                $attribute = wc_get_attribute($attribute_id);
                if ($attribute) {
                    $taxonomy = 'pa_' . $attribute->slug;
                }
            }
        }
        
        if ($taxonomy) {
            $attribute_id = $this->get_attribute_id_by_taxonomy($taxonomy);
            if ($attribute_id) {
                $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
                $data['swatch_type'] = $swatch_type;
                
                // Add swatch data based on type
                switch ($swatch_type) {
                    case 'color':
                        $data['swatch_value'] = get_term_meta($item->term_id, 'swatch_color', true);
                        break;
                    case 'image':
                        $image_id = get_term_meta($item->term_id, 'swatch_image', true);
                        $data['swatch_value'] = $image_id ? wp_get_attachment_url($image_id) : '';
                        break;
                    case 'label':
                        $data['swatch_value'] = get_term_meta($item->term_id, 'swatch_label', true);
                        break;
                }
            }
        }
        
        $response->set_data($data);
        return $response;
    }
    
    /**
     * Add swatch data to Store API product response
     */
    public function add_swatch_data_to_store_api($data, $product, $request) {
        // Debug log
        error_log('Modeo Swatches: Store API hook called for product ' . (is_object($product) ? $product->get_id() : 'unknown'));
        
        // Only process if product has attributes
        if (!isset($data['attributes']) || !is_array($data['attributes'])) {
            error_log('Modeo Swatches: No attributes found in data');
            return $data;
        }
        
        // Enhance each attribute with swatch data
        foreach ($data['attributes'] as &$attribute) {
            if (isset($attribute['taxonomy']) && $attribute['taxonomy'] && isset($attribute['terms'])) {
                $attribute_id = $this->get_attribute_id_by_taxonomy($attribute['taxonomy']);
                if ($attribute_id) {
                    $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
                    
                    // Add swatch type to attribute
                    $attribute['swatch_type'] = $swatch_type;
                    
                    // Enhance terms with swatch data
                    foreach ($attribute['terms'] as &$term) {
                        if (isset($term['id'])) {
                            $term['swatch_type'] = $swatch_type;
                            
                            // Add swatch value based on type
                            switch ($swatch_type) {
                                case 'color':
                                    $term['swatch_value'] = get_term_meta($term['id'], 'swatch_color', true);
                                    break;
                                case 'image':
                                    $image_id = get_term_meta($term['id'], 'swatch_image', true);
                                    $term['swatch_value'] = $image_id ? wp_get_attachment_url($image_id) : '';
                                    break;
                                case 'label':
                                    $term['swatch_value'] = get_term_meta($term['id'], 'swatch_label', true);
                                    break;
                                default:
                                    $term['swatch_value'] = '';
                                    break;
                            }
                        }
                    }
                }
            }
        }
        
        return $data;
    }
    
    /**
     * Add swatch data to REST API product response
     */
    public function add_swatch_data_to_rest_product($response, $product, $request) {
        $data = $response->get_data();
        
        // Process attributes if they exist
        if (isset($data['attributes']) && is_array($data['attributes'])) {
            foreach ($data['attributes'] as &$attribute) {
                if (isset($attribute['slug']) && strpos($attribute['slug'], 'pa_') === 0) {
                    $taxonomy = $attribute['slug'];
                    $attribute_id = $this->get_attribute_id_by_taxonomy($taxonomy);
                    
                    if ($attribute_id) {
                        $swatch_type = get_option('modeo_attribute_swatch_type_' . $attribute_id, '');
                        $attribute['swatch_type'] = $swatch_type;
                        
                        // Add swatch data to terms/options if they exist
                        if (isset($attribute['terms']) && is_array($attribute['terms'])) {
                            foreach ($attribute['terms'] as &$term) {
                                if (isset($term['id'])) {
                                    $term['swatch_type'] = $swatch_type;
                                    
                                    switch ($swatch_type) {
                                        case 'color':
                                            $term['swatch_value'] = get_term_meta($term['id'], 'swatch_color', true);
                                            break;
                                        case 'image':
                                            $image_id = get_term_meta($term['id'], 'swatch_image', true);
                                            $term['swatch_value'] = $image_id ? wp_get_attachment_url($image_id) : '';
                                            break;
                                        case 'label':
                                            $term['swatch_value'] = get_term_meta($term['id'], 'swatch_label', true);
                                            break;
                                        default:
                                            $term['swatch_value'] = '';
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        $response->set_data($data);
        return $response;
    }

    /**
     * Register custom REST routes for color swatches
     */
    public function register_rest_routes() {
        register_rest_route('modeo/v1', '/color-swatches', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_color_swatches_with_meta'),
            'permission_callback' => '__return_true', // Allow public access
        ));
    }

    /**
     * Get color swatches with RGB values for frontend
     */
    public function get_color_swatches_with_meta() {
        // Check if WooCommerce is active
        if (!function_exists('wc_get_products')) {
            return new WP_Error('woocommerce_not_active', 'WooCommerce is not active', array('status' => 503));
        }
        
        $terms = get_terms(array(
            'taxonomy' => 'pa_kolor',
            'hide_empty' => false,
        ));

        if (is_wp_error($terms)) {
            return new WP_Error('no_terms', 'No color terms found', array('status' => 404));
        }

        $swatch_type = get_option('modeo_attribute_swatch_type_3', ''); // 3 is color attribute ID
        $colors = array();

        foreach ($terms as $term) {
            // Get product count for this color
            $product_count = wc_get_products(array(
                'status' => 'publish',
                'limit' => -1,
                'return' => 'ids',
                'tax_query' => array(
                    array(
                        'taxonomy' => 'pa_kolor',
                        'field' => 'term_id',
                        'terms' => $term->term_id,
                    ),
                ),
            ));

            $color_data = array(
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
                'description' => $term->description,
                'count' => count($product_count),
                'swatch_type' => $swatch_type,
            );

            // Add swatch value based on type
            switch ($swatch_type) {
                case 'color':
                    $color_data['swatch_value'] = get_term_meta($term->term_id, 'swatch_color', true) ?: '';
                    break;
                case 'image':
                    $image_id = get_term_meta($term->term_id, 'swatch_image', true);
                    $color_data['swatch_value'] = $image_id ? wp_get_attachment_url($image_id) : '';
                    break;
                case 'label':
                    $color_data['swatch_value'] = get_term_meta($term->term_id, 'swatch_label', true) ?: '';
                    break;
                default:
                    $color_data['swatch_value'] = '';
                    break;
            }

            $colors[] = $color_data;
        }

        return new WP_REST_Response($colors, 200);
    }
}

// Initialize only if accessed directly
if (!function_exists('add_action')) {
    exit;
}

// Class will be initialized by functions.php