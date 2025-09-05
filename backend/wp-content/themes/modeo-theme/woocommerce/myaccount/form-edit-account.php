<?php
/**
 * Edit account form - Ustawienia konta
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-edit-account.php.
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_edit_account_form' );
?>

<div class="modeo-edit-account-wrapper">
    <div class="edit-account-header">
        <div class="header-content">
            <div class="account-indicator">
                <div class="account-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <div class="account-info">
                    <h2 class="edit-account-title">Ustawienia konta</h2>
                    <p class="edit-account-subtitle">
                        Zarządzaj swoimi danymi osobowymi i ustawieniami bezpieczeństwa
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="account-sections">
        <!-- Personal Information Section -->
        <div class="account-section personal-info-section">
            <div class="section-header">
                <div class="section-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="section-info">
                    <h3 class="section-title">Dane osobowe</h3>
                    <p class="section-description">Podstawowe informacje o Twoim koncie</p>
                </div>
            </div>

            <form class="modeo-account-form personal-info-form" action="" method="post" <?php do_action( 'woocommerce_edit_account_form_tag' ); ?> >
                
                <?php do_action( 'woocommerce_edit_account_form_start' ); ?>

                <div class="form-fields-grid">
                    <div class="form-field">
                        <label for="account_first_name">
                            Imię <span class="required" aria-hidden="true">*</span>
                        </label>
                        <input 
                            type="text" 
                            class="woocommerce-Input woocommerce-Input--text input-text" 
                            name="account_first_name" 
                            id="account_first_name" 
                            autocomplete="given-name" 
                            value="<?php echo esc_attr( $user->first_name ); ?>" 
                            aria-required="true"
                            placeholder="Wpisz swoje imię" 
                        />
                    </div>

                    <div class="form-field">
                        <label for="account_last_name">
                            Nazwisko <span class="required" aria-hidden="true">*</span>
                        </label>
                        <input 
                            type="text" 
                            class="woocommerce-Input woocommerce-Input--text input-text" 
                            name="account_last_name" 
                            id="account_last_name" 
                            autocomplete="family-name" 
                            value="<?php echo esc_attr( $user->last_name ); ?>" 
                            aria-required="true"
                            placeholder="Wpisz swoje nazwisko" 
                        />
                    </div>

                    <div class="form-field field-full-width">
                        <label for="account_display_name">
                            Nazwa wyświetlana <span class="required" aria-hidden="true">*</span>
                        </label>
                        <input 
                            type="text" 
                            class="woocommerce-Input woocommerce-Input--text input-text" 
                            name="account_display_name" 
                            id="account_display_name" 
                            aria-describedby="account_display_name_description" 
                            value="<?php echo esc_attr( $user->display_name ); ?>" 
                            aria-required="true"
                            placeholder="Jak ma być wyświetlane Twoje imię" 
                        />
                        <p class="field-description" id="account_display_name_description">
                            Ta nazwa będzie wyświetlana w sekcji konta i przy recenzjach
                        </p>
                    </div>

                    <div class="form-field field-full-width">
                        <label for="account_email">
                            Adres e-mail <span class="required" aria-hidden="true">*</span>
                        </label>
                        <input 
                            type="email" 
                            class="woocommerce-Input woocommerce-Input--email input-text" 
                            name="account_email" 
                            id="account_email" 
                            autocomplete="email" 
                            value="<?php echo esc_attr( $user->user_email ); ?>" 
                            aria-required="true"
                            placeholder="twoj@email.pl" 
                        />
                    </div>
                </div>

                <div class="section-actions">
                    <button type="submit" class="save-personal-info-btn" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Zapisz zmiany
                    </button>
                </div>

                <?php do_action( 'woocommerce_edit_account_form' ); ?>
                <?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
                <input type="hidden" name="action" value="save_account_details" />

            </form>
        </div>

        <!-- Password Section -->
        <div class="account-section password-section">
            <div class="section-header">
                <div class="section-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
                <div class="section-info">
                    <h3 class="section-title">Zmiana hasła</h3>
                    <p class="section-description">Aktualizuj swoje hasło dla lepszego bezpieczeństwa</p>
                </div>
            </div>

            <form class="modeo-account-form password-form" action="" method="post" <?php do_action( 'woocommerce_edit_account_form_tag' ); ?> >
                
                <div class="form-fields-grid">
                    <div class="form-field field-full-width">
                        <label for="password_current">
                            Obecne hasło (pozostaw puste, aby nie zmieniać)
                        </label>
                        <div class="password-input-wrapper">
                            <input 
                                type="password" 
                                class="woocommerce-Input woocommerce-Input--password input-text" 
                                name="password_current" 
                                id="password_current" 
                                autocomplete="current-password"
                                placeholder="Wpisz obecne hasło" 
                            />
                            <button type="button" class="toggle-password" data-target="password_current">
                                <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <svg class="eye-off-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-field">
                        <label for="password_1">
                            Nowe hasło (pozostaw puste, aby nie zmieniać)
                        </label>
                        <div class="password-input-wrapper">
                            <input 
                                type="password" 
                                class="woocommerce-Input woocommerce-Input--password input-text" 
                                name="password_1" 
                                id="password_1" 
                                autocomplete="new-password"
                                placeholder="Wpisz nowe hasło" 
                            />
                            <button type="button" class="toggle-password" data-target="password_1">
                                <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <svg class="eye-off-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-field">
                        <label for="password_2">
                            Potwierdź nowe hasło
                        </label>
                        <div class="password-input-wrapper">
                            <input 
                                type="password" 
                                class="woocommerce-Input woocommerce-Input--password input-text" 
                                name="password_2" 
                                id="password_2" 
                                autocomplete="new-password"
                                placeholder="Powtórz nowe hasło" 
                            />
                            <button type="button" class="toggle-password" data-target="password_2">
                                <svg class="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <svg class="eye-off-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="password-strength-info">
                    <div class="strength-tips">
                        <h4>Silne hasło powinno zawierać:</h4>
                        <ul>
                            <li>Co najmniej 8 znaków</li>
                            <li>Duże i małe litery</li>
                            <li>Cyfry</li>
                            <li>Znaki specjalne (!@#$%^&*)</li>
                        </ul>
                    </div>
                </div>

                <div class="section-actions">
                    <button type="submit" class="save-password-btn" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        Zmień hasło
                    </button>
                </div>

                <?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
                <input type="hidden" name="action" value="save_account_details" />

                <?php do_action( 'woocommerce_edit_account_form_end' ); ?>

            </form>
        </div>

    </div>
</div>

<style>
.modeo-edit-account-wrapper {
    width: 100%;
    max-width: none !important;
    margin: 0 !important;
}

/* Full width container for account settings */
.woocommerce-account-edit-account .account-content {
    padding: 20px !important;
    max-width: none !important;
}

.woocommerce-account-edit-account .woocommerce-MyAccount-content {
    padding: 0 !important;
    max-width: none !important;
}

.edit-account-header {
    margin-bottom: 40px;
    padding: 32px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 20px;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(204, 22, 22, 0.2);
}

.edit-account-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse-settings 4s ease-in-out infinite;
}

@keyframes pulse-settings {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}

.account-indicator {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
}

.account-icon {
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.95);
    color: #cc1616;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.account-icon svg {
    width: 32px;
    height: 32px;
}

.edit-account-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
}

.edit-account-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
    position: relative;
    z-index: 1;
}

.account-sections {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.account-section {
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
    box-shadow: none;
    backdrop-filter: none;
    transition: none;
}


.section-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 28px 0;
    background: transparent;
    border-bottom: none;
    position: relative;
}


.section-icon {
    display: none;
}


.section-icon svg {
    width: 28px;
    height: 28px;
}

.section-title {
    color: #1f2937;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}


.section-description {
    color: #6b7280;
    font-size: 15px;
    margin: 0;
    line-height: 1.5;
    font-weight: 500;
}

.modeo-account-form {
    padding: 40px 32px;
    background: #f9fafb;
    border-radius: 16px;
    margin: 0 0 24px 0;
    border: 1px solid #e5e7eb;
}

.form-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
}

.form-field.field-full-width {
    grid-column: 1 / -1;
}

.form-field label {
    display: block;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
}

.form-field .required {
    color: #dc2626;
    margin-left: 4px;
}

.form-field input {
    width: 100%;
    padding: 18px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 16px;
    background: #ffffff;
    color: #1f2937;
    transition: all 0.3s ease;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-height: 56px;
    box-sizing: border-box;
}

.form-field input:focus {
    outline: none;
    border-color: #6b7280;
    box-shadow: 0 0 0 4px rgba(107, 114, 128, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

.form-field input:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.field-description {
    color: #6b7280;
    font-size: 12px;
    margin: 6px 0 0 0;
    font-style: italic;
}

.password-input-wrapper {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s ease;
}

.toggle-password:hover {
    color: #6b7280;
}

.toggle-password svg {
    width: 16px;
    height: 16px;
}

.password-strength-info {
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border: 2px solid rgba(204, 22, 22, 0.2);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
}


.strength-tips h4 {
    color: #cc1616;
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}


.strength-tips ul {
    color: #b91c1c;
    font-size: 14px;
    margin: 0;
    padding-left: 20px;
    font-weight: 500;
}

.strength-tips li {
    margin-bottom: 4px;
}

.section-actions {
    padding-top: 20px;
    border-top: 1px solid #f3f4f6;
    text-align: right;
}

.save-personal-info-btn,
.save-password-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
}



.save-personal-info-btn:hover,
.save-password-btn:hover {
    background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.4);
}

.save-password-btn {
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
}

.save-password-btn:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #cc1616 100%);
    box-shadow: 0 8px 24px rgba(204, 22, 22, 0.4);
}

.save-personal-info-btn svg,
.save-password-btn svg {
    width: 16px;
    height: 16px;
}


/* Mobile responsiveness */
@media (max-width: 768px) {
    .edit-account-header {
        padding: 20px 16px;
        margin-bottom: 24px;
        text-align: left;
    }
    
    .account-indicator {
        flex-direction: column;
        text-align: left;
        gap: 12px;
        align-items: flex-start;
    }
    
    .account-icon {
        width: 48px;
        height: 48px;
        align-self: flex-start;
    }
    
    .edit-account-title {
        font-size: 24px;
        text-align: left;
    }
    
    .edit-account-subtitle {
        text-align: left;
    }
    
    .account-sections {
        gap: 20px;
    }
    
    .form-fields-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .section-header {
        flex-direction: row;
        text-align: left;
        gap: 12px;
        padding: 20px 16px;
        align-items: flex-start;
    }
    
    .section-info {
        text-align: left;
    }
    
    .section-icon {
        display: none;
    }
    
    .modeo-account-form {
        padding: 24px 20px;
        margin: 0 0 20px 0;
    }
    
    .form-field input {
        padding: 16px 16px;
        font-size: 16px;
        min-height: 52px;
    }
    
    .section-actions {
        text-align: left;
    }
    
    .save-personal-info-btn,
    .save-password-btn {
        padding: 12px 24px;
        font-size: 13px;
        width: 100%;
        justify-content: center;
    }
    
    .password-strength-info {
        padding: 16px 12px;
    }
}

@media (max-width: 480px) {
    .edit-account-header {
        padding: 16px 12px;
        margin-bottom: 20px;
    }
    
    .edit-account-title {
        font-size: 22px;
    }
    
    .edit-account-subtitle {
        font-size: 14px;
    }
    
    .account-sections {
        gap: 16px;
    }
    
    .section-header {
        padding: 16px 12px;
    }
    
    .section-icon {
        width: 36px;
        height: 36px;
    }
    
    .section-icon svg {
        width: 20px;
        height: 20px;
    }
    
    .modeo-account-form {
        padding: 20px 16px;
        margin: 0 0 16px 0;
    }
    
    .form-field input {
        padding: 14px 14px;
        font-size: 16px;
        min-height: 48px;
    }
    
    .password-strength-info {
        padding: 12px 10px;
        margin-bottom: 24px;
    }
    
    .save-personal-info-btn,
    .save-password-btn {
        padding: 10px 20px;
        font-size: 12px;
    }
    
    .section-title {
        font-size: 18px;
    }
    
    .section-description {
        font-size: 13px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');
            const eyeOffIcon = this.querySelector('.eye-off-icon');
            
            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.style.display = 'none';
                eyeOffIcon.style.display = 'block';
            } else {
                input.type = 'password';
                eyeIcon.style.display = 'block';
                eyeOffIcon.style.display = 'none';
            }
        });
    });
});
</script>

<?php do_action( 'woocommerce_after_edit_account_form' ); ?>