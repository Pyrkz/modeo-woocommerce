<?php
/**
 * Test importu CSV dla WooCommerce
 */

// Załaduj WordPress
require_once '/var/www/html/wp-config.php';

echo "=== Test importu CSV ===\n";

// Sprawdź czy WooCommerce jest załadowany
if (!class_exists('WooCommerce')) {
    echo "BŁĄD: WooCommerce nie jest załadowany!\n";
    exit(1);
}

echo "✓ WooCommerce jest załadowany (v" . WC()->version . ")\n";

// Załaduj pliki importera
require_once '/var/www/html/wp-content/plugins/woocommerce/includes/import/abstract-wc-csv-importer.php';
require_once '/var/www/html/wp-content/plugins/woocommerce/includes/import/class-wc-product-csv-importer.php';

// Sprawdź klasy po załadowaniu
$importer_classes = [
    'WC_Product_CSV_Importer',
    'WC_CSV_Importer',
];

echo "Klasy importera po załadowaniu:\n";
foreach ($importer_classes as $class) {
    echo "- $class: " . (class_exists($class) ? "✓" : "✗") . "\n";
}

// Sprawdź plik
$file_path = WP_CONTENT_DIR . '/uploads/wc-imports/test-products.csv';

if (!file_exists($file_path)) {
    echo "BŁĄD: Plik nie istnieje: $file_path\n";
    exit(1);
}

echo "✓ Plik istnieje: $file_path (" . filesize($file_path) . " bytes)\n";

// Sprawdź zawartość pliku
echo "Zawartość pliku:\n";
echo file_get_contents($file_path) . "\n";

// Spróbuj importu
try {
    echo "=== Rozpoczynam import ===\n";
    
    $importer = new WC_Product_CSV_Importer($file_path, array(
        'delimiter' => ',',
        'start_pos' => 1, // Pomiń nagłówek
        'update_existing' => true,
    ));
    
    $results = $importer->import();
    
    echo "Import zakończony!\n";
    echo "Wyniki:\n";
    print_r($results);
    
} catch (Exception $e) {
    echo "BŁĄD IMPORTU: " . $e->getMessage() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "=== Koniec testu ===\n";