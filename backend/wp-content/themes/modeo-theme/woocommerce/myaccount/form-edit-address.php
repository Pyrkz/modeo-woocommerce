<?php
/**
 * Edit address form - Edycja adresu
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-edit-address.php.
 */

defined( 'ABSPATH' ) || exit;

$page_title = ( 'billing' === $load_address ) ? 'Adres rozliczeniowy' : 'Adres dostawy';

do_action( 'woocommerce_before_edit_account_address_form' ); ?>

<?php if ( ! $load_address ) : ?>
    <?php wc_get_template( 'myaccount/my-address.php' ); ?>
<?php else : ?>

<div class="modeo-edit-address-wrapper">
    <div class="edit-address-header">
        <div class="header-content">
            <div class="address-type-indicator">
                <div class="address-icon <?php echo esc_attr( $load_address ); ?>">
                    <?php if ( 'billing' === $load_address ) : ?>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    <?php else : ?>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    <?php endif; ?>
                </div>
                <div class="address-info">
                    <h2 class="edit-address-title">
                        <?php echo esc_html( apply_filters( 'woocommerce_my_account_edit_address_title', $page_title, $load_address ) ); ?>
                    </h2>
                    <p class="edit-address-subtitle">
                        <?php if ( 'billing' === $load_address ) : ?>
                            Adres używany do wystawienia faktury i płatności
                        <?php else : ?>
                            Adres, na który zostanie dostarczona paczka
                        <?php endif; ?>
                    </p>
                </div>
            </div>
        </div>
        
        <div class="header-actions">
            <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-address' ) ); ?>" class="back-to-addresses">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Powrót do adresów
            </a>
        </div>
    </div>

    <div class="edit-address-form-wrapper">
        <form method="post" class="modeo-address-form" novalidate>
            <?php do_action( "woocommerce_before_edit_address_form_{$load_address}" ); ?>

            <div class="address-fields-grid">
                <?php
                foreach ( $address as $key => $field ) {
                    // Group fields for better layout
                    $field_class = '';
                    
                    // Full width fields
                    if ( in_array( $key, array( $load_address . '_company', $load_address . '_address_1', $load_address . '_address_2' ) ) ) {
                        $field_class = 'field-full-width';
                    }
                    // Half width fields
                    elseif ( in_array( $key, array( $load_address . '_first_name', $load_address . '_last_name', $load_address . '_postcode', $load_address . '_city' ) ) ) {
                        $field_class = 'field-half-width';
                    }
                    // Country and state get special treatment
                    elseif ( in_array( $key, array( $load_address . '_country', $load_address . '_state' ) ) ) {
                        $field_class = 'field-half-width';
                    }
                    // Phone and email for billing
                    elseif ( in_array( $key, array( 'billing_phone', 'billing_email' ) ) ) {
                        $field_class = 'field-half-width';
                    }

                    // Add custom class to field
                    if ( $field_class ) {
                        $field['class'][] = $field_class;
                    }

                    // Translate labels to Polish
                    switch ( $key ) {
                        case $load_address . '_first_name':
                            $field['label'] = 'Imię';
                            $field['placeholder'] = 'Wpisz swoje imię';
                            break;
                        case $load_address . '_last_name':
                            $field['label'] = 'Nazwisko';
                            $field['placeholder'] = 'Wpisz swoje nazwisko';
                            break;
                        case $load_address . '_company':
                            $field['label'] = 'Nazwa firmy (opcjonalne)';
                            $field['placeholder'] = 'Wpisz nazwę firmy';
                            break;
                        case $load_address . '_address_1':
                            $field['label'] = 'Adres';
                            $field['placeholder'] = 'Ulica i numer domu';
                            break;
                        case $load_address . '_address_2':
                            $field['label'] = 'Dodatkowe informacje o adresie (opcjonalne)';
                            $field['placeholder'] = 'Nr lokalu, klatka, piętro itp.';
                            break;
                        case $load_address . '_postcode':
                            $field['label'] = 'Kod pocztowy';
                            $field['placeholder'] = '00-000';
                            break;
                        case $load_address . '_city':
                            $field['label'] = 'Miejscowość';
                            $field['placeholder'] = 'Wpisz miejscowość';
                            break;
                        case $load_address . '_country':
                            $field['label'] = 'Kraj';
                            break;
                        case $load_address . '_state':
                            $field['label'] = 'Województwo';
                            break;
                        case 'billing_phone':
                            $field['label'] = 'Telefon';
                            $field['placeholder'] = '+48 000 000 000';
                            break;
                        case 'billing_email':
                            $field['label'] = 'Adres e-mail';
                            $field['placeholder'] = 'twoj@email.pl';
                            break;
                    }

                    woocommerce_form_field( $key, $field, wc_get_post_data_by_key( $key, $field['value'] ) );
                }
                ?>
            </div>

            <?php do_action( "woocommerce_after_edit_address_form_{$load_address}" ); ?>

            <div class="form-actions">
                <button type="submit" class="save-address-btn" name="save_address" value="<?php esc_attr_e( 'Save address', 'woocommerce' ); ?>">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Zapisz adres
                </button>
                
                <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-address' ) ); ?>" class="cancel-btn">
                    Anuluj
                </a>
                
                <?php wp_nonce_field( 'woocommerce-edit_address', 'woocommerce-edit-address-nonce' ); ?>
                <input type="hidden" name="action" value="edit_address" />
            </div>
        </form>
    </div>
</div>

<style>
.modeo-edit-address-wrapper {
    width: 100%;
}

.edit-address-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
}

.header-content {
    flex: 1;
}

.address-type-indicator {
    display: flex;
    align-items: center;
    gap: 16px;
}

.address-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.address-icon.billing {
    background: #fef2f2;
    color: #dc2626;
}

.address-icon.shipping {
    background: #eff6ff;
    color: #2563eb;
}

.address-icon svg {
    width: 24px;
    height: 24px;
}

.edit-address-title {
    color: #1f2937;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
}

.edit-address-subtitle {
    color: #6b7280;
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
}

.header-actions {
    flex-shrink: 0;
    margin-left: 20px;
}

.back-to-addresses {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
    padding: 8px 16px;
    border-radius: 8px;
    background: #f9fafb;
}

.back-to-addresses:hover {
    color: #cc1616;
    text-decoration: none;
    background: #f3f4f6;
}

.back-to-addresses svg {
    width: 16px;
    height: 16px;
}

.edit-address-form-wrapper {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.modeo-address-form {
    width: 100%;
}

.address-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
}

.woocommerce-form-row.field-full-width {
    grid-column: 1 / -1;
}

.woocommerce-form-row.field-half-width {
    grid-column: span 1;
}

.woocommerce-form-row label {
    display: block;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
}

.woocommerce-form-row .required {
    color: #dc2626;
    margin-left: 4px;
}

.woocommerce-form-row input[type="text"],
.woocommerce-form-row input[type="email"],
.woocommerce-form-row input[type="tel"],
.woocommerce-form-row select,
.woocommerce-form-row textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;
    color: #1f2937;
    transition: all 0.2s ease;
}

.woocommerce-form-row input:focus,
.woocommerce-form-row select:focus,
.woocommerce-form-row textarea:focus {
    outline: none;
    border-color: #cc1616;
    box-shadow: 0 0 0 3px rgba(204, 22, 22, 0.1);
}

.woocommerce-form-row.woocommerce-invalid input {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #f3f4f6;
}

.save-address-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #cc1616;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
}

.save-address-btn:hover {
    background: #b31313;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(204, 22, 22, 0.3);
}

.save-address-btn svg {
    width: 16px;
    height: 16px;
}

.cancel-btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 20px;
    background: #f9fafb;
    color: #6b7280;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
}

.cancel-btn:hover {
    background: #f3f4f6;
    color: #374151;
    text-decoration: none;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .edit-address-header {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
    }
    
    .header-actions {
        margin-left: 0;
    }
    
    .address-type-indicator {
        flex-direction: column;
        text-align: center;
        gap: 12px;
    }
    
    .edit-address-title {
        font-size: 24px;
    }
    
    .address-fields-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .woocommerce-form-row.field-half-width {
        grid-column: 1;
    }
    
    .edit-address-form-wrapper {
        padding: 24px 20px;
        border-radius: 12px;
    }
    
    .form-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
    
    .save-address-btn,
    .cancel-btn {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .edit-address-title {
        font-size: 22px;
    }
    
    .edit-address-form-wrapper {
        padding: 20px 16px;
        margin: 0 -10px;
    }
    
    .address-fields-grid {
        gap: 14px;
    }
    
    .woocommerce-form-row input,
    .woocommerce-form-row select {
        padding: 10px 14px;
    }
}
</style>

<?php endif; ?>

<?php do_action( 'woocommerce_after_edit_account_address_form' ); ?>