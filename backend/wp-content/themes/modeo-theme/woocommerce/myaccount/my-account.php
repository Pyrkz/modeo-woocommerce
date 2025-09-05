<?php
/**
 * My Account page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-account.php.
 */

defined( 'ABSPATH' ) || exit;

// Add proper body classes for logged-in state
add_filter( 'body_class', function( $classes ) {
    if ( is_user_logged_in() ) {
        $classes[] = 'logged-in';
        $classes[] = 'user-account-page';
    }
    return $classes;
});

get_header(); ?>

<!-- My Account Content -->
<?php if ( is_user_logged_in() ) : ?>
<section class="account-section">
    <div class="account-container">
        <div class="woocommerce-account logged-in-account">
            <div class="account-layout">
                <aside class="account-navigation">
                    <!-- Navigation Header -->
                    <div class="account-nav-header">
                        <h2 class="nav-title">Moje konto</h2>
                    </div>
                    <?php
                    /**
                     * My Account navigation.
                     */
                    do_action( 'woocommerce_account_navigation' ); ?>
                </aside>

                <main class="account-content">
                    <div class="woocommerce-MyAccount-content">
                        <?php
                            /**
                             * My Account content.
                             */
                            do_action( 'woocommerce_account_content' );
                        ?>
                    </div>
                </main>
            </div>
        </div>
    </div>
</section>
<?php else : ?>
<!-- For non-logged-in users, WooCommerce will show the login form -->
<section>
    <div class="woocommerce-account not-logged-in-account">
        <div class="woocommerce">
            <?php
            /**
             * My Account navigation.
             */
            do_action( 'woocommerce_account_navigation' ); ?>

            <div class="woocommerce-MyAccount-content">
                <?php
                    /**
                     * My Account content.
                     */
                    do_action( 'woocommerce_account_content' );
                ?>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<style>
/* COMPLETE RESET FOR LOGGED IN USERS - Override all login form styles */

/* Reset body styles for logged-in users */
body.logged-in {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif !important;
    background: inherit !important;
    overflow-x: visible !important;
    min-height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Reset main containers for logged-in users */
body.logged-in .woocommerce-page-content,
body.logged-in main,
body.logged-in .entry-content,
body.logged-in section,
body.logged-in .woocommerce-account,
body.logged-in .woocommerce {
    max-width: none !important;
    width: auto !important;
    padding: revert !important;
    margin: revert !important;
    background: transparent !important;
    position: static !important;
    left: auto !important;
    right: auto !important;
    transform: none !important;
}

/* Account section layout */
.account-section {
    padding: 120px 0 60px 0 !important;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    min-height: calc(100vh - 140px);
    position: relative;
}


.account-container {
    position: relative;
    z-index: 1;
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 60px 20px !important;
    width: 100% !important;
}

/* Navigation Header */
.account-nav-header {
    padding: 24px 24px 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(135deg, #fafafa 0%, #f8f9fa 100%);
}

.nav-title {
    color: #1f2937;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.025em;
}

.account-layout {
    display: flex;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
    min-height: calc(100vh - 200px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
}

.account-layout:hover {
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.account-navigation {
    width: 280px;
    flex-shrink: 0;
    background: linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%);
    border-right: 1px solid #e5e7eb;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

/* Account nav header removed to eliminate duplication */

.account-content {
    flex: 1;
    padding: 40px;
    overflow: auto;
}

/* Reset woocommerce specific styles for logged-in users */
body.logged-in .woocommerce-account {
    max-width: none !important;
    width: 100% !important;
    background: transparent !important;
}

body.logged-in .woocommerce {
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    position: static !important;
    left: auto !important;
    right: auto !important;
    transform: none !important;
    display: block !important;
    grid-template-columns: none !important;
    grid-gap: 0 !important;
    gap: 0 !important;
}

/* Force reset any WooCommerce grid styles */
body.logged-in .woocommerce-account .woocommerce {
    display: block !important;
    grid: none !important;
}

body.logged-in .logged-in-account {
    display: block !important;
    grid: none !important;
}

/* Reset header styles for logged-in users */
body.logged-in header {
    margin-bottom: revert !important;
}

body.logged-in header + main {
    margin-top: revert !important;
    padding-top: revert !important;
}

/* Completely hide login form elements for logged in users */
body.logged-in .modeo-split-login,
body.logged-in .login-left-side,
body.logged-in .login-right-side,
body.logged-in .welcome-content,
body.logged-in .login-form-container {
    display: none !important;
}

/* Ensure proper WooCommerce account layout */
body.logged-in .woocommerce-MyAccount-navigation,
body.logged-in .woocommerce-MyAccount-content {
    display: block !important;
    width: auto !important;
    max-width: none !important;
    margin: revert !important;
    padding: revert !important;
}

/* Reset any box-sizing issues */
body.logged-in * {
    box-sizing: border-box !important;
}

/* Override any full-width breakout styles */
body.logged-in .py-16 {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
}

/* WooCommerce Navigation Styles */
body.logged-in .woocommerce-MyAccount-navigation {
    flex: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
}

body.logged-in .woocommerce-MyAccount-navigation ul {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
}

body.logged-in .woocommerce-MyAccount-navigation li {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e5e7eb;
    flex: 1;
    display: flex;
}

body.logged-in .woocommerce-MyAccount-navigation li:last-child {
    border-bottom: none;
}

body.logged-in .woocommerce-MyAccount-navigation a {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    flex: 1;
    min-height: 60px;
    font-size: 15px;
}

body.logged-in .woocommerce-MyAccount-navigation a:hover {
    background: linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%);
    color: #374151;
    text-decoration: none;
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

body.logged-in .woocommerce-MyAccount-navigation li.is-active a {
    background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%) !important;
    color: #cc1616 !important;
    text-decoration: none;
    transform: translateX(8px);
    box-shadow: 0 2px 8px rgba(204, 22, 22, 0.2);
    font-weight: 600;
    border-left: 3px solid #cc1616 !important;
}

body.logged-in .woocommerce-MyAccount-navigation a:active {
    transform: translateX(6px) translateY(2px);
}

/* Focus states for accessibility */
body.logged-in .woocommerce-MyAccount-navigation a:focus {
    outline: 2px solid #cc1616;
    outline-offset: 2px;
    background: #f3f4f6;
}

/* Content area adjustments */
body.logged-in .woocommerce-MyAccount-content {
    background: transparent;
    padding: 40px 40px 60px 40px !important;
    width: 100% !important;
    max-width: none !important;
}

/* Orders and downloads pages full width */
body.logged-in .woocommerce-account-orders .woocommerce-MyAccount-content,
body.logged-in .woocommerce-account-downloads .woocommerce-MyAccount-content,
body.logged-in .woocommerce-view-order .woocommerce-MyAccount-content {
    padding: 20px 20px 60px 20px !important;
}

/* Mobile responsiveness for account layout */
@media (max-width: 768px) {
    .account-layout {
        flex-direction: column;
        min-height: auto;
    }
    
    .account-navigation {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .account-content {
        padding: 20px;
    }
    
    body.logged-in .woocommerce-MyAccount-navigation {
        padding: 20px 0;
    }
    
    body.logged-in .woocommerce-MyAccount-navigation a {
        padding: 12px 20px;
        font-size: 14px;
    }
    
    /* Reduce top padding on mobile */
    .account-section {
        padding: 80px 0 40px 0 !important;
    }
    
    /* Reduce padding on mobile */
    .account-container {
        padding: 40px 16px !important;
    }
    
    body.logged-in .woocommerce-MyAccount-content {
        padding: 40px 20px 40px 20px !important;
    }
    
    body.logged-in .woocommerce-account-orders .woocommerce-MyAccount-content,
    body.logged-in .woocommerce-account-downloads .woocommerce-MyAccount-content,
    body.logged-in .woocommerce-view-order .woocommerce-MyAccount-content {
        padding: 20px 16px 40px 16px !important;
    }
    
    
}

/* Hide admin bar - this is for customers, not admins */
body.logged-in #wpadminbar {
    display: none !important;
}

/* Mobile responsive for navigation header */
@media (max-width: 768px) {
    .account-nav-header {
        padding: 20px 16px 16px 16px;
    }
    
    .nav-title {
        font-size: 16px;
    }
}

</style>

<?php get_footer(); ?>