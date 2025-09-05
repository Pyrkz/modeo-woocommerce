<?php
/**
 * Plugin Name: Unified Login Redirect
 * Description: Przekierowuje wszystkie logowania (wp-admin, wp-login.php) do /moje-konto dla adminów i klientów. Wylogowanie prowadzi do strony głównej.
 * Version: 1.0.0
 * Author: Modeo Team
 */

// Zapobiegaj bezpośredniemu dostępowi
if (!defined('ABSPATH')) {
    exit;
}

class UnifiedLoginRedirect {
    
    public function __construct() {
        // Wysoki priorytet aby nadpisać inne przekierowania
        add_action('init', array($this, 'handle_redirects'), 1);
        add_action('template_redirect', array($this, 'redirect_login_page'), 1);
        
        // Przekierowania po wylogowaniu - wysoki priorytet
        add_action('wp_logout', array($this, 'redirect_after_logout'), 1);
        add_filter('logout_redirect', array($this, 'custom_logout_redirect'), 1, 3);
        
        // Blokuj dostęp do wp-login.php
        add_action('login_init', array($this, 'redirect_wp_login'), 1);
        
        // Modyfikuj URL logowania i wylogowania
        add_filter('login_url', array($this, 'custom_login_url'), 10, 3);
        add_filter('register_url', array($this, 'custom_register_url'), 10, 1);
        add_filter('logout_url', array($this, 'custom_logout_url'), 999, 2);
        add_filter('wp_logout_url', array($this, 'custom_logout_url'), 999, 2);
        
        // Przekieruj po zalogowaniu - WSZYSTKICH użytkowników
        add_filter('login_redirect', array($this, 'unified_login_redirect'), 999, 3);
        add_filter('woocommerce_login_redirect', array($this, 'unified_wc_login_redirect'), 999, 2);
        
        // Przechwytuj wylogowanie przez URL
        add_action('wp_loaded', array($this, 'handle_logout_request'), 1);
    }
    
    /**
     * Główna funkcja obsługująca przekierowania
     */
    public function handle_redirects() {
        // Jeśli to AJAX lub cron, nie rób nic
        if (wp_doing_ajax() || wp_doing_cron()) {
            return;
        }
        
        // Sprawdź czy jesteśmy na wp-login.php
        if ($this->is_login_page()) {
            // Jeśli to akcja wylogowania, pozwól jej się wykonać
            if (isset($_GET['action']) && $_GET['action'] === 'logout') {
                return;
            }
            
            // Przekieruj do /moje-konto
            $this->redirect_to_my_account();
        }
        
        // Sprawdź czy próbujemy dostać się do wp-admin
        if (is_admin() && !wp_doing_ajax()) {
            // Sprawdź czy to strona logowania
            global $pagenow;
            if ($pagenow === 'wp-login.php' && !isset($_GET['action'])) {
                $this->redirect_to_my_account();
            }
        }
    }
    
    /**
     * Przekieruj stronę logowania do /moje-konto
     */
    public function redirect_login_page() {
        if ($this->is_login_page() && !isset($_GET['action'])) {
            $this->redirect_to_my_account();
        }
    }
    
    /**
     * Przekieruj wp-login.php do /moje-konto
     */
    public function redirect_wp_login() {
        // Jeśli to nie jest akcja wylogowania, przekieruj
        if (!isset($_GET['action']) || $_GET['action'] !== 'logout') {
            $this->redirect_to_my_account();
        }
    }
    
    /**
     * Sprawdź czy jesteśmy na stronie logowania
     */
    private function is_login_page() {
        return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
    }
    
    /**
     * Przekieruj do /moje-konto
     */
    private function redirect_to_my_account() {
        $my_account_url = wc_get_page_permalink('myaccount');
        
        // Zachowaj parametr redirect_to jeśli istnieje
        if (isset($_GET['redirect_to'])) {
            $my_account_url = add_query_arg('redirect_to', urlencode($_GET['redirect_to']), $my_account_url);
        }
        
        // Zachowaj inne parametry jeśli istnieją
        if (isset($_GET['action']) && $_GET['action'] === 'register') {
            $my_account_url = add_query_arg('action', 'register', $my_account_url);
        }
        
        wp_safe_redirect($my_account_url);
        exit;
    }
    
    /**
     * Zmień domyślny URL logowania na /moje-konto
     */
    public function custom_login_url($login_url, $redirect, $force_reauth) {
        $my_account_url = wc_get_page_permalink('myaccount');
        
        if (!empty($redirect)) {
            $my_account_url = add_query_arg('redirect_to', urlencode($redirect), $my_account_url);
        }
        
        if ($force_reauth) {
            $my_account_url = add_query_arg('reauth', '1', $my_account_url);
        }
        
        return $my_account_url;
    }
    
    /**
     * Zmień domyślny URL rejestracji na /moje-konto
     */
    public function custom_register_url($register_url) {
        return wc_get_page_permalink('myaccount');
    }
    
    /**
     * Przekierowanie po zalogowaniu - dla WSZYSTKICH użytkowników
     */
    public function unified_login_redirect($redirect_to, $request, $user) {
        // Jeśli błąd logowania, nie zmieniaj
        if (is_wp_error($user)) {
            return $redirect_to;
        }
        
        // Sprawdź czy mamy custom redirect_to
        if (!empty($_REQUEST['redirect_to'])) {
            $redirect_url = $_REQUEST['redirect_to'];
            
            // Weryfikuj bezpieczeństwo URL
            if ($this->is_safe_redirect_url($redirect_url)) {
                return $redirect_url;
            }
        }
        
        // Domyślnie wszyscy (włącznie z adminami) zostają na /moje-konto
        return wc_get_page_permalink('myaccount');
    }
    
    /**
     * Przekierowanie WooCommerce po zalogowaniu
     */
    public function unified_wc_login_redirect($redirect, $user) {
        // Sprawdź custom redirect_to
        if (!empty($_GET['redirect_to'])) {
            $redirect_url = $_GET['redirect_to'];
            
            if ($this->is_safe_redirect_url($redirect_url)) {
                return $redirect_url;
            }
        }
        
        // Domyślnie pozostań na /moje-konto
        return wc_get_page_permalink('myaccount');
    }
    
    /**
     * Przekierowanie po wylogowaniu - zawsze na stronę główną
     */
    public function redirect_after_logout() {
        $home_url = $this->get_home_url();
        wp_safe_redirect($home_url);
        exit;
    }
    
    /**
     * Filter dla logout redirect
     */
    public function custom_logout_redirect($logout_url, $redirect, $user) {
        return $this->get_home_url();
    }
    
    /**
     * Pobierz URL strony głównej (Next.js lub WordPress)
     */
    private function get_home_url() {
        // Development
        if (defined('WP_DEBUG') && WP_DEBUG) {
            return 'http://localhost:3000/';
        }
        // Production
        else {
            // Sprawdź czy używamy Next.js czy WordPress
            $site_url = get_site_url();
            if (strpos($site_url, 'nextmodeo.sitefy.pl') !== false) {
                return 'https://nextmodeo.sitefy.pl/';
            }
            return home_url('/');
        }
    }
    
    /**
     * Sprawdź czy URL jest bezpieczny do przekierowania
     */
    private function is_safe_redirect_url($url) {
        $parsed = parse_url($url);
        
        if (!$parsed || !isset($parsed['host'])) {
            // Jeśli to ścieżka względna, jest OK
            if (strpos($url, '/') === 0) {
                return true;
            }
            return false;
        }
        
        $allowed_hosts = array(
            'localhost',
            'nextmodeo.sitefy.pl',
            'www.nextmodeo.sitefy.pl',
            parse_url(home_url(), PHP_URL_HOST)
        );
        
        // W development, pozwól na localhost z portami
        if (defined('WP_DEBUG') && WP_DEBUG && strpos($parsed['host'], 'localhost') === 0) {
            return true;
        }
        
        return in_array($parsed['host'], $allowed_hosts);
    }
    
    /**
     * Zastąp standardowy URL wylogowania
     */
    public function custom_logout_url($logout_url, $redirect) {
        // Debug log
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Custom logout URL called: ' . $logout_url);
        }
        
        // Tworzymy bezpośredni URL do naszej funkcji wylogowania
        $custom_logout_url = add_query_arg(array(
            'action' => 'custom_logout',
            '_wpnonce' => wp_create_nonce('custom_logout')
        ), $this->get_home_url());
        
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Custom logout URL generated: ' . $custom_logout_url);
        }
        
        return $custom_logout_url;
    }
    
    /**
     * Obsługa wylogowania przez URL
     */
    public function handle_logout_request() {
        if (isset($_GET['action']) && $_GET['action'] === 'custom_logout') {
            // Weryfikuj nonce
            if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'custom_logout')) {
                wp_die('Nieprawidłowe żądanie wylogowania.');
            }
            
            // Wyloguj użytkownika
            wp_logout();
            
            // Przekieruj na stronę główną
            wp_safe_redirect($this->get_home_url());
            exit;
        }
    }
}

// Inicjalizuj plugin
new UnifiedLoginRedirect();

// Dezaktywuj inne pluginy przekierowań przy aktywacji tego
register_activation_hook(__FILE__, function() {
    // Dezaktywuj poprzednie pluginy przekierowań
    deactivate_plugins(array(
        'nextjs-login-redirect.php',
        'customer-friendly-redirects.php'
    ));
});