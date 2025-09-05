<?php
/**
 * View Order - Szczegóły Zamówienia
 *
 * Shows the details of a particular order on the account page.
 */

defined( 'ABSPATH' ) || exit;

$notes = $order->get_customer_order_notes();
?>

<div class="modeo-order-details-wrapper">
    <!-- Order Header -->
    <div class="order-details-header">
        <div class="order-info">
            <h2 class="order-title">
                Zamówienie #<?php echo esc_html( $order->get_order_number() ); ?>
            </h2>
            <div class="order-meta">
                <span class="order-date">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Złożone <?php echo esc_html( wc_format_datetime( $order->get_date_created(), 'j M Y, G:i' ) ); ?>
                </span>
                <span class="order-status status-<?php echo esc_attr( $order->get_status() ); ?>">
                    <?php 
                    // Polish status translations
                    switch( $order->get_status() ) {
                        case 'pending':
                            echo 'Oczekujące na płatność';
                            break;
                        case 'processing':
                            echo 'W realizacji';
                            break;
                        case 'on-hold':
                            echo 'Wstrzymane';
                            break;
                        case 'completed':
                            echo 'Zrealizowane';
                            break;
                        case 'cancelled':
                            echo 'Anulowane';
                            break;
                        case 'refunded':
                            echo 'Zwrócone';
                            break;
                        case 'failed':
                            echo 'Nieudane';
                            break;
                        default:
                            echo esc_html( wc_get_order_status_name( $order->get_status() ) );
                    }
                    ?>
                </span>
            </div>
        </div>
        
        <div class="order-actions">
            <?php
            $actions = wc_get_account_orders_actions( $order );
            if ( ! empty( $actions ) ) {
                foreach ( $actions as $key => $action ) {
                    $action_name = '';
                    $action_class = 'order-action-' . $key;
                    
                    switch( $key ) {
                        case 'pay':
                            $action_name = 'Zapłać teraz';
                            break;
                        case 'cancel':
                            $action_name = 'Anuluj zamówienie';
                            break;
                        default:
                            $action_name = esc_html( $action['name'] );
                    }
                    
                    echo '<a href="' . esc_url( $action['url'] ) . '" class="order-action ' . esc_attr( $action_class ) . '">' . $action_name . '</a>';
                }
            }
            ?>
        </div>
    </div>

    <!-- Order Items -->
    <div class="order-items-section">
        <h3 class="section-title">Zamówione produkty</h3>
        <div class="order-items-wrapper">
            <?php
            do_action( 'woocommerce_order_details_before_order_table', $order );

            $order_items = $order->get_items( apply_filters( 'woocommerce_purchase_order_item_types', 'line_item' ) );
            ?>
            
            <div class="order-items-list">
                <?php foreach ( $order_items as $item_id => $item ) : 
                    $product = $item->get_product();
                    if ( ! $product ) continue;
                ?>
                    <div class="order-item">
                        <div class="item-image">
                            <?php
                            $thumbnail = $product->get_image( array( 80, 80 ) );
                            if ( $thumbnail ) {
                                echo $thumbnail;
                            } else {
                                echo '<div class="placeholder-image"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                            }
                            ?>
                        </div>
                        
                        <div class="item-details">
                            <h4 class="item-name">
                                <?php echo esc_html( $item->get_name() ); ?>
                            </h4>
                            
                            <?php if ( $item_meta = wc_display_item_meta( $item, array( 'echo' => false ) ) ) : ?>
                                <div class="item-meta">
                                    <?php echo wp_kses_post( $item_meta ); ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="item-quantity">
                                Ilość: <strong><?php echo esc_html( $item->get_quantity() ); ?></strong>
                            </div>
                        </div>
                        
                        <div class="item-total">
                            <span class="total-amount">
                                <?php echo wp_kses_post( $order->get_formatted_line_subtotal( $item ) ); ?>
                            </span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Order Totals -->
            <div class="order-totals">
                <table class="order-totals-table">
                    <tbody>
                        <?php foreach ( $order->get_order_item_totals() as $key => $total ) : ?>
                            <tr class="order-total-row order-total-<?php echo esc_attr( $key ); ?>">
                                <td class="total-label">
                                    <?php 
                                    // Polish translations for totals
                                    switch( $key ) {
                                        case 'cart_subtotal':
                                            echo 'Wartość produktów:';
                                            break;
                                        case 'shipping':
                                            echo 'Dostawa:';
                                            break;
                                        case 'payment_method':
                                            echo 'Sposób płatności:';
                                            break;
                                        case 'order_total':
                                            echo 'Razem do zapłaty:';
                                            break;
                                        default:
                                            echo esc_html( $total['label'] );
                                    }
                                    ?>
                                </td>
                                <td class="total-value">
                                    <?php echo wp_kses_post( $total['value'] ); ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Shipping & Billing Info -->
    <div class="order-addresses-section">
        <div class="addresses-grid">
            <!-- Billing Address -->
            <div class="address-card billing-address">
                <h3 class="address-title">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Adres rozliczeniowy
                </h3>
                <div class="address-content">
                    <?php echo wp_kses_post( $order->get_formatted_billing_address( __( 'Brak adresu', 'woocommerce' ) ) ); ?>
                    
                    <?php if ( $order->get_billing_phone() ) : ?>
                        <div class="address-phone">
                            <strong>Tel:</strong> <?php echo esc_html( $order->get_billing_phone() ); ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ( $order->get_billing_email() ) : ?>
                        <div class="address-email">
                            <strong>Email:</strong> <?php echo esc_html( $order->get_billing_email() ); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Shipping Address -->
            <?php if ( ! wc_ship_to_billing_address_only() && $order->needs_shipping_address() ) : ?>
                <div class="address-card shipping-address">
                    <h3 class="address-title">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        Adres dostawy
                    </h3>
                    <div class="address-content">
                        <?php echo wp_kses_post( $order->get_formatted_shipping_address( __( 'Brak adresu', 'woocommerce' ) ) ); ?>
                        
                        <?php if ( $order->get_shipping_phone() ) : ?>
                            <div class="address-phone">
                                <strong>Tel:</strong> <?php echo esc_html( $order->get_shipping_phone() ); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Order Notes -->
    <?php if ( $notes ) : ?>
        <div class="order-notes-section">
            <h3 class="section-title">Notatki do zamówienia</h3>
            <div class="order-notes-list">
                <?php foreach ( $notes as $note ) : ?>
                    <div class="order-note">
                        <div class="note-meta">
                            <time class="note-date" datetime="<?php echo esc_attr( $note->comment_date ); ?>">
                                <?php echo esc_html( wc_format_datetime( new WC_DateTime( $note->comment_date ), 'j M Y, G:i' ) ); ?>
                            </time>
                        </div>
                        <div class="note-content">
                            <?php echo wp_kses_post( wpautop( wptexturize( $note->comment_content ) ) ); ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endif; ?>

    <!-- Back to Orders -->
    <div class="order-actions-footer">
        <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>" class="back-to-orders">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Powrót do zamówień
        </a>
    </div>
</div>

<style>
.modeo-order-details-wrapper {
    width: 100%;
    max-width: none !important;
    margin: 0 !important;
}

/* Full width container for order details */
.woocommerce-view-order .account-content {
    padding: 20px !important;
    max-width: none !important;
}

.woocommerce-view-order .woocommerce-MyAccount-content {
    padding: 0 !important;
    max-width: none !important;
}

.order-details-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    padding: 32px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 20px;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(204, 22, 22, 0.2);
}

.order-details-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse-header 4s ease-in-out infinite;
}

@keyframes pulse-header {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}

.order-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px 0;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
}

.order-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 1;
}

.order-date {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
    font-weight: 500;
}

.order-date .icon {
    width: 18px;
    height: 18px;
    color: rgba(255, 255, 255, 0.8);
}

.order-status {
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.order-status::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse-status-detail 2s infinite;
}

@keyframes pulse-status-detail {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
}

.order-status.status-pending {
    background: #fef3c7;
    color: #d97706;
}

.order-status.status-processing {
    background: #dbeafe;
    color: #2563eb;
}

.order-status.status-on-hold {
    background: #f3e8ff;
    color: #7c3aed;
}

.order-status.status-completed {
    background: #dcfce7;
    color: #16a34a;
}

.order-status.status-cancelled {
    background: #fee2e2;
    color: #dc2626;
}

.order-status.status-refunded {
    background: #f1f5f9;
    color: #64748b;
}

.order-status.status-failed {
    background: #fecaca;
    color: #b91c1c;
}

.order-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
}

.order-action {
    padding: 12px 24px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.order-action.order-action-pay {
    background: rgba(255, 255, 255, 0.95);
    color: #cc1616;
    border-color: rgba(255, 255, 255, 0.8);
}

.order-action.order-action-pay:hover {
    background: white;
    text-decoration: none;
    color: #b31313;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.order-action.order-action-cancel {
    background: rgba(254, 226, 226, 0.9);
    color: #dc2626;
    border-color: rgba(220, 38, 38, 0.3);
}

.order-action.order-action-cancel:hover {
    background: rgba(254, 202, 202, 0.95);
    text-decoration: none;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.2);
}

.section-title {
    color: #1f2937;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 24px 0;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 2px;
}

.order-items-section {
    margin-bottom: 32px;
}

.order-items-wrapper {
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(229, 231, 235, 0.8);
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.order-items-wrapper:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.order-items-list {
    divide-y divide-gray-200;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    transition: all 0.2s ease;
    border-bottom: 1px solid #f3f4f6;
}

.order-item:last-child {
    border-bottom: none;
}

.order-item:hover {
    background: #f9fafb;
}

.item-image {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #e5e7eb;
    transition: all 0.2s ease;
}

.item-image:hover {
    transform: scale(1.05);
    border-color: #cc1616;
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.1);
}

.item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-image {
    width: 40px;
    height: 40px;
    color: #9ca3af;
}

.placeholder-image svg {
    width: 100%;
    height: 100%;
}

.item-details {
    flex: 1;
}

.item-name {
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    line-height: 1.4;
}

.item-meta {
    color: #6b7280;
    font-size: 13px;
    margin-bottom: 8px;
}

.item-quantity {
    color: #6b7280;
    font-size: 14px;
}

.item-total {
    flex-shrink: 0;
    text-align: right;
}

.total-amount {
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
}

.order-totals {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 24px;
    border-top: 2px solid #e5e7eb;
    position: relative;
}

.order-totals::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 0 0 4px 4px;
}

.order-totals-table {
    width: 100%;
    border-collapse: collapse;
}

.order-total-row {
    border-bottom: 1px solid #f3f4f6;
}

.order-total-row:last-child {
    border-bottom: none;
}

.order-total-row.order-total-order_total {
    border-top: 2px solid #e5e7eb;
    font-weight: 600;
}

.total-label {
    padding: 8px 0;
    color: #6b7280;
    font-size: 14px;
    text-align: left;
}

.total-value {
    padding: 8px 0;
    color: #1f2937;
    font-size: 14px;
    text-align: right;
    font-weight: 500;
}

.order-total-order_total .total-label,
.order-total-order_total .total-value {
    font-weight: 700;
    font-size: 16px;
    color: #1f2937;
}

.order-addresses-section {
    margin-bottom: 32px;
}

.addresses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.address-card {
    background: white;
    border: 1px solid rgba(229, 231, 235, 0.8);
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.address-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: #cc1616;
}

.address-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px 0;
}

.address-title .icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
}

.address-content {
    color: #374151;
    font-size: 14px;
    line-height: 1.6;
}

.address-phone,
.address-email {
    margin-top: 8px;
    font-size: 14px;
    color: #6b7280;
}

.order-notes-section {
    margin-bottom: 32px;
}

.order-notes-list {
    background: white;
    border: 1px solid rgba(229, 231, 235, 0.8);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.order-notes-list:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.order-note {
    padding: 20px;
    border-bottom: 1px solid #f3f4f6;
}

.order-note:last-child {
    border-bottom: none;
}

.note-meta {
    margin-bottom: 8px;
}

.note-date {
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
}

.note-content {
    color: #374151;
    font-size: 14px;
    line-height: 1.6;
}

.order-actions-footer {
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
}

.back-to-orders {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: #6b7280;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 12px 20px;
    border-radius: 16px;
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border: 1px solid #e5e7eb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.back-to-orders:hover {
    color: #cc1616;
    text-decoration: none;
    transform: translateX(-4px);
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border-color: #cc1616;
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.1);
}

.back-to-orders .icon {
    width: 16px;
    height: 16px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .order-details-header {
        flex-direction: column;
        gap: 24px;
        align-items: stretch;
        padding: 24px 20px;
    }
    
    .order-title {
        font-size: 28px;
    }
    
    .order-actions {
        justify-content: flex-start;
        gap: 12px;
    }
    
    .order-action {
        padding: 10px 20px;
        font-size: 13px;
    }
    
    .addresses-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .address-card {
        padding: 24px 20px;
    }
    
    .order-item {
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
        padding: 20px;
    }
    
    .item-image {
        width: 80px;
        height: 80px;
    }
    
    .item-details {
        width: 100%;
        text-align: center;
    }
    
    .item-total {
        width: 100%;
        text-align: center;
    }
    
    .order-totals {
        padding: 20px 16px;
    }
    
    .order-totals-table {
        font-size: 14px;
    }
    
    .section-title {
        font-size: 22px;
    }
}

@media (max-width: 480px) {
    .order-details-header {
        padding: 20px 16px;
    }
    
    .order-title {
        font-size: 24px;
    }
    
    .order-action {
        padding: 8px 16px;
        font-size: 12px;
        gap: 6px;
    }
    
    .address-card {
        padding: 20px 16px;
    }
    
    .order-item {
        padding: 16px;
    }
    
    .item-image {
        width: 70px;
        height: 70px;
    }
    
    .order-totals {
        padding: 16px 12px;
    }
    
    .order-totals-table {
        font-size: 13px;
    }
    
    .section-title {
        font-size: 20px;
    }
    
    .back-to-orders {
        padding: 10px 16px;
        font-size: 14px;
    }
}
</style>

<?php
do_action( 'woocommerce_order_details_after_order_table', $order );
?>