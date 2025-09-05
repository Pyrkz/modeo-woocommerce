<?php
/**
 * Template Name: Rejestracja
 * Custom registration page template
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Redirect if user is already logged in
if ( is_user_logged_in() ) {
    wp_redirect( wc_get_page_permalink( 'myaccount' ) );
    exit;
}

// Add custom body class for registration page
add_filter( 'body_class', function( $classes ) {
    $classes[] = 'woocommerce-account';
    $classes[] = 'registration-page';
    return $classes;
});

get_header();

// Process WooCommerce registration form
if ( 'POST' === $_SERVER['REQUEST_METHOD'] && ! empty( $_POST['register'] ) ) {
    // Verify nonce for security
    if ( ! wp_verify_nonce( $_POST['woocommerce-register-nonce'], 'woocommerce-register' ) ) {
        wc_add_notice( 'Błąd bezpieczeństwa. Spróbuj ponownie.', 'error' );
    } else {
        $username = sanitize_user( $_POST['username'] );
        $email = sanitize_email( $_POST['email'] );
        $password = $_POST['password'];
        
        try {
            // Use WooCommerce validation
            $validation_error = new WP_Error();
            
            // Validate username
            if ( empty( $username ) ) {
                $validation_error->add( 'registration-error-invalid-username', 'Nazwa użytkownika jest wymagana.' );
            } elseif ( ! validate_username( $username ) ) {
                $validation_error->add( 'registration-error-invalid-username', 'Nazwa użytkownika zawiera niedozwolone znaki.' );
            } elseif ( username_exists( $username ) ) {
                $validation_error->add( 'registration-error-username-exists', 'Ta nazwa użytkownika już istnieje.' );
            }
            
            // Validate email
            if ( empty( $email ) ) {
                $validation_error->add( 'registration-error-missing-email', 'Adres email jest wymagany.' );
            } elseif ( ! is_email( $email ) ) {
                $validation_error->add( 'registration-error-invalid-email', 'Wprowadź prawidłowy adres email.' );
            } elseif ( email_exists( $email ) ) {
                $validation_error->add( 'registration-error-email-exists', 'Konto z tym adresem email już istnieje.' );
            }
            
            // Validate password
            if ( empty( $password ) ) {
                $validation_error->add( 'registration-error-missing-password', 'Hasło jest wymagane.' );
            } elseif ( strlen( $password ) < 6 ) {
                $validation_error->add( 'registration-error-password-too-short', 'Hasło musi mieć co najmniej 6 znaków.' );
            }
            
            // Check if passwords match
            if ( $password !== $_POST['password_confirm'] ) {
                $validation_error->add( 'registration-error-password-mismatch', 'Hasła nie są identyczne.' );
            }
            
            // Check terms acceptance
            if ( empty( $_POST['terms'] ) ) {
                $validation_error->add( 'registration-error-terms', 'Musisz zaakceptować Regulamin i Politykę prywatności.' );
            }
            
            // Allow other plugins to validate
            do_action( 'woocommerce_register_post', $username, $email, $validation_error );
            
            if ( $validation_error->get_error_code() ) {
                foreach ( $validation_error->get_error_messages() as $message ) {
                    wc_add_notice( $message, 'error' );
                }
            } else {
                // Create WooCommerce customer
                $new_customer = wc_create_new_customer( $email, $username, $password );
                
                if ( is_wp_error( $new_customer ) ) {
                    wc_add_notice( $new_customer->get_error_message(), 'error' );
                } else {
                    // Trigger WooCommerce hooks
                    do_action( 'woocommerce_created_customer', $new_customer );
                    
                    // Auto-login if enabled
                    if ( apply_filters( 'woocommerce_registration_auth_new_customer', true, $new_customer ) ) {
                        wc_set_customer_auth_cookie( $new_customer );
                    }
                    
                    // Add success notice
                    wc_add_notice( 'Twoje konto zostało utworzone pomyślnie!', 'success' );
                    
                    // Redirect to account page
                    wp_safe_redirect( apply_filters( 'woocommerce_registration_redirect', wc_get_page_permalink( 'myaccount' ) ) );
                    exit;
                }
            }
            
        } catch ( Exception $e ) {
            wc_add_notice( 'Wystąpił błąd podczas rejestracji: ' . $e->getMessage(), 'error' );
        }
    }
}
?>

<div class="modeo-split-login">
    <!-- Left side - Red welcome section -->
    <div class="login-left-side">
        <div class="welcome-content">
            <div class="modeo-logo-white">modeo.</div>
            <h1 class="welcome-title">Dołącz do nas!</h1>
            <p class="welcome-subtitle">
                Stwórz swoje konto i odkryj<br>
                spersonalizowane produkty.
            </p>
        </div>
    </div>
    
    <!-- Right side - Registration form -->
    <div class="login-right-side">
        <div class="login-form-container">
            <div class="login-form-header">
                <h2 class="form-title">Zarejestruj się</h2>
                <p class="form-subtitle">Stwórz swoje konto w kilku prostych krokach.</p>
            </div>

            <?php wc_print_notices(); ?>

            <form class="woocommerce-form woocommerce-form-register register" method="post">

                <?php do_action( 'woocommerce_register_form_start' ); ?>

                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label for="username">Nazwa użytkownika *</label>
                    <input type="text" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" placeholder="jan_kowalski" required />
                </p>

                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label for="email">Adres email *</label>
                    <input type="email" class="woocommerce-Input woocommerce-Input--text input-text" name="email" id="email" autocomplete="email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>" placeholder="jan@example.com" required />
                </p>
                
                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label for="password">Hasło *</label>
                    <div class="password-input-wrapper">
                        <input class="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password" id="password" autocomplete="new-password" placeholder="••••••••" required />
                        <button type="button" class="password-toggle" onclick="togglePassword('password')">
                            <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                </p>

                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label for="password_confirm">Potwierdź hasło *</label>
                    <div class="password-input-wrapper">
                        <input class="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password_confirm" id="password_confirm" autocomplete="new-password" placeholder="••••••••" required />
                        <button type="button" class="password-toggle" onclick="togglePassword('password_confirm')">
                            <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                </p>

                <div class="form-row-terms">
                    <label class="woocommerce-form__label woocommerce-form__label-for-checkbox">
                        <input class="woocommerce-form__input woocommerce-form__input-checkbox" name="terms" type="checkbox" id="terms" value="1" required /> 
                        <span>Akceptuję <a href="/regulamin" target="_blank">Regulamin</a> i <a href="/polityka-prywatnosci" target="_blank">Politykę prywatności</a></span>
                    </label>
                </div>
                
                <?php 
                // Disable WooCommerce privacy policy text for this form
                remove_action( 'woocommerce_register_form', 'wc_registration_privacy_policy_text', 20 );
                do_action( 'woocommerce_register_form' ); 
                ?>
                
                <p class="form-row">
                    <?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>
                    <button type="submit" class="woocommerce-button button woocommerce-form-register__submit" name="register" value="Zarejestruj się">Utwórz konto</button>
                </p>

                <?php do_action( 'woocommerce_register_form_end' ); ?>

            </form>

            <div class="register-link">
                <span>Masz już konto? </span>
                <a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="register-link-text">Zaloguj się</a>
            </div>

            <div class="footer-links">
                <a href="/regulamin" class="footer-link">Regulamin</a>
                <a href="/polityka-prywatnosci" class="footer-link">Polityka prywatności</a>
            </div>
        </div>
    </div>
</div>

<style>
/* Reset and base styles */
* {
    box-sizing: border-box;
}

body.registration-page {
    margin: 0 !important;
    padding: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
}

/* Force full width container reset for registration page */
body.registration-page .woocommerce-page-content,
body.registration-page main,
body.registration-page .entry-content,
body.registration-page section,
body.registration-page .woocommerce-account,
body.registration-page .woocommerce {
    max-width: none !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
}

/* Remove any spacing from header to registration form */
body.registration-page header {
    margin-bottom: 0 !important;
}

body.registration-page header + main {
    margin-top: 0 !important;
    padding-top: 0 !important;
}

.modeo-split-login {
    display: flex;
    min-height: calc(100vh - 140px); /* Adjust for header/footer */
    width: 100vw;
    margin: 0;
    margin-left: calc(-50vw + 50%); /* Full width breakout */
    position: relative;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
}

/* Left side - Red welcome section - Override login page styles */
body.woocommerce-account.registration-page .login-left-side {
    width: 50% !important;
    background: #cc1616 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    flex-shrink: 0 !important;
    padding: 60px !important;
}

.welcome-content {
    text-align: center;
    color: white;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
}

.modeo-logo-white {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 80px;
    letter-spacing: -0.5px;
}

.welcome-title {
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 16px 0;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.welcome-subtitle {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    line-height: 1.6;
    opacity: 0.9;
}

/* Right side - Registration form - Override login page styles */
body.woocommerce-account.registration-page .login-right-side {
    width: 50% !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    overflow-y: auto;
    padding: 60px !important;
}

.login-form-container {
    width: 100%;
    max-width: 450px;
}

.login-form-header {
    margin-bottom: 40px;
}

.form-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
}

.form-subtitle {
    font-size: 15px;
    color: #6b7280;
    margin: 0;
    font-weight: 400;
    line-height: 1.5;
}

/* Form styling */
.woocommerce-form.woocommerce-form-register {
    padding: 20px;
}

.woocommerce-form-row {
    margin-bottom: 20px;
}

.woocommerce-form-row label {
    display: block;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
}

.woocommerce-Input {
    width: 100%;
    padding: 12px 16px;
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-family: inherit;
    transition: all 300ms ease;
    color: #111827;
}

.woocommerce-Input:focus {
    outline: none;
    border-color: #4b5563;
    box-shadow: none;
}

.woocommerce-Input:hover {
    border-color: #d1d5db;
}

.woocommerce-Input::placeholder {
    color: #6b7280;
    font-size: 1.125rem;
    line-height: 1.75rem;
}

/* Password input with toggle */
.password-input-wrapper {
    position: relative;
}

.password-input-wrapper .woocommerce-Input {
    padding-right: 48px;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 40%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 6px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.password-toggle:hover {
    color: #6b7280;
    background: #f9fafb;
}

.eye-icon {
    width: 18px;
    height: 18px;
}

/* reCAPTCHA info styling */
.recaptcha-info {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 12px;
    font-size: 12px;
    color: #6c757d;
    text-align: center;
    margin-bottom: 16px;
    line-height: 1.4;
}

.recaptcha-info a {
    color: #4285f4;
    text-decoration: none;
    font-weight: 500;
}

.recaptcha-info a:hover {
    text-decoration: underline;
}

/* Terms checkbox row */
.form-row-terms {
    margin-bottom: 24px;
    font-size: 14px;
}

.woocommerce-form__label-for-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    cursor: pointer;
    color: #4b5563;
    font-weight: 400;
    margin: 0;
    line-height: 1.4;
}

.woocommerce-form__input-checkbox {
    width: 16px;
    height: 16px;
    margin: 2px 0 0 0;
    accent-color: #cc1616;
    cursor: pointer;
    flex-shrink: 0;
}

.form-row-terms a {
    color: #cc1616;
    text-decoration: none;
    font-weight: 500;
}

.form-row-terms a:hover {
    text-decoration: underline;
}

/* Submit button */
.form-row {
    margin-bottom: 0;
}

.woocommerce-button.button {
    width: 100%;
    height: 48px;
    background: #cc1616;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    letter-spacing: 0.025em;
}

.woocommerce-button.button:hover {
    background: #b31313;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(204, 22, 22, 0.2);
}

.woocommerce-button.button:active {
    transform: translateY(0);
}

/* Login link */
.register-link {
    text-align: center;
    margin: 32px 0 40px;
    font-size: 14px;
    color: #6b7280;
}

.register-link-text {
    color: #cc1616;
    text-decoration: none;
    font-weight: 600;
}

.register-link-text:hover {
    text-decoration: underline;
}

/* Footer links */
.footer-links {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 24px;
}

.footer-link {
    font-size: 13px;
    color: #9ca3af;
    text-decoration: none;
    font-weight: 400;
}

.footer-link:hover {
    color: #6b7280;
    text-decoration: underline;
}

/* Messages styling */
.woocommerce-message,
.woocommerce-error,
.woocommerce-info {
    margin: 0 0 24px;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 500;
}

.woocommerce-message {
    background: #dcfce7;
    color: #166534;
    border-left: 4px solid #22c55e;
}

.woocommerce-error {
    background: #fef2f2;
    color: #991b1b;
    border-left: 4px solid #ef4444;
}

/* Hide WordPress admin bar but keep header and footer */
body.registration-page #wpadminbar {
    display: none !important;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
    body.woocommerce-account.registration-page .login-left-side {
        width: 40% !important;
        padding: 40px !important;
    }
    
    body.woocommerce-account.registration-page .login-right-side {
        width: 60% !important;
        padding: 40px !important;
    }
}

@media (max-width: 768px) {
    body.woocommerce-account.registration-page {
        background: #ffffff;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
    }
    
    body.woocommerce-account.registration-page * {
        box-sizing: border-box !important;
    }
    
    /* Force full width breakout on mobile */
    body.woocommerce-account.registration-page .woocommerce-page-content,
    body.woocommerce-account.registration-page main,
    body.woocommerce-account.registration-page .entry-content,
    body.woocommerce-account.registration-page section,
    body.woocommerce-account.registration-page .woocommerce-account,
    body.woocommerce-account.registration-page .woocommerce {
        max-width: none !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
    }
    
    body.woocommerce-account.registration-page .modeo-split-login {
        flex-direction: column !important;
        width: 100vw !important;
        margin: 0 !important;
        left: 0 !important;
        right: 0 !important;
        transform: none !important;
        position: relative !important;
        overflow: hidden !important;
    }
    
    body.woocommerce-account.registration-page .login-left-side {
        width: 100vw !important;
        min-height: 280px !important;
        padding: 40px 20px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: #cc1616 !important;
        flex-shrink: 0 !important;
    }
    
    .welcome-content {
        text-align: center;
        max-width: 100%;
        padding: 0 !important;
        width: 100% !important;
    }
    
    .modeo-logo-white {
        font-size: 28px;
        margin-bottom: 40px;
    }
    
    .welcome-title {
        font-size: 28px;
    }
    
    .welcome-subtitle {
        font-size: 15px;
    }
    
    body.woocommerce-account.registration-page .login-right-side {
        width: 100vw !important;
        padding: 40px 20px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: #ffffff !important;
        flex-shrink: 0 !important;
    }
    
    .login-form-container {
        width: 100% !important;
        max-width: none !important;
        padding: 0 !important;
    }
    
    /* Force all form elements to be 100% width on mobile */
    .login-form-container form,
    .login-form-container .woocommerce-form-row,
    .login-form-container .woocommerce-Input,
    .login-form-container .woocommerce-button,
    .login-form-container .password-input-wrapper {
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .login-form-header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .form-title {
        font-size: 24px;
    }
    
    .woocommerce-Input {
        height: 44px !important;
        font-size: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .woocommerce-button.button {
        height: 48px !important;
        font-size: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    /* Ensure woocommerce notices are full width */
    body.registration-page .woocommerce-notices-wrapper {
        max-width: 100% !important;
        margin: 0 0 20px 0 !important;
        padding: 0 !important;
    }
    
    .footer-links {
        gap: 16px;
        width: 100% !important;
        justify-content: center !important;
    }
}

@media (max-width: 480px) {
    body.woocommerce-account.registration-page .login-left-side {
        min-height: 240px !important;
        padding: 32px 20px !important;
        width: 100vw !important;
    }
    
    .modeo-logo-white {
        font-size: 24px;
        margin-bottom: 32px;
    }
    
    .welcome-title {
        font-size: 24px;
        margin-bottom: 12px;
    }
    
    .welcome-subtitle {
        font-size: 14px;
    }
    
    body.woocommerce-account.registration-page .login-right-side {
        padding: 32px 20px !important;
        width: 100vw !important;
    }
    
    .login-form-container {
        width: 100% !important;
        max-width: none !important;
        padding: 0 !important;
    }
    
    .form-title {
        font-size: 22px;
    }
    
    .form-subtitle {
        font-size: 14px;
    }
    
    .woocommerce-form-row {
        margin-bottom: 16px;
        width: 100% !important;
    }
    
    .woocommerce-Input {
        height: 42px !important;
        font-size: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .password-input-wrapper {
        width: 100% !important;
    }
    
    .form-row-terms {
        font-size: 13px;
        margin-bottom: 20px;
        width: 100% !important;
    }
    
    .woocommerce-button.button {
        height: 44px !important;
        font-size: 14px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .register-link {
        margin: 24px 0 32px;
        font-size: 13px;
        width: 100% !important;
        text-align: center !important;
    }
    
    .footer-links {
        flex-wrap: wrap;
        gap: 12px;
        width: 100% !important;
        justify-content: center !important;
    }
    
    .footer-link {
        font-size: 12px;
    }
}

/* Override any theme/plugin styles that might interfere */
body.registration-page .woocommerce {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
}

body.registration-page .woocommerce-notices-wrapper {
    position: relative;
    max-width: 380px;
    margin: 0 auto 20px;
}
</style>

<script>
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = passwordInput.parentNode.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.121-3.121M12 12v.01M12 12l3.121 3.121"></path>
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        `;
    }
}
</script>

<?php get_footer(); ?>