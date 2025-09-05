<?php
/**
 * Plugin Name: Modeo Admin Styling
 * Plugin URI: https://nextmodeo.sitefy.pl
 * Description: Niestandardowe stylowanie kokpitu administracyjnego WordPress dla sklepu Modeo.pl
 * Version: 1.0.0
 * Author: Modeo Team
 * Text Domain: modeo-admin-styling
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.8
 * Requires PHP: 7.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('MODEO_ADMIN_STYLING_VERSION', '1.0.0');
define('MODEO_ADMIN_STYLING_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('MODEO_ADMIN_STYLING_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Modeo Admin Styling Class
 */
class Modeo_Admin_Styling {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_styles'));
        add_action('login_enqueue_scripts', array($this, 'enqueue_login_styles'));
        add_action('admin_init', array($this, 'init'));
        
        // Add plugin settings page
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
    }

    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain
        load_plugin_textdomain('modeo-admin-styling', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Enqueue admin styles
     */
    public function enqueue_admin_styles($hook) {
        wp_enqueue_style(
            'modeo-admin-styling',
            MODEO_ADMIN_STYLING_PLUGIN_URL . 'assets/css/admin-style.css',
            array(),
            MODEO_ADMIN_STYLING_VERSION
        );

        // Add custom CSS variables for easy customization
        $custom_css = $this->get_custom_css();
        if (!empty($custom_css)) {
            wp_add_inline_style('modeo-admin-styling', $custom_css);
        }
    }

    /**
     * Enqueue login styles
     */
    public function enqueue_login_styles() {
        wp_enqueue_style(
            'modeo-login-styling',
            MODEO_ADMIN_STYLING_PLUGIN_URL . 'assets/css/login-style.css',
            array(),
            MODEO_ADMIN_STYLING_VERSION
        );
    }

    /**
     * Get custom CSS from options
     */
    private function get_custom_css() {
        $options = get_option('modeo_admin_styling_options');
        return isset($options['custom_css']) ? $options['custom_css'] : '';
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            __('Modeo Admin Styling', 'modeo-admin-styling'),
            __('Admin Styling', 'modeo-admin-styling'),
            'manage_options',
            'modeo-admin-styling',
            array($this, 'options_page')
        );
    }

    /**
     * Admin init
     */
    public function admin_init() {
        register_setting('modeo_admin_styling', 'modeo_admin_styling_options');

        add_settings_section(
            'modeo_admin_styling_section',
            __('Ustawienia stylowania', 'modeo-admin-styling'),
            array($this, 'settings_section_callback'),
            'modeo_admin_styling'
        );

        add_settings_field(
            'enable_styling',
            __('Włącz niestandardowe stylowanie', 'modeo-admin-styling'),
            array($this, 'enable_styling_callback'),
            'modeo_admin_styling',
            'modeo_admin_styling_section'
        );

        add_settings_field(
            'custom_css',
            __('Niestandardowy CSS', 'modeo-admin-styling'),
            array($this, 'custom_css_callback'),
            'modeo_admin_styling',
            'modeo_admin_styling_section'
        );
    }

    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo __('Konfiguruj wygląd kokpitu administracyjnego WordPress.', 'modeo-admin-styling');
    }

    /**
     * Enable styling callback
     */
    public function enable_styling_callback() {
        $options = get_option('modeo_admin_styling_options');
        $enabled = isset($options['enable_styling']) ? $options['enable_styling'] : 1;
        echo '<input type="checkbox" name="modeo_admin_styling_options[enable_styling]" value="1" ' . checked(1, $enabled, false) . ' />';
    }

    /**
     * Custom CSS callback
     */
    public function custom_css_callback() {
        $options = get_option('modeo_admin_styling_options');
        $css = isset($options['custom_css']) ? $options['custom_css'] : '';
        echo '<textarea name="modeo_admin_styling_options[custom_css]" rows="10" cols="80" class="widefat">' . esc_textarea($css) . '</textarea>';
        echo '<p class="description">' . __('Dodatkowy CSS, który zostanie załadowany w kokpicie administracyjnym.', 'modeo-admin-styling') . '</p>';
    }

    /**
     * Options page
     */
    public function options_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('modeo_admin_styling');
                do_settings_sections('modeo_admin_styling');
                submit_button(__('Zapisz ustawienia', 'modeo-admin-styling'));
                ?>
            </form>
            
            <div class="card">
                <h2><?php _e('Informacje o wtyczce', 'modeo-admin-styling'); ?></h2>
                <p><?php _e('Wersja:', 'modeo-admin-styling'); ?> <strong><?php echo MODEO_ADMIN_STYLING_VERSION; ?></strong></p>
                <p><?php _e('Ta wtyczka pozwala na niestandardowe stylowanie kokpitu administracyjnego WordPress bez modyfikacji motywu.', 'modeo-admin-styling'); ?></p>
            </div>
        </div>
        <?php
    }
}

/**
 * Plugin activation hook
 */
function modeo_admin_styling_activate() {
    // Set default options
    $default_options = array(
        'enable_styling' => 1,
        'custom_css' => ''
    );
    add_option('modeo_admin_styling_options', $default_options);
}
register_activation_hook(__FILE__, 'modeo_admin_styling_activate');

/**
 * Plugin deactivation hook
 */
function modeo_admin_styling_deactivate() {
    // Clean up if needed
}
register_deactivation_hook(__FILE__, 'modeo_admin_styling_deactivate');

/**
 * Initialize the plugin
 */
function modeo_admin_styling_init() {
    new Modeo_Admin_Styling();
}
add_action('plugins_loaded', 'modeo_admin_styling_init');