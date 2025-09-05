<?php
/**
 * Plugin Name: Customer Friendly Redirects
 * Description: Zapewnia że klienci są przekierowywani do przyjaznych stron, a nie do wp-admin
 * Version: 1.0.0
 * Author: Modeo Team
 */

// Zapobiegaj bezpośredniemu dostępowi
if (!defined('ABSPATH')) {
    exit;
}

class CustomerFriendlyRedirects {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
    }
    
    public function init() {
        // Przekierowanie po zalogowaniu - tylko dla klientów (nie adminów)
        add_filter('login_redirect', array($this, 'customer_login_redirect'), 10, 3);
        
        // Przekierowanie po rejestracji
        add_filter('woocommerce_registration_redirect', array($this, 'customer_registration_redirect'), 10, 1);
        
        // Blokuj dostęp do wp-admin dla klientów (nie adminów)
        add_action('admin_init', array($this, 'block_wp_admin_for_customers'));
        
        // Przekieruj użytkowników którzy próbują dostać się do wp-admin
        add_action('wp_login', array($this, 'prevent_wp_admin_access'), 10, 2);
    }
    
    /**
     * Przekierowanie po zalogowaniu - klienci idą do "Moje konto", admini do wp-admin
     */
    public function customer_login_redirect($redirect_to, $request, $user) {
        // Jeśli to błąd logowania, nie zmieniaj niczego
        if (is_wp_error($user)) {
            return $redirect_to;
        }
        
        // Jeśli użytkownik ma uprawnienia administratora, zostaw oryginalny redirect
        if (user_can($user, 'manage_options')) {
            return $redirect_to;
        }
        
        // Jeśli jest custom redirect_to z Next.js, użyj go
        if (isset($_GET['redirect_to']) && !empty($_GET['redirect_to'])) {
            $custom_redirect = sanitize_url($_GET['redirect_to']);
            
            // Sprawdź czy to localhost (development) lub nasza domena
            $parsed = parse_url($custom_redirect);
            if ($parsed && isset($parsed['host'])) {
                $allowed_hosts = array(
                    'localhost',
                    'nextmodeo.sitefy.pl',
                    'www.nextmodeo.sitefy.pl'
                );
                
                // W development, pozwól też na porty localhost
                if (strpos($parsed['host'], 'localhost') === 0) {
                    return $custom_redirect;
                }
                
                if (in_array($parsed['host'], $allowed_hosts)) {
                    return $custom_redirect;
                }
            }
        }
        
        // Domyślnie klienci idą do "Moje konto"
        return wc_get_page_permalink('myaccount');
    }
    
    /**
     * Przekierowanie po rejestracji - zawsze do "Moje konto"
     */
    public function customer_registration_redirect($redirect) {
        // Sprawdź czy mamy custom redirect
        if (isset($_GET['redirect_to']) && !empty($_GET['redirect_to'])) {
            $custom_redirect = sanitize_url($_GET['redirect_to']);
            
            // Sprawdź czy to bezpieczny redirect
            $parsed = parse_url($custom_redirect);
            if ($parsed && isset($parsed['host'])) {
                $allowed_hosts = array(
                    'localhost',
                    'nextmodeo.sitefy.pl',
                    'www.nextmodeo.sitefy.pl'
                );
                
                if (strpos($parsed['host'], 'localhost') === 0 || in_array($parsed['host'], $allowed_hosts)) {
                    return $custom_redirect;
                }
            }
        }
        
        return wc_get_page_permalink('myaccount');
    }
    
    /**
     * Blokuj dostęp do wp-admin dla klientów (nie adminów)
     */
    public function block_wp_admin_for_customers() {
        // Pozwól na AJAX requesty
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }
        
        // Pozwól administratorom
        if (current_user_can('manage_options')) {
            return;
        }
        
        // Pozwól na heartbeat API
        if (isset($_GET['action']) && $_GET['action'] === 'heartbeat') {
            return;
        }
        
        // Jeśli zalogowany użytkownik (klient) próbuje dostać się do wp-admin
        if (is_user_logged_in() && is_admin()) {
            wp_redirect(wc_get_page_permalink('myaccount'));
            exit;
        }
    }
    
    /**
     * Dodatkowa ochrona - sprawdź po zalogowaniu czy nie próbuje iść do wp-admin
     */
    public function prevent_wp_admin_access($user_login, $user) {
        // Jeśli to administrator, pozwól
        if (user_can($user, 'manage_options')) {
            return;
        }
        
        // Jeśli w URL jest wp-admin, przekieruj do myaccount
        if (strpos($_SERVER['REQUEST_URI'], '/wp-admin') !== false) {
            wp_redirect(wc_get_page_permalink('myaccount'));
            exit;
        }
    }
}

// Inicjalizuj plugin
new CustomerFriendlyRedirects();

?>