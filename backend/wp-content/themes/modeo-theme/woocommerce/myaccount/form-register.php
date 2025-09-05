<?php
/**
 * Registration Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-register.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

get_header();

do_action( 'woocommerce_before_customer_login_form' ); ?>

<div class="modeo-split-login">
    <!-- Left side - Red welcome section -->
    <div class="login-left-side">
        <div class="welcome-content">
            <div class="modeo-logo-white">modeo.</div>
            <h1 class="welcome-title">Witaj w modeo!</h1>
            <p class="welcome-subtitle">
                Utwórz konto i dołącz do społeczności<br>
                miłośników wyjątkowych produktów.
            </p>
        </div>
    </div>
    
    <!-- Right side - Registration form -->
    <div class="login-right-side">
        <div class="login-form-container">
            <div class="login-form-header">
                <h2 class="form-title">Utwórz konto</h2>
                <p class="form-subtitle">Wypełnij formularz, aby założyć swoje konto.</p>
            </div>

            <form method="post" class="woocommerce-form woocommerce-form-register register">

                <?php do_action( 'woocommerce_register_form_start' ); ?>

                <?php if ( 'no' === get_option( 'woocommerce_registration_generate_username' ) ) : ?>

                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label for="reg_username">Nazwa użytkownika</label>
                        <input type="text" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="reg_username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" placeholder="nazwa_uzytkownika" /><?php // @codingStandardsIgnoreLine ?>
                    </p>

                <?php endif; ?>

                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label for="reg_email">Adres email</label>
                    <input type="email" class="woocommerce-Input woocommerce-Input--text input-text" name="email" id="reg_email" autocomplete="email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>" placeholder="jan@example.com" /><?php // @codingStandardsIgnoreLine ?>
                </p>

                <?php if ( 'no' === get_option( 'woocommerce_registration_generate_password' ) ) : ?>

                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label for="reg_password">Hasło</label>
                        <div class="password-input-wrapper">
                            <input type="password" class="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_password" autocomplete="new-password" placeholder="••••••••" />
                            <button type="button" class="password-toggle" onclick="togglePasswordReg()">
                                <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                        </div>
                    </p>

                <?php endif; ?>

                <?php do_action( 'woocommerce_register_form' ); ?>

                <div class="form-row-terms">
                    <label class="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-register__terms">
                        <input class="woocommerce-form__input woocommerce-form__input-checkbox" name="terms" type="checkbox" id="terms" value="1" required /> 
                        <span>Akceptuję <a href="/regulamin" target="_blank" class="terms-link">regulamin</a> i <a href="/polityka-prywatnosci" target="_blank" class="terms-link">politykę prywatności</a></span>
                    </label>
                </div>

                <p class="form-row">
                    <?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>
                    <button type="submit" class="woocommerce-button button woocommerce-form-register__submit" name="register" value="<?php esc_attr_e( 'Register', 'woocommerce' ); ?>">Utwórz konto</button>
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

body.woocommerce-account:not(.logged-in) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
}

/* Force full width container reset */
body.woocommerce-account:not(.logged-in) .woocommerce-page-content,
body.woocommerce-account:not(.logged-in) main,
body.woocommerce-account:not(.logged-in) .entry-content,
body.woocommerce-account:not(.logged-in) section,
body.woocommerce-account:not(.logged-in) .woocommerce-account,
body.woocommerce-account:not(.logged-in) .woocommerce {
    max-width: none !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
}

/* Remove any spacing from header to login form */
body.woocommerce-account:not(.logged-in) header {
    margin-bottom: 0 !important;
}

body.woocommerce-account:not(.logged-in) header + main {
    margin-top: 0 !important;
    padding-top: 0 !important;
}

/* Reset form elements but preserve layout structure */
.modeo-split-login * {
    box-sizing: border-box !important;
}

/* Only reset input elements, not layout divs */
.modeo-split-login input,
.modeo-split-login button,
.modeo-split-login label:not(.woocommerce-form__label-for-checkbox),
.modeo-split-login span:not(.register-link):not(.welcome-emoji) {
    margin: 0 !important;
}

/* Preserve layout structure for main containers */
.modeo-split-login .login-left-side,
.modeo-split-login .login-right-side,
.modeo-split-login .welcome-content,
.modeo-split-login .login-form-container {
    padding: revert !important;
}

/* Ensure consistent styling for all inputs */
.modeo-split-login .woocommerce-Input {
    width: 100% !important;
    padding: 12px 16px !important;
    margin: 0 !important;
    box-sizing: border-box !important;
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

/* Left side - Red welcome section */
.login-left-side {
    width: 50% !important;
    background: #cc1616 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 60px !important;
    position: relative;
    flex-shrink: 0 !important;
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

/* Right side - Login form */
.login-right-side {
    width: 50% !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 60px !important;
    flex-shrink: 0 !important;
}

.woocommerce form.checkout_coupon, .woocommerce form.login, .woocommerce form.register {
    border: 0px;
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

.woocommerce:where(body:not(.woocommerce-block-theme-has-button-styles)) #respond input#submit, .woocommerce:where(body:not(.woocommerce-block-theme-has-button-styles)) a.button, .woocommerce:where(body:not(.woocommerce-block-theme-has-button-styles)) button.button, .woocommerce:where(body:not(.woocommerce-block-theme-has-button-styles)) input.button, :where(body:not(.woocommerce-block-theme-has-button-styles)):where(:not(.edit-post-visual-editor)) .woocommerce #respond input#submit, :where(body:not(.woocommerce-block-theme-has-button-styles)):where(:not(.edit-post-visual-editor)) .woocommerce a.button, :where(body:not(.woocommerce-block-theme-has-button-styles)):where(:not(.edit-post-visual-editor)) .woocommerce button.button, :where(body:not(.woocommerce-block-theme-has-button-styles)):where(:not(.edit-post-visual-editor)) .woocommerce input.button {
    background-color: #cc1516;
    color: #fff;
    border-radius: 8px;
}

/* Form styling - Exact Next.js match */
.woocommerce-form-row {
    margin-bottom: 20px;
}

.woocommerce-form-row label {
    /* Exact Next.js label: block text-sm font-medium text-gray-700 */
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
    /* placeholder-gray-500 text-lg */
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
    top: 50%;
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
    line-height: 1.5;
}

.woocommerce-form__input-checkbox {
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    padding: 0 !important;
    accent-color: #cc1616;
    cursor: pointer;
    flex-shrink: 0 !important;
    box-sizing: border-box !important;
    border: 1px solid #d1d5db !important;
    border-radius: 2px !important;
    background: white !important;
    appearance: checkbox !important;
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
}

.terms-link {
    color: #cc1616;
    text-decoration: none;
    font-weight: 500;
}

.terms-link:hover {
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

/* Register link */
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
body.woocommerce-account:not(.logged-in) #wpadminbar {
    display: none !important;
}

/* MOBILE FIRST RESPONSIVENESS - Force override all desktop styles */

/* Base mobile styles - applied to all screen sizes first */
@media screen {
    body.woocommerce-account:not(.logged-in) {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
    }
    
    body.woocommerce-account:not(.logged-in) * {
        box-sizing: border-box !important;
    }
    
    /* Force full width breakout on mobile */
    body.woocommerce-account:not(.logged-in) .woocommerce-page-content,
    body.woocommerce-account:not(.logged-in) main,
    body.woocommerce-account:not(.logged-in) .entry-content,
    body.woocommerce-account:not(.logged-in) section,
    body.woocommerce-account:not(.logged-in) .woocommerce-account,
    body.woocommerce-account:not(.logged-in) .woocommerce {
        max-width: none !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
    }
    
    .modeo-split-login {
        flex-direction: column !important;
        width: 100vw !important;
        margin: 0 !important;
        left: 0 !important;
        right: 0 !important;
        transform: none !important;
        position: relative !important;
        overflow: hidden !important;
    }
    
    .login-left-side {
        width: 100vw !important;
        min-height: 280px !important;
        padding: 30px 0 !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        order: 1 !important;
        background: #cc1616 !important;
        flex-shrink: 0 !important;
    }
    
    .login-right-side {
        width: 100vw !important;
        padding: 30px 0 !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        order: 2 !important;
        min-height: auto !important;
        background: #ffffff !important;
        flex-shrink: 0 !important;
    }
    
    .welcome-content {
        text-align: center;
        max-width: 100%;
        padding: 0 20px !important;
        width: 100% !important;
    }
    
    .login-form-container {
        width: 100%;
        max-width: 400px;
        padding: 0 20px !important;
    }
    
    .modeo-logo-white {
        font-size: 24px;
        margin-bottom: 30px;
    }
    
    .welcome-title {
        font-size: 24px;
        margin-bottom: 12px;
    }
    
    .welcome-subtitle {
        font-size: 14px;
        line-height: 1.4;
    }
    
    .login-form-header {
        text-align: center;
        margin-bottom: 24px;
    }
    
    .form-title {
        font-size: 22px;
    }
    
    .form-subtitle {
        font-size: 14px;
    }
    
    .form-row-terms {
        margin-bottom: 20px !important;
    }
    
    .woocommerce-Input {
        height: 44px !important;
        font-size: 16px !important;
    }
    
    .woocommerce-button.button {
        height: 48px !important;
        font-size: 16px !important;
    }
    
    .footer-links {
        gap: 12px !important;
        flex-wrap: wrap;
    }
}

/* Tablet landscape - restore side by side ONLY for larger screens */
@media screen and (min-width: 769px) {
    .modeo-split-login {
        flex-direction: row !important;
        width: 100vw !important;
        margin-left: calc(-50vw + 50%) !important;
        left: 50% !important;
        right: 50% !important;
        transform: translateX(-50%) !important;
        position: relative !important;
        min-height: calc(100vh - 140px) !important;
    }
    
    .login-left-side {
        width: 45% !important;
        min-height: calc(100vh - 140px) !important;
        padding: 40px !important;
        order: 1 !important;
    }
    
    .login-right-side {
        width: 55% !important;
        padding: 40px !important;
        order: 2 !important;
        min-height: calc(100vh - 140px) !important;
    }
    
    .modeo-logo-white {
        font-size: 32px;
        margin-bottom: 60px;
    }
    
    .welcome-title {
        font-size: 32px;
        margin-bottom: 16px;
    }
    
    .welcome-subtitle {
        font-size: 16px;
    }
    
    .form-title {
        font-size: 28px;
    }
    
    .form-subtitle {
        font-size: 15px;
    }
    
    .login-form-header {
        text-align: left;
        margin-bottom: 40px;
    }
    
    .form-row-terms {
        margin-bottom: 24px !important;
    }
    
    .footer-links {
        gap: 16px !important;
    }
}

/* Desktop - 50/50 split */
@media screen and (min-width: 1025px) {
    .login-left-side {
        width: 50% !important;
        padding: 60px !important;
    }
    
    .login-right-side {
        width: 50% !important;
        padding: 60px !important;
    }
    
    .modeo-logo-white {
        font-size: 36px;
        margin-bottom: 80px;
    }
    
    .welcome-title {
        font-size: 36px;
    }
}

/* Override any theme/plugin styles that might interfere */
body.woocommerce-account:not(.logged-in) .woocommerce {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
}

body.woocommerce-account:not(.logged-in) .woocommerce-notices-wrapper {
    position: relative;
    max-width: 380px;
    margin: 0 auto 20px;
}
</style>

<script>
function togglePasswordReg() {
    const passwordInput = document.getElementById('reg_password');
    const eyeIcon = document.querySelector('.eye-icon');
    
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

<?php 
do_action( 'woocommerce_after_customer_login_form' ); 

get_footer();
?>