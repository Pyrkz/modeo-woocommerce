<?php
/**
 * Plugin Name: Modeo Dual Domain Handler
 * Description: Obsługuje środowiska staging (nextmodeo.sitefy.pl) i production (modeo.pl) z automatycznym przełączaniem konfiguracji
 * Version: 1.0.0
 * Author: Modeo Development Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ModeoDualDomainHandler {
    
    private $current_domain;
    private $is_staging;
    private $is_production;
    
    public function __construct() {
        $this->current_domain = $_SERVER['HTTP_HOST'] ?? '';
        $this->is_staging = (strpos($this->current_domain, 'nextmodeo.sitefy.pl') !== false);
        $this->is_production = (strpos($this->current_domain, 'modeo.pl') !== false);
        
        $this->init();
    }
    
    private function init() {
        // Hook into WordPress initialization
        add_action('init', array($this, 'setup_environment'));
        add_action('wp_loaded', array($this, 'configure_woocommerce'));
        add_filter('option_home', array($this, 'filter_home_url'));
        add_filter('option_siteurl', array($this, 'filter_site_url'));
        add_filter('site_url', array($this, 'filter_site_url'), 10, 2);
        add_filter('home_url', array($this, 'filter_home_url'), 10, 2);
        
        // WooCommerce specific hooks
        add_filter('woocommerce_get_checkout_url', array($this, 'filter_checkout_url'));
        add_filter('woocommerce_get_cart_url', array($this, 'filter_cart_url'));
        add_filter('wc_get_checkout_url', array($this, 'filter_checkout_url'));
        
        // API URLs
        add_filter('rest_url', array($this, 'filter_rest_url'), 10, 2);
        
        // Add environment indicator in admin
        add_action('admin_bar_menu', array($this, 'add_environment_indicator'), 999);
        add_action('admin_notices', array($this, 'show_environment_notice'));
    }
    
    public function setup_environment() {
        $protocol = 'https://';
        
        if ($this->is_staging) {
            $base_url = $protocol . 'nextmodeo.sitefy.pl';
            // More permissive settings for staging
            if (!defined('WP_DEBUG')) define('WP_DEBUG', true);
            if (!defined('WP_DEBUG_LOG')) define('WP_DEBUG_LOG', true);
            // Override environment detection for staging
            $_ENV['WORDPRESS_ENV'] = 'staging';
            if (!defined('WP_ENVIRONMENT_TYPE')) define('WP_ENVIRONMENT_TYPE', 'staging');
        } elseif ($this->is_production) {
            $base_url = $protocol . 'modeo.pl';
            // Strict settings for production
            if (!defined('WP_DEBUG')) define('WP_DEBUG', false);
            if (!defined('WP_DEBUG_LOG')) define('WP_DEBUG_LOG', false);
            // Ensure production environment
            $_ENV['WORDPRESS_ENV'] = 'production';
            if (!defined('WP_ENVIRONMENT_TYPE')) define('WP_ENVIRONMENT_TYPE', 'production');
        } else {
            // Fallback for local development
            $_ENV['WORDPRESS_ENV'] = 'development';
            if (!defined('WP_ENVIRONMENT_TYPE')) define('WP_ENVIRONMENT_TYPE', 'development');
            return;
        }
        
        // Set WordPress URLs
        if (!defined('WP_HOME')) define('WP_HOME', $base_url);
        if (!defined('WP_SITEURL')) define('WP_SITEURL', $base_url);
        
        // Update options if they don't match
        if (get_option('home') !== $base_url) {
            update_option('home', $base_url);
        }
        if (get_option('siteurl') !== $base_url) {
            update_option('siteurl', $base_url);
        }
    }
    
    public function configure_woocommerce() {
        if (!class_exists('WooCommerce')) {
            return;
        }
        
        $protocol = 'https://';
        $domain = $this->is_staging ? 'nextmodeo.sitefy.pl' : 'modeo.pl';
        $base_url = $protocol . $domain;
        
        // Update WooCommerce specific URLs
        update_option('woocommerce_checkout_page_endpoint', '/checkout/');
        update_option('woocommerce_cart_page_endpoint', '/cart/');
        update_option('woocommerce_myaccount_page_endpoint', '/moje-konto/');
        
        // Store API configuration
        if ($this->is_staging) {
            // More permissive CORS for staging
            add_filter('woocommerce_rest_check_permissions', array($this, 'allow_staging_requests'), 10, 4);
        }
    }
    
    public function filter_home_url($url, $path = '') {
        $protocol = 'https://';
        
        if ($this->is_staging) {
            $domain = 'nextmodeo.sitefy.pl';
        } elseif ($this->is_production) {
            $domain = 'modeo.pl';
        } else {
            return $url;
        }
        
        return $protocol . $domain . ($path ? '/' . ltrim($path, '/') : '');
    }
    
    public function filter_site_url($url, $path = '') {
        return $this->filter_home_url($url, $path);
    }
    
    public function filter_checkout_url($url) {
        $protocol = 'https://';
        
        if ($this->is_staging) {
            return $protocol . 'nextmodeo.sitefy.pl/checkout/';
        } elseif ($this->is_production) {
            return $protocol . 'modeo.pl/checkout/';
        }
        
        return $url;
    }
    
    public function filter_cart_url($url) {
        $protocol = 'https://';
        
        if ($this->is_staging) {
            return $protocol . 'nextmodeo.sitefy.pl/koszyk/';
        } elseif ($this->is_production) {
            return $protocol . 'modeo.pl/koszyk/';
        }
        
        return $url;
    }
    
    public function filter_rest_url($url, $path) {
        $protocol = 'https://';
        
        if ($this->is_staging) {
            $domain = 'nextmodeo.sitefy.pl';
        } elseif ($this->is_production) {
            $domain = 'modeo.pl';
        } else {
            return $url;
        }
        
        return $protocol . $domain . '/wp-json/' . ltrim($path, '/');
    }
    
    public function allow_staging_requests($permission, $context, $object_id, $post_type) {
        // More permissive permissions for staging environment
        if ($this->is_staging && in_array($context, array('read', 'edit'))) {
            return true;
        }
        return $permission;
    }
    
    public function add_environment_indicator($wp_admin_bar) {
        if (!is_admin() && !is_admin_bar_showing()) {
            return;
        }
        
        $environment = 'Local';
        $color = '#666';
        
        if ($this->is_staging) {
            $environment = 'STAGING';
            $color = '#f39c12';
        } elseif ($this->is_production) {
            $environment = 'PRODUCTION';
            $color = '#e74c3c';
        }
        
        $wp_admin_bar->add_menu(array(
            'id'    => 'environment-indicator',
            'title' => '<span style="color: ' . $color . '; font-weight: bold;">' . $environment . '</span>',
            'href'  => '#',
            'meta'  => array(
                'title' => 'Current environment: ' . $environment
            )
        ));
    }
    
    public function show_environment_notice() {
        if (!current_user_can('administrator')) {
            return;
        }
        
        $notice_class = 'notice notice-info';
        $environment = 'Local Development';
        $security_note = '';
        
        if ($this->is_staging) {
            $notice_class = 'notice notice-warning';
            $environment = 'STAGING Environment (nextmodeo.sitefy.pl)';
            $security_note = ' - Test environment for development';
        } elseif ($this->is_production) {
            $notice_class = 'notice notice-error';
            $environment = 'PRODUCTION Environment (modeo.pl) - BE CAREFUL!';
            $security_note = ' - Live customer data - Changes affect real users!';
        }
        
        // Security warning if using template environment variables
        $env_warning = '';
        if (defined('DB_PASSWORD') && (
            strpos(DB_PASSWORD, 'REPLACE_WITH_') !== false ||
            strpos(DB_PASSWORD, 'your_password') !== false ||
            strpos(DB_PASSWORD, 'template') !== false
        )) {
            $env_warning = '<br><strong style="color: #d63384;">⚠️ WARNING: Using template environment variables! Update .env.local with real credentials.</strong>';
        }
        
        printf('<div class="%1$s"><p><strong>Environment:</strong> %2$s%3$s%4$s</p></div>', 
            esc_attr($notice_class), 
            esc_html($environment),
            esc_html($security_note),
            $env_warning
        );
    }
    
    public function get_current_environment() {
        if ($this->is_staging) {
            return 'staging';
        } elseif ($this->is_production) {
            return 'production';
        }
        return 'development';
    }
}

// Initialize the plugin
new ModeoDualDomainHandler();

// Helper function for other plugins/themes
function modeo_get_environment() {
    global $modeo_dual_domain;
    return $modeo_dual_domain ? $modeo_dual_domain->get_current_environment() : 'development';
}

// Utility function to check environment
function is_modeo_staging() {
    return (strpos($_SERVER['HTTP_HOST'] ?? '', 'nextmodeo.sitefy.pl') !== false);
}

function is_modeo_production() {
    return (strpos($_SERVER['HTTP_HOST'] ?? '', 'modeo.pl') !== false);
}