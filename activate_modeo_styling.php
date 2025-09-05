<?php
/**
 * Script do aktywacji wtyczki Modeo Admin Styling
 * Uruchom z katalogu głównego WordPress
 */

// Zabezpieczenie - uruchamiaj tylko z katalogu WordPress
if (!file_exists('wp-config.php')) {
    die('Błąd: Uruchom ten skrypt z katalogu głównego WordPress (gdzie znajduje się wp-config.php)');
}

// Załaduj WordPress
require_once('wp-config.php');
require_once('wp-admin/includes/plugin.php');

// Ścieżka do wtyczki
$plugin_path = 'modeo-admin-styling/modeo-admin-styling.php';

echo "=== AKTYWACJA WTYCZKI MODEO ADMIN STYLING ===\n";

// Sprawdź czy wtyczka istnieje
if (!file_exists(WP_PLUGIN_DIR . '/' . $plugin_path)) {
    die("Błąd: Nie znaleziono wtyczki w " . WP_PLUGIN_DIR . '/' . $plugin_path . "\n");
}

// Aktywuj wtyczkę
$result = activate_plugin($plugin_path);

if (is_wp_error($result)) {
    echo "Błąd aktywacji: " . $result->get_error_message() . "\n";
} else {
    echo "✅ Wtyczka została pomyślnie aktywowana!\n";
    
    // Sprawdź status wtyczki
    if (is_plugin_active($plugin_path)) {
        echo "✅ Wtyczka jest aktywna\n";
    } else {
        echo "❌ Wtyczka nie jest aktywna\n";
    }
    
    // Wyświetl informacje o wtyczce
    $plugin_data = get_plugin_data(WP_PLUGIN_DIR . '/' . $plugin_path);
    echo "\nInformacje o wtyczce:\n";
    echo "- Nazwa: " . $plugin_data['Name'] . "\n";
    echo "- Wersja: " . $plugin_data['Version'] . "\n";
    echo "- Opis: " . $plugin_data['Description'] . "\n";
    
    echo "\n=== INSTRUKCJE ===\n";
    echo "1. Przejdź do: http://localhost:8080/wp-admin/\n";
    echo "2. Zaloguj się (admin/admin123)\n";
    echo "3. Sprawdź nowy wygląd kokpitu\n";
    echo "4. Ustawienia znajdziesz w: Ustawienia > Admin Styling\n";
    echo "\nWtyczka została pomyślnie zainstalowana i aktywowana!\n";
}
?>