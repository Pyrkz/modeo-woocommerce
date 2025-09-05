<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 */

defined( 'ABSPATH' ) || exit;
?>

<style>
/* Modern Thank You Page Styling */
:root {
    --modeo-primary: #cc1616;
    --modeo-success: #10b981;
    --modeo-border: #e5e7eb;
    --modeo-text-primary: #111827;
    --modeo-text-secondary: #6b7280;
    --modeo-bg-secondary: #f9fafb;
    --modeo-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    --modeo-radius: 0.5rem;
}
.woocommerce-order {
    background: white;
    min-height: calc(100vh - 160px);
}

.modeo-thankyou-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
}

.modeo-order-details {
    background: white;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    overflow: hidden;
}

.modeo-order-header {
    padding: 2rem;
    text-align: center;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-bottom: 1px solid #e5e7eb;
}

.modeo-order-content {
    padding: 2rem;
}

.modeo-order-info {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

@media (min-width: 768px) {
    .modeo-order-info {
        grid-template-columns: 1fr 1fr;
    }
}

.modeo-info-card {
    background: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
}

.modeo-info-card h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1rem 0;
}

.modeo-info-card p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0.25rem 0;
}

/* Order details table */
.woocommerce-order-details .woocommerce-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
    background: white;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
}

.woocommerce-order-details .woocommerce-table th,
.woocommerce-order-details .woocommerce-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.875rem;
}

.woocommerce-order-details .woocommerce-table th {
    background: #f9fafb;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
}

.woocommerce-order-details .woocommerce-table tbody tr:last-child th,
.woocommerce-order-details .woocommerce-table tbody tr:last-child td {
    border-bottom: none;
}

.woocommerce-order-details .woocommerce-table tfoot th,
.woocommerce-order-details .woocommerce-table tfoot td {
    background: #f9fafb;
    font-weight: 600;
    border-top: 2px solid #e5e7eb;
    border-bottom: none;
}

.woocommerce-order-details .order-total th,
.woocommerce-order-details .order-total td {
    font-size: 1.125rem;
    color: #cc1616;
}

/* Customer details */
.woocommerce-customer-details {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

@media (min-width: 768px) {
    .woocommerce-customer-details {
        grid-template-columns: 1fr 1fr;
    }
}

.woocommerce-column h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
}

.woocommerce-column address {
    background: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    font-style: normal;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
}

/* Action buttons */
.modeo-order-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
    .modeo-order-actions {
        flex-direction: row;
        justify-content: center;
    }
}

.modeo-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    text-align: center;
}

.modeo-btn-primary {
    background: #cc1616;
    color: white;
    border: none;
}

.modeo-btn-primary:hover {
    background: #b01313;
    color: white;
    text-decoration: none;
}

.modeo-btn-secondary {
    background: white;
    color: #cc1616;
    border: 1px solid #cc1616;
}

.modeo-btn-secondary:hover {
    background: #cc1616;
    color: white;
    text-decoration: none;
}

/* Modern Success Icon */
.success-icon {
    width: 5rem;
    height: 5rem;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, var(--modeo-success), #059669);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);
    animation: successPulse 2s ease-in-out infinite;
}

@keyframes successPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4); }
    50% { transform: scale(1.05); box-shadow: 0 12px 35px -5px rgba(16, 185, 129, 0.6); }
}

/* Thank you page header styles */
.thankyou-page-header {
    background: linear-gradient(to right, #f0fdf4, #ffffff);
    padding: 4rem 0;
    min-height: auto;
}

.thankyou-header-container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
}

.thankyou-header-content {
    text-align: center;
}

.thankyou-header-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
}

.thankyou-header-subtitle {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #374151;
    margin-bottom: 1.5rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
}

.thankyou-content-section {
    padding: 4rem 0;
    background: #ffffff;
}

/* Responsive header */
@media (min-width: 640px) {
    .thankyou-header-container {
        padding: 0 1.5rem;
    }
}

@media (min-width: 768px) {
    .thankyou-header-title {
        font-size: 3rem;
        line-height: 1;
    }
}

@media (min-width: 1024px) {
    .thankyou-header-container {
        padding: 0 2rem;
    }
}

/* Mobile responsive */
@media (max-width: 768px) {
    .thankyou-page-header {
        padding: 3rem 0;
    }
    
    .thankyou-header-title {
        font-size: 2rem;
        line-height: 2.25rem;
    }
    
    .thankyou-content-section {
        padding: 2rem 0;
    }
    
    .modeo-thankyou-container {
        padding: 0 1rem;
    }
    
    .modeo-order-header {
        padding: 1.5rem 1rem;
    }
    
    .modeo-order-content {
        padding: 1.5rem 1rem;
    }
    
    .woocommerce-order-details .woocommerce-table th,
    .woocommerce-order-details .woocommerce-table td {
        padding: 0.75rem 0.5rem;
        font-size: 0.8rem;
    }
    
    .modeo-info-card {
        padding: 1rem;
    }
}
</style>

<!-- Page Header - matching cart/checkout design with pure CSS -->
<section class="thankyou-page-header">
    <div class="thankyou-header-container">
        <div class="thankyou-header-content">
            <div class="success-icon">
                <svg style="width: 2rem; height: 2rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 class="thankyou-header-title">
                Dziękujemy za <span style="color: #cc1616;">Zamówienie!</span>
            </h1>
            <p class="thankyou-header-subtitle">
                Twoje zamówienie zostało złożone pomyślnie
            </p>
        </div>
    </div>
</section>

<!-- Thank you content -->
<section class="thankyou-content-section">
    <div class="modeo-thankyou-container">

        <?php if ( $order ) : ?>

            <div class="modeo-order-details">
                <div class="modeo-order-header">
                    <?php if ( $order->has_status( 'failed' ) ) : ?>
                        <h2 style="font-size: 1.5rem; font-weight: 700; color: #dc2626; margin-bottom: 1rem;"><?php esc_html_e( 'Płatność nie powiodła się', 'woocommerce' ); ?></h2>
                        <p style="color: #374151;"><?php esc_html_e( 'Niestety, nie mogliśmy przetworzyć płatności za Twoje zamówienie. Spróbuj ponownie.', 'woocommerce' ); ?></p>
                    <?php else : ?>
                        <h2 style="font-size: 1.5rem; font-weight: 700; color: #059669; margin-bottom: 1rem;"><?php esc_html_e( 'Zamówienie otrzymane', 'woocommerce' ); ?></h2>
                        <p style="color: #374151;"><?php esc_html_e( 'Dziękujemy. Twoje zamówienie zostało otrzymane.', 'woocommerce' ); ?></p>
                    <?php endif; ?>
                </div>

                <div class="modeo-order-content">
                    <div class="modeo-order-info">
                        <div class="modeo-info-card">
                            <h3><?php esc_html_e( 'Numer zamówienia:', 'woocommerce' ); ?></h3>
                            <p><strong><?php echo $order->get_order_number(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong></p>
                        </div>

                        <div class="modeo-info-card">
                            <h3><?php esc_html_e( 'Data:', 'woocommerce' ); ?></h3>
                            <p><?php echo wc_format_datetime( $order->get_date_created() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
                        </div>

                        <?php if ( is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email() ) : ?>
                            <div class="modeo-info-card">
                                <h3><?php esc_html_e( 'Email:', 'woocommerce' ); ?></h3>
                                <p><?php echo $order->get_billing_email(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
                            </div>
                        <?php endif; ?>

                        <div class="modeo-info-card">
                            <h3><?php esc_html_e( 'Łączna kwota:', 'woocommerce' ); ?></h3>
                            <p><strong><?php echo $order->get_formatted_order_total(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong></p>
                        </div>

                        <?php if ( $order->get_payment_method_title() ) : ?>
                            <div class="modeo-info-card">
                                <h3><?php esc_html_e( 'Metoda płatności:', 'woocommerce' ); ?></h3>
                                <p><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></p>
                            </div>
                        <?php endif; ?>

                        <?php if ( $order->get_shipping_method() ) : ?>
                            <div class="modeo-info-card">
                                <h3><?php esc_html_e( 'Metoda dostawy:', 'woocommerce' ); ?></h3>
                                <p><?php echo wp_kses_post( $order->get_shipping_method() ); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>

                    <?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
                    <?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>

                    <!-- Action buttons -->
                    <div class="modeo-order-actions">
                        <?php if ( is_user_logged_in() ) : ?>
                            <a href="<?php echo esc_url( wc_get_endpoint_url( 'orders', '', wc_get_page_permalink( 'myaccount' ) ) ); ?>" class="modeo-btn modeo-btn-primary">
                                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <?php esc_html_e( 'Zobacz zamówienia', 'woocommerce' ); ?>
                            </a>
                        <?php endif; ?>
                        
                        <a href="<?php 
                            $store_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/sklep' : 'https://nextmodeo.sitefy.pl/sklep';
                            echo esc_url($store_url);
                        ?>" class="modeo-btn modeo-btn-secondary">
                            <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                            </svg>
                            <?php esc_html_e( 'Kontynuuj zakupy', 'woocommerce' ); ?>
                        </a>
                    </div>
                </div>
            </div>

        <?php else : ?>

            <div class="modeo-order-details">
                <div class="modeo-order-content">
                    <div style="text-align: center; padding: 2rem 0;">
                        <p style="font-size: 1.25rem; color: #374151; margin-bottom: 1.5rem;"><?php esc_html_e( 'Dziękujemy. Twoje zamówienie zostało otrzymane.', 'woocommerce' ); ?></p>
                        
                        <a href="<?php 
                            $store_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/sklep' : 'https://nextmodeo.sitefy.pl/sklep';
                            echo esc_url($store_url);
                        ?>" class="modeo-btn modeo-btn-primary">
                            <?php esc_html_e( 'Kontynuuj zakupy', 'woocommerce' ); ?>
                        </a>
                    </div>
                </div>
            </div>

        <?php endif; ?>

        <!-- Order details -->
        <?php if ( $order ) : ?>
            <div style="margin-top: 2rem;">
                <?php do_action( 'woocommerce_order_details_after_order_table', $order ); ?>
            </div>
        <?php endif; ?>

    </div>
</section>