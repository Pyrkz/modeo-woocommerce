<?php
/**
 * Modeo Theme Functions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
function modeo_theme_setup() {
    // Add theme support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // Add post thumbnails
    add_theme_support('post-thumbnails');
    
    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'modeo_theme_setup');

// Enqueue scripts and styles
function modeo_theme_scripts() {
    // Main stylesheet with version to force reload + timestamp
    wp_enqueue_style('modeo-style', get_stylesheet_uri(), array(), '1.3.' . time());
    
    // Sidebar cart styles - load after main theme styles
    wp_enqueue_style('sidebar-cart', get_template_directory_uri() . '/assets/css/sidebar-cart.css', array('modeo-style'), '1.0.' . time());
    
    // Checkout styles - only on checkout page
    if (is_checkout()) {
        wp_enqueue_style('modeo-checkout', get_template_directory_uri() . '/woocommerce/checkout-styles.css', array(), '1.0.' . time());
    }
    
    // Enqueue jQuery for scripts
    wp_enqueue_script('jquery');
    
    // Sidebar cart script
    wp_enqueue_script('sidebar-cart', get_template_directory_uri() . '/assets/js/sidebar-cart.js', array('jquery'), '1.0.' . time(), true);
    
    // Localize checkout URL for JavaScript
    wp_localize_script('sidebar-cart', 'wc_cart_vars', array(
        'checkout_url' => wc_get_checkout_url(),
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wc_store_api')
    ));
    
    // JavaScript is handled in footer.php to avoid conflicts
    
    // Custom CSS for better UX
    $custom_css = "
        /* CSS Variables for theme colors */
        :root {
            --color-primary: #cc1616;
            --color-primary-hover: #b01313;
            --color-gray-50: #f9fafb;
            --color-gray-200: #e5e7eb;
            --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
        
        /* Remove text decoration from all header links */
        header a, header a:hover, header a:focus, header a:active,
        .no-underline, .no-underline:hover, .no-underline:focus, .no-underline:active {
            text-decoration: none !important;
        }
        
        /* Navigation links styling */
        header nav a, header .dropdown-menu a {
            text-decoration: none !important;
        }
        
        /* Header-specific styles to match Next.js */
        .animate-scale-in {
            animation: scaleIn 0.2s ease-out;
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .rotate-180 {
            transform: rotate(180deg);
        }
        
        .transition-transform {
            transition: transform 0.2s ease-in-out;
        }
        
        .transition-all {
            transition: all 0.2s ease-in-out;
        }
        
        .duration-200 {
            transition-duration: 200ms;
        }
        
        /* Tailwind-compatible focus ring system */
        .focus\\:ring-2:focus {
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(204 22 22 / 0.2);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }
        
        .focus\\:ring-primary:focus {
            --tw-ring-color: rgb(204 22 22 / 0.2);
        }
        
        .focus\\:ring-opacity-20:focus {
            --tw-ring-color: rgb(204 22 22 / 0.2) !important;
        }
        
        .focus\\:ring-opacity-50:focus {
            --tw-ring-color: rgb(204 22 22 / 0.5) !important;
        }
        
        /* Extra subtle focus for user dropdown button - very light */
        .dropdown-toggle:focus {
            --tw-ring-color: rgb(204 22 22 / 0.1) !important;
        }
        
        /* Remove default button styles for header buttons */
        header button {
            background: transparent;
            border: none;
            padding: 0;
            margin: 0;
            font: inherit;
            cursor: pointer;
        }
        
        .dropdown-toggle {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
        
        .focus\\:outline-none:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
        }
        
        /* Tailwind-like utility classes - Force display over WordPress CSS */
        .flex { display: flex !important; }
        .items-center { align-items: center !important; }
        .justify-between { justify-content: space-between !important; }
        .justify-center { justify-content: center !important; }
        .inline-flex { display: inline-flex !important; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .space-x-8 > * + * { margin-left: 2rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-800 { color: #1f2937; }
        .text-gray-900 { color: #111827; }
        .text-red-600 { color: #dc2626; }
        .text-red-700 { color: #b91c1c; }
        .text-primary { color: var(--color-primary); }
        .text-white { color: white; }
        .bg-primary { background-color: var(--color-primary); }
        .bg-primary-hover { background-color: var(--color-primary-hover); }
        .bg-white { background-color: white; }
        .bg-gray-50 { background-color: var(--color-gray-50); }
        .bg-red-50 { background-color: #fef2f2; }
        .hover\\:text-primary:hover { color: var(--color-primary); }
        .hover\\:bg-primary-hover:hover { background-color: var(--color-primary-hover); }
        .hover\\:bg-gray-50:hover { background-color: var(--color-gray-50); }
        .hover\\:bg-red-50:hover { background-color: #fef2f2; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-full { border-radius: 9999px; }
        .border-t { border-top-width: 1px; }
        .border-gray-200 { border-color: var(--color-gray-200); }
        .shadow { box-shadow: var(--shadow); }
        .min-w-\\[1\\.25rem\\] { min-width: 1.25rem; }
        .text-center { text-align: center; }
        .transition-colors { transition-property: color, background-color; transition-duration: 0.2s; }
        .inline-flex { display: inline-flex; }
        .w-4 { width: 1rem; }
        .h-4 { height: 1rem; }
        .w-5 { width: 1.25rem; }
        .h-5 { height: 1.25rem; }
        .w-6 { width: 1.5rem; }
        .h-6 { height: 1.5rem; }
        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .-top-1 { top: -0.25rem; }
        .-right-1 { right: -0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .px-1\\.5 { padding-left: 0.375rem; padding-right: 0.375rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .leading-none { line-height: 1; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .z-50 { z-index: 50; }
        .min-w-48 { min-width: 12rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1); }
        .border { border-width: 1px; }
        .border-b { border-bottom-width: 1px; }
        .border-gray-100 { border-color: #f3f4f6; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
        .max-w-7xl { max-width: 80rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .h-16 { height: 4rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .cursor-pointer { cursor: pointer; }
        .mt-4 { margin-top: 1rem; }
        .mt-auto { margin-top: auto; }
        .min-h-screen { min-height: 100vh; }
        .flex-col { flex-direction: column; }
        .antialiased { -webkit-font-smoothing: antialiased; }
        .hidden { display: none !important; }
        .block { display: block !important; }
        
        @media (min-width: 640px) {
            .sm\\:block { display: block !important; }
            .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        
        @media (min-width: 768px) {
            .md\\:flex { display: flex !important; }
            .md\\:hidden { display: none !important; }
            .md\\:block { display: block !important; }
        }
        
        @media (min-width: 1024px) {
            .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
        }
        
        /* Hide WordPress branding */
        #wpadminbar { display: none !important; }
        html { margin-top: 0 !important; }
        
        /* Hide Coming Soon for logged out users */
        .woocommerce-store-notice { display: none; }
        
        /* Modern account page */
        .woocommerce-account .entry-header { display: none; }
        .woocommerce-account .entry-content { 
            padding: 0; 
            margin: 0;
        }
        
        /* Account page container */
        .woocommerce-account .woocommerce {
            background: transparent;
            padding: 20px 0;
        }
        
        /* Clean checkout */
        .woocommerce-checkout .entry-header { display: none; }
        
        /* Hide default WooCommerce notices in account area */
        .woocommerce-account .woocommerce-notices-wrapper {
            margin: 20px 0;
        }
        
        /* Ensure body doesn't have extra margins and can scroll */
        .woocommerce-account {
            margin: 0;
            padding: 0;
        }
        
        /* Fix scrolling issues */
        html, body {
            overflow-x: hidden;
            overflow-y: auto !important;
            height: auto !important;
            min-height: 100vh;
        }
        
        /* Remove containers and backgrounds that interfere with full-width layout */
        .woocommerce-account article,
        .woocommerce-account main,
        .woocommerce-account .site-main,
        .woocommerce-account .content-area,
        .woocommerce-checkout article,
        .woocommerce-checkout main,
        .woocommerce-checkout .site-main,
        .woocommerce-checkout .content-area {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: none !important;
            width: 100% !important;
        }
        
        /* Ensure full-width for e-commerce pages */
        .woocommerce-page-content {
            margin: 0 !important;
            padding: 0 !important;
            max-width: none !important;
            width: 100% !important;
        }
        
        /* Remove any default WordPress content wrappers */
        .woocommerce-account #primary,
        .woocommerce-checkout #primary,
        .woocommerce-cart #primary {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
        }
        
        /* Ensure header sticks to top with no gaps */
        body.woocommerce-account,
        body.woocommerce-checkout,
        body.woocommerce-cart {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        /* My Account page with header/footer styling - for all users */
        .woocommerce-account .woocommerce {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .woocommerce-account .woocommerce-account {
            background: #f9fafb;
            min-height: calc(100vh - 140px); /* Adjust for header/footer height */
        }
        
        /* Styles for logged-in users (dashboard, navigation, etc.) */
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 0;
            margin-bottom: 2rem;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul li {
            border-bottom: 1px solid #f3f4f6;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul li:last-child {
            border-bottom: none;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul li a {
            display: block;
            padding: 1rem 1.5rem;
            color: #4b5563;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul li.is-active a,
        .woocommerce-account.logged-in .woocommerce-MyAccount-navigation ul li a:hover {
            color: #cc1616;
            background-color: #fef2f2;
        }
        
        .woocommerce-account.logged-in .woocommerce-MyAccount-content {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 2rem;
            min-height: 400px;
        }
        
        /* Container for my account pages */
        .woocommerce-account .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) {
            .woocommerce-account .container {
                padding: 0 1.5rem;
            }
        }
        
        @media (min-width: 1024px) {
            .woocommerce-account .container {
                padding: 0 2rem;
            }
        }
        
        /* Grid layout for account navigation and content (logged-in users only) */
        .woocommerce-account.logged-in .woocommerce {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .woocommerce-account.logged-in .woocommerce {
                grid-template-columns: 1fr;
            }
            
            .woocommerce-account.logged-in .woocommerce-MyAccount-navigation {
                order: 2;
                margin-bottom: 0;
                margin-top: 2rem;
            }
            
            .woocommerce-account.logged-in .woocommerce-MyAccount-content {
                order: 1;
            }
        }
        
        /* Login/Register pages styles - full width without padding */
        .woocommerce-account:not(.logged-in) .woocommerce-page-content {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .woocommerce-account:not(.logged-in) main {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .woocommerce-account:not(.logged-in) .entry-content {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* Remove any section padding for login/register forms */
        .woocommerce-account:not(.logged-in) section {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* Ensure no gaps between header and login form */
        .woocommerce-account:not(.logged-in) header + * {
            margin-top: 0 !important;
        }
        
        /* Remove all spacing around header and main content */
        .woocommerce-account:not(.logged-in) header {
            margin-bottom: 0 !important;
            border-bottom: none !important;
        }
        
        .woocommerce-account:not(.logged-in) main {
            margin-top: 0 !important;
            padding-top: 0 !important;
        }
        
        /* Ensure login forms break out of containers */
        .woocommerce-account:not(.logged-in) .container {
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* Remove any spacing around login forms */
        .woocommerce-account:not(.logged-in) .woocommerce-account {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
        }
        
        /* Remove body padding for login pages */
        body.woocommerce-account:not(.logged-in) {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* Force full width breakout for containers but preserve layout elements */
        body.woocommerce-account:not(.logged-in) .woocommerce-page-content,
        body.woocommerce-account:not(.logged-in) .entry-content,
        body.woocommerce-account:not(.logged-in) section,
        body.woocommerce-account:not(.logged-in) .woocommerce-account,
        body.woocommerce-account:not(.logged-in) .woocommerce {
            max-width: none !important;
            width: 100% !important;
        }
        
        /* Split layout styling - clean CSS */
        body.woocommerce-account:not(.logged-in) .modeo-split-login {
            display: flex !important;
            width: 100vw !important;
        }
        
        body.woocommerce-account:not(.logged-in) .login-left-side {
            width: 50% !important;
            background: #cc1616 !important;
            display: flex !important;
            flex-shrink: 0 !important;
        }
        
        body.woocommerce-account:not(.logged-in) .login-right-side {
            width: 50% !important;
            background: #ffffff !important;
            display: flex !important;
            flex-shrink: 0 !important;
        }
        
        /* Override any theme container constraints */
        body.woocommerce-account:not(.logged-in) .site-content,
        body.woocommerce-account:not(.logged-in) .content-area,
        body.woocommerce-account:not(.logged-in) #primary,
        body.woocommerce-account:not(.logged-in) #main {
            max-width: none !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* Nuclear option - remove all possible spacing elements */
        body.woocommerce-account:not(.logged-in) .woocommerce-notices-wrapper,
        body.woocommerce-account:not(.logged-in) .woocommerce-error,
        body.woocommerce-account:not(.logged-in) .woocommerce-message,
        body.woocommerce-account:not(.logged-in) .woocommerce-info {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }
        
        /* Ensure header shadow doesn't create visual gap */
        body.woocommerce-account:not(.logged-in) header {
            box-shadow: none !important;
        }
        
        /* Form element consistency and layout fixes */
        body.woocommerce-account:not(.logged-in) input,
        body.woocommerce-account:not(.logged-in) button,
        body.woocommerce-account:not(.logged-in) select,
        body.woocommerce-account:not(.logged-in) textarea {
            box-sizing: border-box !important;
        }
        
        body.woocommerce-account:not(.logged-in) input[type=\"checkbox\"] {
            margin: 0 !important;
            padding: 0 !important;
            width: 16px !important;
            height: 16px !important;
            flex-shrink: 0 !important;
        }
        
        /* Prevent theme/plugin style interference */
        body.woocommerce-account:not(.logged-in) .woocommerce-form-row {
            margin: 0 0 20px 0 !important;
        }
        
        body.woocommerce-account:not(.logged-in) .form-row-remember {
            margin-bottom: 24px !important;
        }
        
        /* Back to store styles removed */
    ";
    // Global WooCommerce input styles - Standard rounded inputs
    $wc_input_styles = "
        /* Global WooCommerce Input Styles - Rounded Border Design */
        .woocommerce-Input,
        .woocommerce input[type='text'],
        .woocommerce input[type='email'],
        .woocommerce input[type='password'],
        .woocommerce input[type='tel'],
        .woocommerce input[type='number'],
        .woocommerce textarea,
        .woocommerce select {
            width: 100% !important;
            padding: 12px 16px !important;
            background: #ffffff !important;
            border: 2px solid #e5e7eb !important;
            border-radius: 8px !important;
            font-size: 1.125rem !important;
            line-height: 1.75rem !important;
            font-family: inherit;
            transition: all 300ms ease !important;
            box-shadow: none !important;
            color: #111827 !important;
        }

        .woocommerce-Input:focus,
        .woocommerce input[type='text']:focus,
        .woocommerce input[type='email']:focus,
        .woocommerce input[type='password']:focus,
        .woocommerce input[type='tel']:focus,
        .woocommerce input[type='number']:focus,
        .woocommerce textarea:focus,
        .woocommerce select:focus {
            outline: none !important;
            border-color: #4b5563 !important;
            box-shadow: none !important;
        }

        .woocommerce-Input:hover,
        .woocommerce input[type='text']:hover,
        .woocommerce input[type='email']:hover,
        .woocommerce input[type='password']:hover,
        .woocommerce input[type='tel']:hover,
        .woocommerce input[type='number']:hover,
        .woocommerce textarea:hover,
        .woocommerce select:hover {
            border-color: #d1d5db !important;
        }

        .woocommerce-Input::placeholder,
        .woocommerce input[type='text']::placeholder,
        .woocommerce input[type='email']::placeholder,
        .woocommerce input[type='password']::placeholder,
        .woocommerce input[type='tel']::placeholder,
        .woocommerce input[type='number']::placeholder,
        .woocommerce textarea::placeholder {
            /* Exact Next.js placeholder: placeholder-gray-500 text-lg */
            color: #6b7280 !important;
            font-size: 1.125rem !important;
            line-height: 1.75rem !important;
        }

        /* Label styles to match Next.js exactly */
        .woocommerce-form-row label,
        .woocommerce label {
            /* Exact Next.js label: block text-sm font-medium text-gray-700 */
            display: block !important;
            font-size: 0.875rem !important;
            line-height: 1.25rem !important;
            font-weight: 500 !important;
            color: #374151 !important;
            margin-bottom: 0.5rem !important;
        }
        
        /* Override WooCommerce select styling to match underline design */
        .woocommerce select {
            background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4 5\"><path fill=\"%234b5563\" d=\"M2 0L0 2h4zm0 5L0 3h4z\"/></svg>') !important;
            background-repeat: no-repeat !important;
            background-position: right 0 center !important;
            background-size: 12px 15px !important;
            padding-right: 24px !important;
        }
        
        /* Textarea specific adjustments */
        .woocommerce textarea {
            min-height: 120px !important;
            resize: vertical !important;
            padding: 1rem 0 !important;
            line-height: 1.5 !important;
        }
        
        /* Error state styles */
        .woocommerce-Input.woocommerce-invalid,
        .woocommerce input.woocommerce-invalid {
            border-bottom-color: #ef4444 !important;
        }
        
        .woocommerce-Input.woocommerce-invalid:focus,
        .woocommerce input.woocommerce-invalid:focus {
            border-bottom-color: #ef4444 !important;
        }
    ";

    wp_add_inline_style('modeo-style', $custom_css . $wc_input_styles);
}
add_action('wp_enqueue_scripts', 'modeo_theme_scripts');

// Disable admin bar for non-admins
add_filter('show_admin_bar', function($show) {
    return current_user_can('administrator');
});

// Back to store link removed per user request

// WooCommerce login redirect handled by nextjs-login-redirect plugin

// Customize registration redirect
add_filter('woocommerce_registration_redirect', function($redirect_url) {
    return wc_get_page_permalink('myaccount');
});

// Logout redirect is now handled by unified-login-redirect plugin

// Remove default WooCommerce styles (opcjonalnie)
add_filter('woocommerce_enqueue_styles', function($styles) {
    // Zachowaj tylko podstawowe style
    unset($styles['woocommerce-layout']);
    unset($styles['woocommerce-smallscreen']);
    return $styles;
});

// Custom login/register messages and Polish translations for account menu
add_filter('woocommerce_account_menu_items', function($items) {
    // Polish translations for account menu items
    $translated_items = array();
    foreach ($items as $endpoint => $label) {
        switch($endpoint) {
            case 'dashboard':
                $translated_items[$endpoint] = 'Moje konto';
                break;
            case 'orders':
                $translated_items[$endpoint] = 'Zamówienia';
                break;
            case 'downloads':
                $translated_items[$endpoint] = 'Pliki do pobrania';
                break;
            case 'edit-address':
                $translated_items[$endpoint] = 'Adresy';
                break;
            case 'payment-methods':
                $translated_items[$endpoint] = 'Płatności';
                break;
            case 'edit-account':
                $translated_items[$endpoint] = 'Ustawienia';
                break;
            case 'customer-logout':
                $translated_items[$endpoint] = 'Wyloguj';
                break;
            default:
                $translated_items[$endpoint] = $label;
                break;
        }
    }
    return $translated_items;
});

// Hide "Shop Manager" and other roles from registration
add_action('woocommerce_created_customer', function($customer_id) {
    // Zawsze ustaw rolę customer dla nowych użytkowników
    $user = new WP_User($customer_id);
    $user->set_role('customer');
});

// Include attribute swatches functionality
require_once get_template_directory() . '/inc/class-attribute-swatches.php';
Modeo_Attribute_Swatches::get_instance();

// Include reCAPTCHA functionality for reviews and replies
require_once get_template_directory() . '/inc/class-modeo-recaptcha.php';
Modeo_Recaptcha::get_instance();

// Include optimized reviews system
require_once get_template_directory() . '/inc/class-modeo-reviews-optimized.php';

// Include modern admin dashboard - WYŁĄCZONE: użyj wtyczki Modeo Admin Styling zamiast tego
// require_once get_template_directory() . '/inc/class-admin-dashboard.php';

// Custom checkout styling handled by template files
// Removed duplicate checkout CSS to prevent conflicts

// Fix WordPress Cron issues for development environment
add_action('init', function() {
    // Force WordPress to run missed cron jobs
    if (defined('WP_DEBUG') && WP_DEBUG) {
        // In development, run cron more frequently
        if (!wp_next_scheduled('wp_version_check')) {
            wp_schedule_event(time(), 'hourly', 'wp_version_check');
        }
        
        // Clear any stuck cron jobs older than 24 hours
        $cron_array = _get_cron_array();
        if ($cron_array) {
            $now = time();
            foreach ($cron_array as $timestamp => $cronhooks) {
                if ($timestamp < ($now - DAY_IN_SECONDS)) {
                    foreach ($cronhooks as $hook => $keys) {
                        foreach ($keys as $key => $data) {
                            wp_unschedule_event($timestamp, $hook, $data['args']);
                        }
                    }
                }
            }
        }
    }
});

// Ensure WooCommerce cron jobs run properly
add_filter('cron_schedules', function($schedules) {
    $schedules['every_five_minutes'] = array(
        'interval' => 300,
        'display' => __('Every 5 Minutes')
    );
    return $schedules;
});

// Add development cron trigger
add_action('wp_footer', function() {
    if (defined('WP_DEBUG') && WP_DEBUG && !wp_doing_ajax()) {
        // Trigger cron on frontend visits in development
        echo '<script>
        if (typeof jQuery !== "undefined") {
            jQuery(document).ready(function($) {
                // Trigger cron check every 5 minutes in background
                if (Math.random() < 0.1) { // 10% chance
                    $.get("' . admin_url('admin-ajax.php') . '", {
                        action: "wp_cron_check"
                    });
                }
            });
        }
        </script>';
    }
});

// AJAX handler for cron check
add_action('wp_ajax_wp_cron_check', function() {
    spawn_cron();
    wp_die();
});

add_action('wp_ajax_nopriv_wp_cron_check', function() {
    spawn_cron();
    wp_die();
});

/**
 * Configure avatar/Gravatar settings for better user experience
 */
function modeo_configure_avatars() {
    // Ensure show_avatars is enabled
    if (!get_option('show_avatars')) {
        update_option('show_avatars', '1');
    }
    
    // Set avatar default to 'identicon' for better fallback when Gravatar not available
    if (get_option('avatar_default') === 'mystery') {
        update_option('avatar_default', 'identicon');
    }
}
add_action('init', 'modeo_configure_avatars');

/**
 * Enhance avatar display with better fallbacks
 */
function modeo_enhanced_avatar_url($url, $id_or_email, $args) {
    // If no Gravatar is found, we'll handle fallback in the template
    return $url;
}
add_filter('get_avatar_url', 'modeo_enhanced_avatar_url', 10, 3);

?>