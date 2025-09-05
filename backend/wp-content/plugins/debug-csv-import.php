<?php
/**
 * Plugin Name: Debug CSV Import
 * Description: Debug tool for CSV import issues
 * Version: 1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', function() {
    add_submenu_page(
        'tools.php',
        'Debug CSV Import', 
        'Debug CSV Import',
        'manage_options',
        'debug-csv-import',
        'debug_csv_import_page'
    );
});

function debug_csv_import_page() {
    if (isset($_POST['test_import'])) {
        echo '<div class="notice notice-info"><p>Rozpoczynam test importu...</p></div>';
        
        $file_path = WP_CONTENT_DIR . '/uploads/wc-imports/test-products.csv';
        
        if (!file_exists($file_path)) {
            echo '<div class="notice notice-error"><p>Plik nie istnieje: ' . $file_path . '</p></div>';
            return;
        }
        
        // Sprawdź uprawnienia
        echo '<h3>Informacje o pliku:</h3>';
        echo '<p>Ścieżka: ' . $file_path . '</p>';
        echo '<p>Rozmiar: ' . filesize($file_path) . ' bytes</p>';
        echo '<p>Readable: ' . (is_readable($file_path) ? 'TAK' : 'NIE') . '</p>';
        echo '<p>Uprawnienia: ' . substr(sprintf('%o', fileperms($file_path)), -4) . '</p>';
        
        // Sprawdź czy WooCommerce jest aktywny
        if (!class_exists('WooCommerce')) {
            echo '<div class="notice notice-error"><p>WooCommerce nie jest aktywny!</p></div>';
            return;
        }
        
        // Sprawdź czy importer istnieje
        if (!class_exists('WC_Product_CSV_Importer')) {
            echo '<div class="notice notice-error"><p>WC_Product_CSV_Importer nie istnieje!</p></div>';
            return;
        }
        
        try {
            $importer = new WC_Product_CSV_Importer($file_path);
            $results = $importer->import();
            
            echo '<h3>Wyniki importu:</h3>';
            echo '<pre>' . print_r($results, true) . '</pre>';
            
        } catch (Exception $e) {
            echo '<div class="notice notice-error"><p>Błąd: ' . $e->getMessage() . '</p></div>';
            echo '<p>Trace: <pre>' . $e->getTraceAsString() . '</pre></p>';
        }
    }
    
    ?>
    <div class="wrap">
        <h1>Debug CSV Import</h1>
        
        <h2>Informacje o środowisku</h2>
        <table class="wp-list-table widefat">
            <tr><td>PHP Memory Limit</td><td><?php echo ini_get('memory_limit'); ?></td></tr>
            <tr><td>Max Execution Time</td><td><?php echo ini_get('max_execution_time'); ?></td></tr>
            <tr><td>Upload Max Filesize</td><td><?php echo ini_get('upload_max_filesize'); ?></td></tr>
            <tr><td>Post Max Size</td><td><?php echo ini_get('post_max_size'); ?></td></tr>
            <tr><td>Max Input Vars</td><td><?php echo ini_get('max_input_vars'); ?></td></tr>
            <tr><td>WooCommerce Version</td><td><?php echo defined('WC_VERSION') ? WC_VERSION : 'Nie zainstalowany'; ?></td></tr>
        </table>
        
        <h2>Test importu</h2>
        <form method="post">
            <input type="submit" name="test_import" class="button button-primary" value="Testuj import CSV">
        </form>
        
        <?php
        // Lista plików CSV w folderze
        $upload_dir = WP_CONTENT_DIR . '/uploads/wc-imports/';
        if (is_dir($upload_dir)) {
            $files = scandir($upload_dir);
            echo '<h3>Pliki CSV w folderze wc-imports:</h3><ul>';
            foreach ($files as $file) {
                if (pathinfo($file, PATHINFO_EXTENSION) === 'csv') {
                    echo '<li>' . $file . ' (' . filesize($upload_dir . $file) . ' bytes)</li>';
                }
            }
            echo '</ul>';
        }
        ?>
    </div>
    <?php
}