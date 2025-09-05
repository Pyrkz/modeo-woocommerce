<?php
/**
 * My Account Dashboard
 *
 * Shows the 'dashboard' tab content on the account page.
 */

defined( 'ABSPATH' ) || exit;

$current_user = wp_get_current_user();
?>

<div class="modeo-dashboard-wrapper">
    <!-- Breadcrumb for better navigation -->
    <nav class="dashboard-breadcrumb" aria-label="Breadcrumb">
        <ol>
            <li><a href="<?php echo esc_url( home_url('/') ); ?>">Strona główna</a></li>
            <li><span class="separator">›</span></li>
            <li><span aria-current="page">Moje konto</span></li>
        </ol>
    </nav>

    <div class="modeo-dashboard-header">
        <div class="welcome-section">
            <h1 class="dashboard-title">
                Witaj, <?php echo esc_html( $current_user->display_name ); ?>! 
                <span class="welcome-emoji">👋</span>
            </h1>
            <p class="dashboard-subtitle">
                <span class="security-badge">
                    <svg class="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Twoje konto jest bezpieczne
                </span>
            </p>
        </div>
        <div class="user-avatar">
            <div class="avatar-container">
                <div class="avatar-status-indicator"></div>
                <?php
                $avatar_url = get_avatar_url($current_user->ID, array('size' => 64));
                if ($avatar_url):
                ?>
                    <img src="<?php echo esc_url($avatar_url); ?>" 
                         alt="<?php echo esc_attr($current_user->display_name); ?>" 
                         class="user-avatar-image" />
                <?php else: ?>
                    <div class="avatar-fallback">
                        <?php
                        // Create initials from user's name
                        $display_name = $current_user->display_name;
                        $names = explode(' ', trim($display_name));
                        $initials = '';
                        if (count($names) >= 2) {
                            $initials = substr($names[0], 0, 1) . substr($names[count($names)-1], 0, 1);
                        } elseif (count($names) == 1) {
                            $initials = substr($names[0], 0, 2);
                        } else {
                            $initials = 'U';
                        }
                        echo strtoupper($initials);
                        ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="dashboard-stats">
        <?php
        $customer_orders = wc_get_orders( array(
            'customer' => get_current_user_id(),
            'limit'    => -1,
        ) );
        
        $total_orders = count( $customer_orders );
        $total_spent = wc_get_customer_total_spent( get_current_user_id() );
        
        // Get recent order
        $recent_orders = wc_get_orders( array(
            'customer' => get_current_user_id(),
            'limit'    => 1,
        ) );
        $recent_order = !empty( $recent_orders ) ? $recent_orders[0] : null;
        ?>
        
        <div class="stat-card">
            <div class="stat-icon orders">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
            </div>
            <div class="stat-content">
                <h3 class="stat-number"><?php echo esc_html( $total_orders ); ?></h3>
                <p class="stat-label">Zamówienia</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon spent">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
            </div>
            <div class="stat-content">
                <h3 class="stat-number"><?php echo wc_price( $total_spent ); ?></h3>
                <p class="stat-label">Łączne wydatki</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon status">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <div class="stat-content">
                <h3 class="stat-number">
                    <?php if ( $recent_order ) : ?>
                        <?php echo esc_html( wc_get_order_status_name( $recent_order->get_status() ) ); ?>
                    <?php else : ?>
                        Brak zamówień
                    <?php endif; ?>
                </h3>
                <p class="stat-label">Ostatnie zamówienie</p>
            </div>
        </div>
    </div>

    <?php if ( $recent_order ) : ?>
    <div class="recent-order-section">
        <h2 class="section-title">Ostatnie zamówienie</h2>
        <div class="order-card">
            <div class="order-header">
                <div class="order-number">
                    <strong>Zamówienie #<?php echo esc_html( $recent_order->get_order_number() ); ?></strong>
                </div>
                <div class="order-date">
                    <?php echo esc_html( $recent_order->get_date_created()->format( 'd.m.Y' ) ); ?>
                </div>
            </div>
            <div class="order-details">
                <div class="order-total">
                    <span class="total-label">Suma:</span>
                    <span class="total-amount"><?php echo wp_kses_post( $recent_order->get_formatted_order_total() ); ?></span>
                </div>
                <div class="order-status status-<?php echo esc_attr( $recent_order->get_status() ); ?>">
                    <?php echo esc_html( wc_get_order_status_name( $recent_order->get_status() ) ); ?>
                </div>
            </div>
            <div class="order-actions">
                <a href="<?php echo esc_url( $recent_order->get_view_order_url() ); ?>" class="btn-view-order">
                    Zobacz szczegóły
                </a>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <div class="quick-actions">
        <h2 class="section-title">Szybkie akcje</h2>
        <div class="action-cards">
            <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>" class="action-card">
                <div class="action-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                </div>
                <div class="action-content">
                    <h3>Moje zamówienia</h3>
                    <p>Przeglądaj historię zakupów</p>
                </div>
            </a>
            
            <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-address' ) ); ?>" class="action-card">
                <div class="action-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div class="action-content">
                    <h3>Adresy</h3>
                    <p>Zarządzaj adresami dostawy</p>
                </div>
            </a>
            
            <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-account' ) ); ?>" class="action-card">
                <div class="action-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div class="action-content">
                    <h3>Ustawienia konta</h3>
                    <p>Edytuj dane osobowe</p>
                </div>
            </a>
        </div>
    </div>

    <!-- Trust section for Polish market -->
    <div class="dashboard-trust-footer">
        <div class="trust-badges">
            <div class="trust-badge">
                <div class="trust-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                </div>
                <div class="trust-content">
                    <h4>Bezpieczne płatności</h4>
                    <p>BLIK, Przelewy24, karty</p>
                </div>
            </div>
            
            <div class="trust-badge">
                <div class="trust-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6-6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z"></path>
                    </svg>
                </div>
                <div class="trust-content">
                    <h4>Ochrona danych</h4>
                    <p>Zgodność z RODO</p>
                </div>
            </div>
            
            <div class="trust-badge">
                <div class="trust-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                </div>
                <div class="trust-content">
                    <h4>Wsparcie klienta</h4>
                    <p>Pomoc 24/7</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.modeo-dashboard-wrapper {
    width: 100%;
}

.dashboard-breadcrumb {
    margin-bottom: 24px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.dashboard-breadcrumb ol {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 8px;
    font-size: 14px;
}

.dashboard-breadcrumb li {
    display: flex;
    align-items: center;
}

.dashboard-breadcrumb a {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s ease;
    font-weight: 500;
}

.dashboard-breadcrumb a:hover {
    color: #cc1616;
}

.dashboard-breadcrumb .separator {
    color: #9ca3af;
    font-weight: 300;
    margin: 0 4px;
}

.dashboard-breadcrumb [aria-current="page"] {
    color: #1f2937;
    font-weight: 600;
}

.modeo-dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
}

.welcome-section {
    flex: 1;
}

.dashboard-title {
    color: #1f2937;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.welcome-emoji {
    font-size: 32px;
    animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    10%, 30%, 50%, 70%, 90% { transform: rotate(14deg); }
    20%, 40%, 60%, 80% { transform: rotate(-8deg); }
}

.dashboard-subtitle {
    color: #6b7280;
    font-size: 16px;
    margin: 8px 0 0 0;
    line-height: 1.5;
}

.security-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%);
    color: #16a34a;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #bbf7d0;
    box-shadow: 0 2px 4px rgba(22, 163, 74, 0.1);
}

.security-icon {
    width: 16px;
    height: 16px;
}

.avatar-status-indicator {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 16px;
    height: 16px;
    background: #22c55e;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-avatar {
    margin-left: 20px;
}

.avatar-container {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #e5e7eb;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.avatar-container:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border-color: #cc1616;
}

.user-avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.avatar-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1px;
}

.dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.stat-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #cc1616 0%, #dc2626 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.12);
    border-color: #cc1616;
}

.stat-card:hover::before {
    transform: scaleX(1);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.stat-icon svg {
    width: 24px;
    height: 24px;
}

.stat-icon.orders {
    background: #fef2f2;
    color: #cc1616;
}

.stat-icon.spent {
    background: #f0fdf4;
    color: #16a34a;
}

.stat-icon.status {
    background: #eff6ff;
    color: #2563eb;
}

.stat-content h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 4px 0;
    line-height: 1;
}

.stat-content p {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
    font-weight: 500;
}

.section-title {
    color: #1f2937;
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;
    letter-spacing: -0.025em;
}

.recent-order-section {
    margin-bottom: 32px;
}

.order-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.order-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}

.order-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.order-number {
    color: #1f2937;
    font-size: 16px;
}

.order-date {
    color: #6b7280;
    font-size: 14px;
}

.order-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
}

.order-total .total-label {
    color: #6b7280;
    font-size: 14px;
    margin-right: 8px;
}

.total-amount {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

.order-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.order-status.status-processing {
    background: #fef3c7;
    color: #d97706;
}

.order-status.status-completed {
    background: #dcfce7;
    color: #16a34a;
}

.order-status.status-pending {
    background: #fee2e2;
    color: #dc2626;
}

.btn-view-order {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(204, 22, 22, 0.3);
    position: relative;
    overflow: hidden;
}

.btn-view-order::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.btn-view-order:hover {
    background: linear-gradient(135deg, #b01313 0%, #c51d1d 100%);
    text-decoration: none;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(204, 22, 22, 0.4);
}

.btn-view-order:hover::before {
    left: 100%;
}

.btn-view-order:active {
    transform: translateY(0);
}

.action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.action-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.action-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #cc1616 0%, #dc2626 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
}

.action-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.12);
    text-decoration: none;
    border-color: #cc1616;
}

.action-card:hover::before {
    transform: scaleX(1);
}

.action-icon {
    width: 48px;
    height: 48px;
    background: #f3f4f6;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #6b7280;
    transition: all 0.2s ease;
}

.action-card:hover .action-icon {
    background: #fef2f2;
    color: #cc1616;
}

.action-icon svg {
    width: 24px;
    height: 24px;
}

.action-content h3 {
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
}

.action-content p {
    color: #6b7280;
    font-size: 14px;
    margin: 0;
}

/* Desktop optimizations */
@media (min-width: 1200px) {
    .modeo-dashboard-wrapper {
        max-width: 1100px;
        margin: 0 auto;
    }
    
    .dashboard-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 40px;
    }
    
    .action-cards {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }
    
    .modeo-dashboard-header {
        margin-bottom: 40px;
        padding-bottom: 32px;
    }
    
    .dashboard-title {
        font-size: 32px;
    }
}

@media (min-width: 769px) and (max-width: 1199px) {
    .dashboard-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
    
    .action-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .modeo-dashboard-header {
        flex-direction: column;
        gap: 20px;
        text-align: left;
    }
    
    .user-avatar {
        margin-left: 0;
        align-self: flex-start;
    }
    
    .dashboard-stats {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .action-cards {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .order-header,
    .order-details {
        flex-direction: column;
        gap: 12px;
        text-align: left;
        align-items: flex-start;
    }
    
    .order-actions {
        text-align: left;
        display: flex;
        justify-content: flex-start;
    }
    
    .recent-order-section {
        text-align: left;
    }
    
    .recent-order-section * {
        text-align: left !important;
    }
}

@media (max-width: 480px) {
    .stat-card,
    .action-card {
        padding: 20px 16px;
    }
    
    .order-card {
        padding: 20px 16px;
    }
    
    .dashboard-title {
        font-size: 24px;
    }
}

/* Trust footer for Polish market confidence */
.dashboard-trust-footer {
    margin-top: 40px;
    padding: 32px 0;
    border-top: 1px solid #e5e7eb;
}

.trust-badges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
}

.trust-badge {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.trust-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #cc1616;
}

.trust-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    color: #cc1616;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.trust-icon svg {
    width: 24px;
    height: 24px;
}

.trust-content h4 {
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
}

.trust-content p {
    color: #6b7280;
    font-size: 14px;
    margin: 0;
}

@media (max-width: 768px) {
    .trust-badges {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .trust-badge {
        padding: 16px;
    }
}
</style>

<?php
/**
 * My Account dashboard.
 */
do_action( 'woocommerce_account_dashboard' );

/**
 * Deprecated woocommerce_before_my_account action.
 */
do_action( 'woocommerce_before_my_account' );

/**
 * Deprecated woocommerce_after_my_account action.
 */
do_action( 'woocommerce_after_my_account' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */