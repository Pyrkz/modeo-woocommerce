<?php
// Tymczasowy skrypt aktywacji pluginu
// Uruchom przez: php activate_plugin.php

// Ustaw path do WordPress
define('WP_USE_THEMES', false);
require_once dirname(__FILE__) . '/wp-config.php';

// Aktywuj plugin
$plugin = 'unified-login-redirect.php';

if (!is_plugin_active($plugin)) {
    $result = activate_plugin($plugin);
    if (is_wp_error($result)) {
        echo "Błąd aktywacji: " . $result->get_error_message() . "\n";
    } else {
        echo "Plugin unified-login-redirect został aktywowany!\n";
    }
} else {
    echo "Plugin unified-login-redirect jest już aktywny!\n";
}

// Dezaktywuj stare pluginy
$old_plugins = array(
    'nextjs-login-redirect.php',
    'customer-friendly-redirects.php'
);

foreach ($old_plugins as $old_plugin) {
    if (is_plugin_active($old_plugin)) {
        deactivate_plugins($old_plugin);
        echo "Dezaktywowano: $old_plugin\n";
    }
}

echo "Gotowe!\n";
?>