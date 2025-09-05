<?php
/**
 * My Account navigation
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/navigation.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

do_action( 'woocommerce_before_account_navigation' );
?>

<nav class="woocommerce-MyAccount-navigation">
    <ul class="modeo-account-menu">
        <?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
            <li class="<?php echo wc_get_account_menu_item_classes( $endpoint ); ?>">
                <a href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>" class="modeo-account-menu-link">
                    <?php 
                    // Add icons based on endpoint
                    $icon = '';
                    switch($endpoint) {
                        case 'dashboard':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14l-4-2-4 2V5z"></path>
                                    </svg>';
                            break;
                        case 'orders':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>';
                            break;
                        case 'downloads':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>';
                            break;
                        case 'edit-address':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>';
                            break;
                        case 'payment-methods':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>';
                            break;
                        case 'edit-account':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>';
                            break;
                        case 'customer-logout':
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>';
                            break;
                        default:
                            $icon = '<svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>';
                            break;
                    }
                    echo $icon;
                    echo esc_html( $label );
                    ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>

<style>
/* Navigation specific styles that complement main CSS */

.modeo-account-menu {
    list-style: none;
    margin: 0;
    padding: 8px 0;
}

.modeo-account-menu li {
    margin: 0;
    padding: 0;
}

.modeo-account-menu-link {
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    gap: 14px;
    padding: 20px 20px;
    color: #6b7280;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    width: 100%;
    box-sizing: border-box;
}

/* Hover and active styles are handled in my-account.php to avoid conflicts */

.menu-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.woocommerce-MyAccount-content {
    flex: 1;
    background: white;
    padding: 32px;
}

/* Cleaned up - main styles moved to style.css */

/* Fix double border issue on desktop */
@media (min-width: 768px) {
    .woocommerce-MyAccount-navigation-link {
        border-left: none !important;
    }
    
    .modeo-account-menu-link {
        border-left: 3px solid transparent !important;
    }
    
    .modeo-account-menu li.is-active .modeo-account-menu-link {
        border-left-color: #cc1616 !important;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .woocommerce-account {
        flex-direction: column;
        margin: 10px;
        border-radius: 8px;
    }
    
    .woocommerce-MyAccount-navigation {
        min-width: 100%;
        max-width: 100%;
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .modeo-account-menu {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 4px;
        padding: 16px;
    }
    
    .modeo-account-menu-link {
        padding: 12px 8px;
        border-radius: 8px;
        border-left: none;
        gap: 8px;
    }
    
    .modeo-account-menu li.is-active .modeo-account-menu-link {
        background: #fef2f2;
        border-left: none;
        border-radius: 8px;
    }
    
    .woocommerce-MyAccount-content {
        padding: 20px;
    }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .modeo-account-menu-link {
        padding: 16px 16px;
        font-size: 14px;
        gap: 12px;
    }
    
    .menu-icon {
        width: 16px;
        height: 16px;
    }
}

@media (max-width: 480px) {
    .modeo-account-menu-link {
        font-size: 13px;
        padding: 14px 12px;
        gap: 10px;
    }
    
    .menu-icon {
        width: 14px;
        height: 14px;
    }
}
</style>

<?php do_action( 'woocommerce_after_account_navigation' ); ?>