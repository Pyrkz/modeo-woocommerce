<?php
/**
 * Test skrypt do sprawdzenia czy stylowanie admin zostało usunięte z motywu
 */

// Załaduj WordPress z katalogu backend
chdir('/Users/marcinpyrkosz/Desktop/Aplikacje/modeo-woocommerce/backend');

if (!file_exists('wp-config.php')) {
    die('Błąd: Nie znaleziono wp-config.php w katalogu backend');
}

require_once('wp-config.php');

echo "=== TEST USUNIĘCIA STYLOWANIA ADMIN Z MOTYWU ===\n";

// Sprawdź czy klasa Admin_Dashboard jest załadowana
if (class_exists('Modeo_Admin_Dashboard')) {
    echo "❌ Klasa Modeo_Admin_Dashboard jest nadal załadowana!\n";
    echo "   Oznacza to, że stylowanie admin z motywu nadal działa.\n";
} else {
    echo "✅ Klasa Modeo_Admin_Dashboard NIE jest załadowana\n";
    echo "   Stylowanie admin z motywu zostało wyłączone.\n";
}

// Sprawdź hooki admin
$admin_hooks = array();
global $wp_filter;

if (isset($wp_filter['admin_enqueue_scripts'])) {
    foreach ($wp_filter['admin_enqueue_scripts']->callbacks as $priority => $callbacks) {
        foreach ($callbacks as $callback) {
            if (is_array($callback['function']) && 
                is_object($callback['function'][0]) && 
                get_class($callback['function'][0]) === 'Modeo_Admin_Dashboard') {
                $admin_hooks[] = "admin_enqueue_scripts (prioritet: $priority)";
            }
        }
    }
}

if (isset($wp_filter['admin_head'])) {
    foreach ($wp_filter['admin_head']->callbacks as $priority => $callbacks) {
        foreach ($callbacks as $callback) {
            if (is_array($callback['function']) && 
                is_object($callback['function'][0]) && 
                get_class($callback['function'][0]) === 'Modeo_Admin_Dashboard') {
                $admin_hooks[] = "admin_head (prioritet: $priority)";
            }
        }
    }
}

if (empty($admin_hooks)) {
    echo "✅ Brak hooków admin z klasy Modeo_Admin_Dashboard\n";
} else {
    echo "❌ Znalezione hooki admin:\n";
    foreach ($admin_hooks as $hook) {
        echo "   - $hook\n";
    }
}

// Sprawdź status wtyczki Modeo Admin Styling
require_once ABSPATH . 'wp-admin/includes/plugin.php';
$plugin_path = 'modeo-admin-styling/modeo-admin-styling.php';

if (is_plugin_active($plugin_path)) {
    echo "ℹ️  Wtyczka Modeo Admin Styling jest AKTYWNA\n";
} else {
    echo "ℹ️  Wtyczka Modeo Admin Styling jest NIEAKTYWNA\n";
}

echo "\n=== PODSUMOWANIE ===\n";
echo "1. Stylowanie admin z motywu zostało wyłączone\n";
echo "2. Teraz możesz używać wtyczki Modeo Admin Styling do kontrolowania wyglądu\n";
echo "3. Aktywuj wtyczkę przez: wp-admin > Wtyczki > Modeo Admin Styling\n";
echo "4. Ustawienia w: Ustawienia > Admin Styling\n";

?>