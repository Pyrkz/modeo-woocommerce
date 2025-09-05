<?php
/**
 * Orders - Zamówienia
 *
 * Shows orders on the account page.
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_account_orders', $has_orders ); ?>

<div class="modeo-orders-wrapper">
    <div class="orders-header">
        <h2 class="orders-title">Moje zamówienia</h2>
        <p class="orders-subtitle">Przeglądaj historię swoich zakupów i sprawdzaj status zamówień</p>
    </div>

    <?php if ( $has_orders ) : ?>
        <div class="orders-table-wrapper">
            <table class="modeo-orders-table woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
                <thead>
                    <tr>
                        <?php foreach ( wc_get_account_orders_columns() as $column_id => $column_name ) : ?>
                            <th scope="col" class="orders-table-header orders-table-header-<?php echo esc_attr( $column_id ); ?>">
                                <span class="nobr">
                                    <?php 
                                    // Polish translations for column headers
                                    switch( $column_id ) {
                                        case 'order-number':
                                            echo 'Numer zamówienia';
                                            break;
                                        case 'order-date':
                                            echo 'Data';
                                            break;
                                        case 'order-status':
                                            echo 'Status';
                                            break;
                                        case 'order-total':
                                            echo 'Suma';
                                            break;
                                        case 'order-actions':
                                            echo 'Akcje';
                                            break;
                                        default:
                                            echo esc_html( $column_name );
                                    }
                                    ?>
                                </span>
                            </th>
                        <?php endforeach; ?>
                    </tr>
                </thead>

                <tbody>
                    <?php
                    foreach ( $customer_orders->orders as $customer_order ) {
                        $order      = wc_get_order( $customer_order );
                        $item_count = $order->get_item_count() - $order->get_item_count_refunded();
                        ?>
                        <tr class="orders-table-row orders-table-row--status-<?php echo esc_attr( $order->get_status() ); ?> order">
                            <?php foreach ( wc_get_account_orders_columns() as $column_id => $column_name ) :
                                $is_order_number = 'order-number' === $column_id;
                            ?>
                                <?php if ( $is_order_number ) : ?>
                                    <th class="orders-table-cell orders-table-cell-<?php echo esc_attr( $column_id ); ?>" data-title="<?php echo esc_attr( $column_name ); ?>" scope="row">
                                <?php else : ?>
                                    <td class="orders-table-cell orders-table-cell-<?php echo esc_attr( $column_id ); ?>" data-title="<?php echo esc_attr( $column_name ); ?>">
                                <?php endif; ?>

                                <?php if ( has_action( 'woocommerce_my_account_my_orders_column_' . $column_id ) ) : ?>
                                    <?php do_action( 'woocommerce_my_account_my_orders_column_' . $column_id, $order ); ?>

                                <?php elseif ( 'order-number' === $column_id ) : ?>
                                    <div class="order-number-wrapper">
                                        <strong class="order-number">
                                            <a href="<?php echo esc_url( $order->get_view_order_url() ); ?>">
                                                #<?php echo esc_html( $order->get_order_number() ); ?>
                                            </a>
                                        </strong>
                                        <div class="order-meta">
                                            <?php echo esc_html( _n( sprintf( '%s przedmiot', $item_count ), sprintf( '%s przedmiotów', $item_count ), $item_count, 'woocommerce' ) ); ?>
                                        </div>
                                    </div>

                                <?php elseif ( 'order-date' === $column_id ) : ?>
                                    <div class="order-date-wrapper">
                                        <time datetime="<?php echo esc_attr( $order->get_date_created()->date( 'c' ) ); ?>" class="order-date">
                                            <?php echo esc_html( wc_format_datetime( $order->get_date_created(), 'j M Y' ) ); ?>
                                        </time>
                                        <div class="order-time">
                                            <?php echo esc_html( wc_format_datetime( $order->get_date_created(), 'G:i' ) ); ?>
                                        </div>
                                    </div>

                                <?php elseif ( 'order-status' === $column_id ) : ?>
                                    <div class="order-status-wrapper">
                                        <span class="order-status status-<?php echo esc_attr( $order->get_status() ); ?>">
                                            <?php 
                                            // Polish status translations
                                            switch( $order->get_status() ) {
                                                case 'pending':
                                                    echo 'Oczekujące';
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

                                <?php elseif ( 'order-total' === $column_id ) : ?>
                                    <div class="order-total-wrapper">
                                        <span class="order-total">
                                            <?php
                                            /* translators: 1: formatted order total 2: total order items */
                                            echo wp_kses_post( sprintf( _n( '%1$s za %2$s przedmiot', '%1$s za %2$s przedmiotów', $item_count, 'woocommerce' ), $order->get_formatted_order_total(), $item_count ) );
                                            ?>
                                        </span>
                                    </div>

                                <?php elseif ( 'order-actions' === $column_id ) : ?>
                                    <div class="order-actions-wrapper">
                                        <?php
                                        $actions = wc_get_account_orders_actions( $order );

                                        if ( ! empty( $actions ) ) {
                                            foreach ( $actions as $key => $action ) { // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
                                                $action_name = '';
                                                switch( $key ) {
                                                    case 'view':
                                                        $action_name = 'Zobacz';
                                                        break;
                                                    case 'pay':
                                                        $action_name = 'Zapłać';
                                                        break;
                                                    case 'cancel':
                                                        $action_name = 'Anuluj';
                                                        break;
                                                    default:
                                                        $action_name = esc_html( $action['name'] );
                                                }
                                                echo '<a href="' . esc_url( $action['url'] ) . '" class="woocommerce-button button order-action order-action-' . esc_attr( $key ) . '">' . $action_name . '</a>';
                                            }
                                        }
                                        ?>
                                    </div>
                                <?php endif; ?>

                                <?php if ( $is_order_number ) : ?>
                                    </th>
                                <?php else : ?>
                                    </td>
                                <?php endif; ?>

                            <?php endforeach; ?>
                        </tr>
                        <?php
                    }
                    ?>
                </tbody>
            </table>
        </div>

    <?php else : ?>
        <div class="no-orders-wrapper">
            <div class="no-orders-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
            </div>
            <h3 class="no-orders-title">Brak zamówień</h3>
            <p class="no-orders-text">Nie masz jeszcze żadnych zamówień.</p>
            <a href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>" class="woocommerce-Button button btn-start-shopping">
                Rozpocznij zakupy
            </a>
        </div>
    <?php endif; ?>

    <?php do_action( 'woocommerce_before_account_orders_pagination' ); ?>

    <?php if ( 1 < $customer_orders->max_num_pages ) : ?>
        <div class="woocommerce-pagination woocommerce-pagination--without-numbers woocommerce-Pagination">
            <?php if ( 1 !== $customer_orders->current_page ) : ?>
                <a class="woocommerce-button woocommerce-button--previous woocommerce-Button woocommerce-Button--previous button" href="<?php echo esc_url( wc_get_endpoint_url( 'orders', $customer_orders->current_page - 1 ) ); ?>"><?php esc_html_e( 'Previous', 'woocommerce' ); ?></a>
            <?php endif; ?>

            <?php if ( intval( $customer_orders->current_page ) < intval( $customer_orders->max_num_pages ) ) : ?>
                <a class="woocommerce-button woocommerce-button--next woocommerce-Button woocommerce-Button--next button" href="<?php echo esc_url( wc_get_endpoint_url( 'orders', $customer_orders->current_page + 1 ) ); ?>"><?php esc_html_e( 'Next', 'woocommerce' ); ?></a>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>

<style>
.modeo-orders-wrapper {
    width: 100%;
    max-width: none !important;
    margin: 0 !important;
}

/* Full width container for orders */
.woocommerce-account-orders .account-content {
    padding: 20px !important;
    max-width: none !important;
}

.woocommerce-account-orders .woocommerce-MyAccount-content {
    padding: 0 !important;
    max-width: none !important;
}

.orders-header {
    margin-bottom: 32px;
    padding: 32px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 16px;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
}

.orders-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

.orders-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
}

.orders-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
    position: relative;
    z-index: 1;
}

.orders-table-wrapper {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    overflow: visible;
    border: none;
}

.modeo-orders-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 16px;
    margin: 0;
}

.orders-table-header {
    background: transparent;
    padding: 0 16px 8px 16px;
    text-align: left;
    font-weight: 600;
    color: #6b7280;
    font-size: 13px;
    border-bottom: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: sticky;
    top: 0;
    z-index: 10;
}

.orders-table-row {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.8);
}

.orders-table-row:hover {
    background: white;
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.orders-table-cell {
    padding: 24px 20px;
    border-bottom: none;
    vertical-align: middle;
    border-top: none;
    border-left: none;
    border-right: none;
}

.orders-table-cell:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
}

.orders-table-cell:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
}

.order-number-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.order-number a {
    color: #cc1616;
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    transition: all 0.2s ease;
}

.order-number a:hover {
    color: #b31313;
    text-decoration: none;
    transform: translateX(4px);
}

.order-meta {
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
}

.order-date-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
}

.order-date {
    color: #1f2937;
    font-weight: 600;
    font-size: 15px;
}

.order-time {
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
}

.order-status {
    padding: 10px 16px;
    border-radius: 25px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    transition: all 0.2s ease;
}


@keyframes pulse-status {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

.order-status.status-pending {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border-color: #f59e0b;
}

.order-status.status-processing {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    border-color: #3b82f6;
}

.order-status.status-on-hold {
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
    color: #7c3aed;
    border-color: #8b5cf6;
}

.order-status.status-completed {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #16a34a;
    border-color: #22c55e;
}

.order-status.status-cancelled {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
    border-color: #ef4444;
}

.order-status.status-refunded {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #64748b;
    border-color: #94a3b8;
}

.order-status.status-failed {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #b91c1c;
    border-color: #dc2626;
}

.order-total-wrapper {
    text-align: right;
}

.order-total {
    font-weight: 700;
    color: #1f2937;
    font-size: 18px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    display: inline-block;
}

.order-actions-wrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.order-action {
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}



.order-action.order-action-view {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #475569;
    border-color: #cbd5e1;
}

.order-action.order-action-view:hover {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    text-decoration: none;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(71, 85, 105, 0.2);
}

.order-action.order-action-pay {
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    border-color: #b91c1c;
}

.order-action.order-action-pay:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #cc1616 100%);
    text-decoration: none;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.3);
}

.order-action.order-action-cancel {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
    border-color: #f87171;
}

.order-action.order-action-cancel:hover {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    text-decoration: none;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.2);
}

/* No orders state */
.no-orders-wrapper {
    text-align: center;
    padding: 80px 40px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.no-orders-wrapper::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(204, 22, 22, 0.03) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.no-orders-icon {
    width: 96px;
    height: 96px;
    margin: 0 auto 32px;
    color: #cc1616;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(204, 22, 22, 0.1);
    position: relative;
    z-index: 1;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.no-orders-icon svg {
    width: 48px;
    height: 48px;
}

.no-orders-title {
    color: #1f2937;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 16px 0;
    position: relative;
    z-index: 1;
}

.no-orders-text {
    color: #6b7280;
    font-size: 18px;
    margin: 0 0 40px 0;
    line-height: 1.6;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;
}

.btn-start-shopping {
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    border: none;
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.3);
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 1;
    gap: 8px;
}


.btn-start-shopping:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #cc1616 100%);
    text-decoration: none;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(204, 22, 22, 0.4);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .orders-header {
        padding: 24px 20px;
        margin-bottom: 24px;
    }
    
    .orders-title {
        font-size: 28px;
    }
    
    .orders-subtitle {
        font-size: 15px;
    }
    
    .modeo-orders-table,
    .modeo-orders-table thead,
    .modeo-orders-table tbody,
    .modeo-orders-table th,
    .modeo-orders-table td,
    .modeo-orders-table tr {
        display: block;
    }

    .modeo-orders-table thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    
    .modeo-orders-table {
        border-spacing: 0 12px;
    }

    .orders-table-row {
        border: 2px solid #e5e7eb;
        border-radius: 16px;
        margin-bottom: 20px;
        padding: 20px;
        background: white;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    
    .orders-table-row:hover {
        transform: none;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    .orders-table-cell {
        border: none !important;
        border-bottom: 1px solid #f3f4f6 !important;
        position: relative;
        padding: 16px 0 16px 45%;
        border-radius: 0;
    }
    
    .orders-table-cell:last-child {
        border-bottom: none !important;
        padding-bottom: 0;
    }

    .orders-table-cell:before {
        content: attr(data-title) ": ";
        position: absolute;
        left: 0;
        width: 40%;
        padding-right: 12px;
        white-space: nowrap;
        font-weight: 700;
        color: #374151;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .order-actions-wrapper {
        justify-content: flex-start;
        gap: 8px;
    }
    
    .order-action {
        padding: 10px 16px;
        font-size: 12px;
    }
    
    .no-orders-wrapper {
        padding: 60px 24px;
    }
    
    .no-orders-icon {
        width: 80px;
        height: 80px;
    }
    
    .no-orders-title {
        font-size: 24px;
    }
    
    .no-orders-text {
        font-size: 16px;
    }
    
    .btn-start-shopping {
        padding: 14px 28px;
        font-size: 15px;
    }
}

@media (max-width: 480px) {
    .orders-header {
        padding: 20px 16px;
    }
    
    .orders-title {
        font-size: 24px;
    }
    
    .orders-subtitle {
        font-size: 14px;
    }
    
    .orders-table-row {
        padding: 16px;
        margin-bottom: 16px;
    }
    
    .orders-table-cell {
        padding: 12px 0 12px 38%;
    }
    
    .orders-table-cell:before {
        width: 33%;
        font-size: 11px;
    }
    
    .order-action {
        padding: 8px 12px;
        font-size: 11px;
    }
    
    .no-orders-wrapper {
        padding: 40px 20px;
    }
    
    .no-orders-icon {
        width: 64px;
        height: 64px;
    }
    
    .no-orders-title {
        font-size: 22px;
    }
    
    .no-orders-text {
        font-size: 15px;
    }
    
    .btn-start-shopping {
        padding: 12px 24px;
        font-size: 14px;
    }
}
</style>

<?php do_action( 'woocommerce_after_account_orders', $has_orders ); ?>