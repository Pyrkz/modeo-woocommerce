<?php
/**
 * Modern Admin Dashboard Styling
 * 
 * Enhances WordPress admin interface with modern, clean design
 * while maintaining full functionality and performance
 */

if (!defined('ABSPATH')) {
    exit;
}

class Modeo_Admin_Dashboard {
    
    private static $instance = null;
    
    /**
     * Get instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        // Only load for admin area
        if (is_admin()) {
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_styles'));
            add_action('admin_head', array($this, 'add_admin_styles'));
            add_action('admin_head', array($this, 'fix_js_display'), 999);
            add_filter('admin_footer_text', array($this, 'custom_admin_footer'));
            add_action('wp_dashboard_setup', array($this, 'customize_dashboard_widgets'));
            add_action('admin_bar_menu', array($this, 'customize_admin_bar'), 999);
        }
    }
    
    /**
     * Enqueue admin styles and scripts
     */
    public function enqueue_admin_styles($hook) {
        // Add Google Fonts for better typography
        wp_enqueue_style(
            'modeo-admin-fonts', 
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            array(),
            '1.0.0'
        );
        
        // Add admin JavaScript for enhanced interactions
        wp_add_inline_script('jquery', '
            jQuery(document).ready(function($) {
                // Smooth scrolling for anchor links (but not admin menu links)
                $("a[href^=\'#\']:not(#adminmenu a)").on("click", function(e) {
                    var target = $(this.getAttribute("href"));
                    if (target.length) {
                        e.preventDefault();
                        $("html, body").animate({
                            scrollTop: target.offset().top - 50
                        }, 300);
                    }
                });
                
                // Enhanced hover effects for menu items
                $("#adminmenu li.menu-top").hover(
                    function() {
                        $(this).addClass("modeo-menu-hover");
                    },
                    function() {
                        $(this).removeClass("modeo-menu-hover");
                    }
                );
                
                // Add loading states for forms
                $("form").on("submit", function() {
                    var submitBtn = $(this).find("input[type=submit], button[type=submit]");
                    submitBtn.addClass("modeo-loading").prop("disabled", true);
                });
                
                // Ensure submenu links are clickable
                $("#adminmenu .wp-submenu a").on("click", function(e) {
                    // Let the link work normally, just ensure it is not blocked
                    e.stopPropagation();
                });
                
                // Add click-to-toggle functionality for submenus
                $("#adminmenu li.menu-top.wp-has-submenu > a").on("click", function(e) {
                    var $menuItem = $(this).parent();
                    
                    // Don\'t interfere with current page navigation
                    if ($menuItem.hasClass("wp-has-current-submenu")) {
                        return true; // Let normal navigation work
                    }
                    
                    // Prevent navigation for non-current items
                    e.preventDefault();
                    
                    // Close other open submenus
                    $("#adminmenu li.wp-menu-open").not($menuItem).removeClass("wp-menu-open");
                    
                    // Toggle current submenu
                    $menuItem.toggleClass("wp-menu-open");
                    
                    return false;
                });
                
                // Fix for content visibility issues
                function forceContentVisibility() {
                    // Make sure all content is visible immediately
                    $("#wpbody-content, .wrap, .wp-list-table, .tablenav, .subsubsub").css({
                        "opacity": "1",
                        "visibility": "visible",
                        "display": "block",
                        "transform": "none"
                    });
                    
                    // Force table content to be visible
                    $(".wp-list-table tbody tr, .wp-list-table tbody td").css({
                        "opacity": "1",
                        "visibility": "visible"
                    });
                    
                    // WooCommerce specific elements
                    $(".woocommerce-layout__primary, .woocommerce-layout__header, .components-card").css({
                        "opacity": "1",
                        "visibility": "visible",
                        "transform": "none"
                    });
                }
                
                // Run immediately and on DOM changes
                forceContentVisibility();
                setTimeout(forceContentVisibility, 100);
                setTimeout(forceContentVisibility, 500);
                
                // Watch for new content being added (like AJAX loading)
                var observer = new MutationObserver(function(mutations) {
                    forceContentVisibility();
                });
                observer.observe(document.body, { childList: true, subtree: true });
                
                // Fix for malformed JavaScript display
                function hideJavaScriptText() {
                    // Find and hide text nodes containing CDATA blocks
                    $("body").contents().filter(function() {
                        return this.nodeType === 3 && 
                               (this.textContent.includes("/* <![CDATA[ */") || 
                                this.textContent.includes("/* ]]> */") ||
                                this.textContent.includes("jQuery( \'a.delete\' )"));
                    }).remove();
                    
                    // Hide any visible script tags that should not be displayed
                    $("script:not([src])").hide();
                }
                
                // Run immediately and periodically
                hideJavaScriptText();
                setInterval(hideJavaScriptText, 1000);
            });
        ');
    }
    
    /**
     * Add modern admin styles
     */
    public function add_admin_styles() {
        ?>
        <style>
        /* ===============================
           MODEO MODERN ADMIN DASHBOARD
           =============================== */
        
        /* CSS Variables for consistent theming */
        :root {
            --modeo-primary: #2271b1;
            --modeo-primary-dark: #135e96;
            --modeo-success: #00a32a;
            --modeo-warning: #dba617;
            --modeo-danger: #d63638;
            --modeo-gray-50: #f9fafb;
            --modeo-gray-100: #f3f4f6;
            --modeo-gray-200: #e5e7eb;
            --modeo-gray-300: #d1d5db;
            --modeo-gray-400: #9ca3af;
            --modeo-gray-500: #6b7280;
            --modeo-gray-600: #4b5563;
            --modeo-gray-700: #374151;
            --modeo-gray-800: #1f2937;
            --modeo-gray-900: #111827;
            --modeo-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --modeo-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --modeo-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        /* ===============================
           TYPOGRAPHY & BASE STYLES
           =============================== */
        
        body, #wpwrap, #wpcontent, #wpbody-content {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            background-color: var(--modeo-gray-50) !important;
        }
        
        /* ===============================
           ADMIN BAR IMPROVEMENTS
           =============================== */
        
        #wpadminbar {
            background: linear-gradient(90deg, var(--modeo-gray-800) 0%, var(--modeo-gray-900) 100%) !important;
            box-shadow: var(--modeo-shadow-md) !important;
            height: 40px !important;
        }
        
        #wpadminbar .ab-top-menu > li > .ab-item {
            height: 40px !important;
            line-height: 40px !important;
            transition: all 0.2s ease !important;
        }
        
        #wpadminbar .ab-top-menu > li:hover > .ab-item {
            background: rgba(255, 255, 255, 0.1) !important;
        }
        
        /* ===============================
           SIDEBAR MENU - DARK MODE
           =============================== */
        
        /* Increase sidebar width for better submenu display */
        #adminmenuwrap {
            width: 180px !important;
        }
        
        @media only screen and (max-width: 960px) {
            #adminmenuwrap {
                width: 160px !important;
            }
        }
        
        #adminmenu {
            background: linear-gradient(180deg, var(--modeo-gray-800) 0%, var(--modeo-gray-900) 100%) !important;
            box-shadow: var(--modeo-shadow-lg) !important;
            border-radius: 0 12px 12px 0 !important;
            margin-top: 8px !important;
            width: 100% !important;
        }
        
        #adminmenu li.menu-top {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            transition: all 0.2s ease !important;
        }
        
        #adminmenu li.menu-top:last-child {
            border-bottom: none !important;
        }
        
        #adminmenu li.menu-top > a {
            padding: 8px 12px !important;
            border-radius: 8px !important;
            margin: 2px 6px !important;
            transition: all 0.2s ease !important;
            color: rgba(255, 255, 255, 0.9) !important;
            min-height: auto !important;
        }
        
        #adminmenu li.menu-top:hover > a,
        #adminmenu li.menu-top.modeo-menu-hover > a {
            background: rgba(255, 255, 255, 0.1) !important;
            transform: translateX(3px) !important;
            box-shadow: var(--modeo-shadow) !important;
            color: #ffffff !important;
        }
        
        #adminmenu li.current > a,
        #adminmenu li.wp-has-current-submenu > a {
            background: var(--modeo-primary) !important;
            border-radius: 8px !important;
            margin: 2px 6px !important;
            box-shadow: var(--modeo-shadow-md) !important;
            color: #ffffff !important;
        }
        
        #adminmenu .wp-menu-name {
            font-weight: 500 !important;
            font-size: 13px !important;
            color: rgba(255, 255, 255, 0.9) !important;
            line-height: 1.3 !important;
        }
        
        #adminmenu .dashicons-before:before {
            font-size: 16px !important;
            width: 16px !important;
            color: rgba(255, 255, 255, 0.8) !important;
        }
        
        #adminmenu li.current .dashicons-before:before,
        #adminmenu li.wp-has-current-submenu .dashicons-before:before {
            color: #ffffff !important;
        }
        
        #adminmenu li:hover .dashicons-before:before {
            color: #ffffff !important;
        }
        
        /* Submenu styling for dark mode - inline style */
        #adminmenu .wp-submenu {
            background: var(--modeo-gray-700) !important;
            border-radius: 8px !important;
            margin: 4px 6px 8px 6px !important;
            box-shadow: inset var(--modeo-shadow) !important;
            padding: 8px 4px !important;
            position: static !important;
            left: auto !important;
            top: auto !important;
            display: block !important;
            width: auto !important;
            min-width: auto !important;
            border: none !important;
        }
        
        /* Hide submenu by default */
        #adminmenu li.menu-top .wp-submenu {
            display: none !important;
        }
        
        /* Only show submenu for current/active section - NO HOVER */
        #adminmenu li.wp-has-current-submenu .wp-submenu,
        #adminmenu li.current .wp-submenu,
        #adminmenu li.wp-has-submenu.wp-menu-open .wp-submenu {
            display: block !important;
        }
        
        /* Add click functionality to toggle submenu */
        #adminmenu li.menu-top.wp-has-submenu > a {
            cursor: pointer !important;
        }
        
        /* Visual indicator for expandable menus */
        #adminmenu li.menu-top.wp-has-submenu > a:after {
            content: "▶" !important;
            position: absolute !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 10px !important;
            color: rgba(255, 255, 255, 0.6) !important;
            transition: transform 0.2s ease !important;
        }
        
        /* Rotate arrow when submenu is open */
        #adminmenu li.wp-has-current-submenu > a:after,
        #adminmenu li.wp-menu-open > a:after {
            transform: translateY(-50%) rotate(90deg) !important;
            color: rgba(255, 255, 255, 0.9) !important;
        }
        
        #adminmenu .wp-submenu li.current a,
        #adminmenu .wp-submenu li a:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: #ffffff !important;
        }
        
        #adminmenu .wp-submenu li a {
            color: rgba(255, 255, 255, 0.8) !important;
            padding: 6px 16px !important;
            border-radius: 6px !important;
            margin: 1px 4px !important;
            transition: all 0.2s ease !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
            padding-left: 24px !important;
            position: relative !important;
            display: block !important;
            text-decoration: none !important;
        }
        
        /* Add subtle indent line for submenu items */
        #adminmenu .wp-submenu li a:before {
            content: "" !important;
            position: absolute !important;
            left: 8px !important;
            top: 50% !important;
            width: 2px !important;
            height: 12px !important;
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-50%) !important;
            border-radius: 1px !important;
            pointer-events: none !important;
        }
        
        #adminmenu .wp-submenu li.current a:before {
            background: rgba(255, 255, 255, 0.6) !important;
        }
        
        /* Ensure links are clickable */
        #adminmenu .wp-submenu li {
            position: relative !important;
        }
        
        #adminmenu .wp-submenu li a:hover {
            z-index: 10 !important;
        }
        
        /* Collapse button */
        #collapse-button {
            color: rgba(255, 255, 255, 0.8) !important;
        }
        
        #collapse-button:hover {
            color: #ffffff !important;
        }
        
        /* Mobile responsiveness */
        @media only screen and (max-width: 782px) {
            #adminmenuwrap {
                width: auto !important;
            }
            
            #adminmenu .wp-submenu {
                margin: 2px 4px 4px 4px !important;
                padding: 4px 2px !important;
            }
            
            #adminmenu .wp-submenu li a {
                padding: 4px 12px !important;
                padding-left: 20px !important;
                font-size: 11px !important;
            }
        }
        
        /* ===============================
           MAIN CONTENT AREA
           =============================== */
        
        #wpbody-content {
            padding: 20px 16px !important;
            min-height: 100vh !important;
            overflow: visible !important;
        }
        
        /* Reduce padding on narrow screens to prevent horizontal scroll */
        @media only screen and (max-width: 1200px) {
            #wpbody-content {
                padding: 16px 12px !important;
            }
        }
        
        @media only screen and (max-width: 960px) {
            #wpbody-content {
                padding: 12px 8px !important;
            }
        }
        
        .wrap {
            margin-top: 0 !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            transition: none !important;
        }
        
        /* Fix for content visibility issues */
        #wpbody-content > .wrap,
        #wpbody-content .wrap > *,
        .wp-list-table,
        .tablenav,
        .subsubsub {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            transform: none !important;
            transition: none !important;
        }
        
        /* Ensure tables are always visible */
        .wp-list-table tbody tr,
        .wp-list-table tbody td {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Fix for WooCommerce specific pages */
        .woocommerce-layout__primary,
        .woocommerce-layout__header,
        .components-card {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
        }
        
        /* Disable any animation delays */
        .wp-admin * {
            animation-delay: 0s !important;
            animation-duration: 0s !important;
            transition-delay: 0s !important;
        }
        
        /* Hide malformed JavaScript display */
        script:not([src]) {
            display: none !important;
        }
        
        /* Hide CDATA blocks that appear as text */
        body:contains('/* <![CDATA[ */'),
        body:contains('/* ]]> */') {
            visibility: hidden;
        }
        
        .wrap h1 {
            font-size: 28px !important;
            font-weight: 700 !important;
            color: var(--modeo-gray-900) !important;
            margin-bottom: 20px !important;
        }
        
        /* ===============================
           CARDS & PANELS
           =============================== */
        
        .postbox,
        .meta-box-sortables .postbox,
        .stuffbox {
            background: #ffffff !important;
            border: 1px solid var(--modeo-gray-200) !important;
            border-radius: 12px !important;
            box-shadow: var(--modeo-shadow) !important;
            margin-bottom: 20px !important;
            overflow: hidden !important;
        }
        
        .postbox .hndle,
        .stuffbox .hndle {
            background: var(--modeo-gray-50) !important;
            border-bottom: 1px solid var(--modeo-gray-200) !important;
            padding: 16px 20px !important;
            font-weight: 600 !important;
            font-size: 16px !important;
            color: var(--modeo-gray-800) !important;
        }
        
        .postbox .inside,
        .stuffbox .inside {
            padding: 20px !important;
        }
        
        /* ===============================
           BUTTONS & FORMS
           =============================== */
        
        .button,
        .button-primary,
        .button-secondary {
            border-radius: 8px !important;
            padding: 8px 16px !important;
            font-weight: 500 !important;
            transition: all 0.2s ease !important;
            border: none !important;
            box-shadow: var(--modeo-shadow) !important;
        }
        
        .button-primary {
            background: var(--modeo-primary) !important;
            color: #ffffff !important;
        }
        
        .button-primary:hover {
            background: var(--modeo-primary-dark) !important;
            transform: translateY(-1px) !important;
            box-shadow: var(--modeo-shadow-md) !important;
        }
        
        .button-secondary {
            background: #ffffff !important;
            color: var(--modeo-gray-700) !important;
            border: 1px solid var(--modeo-gray-300) !important;
        }
        
        .button-secondary:hover {
            background: var(--modeo-gray-50) !important;
            border-color: var(--modeo-gray-400) !important;
        }
        
        /* Loading state for buttons */
        .button.modeo-loading {
            position: relative !important;
            color: transparent !important;
        }
        
        .button.modeo-loading:after {
            content: "" !important;
            position: absolute !important;
            width: 16px !important;
            height: 16px !important;
            top: 50% !important;
            left: 50% !important;
            margin-left: -8px !important;
            margin-top: -8px !important;
            border: 2px solid transparent !important;
            border-top-color: currentColor !important;
            border-radius: 50% !important;
            animation: modeo-spin 1s linear infinite !important;
        }
        
        @keyframes modeo-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* ===============================
           FORM ELEMENTS
           =============================== */
        
        input[type="text"],
        input[type="email"],
        input[type="url"],
        input[type="password"],
        input[type="search"],
        input[type="number"],
        input[type="tel"],
        input[type="range"],
        input[type="date"],
        input[type="month"],
        input[type="week"],
        input[type="time"],
        input[type="datetime"],
        input[type="datetime-local"],
        input[type="color"],
        select,
        textarea {
            border: 1px solid var(--modeo-gray-300) !important;
            border-radius: 8px !important;
            padding: 12px 16px !important;
            transition: all 0.2s ease !important;
            font-size: 14px !important;
        }
        
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="url"]:focus,
        input[type="password"]:focus,
        input[type="search"]:focus,
        input[type="number"]:focus,
        input[type="tel"]:focus,
        input[type="range"]:focus,
        input[type="date"]:focus,
        input[type="month"]:focus,
        input[type="week"]:focus,
        input[type="time"]:focus,
        input[type="datetime"]:focus,
        input[type="datetime-local"]:focus,
        input[type="color"]:focus,
        select:focus,
        textarea:focus {
            border-color: var(--modeo-primary) !important;
            box-shadow: 0 0 0 3px rgba(34, 113, 177, 0.1) !important;
            outline: none !important;
        }
        
        /* ===============================
           TABLES
           =============================== */
        
        .wp-list-table {
            background: #ffffff !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: var(--modeo-shadow) !important;
            border: 1px solid var(--modeo-gray-200) !important;
        }
        
        .wp-list-table thead th {
            background: var(--modeo-gray-50) !important;
            border-bottom: 1px solid var(--modeo-gray-200) !important;
            padding: 16px !important;
            font-weight: 600 !important;
            color: var(--modeo-gray-800) !important;
        }
        
        .wp-list-table tbody tr {
            border-bottom: 1px solid var(--modeo-gray-100) !important;
            transition: background-color 0.2s ease !important;
        }
        
        .wp-list-table tbody tr:hover {
            background: var(--modeo-gray-50) !important;
        }
        
        .wp-list-table tbody td {
            padding: 16px !important;
            border-bottom: 1px solid var(--modeo-gray-100) !important;
        }
        
        /* ===============================
           NOTIFICATIONS & ALERTS
           =============================== */
        
        .notice {
            border-radius: 8px !important;
            border-left-width: 4px !important;
            padding: 16px 20px !important;
            margin: 16px 0 !important;
            box-shadow: var(--modeo-shadow) !important;
        }
        
        .notice-success {
            border-left-color: var(--modeo-success) !important;
            background: rgba(0, 163, 42, 0.05) !important;
        }
        
        .notice-warning {
            border-left-color: var(--modeo-warning) !important;
            background: rgba(219, 166, 23, 0.05) !important;
        }
        
        .notice-error {
            border-left-color: var(--modeo-danger) !important;
            background: rgba(214, 54, 56, 0.05) !important;
        }
        
        /* ===============================
           WOOCOMMERCE SPECIFIC STYLES
           =============================== */
        
        .woocommerce-layout__header {
            background: #ffffff !important;
            border-radius: 12px !important;
            box-shadow: var(--modeo-shadow) !important;
            border: 1px solid var(--modeo-gray-200) !important;
            margin-bottom: 20px !important;
        }
        
        .woocommerce-layout__primary {
            background: transparent !important;
        }
        
        .woocommerce-analytics-summary,
        .woocommerce-summary {
            background: #ffffff !important;
            border-radius: 12px !important;
            box-shadow: var(--modeo-shadow) !important;
            border: 1px solid var(--modeo-gray-200) !important;
            padding: 20px !important;
        }
        
        /* ===============================
           DASHBOARD WIDGETS
           =============================== */
        
        #dashboard-widgets .postbox {
            background: #ffffff !important;
            border-radius: 12px !important;
            box-shadow: var(--modeo-shadow) !important;
            border: 1px solid var(--modeo-gray-200) !important;
        }
        
        #dashboard-widgets .postbox h2 {
            background: var(--modeo-gray-50) !important;
            border-bottom: 1px solid var(--modeo-gray-200) !important;
            padding: 16px 20px !important;
            margin: 0 !important;
            font-weight: 600 !important;
            color: var(--modeo-gray-800) !important;
        }
        
        /* ===============================
           RESPONSIVE DESIGN
           =============================== */
        
        @media screen and (max-width: 782px) {
            #wpbody-content {
                padding: 16px !important;
            }
            
            .wrap h1 {
                font-size: 24px !important;
            }
            
            .postbox,
            .stuffbox {
                margin-bottom: 16px !important;
            }
            
            .postbox .inside,
            .stuffbox .inside {
                padding: 16px !important;
            }
        }
        
        /* ===============================
           SUBTLE ANIMATIONS
           =============================== */
        
        .postbox,
        .wp-list-table,
        .button,
        #adminmenu li.menu-top > a {
            transition: all 0.2s ease !important;
        }
        
        .postbox:hover,
        .wp-list-table:hover {
            box-shadow: var(--modeo-shadow-md) !important;
        }
        
        /* ===============================
           ACCESSIBILITY IMPROVEMENTS
           =============================== */
        
        .screen-reader-text {
            position: absolute !important;
            clip: rect(1px, 1px, 1px, 1px) !important;
            word-wrap: normal !important;
        }
        
        /* High contrast focus indicators */
        a:focus,
        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
            outline: 2px solid var(--modeo-primary) !important;
            outline-offset: 2px !important;
        }
        
        /* ===============================
           CUSTOM SCROLLBARS (WEBKIT)
           =============================== */
        
        ::-webkit-scrollbar {
            width: 8px !important;
            height: 8px !important;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--modeo-gray-100) !important;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--modeo-gray-400) !important;
            border-radius: 4px !important;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--modeo-gray-500) !important;
        }
        </style>
        <?php
    }
    
    /**
     * Customize admin footer
     */
    public function custom_admin_footer($text) {
        return sprintf(
            '<span style="color: %s;">Powered by <strong>Modeo.pl</strong> - Modern WordPress Admin</span>',
            'var(--modeo-gray-500)'
        );
    }
    
    /**
     * Customize dashboard widgets
     */
    public function customize_dashboard_widgets() {
        // Add custom Modeo dashboard widget
        wp_add_dashboard_widget(
            'modeo_dashboard_widget',
            '🎯 Modeo Dashboard',
            array($this, 'modeo_dashboard_widget_content')
        );
    }
    
    /**
     * Modeo dashboard widget content
     */
    public function modeo_dashboard_widget_content() {
        ?>
        <div style="padding: 16px; text-align: center;">
            <h3 style="color: var(--modeo-gray-800); margin-bottom: 12px;">
                🚀 Witaj w nowoczesnym panelu Modeo!
            </h3>
            <p style="color: var(--modeo-gray-600); line-height: 1.6; margin-bottom: 16px;">
                Twój WordPress został wzbogacony o nowoczesny design zachowując pełną funkcjonalność.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="<?php echo admin_url('edit.php?post_type=product'); ?>" 
                   class="button button-primary" style="text-decoration: none;">
                    📦 Produkty
                </a>
                <a href="<?php echo admin_url('admin.php?page=wc-orders'); ?>" 
                   class="button button-secondary" style="text-decoration: none;">
                    📋 Zamówienia
                </a>
            </div>
        </div>
        <?php
    }
    
    /**
     * Fix JavaScript display issues
     */
    public function fix_js_display() {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Remove any text nodes that contain malformed JavaScript
            function cleanupJavaScriptText() {
                var walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    function(node) {
                        var text = node.textContent;
                        if (text.includes('/* <![CDATA[ */') || 
                            text.includes('/* ]]> */') ||
                            text.includes('jQuery( \'a.delete\' )') ||
                            text.includes('Czy na pewno chcesz usunąć ten atrybut?')) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_REJECT;
                    }
                );
                
                var nodesToRemove = [];
                var node;
                while (node = walker.nextNode()) {
                    nodesToRemove.push(node);
                }
                
                nodesToRemove.forEach(function(node) {
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                });
            }
            
            // Run cleanup
            cleanupJavaScriptText();
            
            // Run cleanup after AJAX calls
            if (typeof jQuery !== 'undefined') {
                jQuery(document).ajaxComplete(function() {
                    setTimeout(cleanupJavaScriptText, 100);
                });
            }
        });
        </script>
        <?php
    }
    
    /**
     * Customize admin bar
     */
    public function customize_admin_bar($wp_admin_bar) {
        // Add quick access to Modeo front-end
        $wp_admin_bar->add_node(array(
            'id' => 'modeo-frontend',
            'title' => '🌐 Zobacz sklep',
            'href' => home_url('/sklep'),
            'meta' => array(
                'target' => '_blank',
                'title' => 'Otwórz stronę sklepu w nowej karcie'
            )
        ));
    }
}

// Initialize
Modeo_Admin_Dashboard::get_instance();