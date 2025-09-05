<?php
/**
 * My Addresses - Moje Adresy
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-address.php.
 */

defined( 'ABSPATH' ) || exit;

$customer_id = get_current_user_id();

if ( ! wc_ship_to_billing_address_only() && wc_shipping_enabled() ) {
    $get_addresses = apply_filters(
        'woocommerce_my_account_get_addresses',
        array(
            'billing'  => __( 'Billing address', 'woocommerce' ),
            'shipping' => __( 'Shipping address', 'woocommerce' ),
        ),
        $customer_id
    );
} else {
    $get_addresses = apply_filters(
        'woocommerce_my_account_get_addresses',
        array(
            'billing' => __( 'Billing address', 'woocommerce' ),
        ),
        $customer_id
    );
}
?>

<div class="modeo-addresses-wrapper">
    <div class="addresses-header">
        <h2 class="addresses-title">Moje adresy</h2>
        <p class="addresses-subtitle">
            Zarządzaj swoimi adresami rozliczeniowymi i dostawy. Te adresy będą używane domyślnie podczas składania zamówień.
        </p>
    </div>

    <div class="addresses-grid">
        <?php foreach ( $get_addresses as $name => $address_title ) : ?>
            <?php
                $address = wc_get_account_formatted_address( $name );
                $address_fields = WC()->countries->get_address_fields( WC()->customer->{"get_{$name}_country"}(), $name . '_' );
            ?>
            
            <div class="address-card address-card-<?php echo esc_attr( $name ); ?>">
                <div class="address-card-header">
                    <div class="address-type">
                        <div class="address-icon">
                            <?php if ( 'billing' === $name ) : ?>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            <?php else : ?>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            <?php endif; ?>
                        </div>
                        <h3 class="address-title">
                            <?php 
                            if ( 'billing' === $name ) {
                                echo 'Adres rozliczeniowy';
                            } else {
                                echo 'Adres dostawy';
                            }
                            ?>
                        </h3>
                    </div>
                    
                    <div class="address-actions">
                        <a href="<?php echo esc_url( wc_get_endpoint_url( 'edit-address', $name ) ); ?>" class="edit-address-btn">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edytuj
                        </a>
                    </div>
                </div>

                <div class="address-content">
                    <?php if ( $address ) : ?>
                        <div class="formatted-address">
                            <?php echo wp_kses_post( $address ); ?>
                        </div>
                        
                        <?php 
                        // Show additional contact info for billing address
                        if ( 'billing' === $name ) {
                            $billing_phone = WC()->customer->get_billing_phone();
                            $billing_email = WC()->customer->get_billing_email();
                            
                            if ( $billing_phone || $billing_email ) {
                                echo '<div class="address-contact-info">';
                                
                                if ( $billing_phone ) {
                                    echo '<div class="contact-item">';
                                    echo '<svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>';
                                    echo '<span>' . esc_html( $billing_phone ) . '</span>';
                                    echo '</div>';
                                }
                                
                                if ( $billing_email ) {
                                    echo '<div class="contact-item">';
                                    echo '<svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
                                    echo '<span>' . esc_html( $billing_email ) . '</span>';
                                    echo '</div>';
                                }
                                
                                echo '</div>';
                            }
                        }
                        ?>
                    <?php else : ?>
                        <div class="empty-address">
                            <div class="empty-address-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <p class="empty-address-text">
                                <?php 
                                if ( 'billing' === $name ) {
                                    echo 'Nie dodałeś jeszcze adresu rozliczeniowego.';
                                } else {
                                    echo 'Nie dodałeś jeszcze adresu dostawy.';
                                }
                                ?>
                            </p>
                            <a href="<?php echo esc_url( wc_get_endpoint_url( 'edit-address', $name ) ); ?>" class="add-address-btn">
                                Dodaj adres
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Address Management Tips -->
    <div class="address-tips">
        <h3 class="tips-title">
            <svg class="tips-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Pomocne informacje
        </h3>
        <div class="tips-content">
            <div class="tip-item">
                <strong>Adres rozliczeniowy</strong> - używany do wystawienia faktury i płatności
            </div>
            <div class="tip-item">
                <strong>Adres dostawy</strong> - miejsce, gdzie zostanie dostarczona paczka
            </div>
            <?php if ( wc_ship_to_billing_address_only() ) : ?>
                <div class="tip-item">
                    <strong>Uwaga:</strong> W tym sklepie dostawa możliwa jest tylko na adres rozliczeniowy
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<style>
.modeo-addresses-wrapper {
    width: 100%;
}

.addresses-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
}

.addresses-title {
    color: #1f2937;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 12px 0;
    letter-spacing: -0.025em;
}

.addresses-subtitle {
    color: #6b7280;
    font-size: 16px;
    margin: 0;
    line-height: 1.6;
}

.addresses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
}

.address-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.address-card:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.address-card-billing {
    border-top: 4px solid #dc2626;
}

.address-card-shipping {
    border-top: 4px solid #2563eb;
}

.address-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
}

.address-type {
    display: flex;
    align-items: center;
    gap: 12px;
}

.address-icon {
    width: 24px;
    height: 24px;
    color: #6b7280;
}

.address-card-billing .address-icon {
    color: #dc2626;
}

.address-card-shipping .address-icon {
    color: #2563eb;
}

.address-title {
    color: #1f2937;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.address-actions {
    display: flex;
    gap: 8px;
}

.edit-address-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #f3f4f6;
    color: #374151;
    text-decoration: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.edit-address-btn:hover {
    background: #e5e7eb;
    text-decoration: none;
    color: #1f2937;
}

.edit-address-btn svg {
    width: 16px;
    height: 16px;
}

.address-content {
    padding: 24px 20px;
}

.formatted-address {
    color: #374151;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
}

.address-contact-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 13px;
}

.contact-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.empty-address {
    text-align: center;
    padding: 32px 16px;
}

.empty-address-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 16px;
    color: #d1d5db;
}

.empty-address-icon svg {
    width: 100%;
    height: 100%;
}

.empty-address-text {
    color: #6b7280;
    font-size: 14px;
    margin: 0 0 20px 0;
    line-height: 1.5;
}

.add-address-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #cc1616;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.add-address-btn:hover {
    background: #b31313;
    text-decoration: none;
    color: white;
}

.address-tips {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 12px;
    padding: 24px;
}

.tips-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #0c4a6e;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px 0;
}

.tips-icon {
    width: 20px;
    height: 20px;
    color: #0284c7;
}

.tips-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.tip-item {
    color: #0c4a6e;
    font-size: 14px;
    line-height: 1.5;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .addresses-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .addresses-title {
        font-size: 24px;
    }
    
    .address-card-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
        text-align: center;
    }
    
    .address-type {
        width: 100%;
        justify-content: center;
    }
    
    .address-actions {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .addresses-grid {
        grid-template-columns: 1fr;
    }
    
    .address-card {
        margin: 0 -10px;
    }
    
    .address-content {
        padding: 20px 16px;
    }
    
    .address-tips {
        margin: 0 -10px;
        padding: 20px 16px;
    }
    
    .tips-content {
        gap: 12px;
    }
}
</style>

<?php
/**
 * Deprecated woocommerce_before_single_product_summary action.
 */
do_action( 'woocommerce_after_my_account_addresses' );
?>