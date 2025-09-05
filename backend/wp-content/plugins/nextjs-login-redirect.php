<?php
/**
 * Plugin Name: Next.js Login Redirect
 * Description: Przekierowuje użytkowników po zalogowaniu z powrotem do Next.js
 * Version: 1.0
 * Author: Modeo Dev
 */

// Nie pozwól na bezpośredni dostęp
if (!defined('ABSPATH')) {
    exit;
}

// Przekierowanie po zalogowaniu
add_filter('login_redirect', 'nextjs_custom_login_redirect', 10, 3);
function nextjs_custom_login_redirect($redirect_to, $request, $user) {
    // Sprawdź czy przekazano redirect_to w URL
    if (!empty($_REQUEST['redirect_to'])) {
        $redirect_to = $_REQUEST['redirect_to'];
    }
    // Jeśli nie ma redirect_to lub jest to wp-admin, przekieruj do Next.js
    elseif (empty($redirect_to) || strpos($redirect_to, 'wp-admin') !== false) {
        // Development
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $redirect_to = 'http://localhost:3000/';
        }
        // Production
        else {
            $redirect_to = 'https://nextmodeo.sitefy.pl/';
        }
    }
    
    return $redirect_to;
}

// Przekierowanie po rejestracji
add_filter('registration_redirect', 'nextjs_registration_redirect');
function nextjs_registration_redirect($redirect_to) {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return 'http://localhost:3000/welcome';
    } else {
        return 'https://nextmodeo.sitefy.pl/welcome';
    }
}

// Przekierowanie po wylogowaniu
add_action('wp_logout', 'nextjs_logout_redirect');
function nextjs_logout_redirect() {
    $redirect_url = (defined('WP_DEBUG') && WP_DEBUG) 
        ? 'http://localhost:3000/' 
        : 'https://nextmodeo.sitefy.pl/';
    
    wp_safe_redirect($redirect_url);
    exit;
}

// Dodaj link "Wróć do sklepu" w wp-login.php
add_action('login_footer', 'nextjs_add_back_to_store_link');
function nextjs_add_back_to_store_link() {
    $store_url = (defined('WP_DEBUG') && WP_DEBUG) 
        ? 'http://localhost:3000/' 
        : 'https://nextmodeo.sitefy.pl/';
    ?>
    <style>
        .back-to-store {
            text-align: center;
            margin-top: 20px;
        }
        .back-to-store a {
            color: #2271b1;
            text-decoration: none;
            font-size: 14px;
        }
        .back-to-store a:hover {
            text-decoration: underline;
        }
    </style>
    <div class="back-to-store">
        <a href="<?php echo esc_url($store_url); ?>">← Wróć do sklepu</a>
    </div>
    <?php
}

// Dla WooCommerce - przekierowanie z Moje Konto
add_filter('woocommerce_login_redirect', 'nextjs_wc_login_redirect', 10, 2);
function nextjs_wc_login_redirect($redirect, $user) {
    // Sprawdź czy jest redirect_to w URL - jeśli tak, respektuj to
    if (!empty($_GET['redirect_to'])) {
        return $_GET['redirect_to'];
    }
    
    // Jeśli login pochodzi z Next.js, wróć do Next.js
    $referer = wp_get_referer();
    if ($referer && (strpos($referer, 'localhost:3000') !== false || strpos($referer, 'nextmodeo.sitefy.pl') !== false)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            return 'http://localhost:3000/';
        } else {
            return 'https://nextmodeo.sitefy.pl/';
        }
    }
    
    // W przeciwnym przypadku, zostań w Moje konto (default WooCommerce behavior)
    return wc_get_page_permalink('myaccount');
}

// Ukryj admin bar dla zwykłych użytkowników (opcjonalne)
add_filter('show_admin_bar', 'nextjs_hide_admin_bar');
function nextjs_hide_admin_bar($show) {
    if (!current_user_can('administrator')) {
        return false;
    }
    return $show;
}

?>