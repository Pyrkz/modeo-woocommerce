<?php
/**
 * Activate reCAPTCHA v3 plugin for Modeo
 * Run this script once via wp-cli or directly to activate the plugin
 */

require_once(__DIR__ . '/backend/wp-config.php');

// Activate the plugin
$plugin = 'recaptcha-v3-modeo.php';

if (!is_plugin_active($plugin)) {
    activate_plugin($plugin);
    echo "✅ reCAPTCHA v3 plugin activated successfully!\n";
} else {
    echo "ℹ️  reCAPTCHA v3 plugin is already active.\n";
}

// Check if the plugin is working
$site_key = defined('RECAPTCHA_KEY') ? RECAPTCHA_KEY : getenv('RECAPTCHA_KEY');
$secret_key = defined('RECAPTCHA_SECRET_KEY') ? RECAPTCHA_SECRET_KEY : getenv('RECAPTCHA_SECRET_KEY');

echo "\n📊 Configuration Status:\n";
echo "Site Key: " . ($site_key ? "✅ Configured" : "❌ Missing") . "\n";
echo "Secret Key: " . ($secret_key ? "✅ Configured" : "❌ Missing") . "\n";

if ($site_key && $secret_key) {
    echo "\n🎉 reCAPTCHA v3 is ready to use!\n";
    echo "Visit: " . site_url('/rejestracja') . " to test the registration form.\n";
} else {
    echo "\n⚠️  Environment variables need to be set:\n";
    echo "- RECAPTCHA_KEY=your_site_key\n";
    echo "- RECAPTCHA_SECRET_KEY=your_secret_key\n";
    echo "\nAdd these to your .env.production file or WordPress constants.\n";
}
?>