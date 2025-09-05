<?php
/**
 * Plugin Name: reCAPTCHA v3 for Modeo Registration
 * Description: Integrates Google reCAPTCHA v3 with the Modeo registration page for enhanced security
 * Version: 1.0.0
 * Author: Modeo Team
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ModeoRecaptchaV3 {
    
    private $site_key;
    private $secret_key;
    
    public function __construct() {
        $this->site_key = $this->get_env_variable('RECAPTCHA_KEY');
        $this->secret_key = $this->get_env_variable('RECAPTCHA_SECRET_KEY');
        
        // Only initialize if we have keys
        if ($this->site_key && $this->secret_key) {
            add_action('init', [$this, 'init']);
        }
    }
    
    public function init() {
        // Add reCAPTCHA script to registration page
        add_action('wp_enqueue_scripts', [$this, 'enqueue_recaptcha_script']);
        
        // Add reCAPTCHA to registration form
        add_action('woocommerce_register_form', [$this, 'add_recaptcha_field'], 20);
        
        // Verify reCAPTCHA on registration
        add_action('woocommerce_register_post', [$this, 'verify_recaptcha'], 10, 3);
        
        // Add admin settings page
        add_action('admin_menu', [$this, 'add_admin_menu']);
        
        // Log errors for debugging
        add_action('wp_footer', [$this, 'add_debug_info']);
    }
    
    /**
     * Get environment variable from .env.production or WordPress constants
     */
    private function get_env_variable($key) {
        // First check WordPress constants
        if (defined($key)) {
            return constant($key);
        }
        
        // Then check environment variables
        if (getenv($key)) {
            return getenv($key);
        }
        
        // Try to read from .env.production file
        $env_file = ABSPATH . '../.env.production';
        if (file_exists($env_file)) {
            $env_content = file_get_contents($env_file);
            if (preg_match('/^' . $key . '=(.*)$/m', $env_content, $matches)) {
                return trim($matches[1]);
            }
        }
        
        return false;
    }
    
    /**
     * Enqueue reCAPTCHA script only on registration page
     */
    public function enqueue_recaptcha_script() {
        // Only load on registration page
        if (is_page_template('page-rejestracja.php') || 
            (is_page() && get_page_template_slug() === 'page-rejestracja.php')) {
            
            wp_enqueue_script(
                'google-recaptcha-v3',
                'https://www.google.com/recaptcha/api.js?render=' . $this->site_key,
                [],
                '3.0',
                true
            );
            
            // Add inline script for form integration
            wp_add_inline_script('google-recaptcha-v3', $this->get_recaptcha_js());
        }
    }
    
    /**
     * Get JavaScript code for reCAPTCHA integration
     */
    private function get_recaptcha_js() {
        return "
        document.addEventListener('DOMContentLoaded', function() {
            // Wait for reCAPTCHA to load
            function waitForRecaptcha() {
                if (typeof grecaptcha !== 'undefined') {
                    initRecaptcha();
                } else {
                    setTimeout(waitForRecaptcha, 100);
                }
            }
            
            function initRecaptcha() {
                grecaptcha.ready(function() {
                    const form = document.querySelector('.woocommerce-form-register');
                    if (!form) return;
                    
                    // Create hidden input for token
                    if (!document.getElementById('g-recaptcha-response')) {
                        const tokenInput = document.createElement('input');
                        tokenInput.type = 'hidden';
                        tokenInput.name = 'g-recaptcha-response';
                        tokenInput.id = 'g-recaptcha-response';
                        form.appendChild(tokenInput);
                    }
                    
                    // Generate token on form submission
                    form.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        grecaptcha.execute('" . $this->site_key . "', {action: 'register'})
                            .then(function(token) {
                                document.getElementById('g-recaptcha-response').value = token;
                                // Submit form after getting token
                                form.submit();
                            })
                            .catch(function(error) {
                                console.error('reCAPTCHA error:', error);
                                alert('Wystąpił problem z weryfikacją bezpieczeństwa. Spróbuj ponownie.');
                            });
                    });
                });
            }
            
            waitForRecaptcha();
        });
        ";
    }
    
    /**
     * Add hidden reCAPTCHA field to registration form
     */
    public function add_recaptcha_field() {
        // Add a small badge to inform users about reCAPTCHA
        echo '<div class="recaptcha-info" style="font-size: 12px; color: #666; margin-bottom: 16px; text-align: center;">';
        echo 'Ta strona jest chroniona przez reCAPTCHA. Obowiązują ';
        echo '<a href="https://policies.google.com/privacy" target="_blank" style="color: #4285f4;">Zasady prywatności</a> i ';
        echo '<a href="https://policies.google.com/terms" target="_blank" style="color: #4285f4;">Warunki korzystania</a> Google.';
        echo '</div>';
    }
    
    /**
     * Verify reCAPTCHA token on registration
     */
    public function verify_recaptcha($username, $email, $errors) {
        // Skip verification in admin area or if no token provided
        if (is_admin() || !isset($_POST['g-recaptcha-response'])) {
            return;
        }
        
        $token = sanitize_text_field($_POST['g-recaptcha-response']);
        
        if (empty($token)) {
            $errors->add('recaptcha_missing', 'Błąd weryfikacji bezpieczeństwa. Spróbuj ponownie.');
            return;
        }
        
        // Verify token with Google
        $response = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
            'body' => [
                'secret' => $this->secret_key,
                'response' => $token,
                'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
            ],
            'timeout' => 10
        ]);
        
        if (is_wp_error($response)) {
            $errors->add('recaptcha_error', 'Błąd połączenia z systemem weryfikacji. Spróbuj ponownie.');
            error_log('reCAPTCHA API error: ' . $response->get_error_message());
            return;
        }
        
        $body = wp_remote_retrieve_body($response);
        $result = json_decode($body, true);
        
        // Log for debugging
        error_log('reCAPTCHA response: ' . $body);
        
        if (!$result['success']) {
            $error_codes = isset($result['error-codes']) ? implode(', ', $result['error-codes']) : 'unknown';
            error_log('reCAPTCHA verification failed: ' . $error_codes);
            $errors->add('recaptcha_failed', 'Weryfikacja bezpieczeństwa nie powiodła się. Spróbuj ponownie.');
            return;
        }
        
        // Check score (v3 specific)
        $score = isset($result['score']) ? floatval($result['score']) : 0;
        $min_score = 0.5; // Adjust as needed
        
        if ($score < $min_score) {
            error_log('reCAPTCHA score too low: ' . $score);
            $errors->add('recaptcha_low_score', 'Weryfikacja bezpieczeństwa nie powiodła się. Jeśli to błąd, skontaktuj się z nami.');
            return;
        }
        
        // Verification successful - log for monitoring
        error_log('reCAPTCHA verification successful. Score: ' . $score);
    }
    
    /**
     * Add admin menu for settings
     */
    public function add_admin_menu() {
        add_options_page(
            'reCAPTCHA v3 Settings',
            'reCAPTCHA v3',
            'manage_options',
            'recaptcha-v3-modeo',
            [$this, 'admin_page']
        );
    }
    
    /**
     * Admin settings page
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>reCAPTCHA v3 dla Modeo</h1>
            
            <div class="card" style="max-width: 600px;">
                <h2>Status konfiguracji</h2>
                
                <table class="form-table">
                    <tr>
                        <th>Site Key:</th>
                        <td>
                            <?php if ($this->site_key): ?>
                                <span style="color: green;">✓ Skonfigurowany</span>
                                <code><?= substr($this->site_key, 0, 20) ?>...</code>
                            <?php else: ?>
                                <span style="color: red;">✗ Brak konfiguracji</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <tr>
                        <th>Secret Key:</th>
                        <td>
                            <?php if ($this->secret_key): ?>
                                <span style="color: green;">✓ Skonfigurowany</span>
                                <code><?= substr($this->secret_key, 0, 20) ?>...</code>
                            <?php else: ?>
                                <span style="color: red;">✗ Brak konfiguracji</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                </table>
                
                <h3>Instrukcje konfiguracji</h3>
                <p>Klucze reCAPTCHA są automatycznie wczytywane z:</p>
                <ol>
                    <li>Stałych WordPress (RECAPTCHA_KEY, RECAPTCHA_SECRET_KEY)</li>
                    <li>Zmiennych środowiskowych</li>
                    <li>Pliku .env.production w katalogu głównym</li>
                </ol>
                
                <p><strong>Status:</strong> 
                    <?php if ($this->site_key && $this->secret_key): ?>
                        <span style="color: green;">Plugin aktywny i gotowy do pracy</span>
                    <?php else: ?>
                        <span style="color: red;">Wymagane skonfigurowanie kluczy</span>
                    <?php endif; ?>
                </p>
            </div>
            
            <div class="card" style="max-width: 600px; margin-top: 20px;">
                <h2>Test połączenia</h2>
                <p>Odwiedź <a href="<?= site_url('/rejestracja') ?>" target="_blank">stronę rejestracji</a> aby przetestować działanie reCAPTCHA.</p>
                
                <h3>Logi debugowania</h3>
                <p>Logi reCAPTCHA są zapisywane w logach WordPress. Sprawdź:</p>
                <ul>
                    <li><code>/wp-content/debug.log</code> (jeśli WP_DEBUG_LOG jest włączone)</li>
                    <li>Logi serwera</li>
                </ul>
            </div>
        </div>
        <?php
    }
    
    /**
     * Add debug info to footer (only for admins)
     */
    public function add_debug_info() {
        if (current_user_can('administrator') && (is_page_template('page-rejestracja.php') || 
            (is_page() && get_page_template_slug() === 'page-rejestracja.php'))) {
            echo '<!-- reCAPTCHA v3 Debug: Keys configured: ' . ($this->site_key ? 'YES' : 'NO') . ' -->';
        }
    }
}

// Initialize the plugin
new ModeoRecaptchaV3();