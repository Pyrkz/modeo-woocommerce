<?php
/**
 * Plugin Name: Modeo Contact Form Handler
 * Description: Handles contact form submissions with email sending
 * Version: 1.0.0
 * Author: Modeo Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Register REST API endpoint for contact form
add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/contact-form', array(
        'methods' => 'POST',
        'callback' => 'modeo_handle_contact_form',
        'permission_callback' => '__return_true', // Public endpoint
        'args' => array(
            'to' => array(
                'required' => true,
                'validate_callback' => function($param) {
                    return is_email($param);
                }
            ),
            'subject' => array(
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'message' => array(
                'required' => true,
                'sanitize_callback' => 'wp_kses_post',
            ),
            'headers' => array(
                'required' => false,
                'type' => 'array',
                'default' => array(),
            ),
        ),
    ));
});

/**
 * Handle contact form submission
 */
function modeo_handle_contact_form(WP_REST_Request $request) {
    $to = $request->get_param('to');
    $subject = $request->get_param('subject');
    $message = $request->get_param('message');
    $headers = $request->get_param('headers');
    
    // Convert headers array to string format for wp_mail
    $headers_string = array();
    if (!empty($headers)) {
        foreach ($headers as $key => $value) {
            $headers_string[] = $key . ': ' . $value;
        }
    }
    
    // Add default headers if not provided
    if (empty($headers_string)) {
        $headers_string = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>'
        );
    }
    
    // Send email
    $sent = wp_mail($to, $subject, $message, $headers_string);
    
    // Log email for debugging (can be viewed in WordPress debug log)
    if (defined('WP_DEBUG') && WP_DEBUG === true) {
        error_log('Contact Form Email:');
        error_log('To: ' . $to);
        error_log('Subject: ' . $subject);
        error_log('Sent: ' . ($sent ? 'Yes' : 'No'));
    }
    
    if ($sent) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Email sent successfully',
            'debug' => array(
                'to' => $to,
                'subject' => $subject
            )
        ), 200);
    } else {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Failed to send email',
            'debug' => array(
                'to' => $to,
                'subject' => $subject,
                'wp_mail_result' => $sent
            )
        ), 500);
    }
}

// Add CORS headers for the contact form endpoint
add_filter('rest_pre_serve_request', function ($served, $result, $request, $server) {
    if (strpos($request->get_route(), '/wp/v2/contact-form') !== false) {
        header('Access-Control-Allow-Origin: ' . get_allowed_origin());
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
    }
    return $served;
}, 10, 4);

/**
 * Get allowed origin for CORS
 */
function get_allowed_origin() {
    $allowed_origins = array(
        'http://localhost:3000',
        'https://modeo.pl',
        'https://nextmodeo.sitefy.pl'
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        return $origin;
    }
    
    // Default to production domain
    return 'https://modeo.pl';
}

// Optional: Add admin menu for contact form settings
add_action('admin_menu', function() {
    add_options_page(
        'Modeo Contact Form Settings',
        'Contact Form',
        'manage_options',
        'modeo-contact-form',
        'modeo_contact_form_settings_page'
    );
});

function modeo_contact_form_settings_page() {
    ?>
    <div class="wrap">
        <h1>Modeo Contact Form Settings</h1>
        <p>Contact form submissions are sent to: <strong>sklep@modeo.pl</strong></p>
        <p>To change this email address, please update the API endpoint in your Next.js application.</p>
        <hr>
        <h2>Recent Submissions</h2>
        <p><em>Feature coming soon: View recent contact form submissions here.</em></p>
    </div>
    <?php
}