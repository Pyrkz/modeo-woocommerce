<?php
/**
 * Modeo reCAPTCHA Integration
 * 
 * Provides reCAPTCHA v3 protection for reviews and replies with optimized UX
 * 
 * @package Modeo_Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

class Modeo_Recaptcha {
    
    private $site_key;
    private $secret_key;
    private $threshold;
    
    /**
     * Singleton instance
     */
    private static $instance = null;
    
    /**
     * Get singleton instance
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
        // reCAPTCHA configuration - use your provided keys
        $this->site_key = '6Lcu5borAAAAAAfzwT6yPkKdYAWrh77Il_Th8MIy';
        $this->secret_key = '6Lcu5borAAAAAHpybNiMCarp1LMOQwmJ6yLmg-ID';
        $this->threshold = 0.5; // Minimum score for human traffic
        
        $this->init();
    }
    
    /**
     * Initialize hooks
     */
    private function init() {
        // Register REST endpoints
        add_action('rest_api_init', array($this, 'register_endpoints'));
        
        // Allow public reviews without login requirement
        add_filter('comments_open', array($this, 'enable_public_comments'), 10, 2);
        add_filter('woocommerce_product_review_comment_form_args', array($this, 'allow_public_reviews'));
        
        // Hook into comment creation to save ratings
        add_action('comment_post', array($this, 'save_review_rating'), 10, 3);
    }
    
    /**
     * Enable public comments for products
     */
    public function enable_public_comments($open, $post_id) {
        if (get_post_type($post_id) === 'product') {
            return true;
        }
        return $open;
    }
    
    /**
     * Allow public reviews (remove login requirement)
     */
    public function allow_public_reviews($comment_form) {
        unset($comment_form['must_log_in']);
        $comment_form['logged_in_as'] = '';
        return $comment_form;
    }
    
    /**
     * Register REST API endpoints
     */
    public function register_endpoints() {
        // Endpoint for creating reviews
        register_rest_route('modeo/v1', '/reviews', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_product_review'),
            'permission_callback' => '__return_true', // Allow public access
            'args' => array(
                'product_id' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
                'reviewer' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'reviewer_email' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_email($param);
                    },
                    'sanitize_callback' => 'sanitize_email'
                ),
                'review' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_textarea_field'
                ),
                'rating' => array(
                    'required' => false,
                    'validate_callback' => function($param) {
                        return is_numeric($param) && $param >= 1 && $param <= 5;
                    }
                ),
                'recaptcha_token' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field'
                )
            )
        ));
        
        // Endpoint for creating replies to reviews
        register_rest_route('modeo/v1', '/review-replies', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_review_reply'),
            'permission_callback' => '__return_true', // Allow public access
            'args' => array(
                'parent_id' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
                'product_id' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
                'reviewer' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'reviewer_email' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_email($param);
                    },
                    'sanitize_callback' => 'sanitize_email'
                ),
                'reply' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_textarea_field'
                ),
                'recaptcha_token' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field'
                )
            )
        ));
        
        // Endpoint for getting replies to a specific review
        register_rest_route('modeo/v1', '/review-replies/(?P<review_id>\\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_review_replies'),
            'permission_callback' => '__return_true', // Allow public access
            'args' => array(
                'review_id' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                )
            )
        ));
        
        // Endpoint for getting current user info
        register_rest_route('modeo/v1', '/current-user', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_current_user'),
            'permission_callback' => '__return_true', // Allow public access
        ));
    }
    
    /**
     * Get current user information
     */
    public function get_current_user($request) {
        $current_user = wp_get_current_user();
        
        if ($current_user->ID == 0) {
            return array(
                'id' => 0,
                'name' => '',
                'email' => '',
                'isLoggedIn' => false
            );
        }
        
        return array(
            'id' => $current_user->ID,
            'name' => $current_user->display_name ?: $current_user->user_login,
            'email' => $current_user->user_email,
            'isLoggedIn' => true
        );
    }
    
    /**
     * Verify reCAPTCHA v3 token
     */
    private function verify_recaptcha($token, $action) {
        // Skip verification if no secret key configured
        if (empty($this->secret_key)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA secret key not configured, skipping verification');
            }
            return true; // Allow submission if reCAPTCHA not configured
        }
        
        if (empty($token)) {
            return false;
        }
        
        // Google reCAPTCHA verification endpoint
        $verify_url = 'https://www.google.com/recaptcha/api/siteverify';
        
        $data = array(
            'secret' => $this->secret_key,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
        );
        
        // Make request to Google
        $response = wp_remote_post($verify_url, array(
            'body' => $data,
            'timeout' => 10,
            'sslverify' => true
        ));
        
        if (is_wp_error($response)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA verification failed: ' . $response->get_error_message());
            }
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $result = json_decode($body, true);
        
        if (!$result || !isset($result['success'])) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA invalid response: ' . $body);
            }
            return false;
        }
        
        // Check if verification was successful
        if (!$result['success']) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA verification failed: ' . implode(', ', $result['error-codes'] ?? []));
            }
            return false;
        }
        
        // Check action matches
        if (isset($result['action']) && $result['action'] !== $action) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA action mismatch: expected ' . $action . ', got ' . $result['action']);
            }
            return false;
        }
        
        // Check score threshold for v3
        if (isset($result['score'])) {
            if ($result['score'] < $this->threshold) {
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    error_log('reCAPTCHA score too low: ' . $result['score'] . ' < ' . $this->threshold);
                }
                return false;
            }
            
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('reCAPTCHA verified successfully: score ' . $result['score']);
            }
        }
        
        return true;
    }
    
    /**
     * Create product review with reCAPTCHA verification
     */
    public function create_product_review($request) {
        $product_id = $request->get_param('product_id');
        $reviewer = $request->get_param('reviewer');
        $reviewer_email = $request->get_param('reviewer_email');
        $review = $request->get_param('review');
        $rating = $request->get_param('rating') ?: 5;
        $recaptcha_token = $request->get_param('recaptcha_token');
        
        // Verify reCAPTCHA if token provided
        if (!empty($recaptcha_token)) {
            if (!$this->verify_recaptcha($recaptcha_token, 'submit_review')) {
                return new WP_Error('recaptcha_failed', 'Weryfikacja anty-bot nie powiodła się. Spróbuj ponownie.', array('status' => 400));
            }
        }
        
        // Check if product exists
        $product = wc_get_product($product_id);
        if (!$product) {
            return new WP_Error('product_not_found', 'Produkt nie został znaleziony', array('status' => 404));
        }
        
        // Sanitize input data to prevent XSS
        $reviewer = sanitize_text_field(wp_strip_all_tags($reviewer));
        $reviewer_email = sanitize_email($reviewer_email);
        $review = sanitize_textarea_field(wp_strip_all_tags($review));
        $rating = intval($rating);
        
        // Additional security checks
        if (empty($reviewer) || empty($reviewer_email) || empty($review)) {
            return new WP_Error('missing_data', 'Wszystkie pola są wymagane', array('status' => 400));
        }
        
        if (!is_email($reviewer_email)) {
            return new WP_Error('invalid_email', 'Nieprawidłowy adres email', array('status' => 400));
        }
        
        if ($rating < 1 || $rating > 5) {
            return new WP_Error('invalid_rating', 'Ocena musi być między 1 a 5', array('status' => 400));
        }
        
        // Create comment data
        $comment_data = array(
            'comment_post_ID' => $product_id,
            'comment_author' => $reviewer,
            'comment_author_email' => $reviewer_email,
            'comment_content' => $review,
            'comment_type' => 'review',
            'comment_parent' => 0,
            'user_id' => 0, // Anonymous user
            'comment_author_IP' => $_SERVER['REMOTE_ADDR'] ?? '',
            'comment_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'comment_date' => current_time('mysql'),
            'comment_approved' => 1, // Auto-approve for now
        );
        
        // Insert comment
        $comment_id = wp_insert_comment($comment_data);
        
        if (!$comment_id) {
            return new WP_Error('review_creation_failed', 'Nie udało się utworzyć recenzji', array('status' => 500));
        }
        
        // Save rating as comment meta
        if ($rating) {
            add_comment_meta($comment_id, 'rating', intval($rating));
        }
        
        // Update product rating
        WC_Comments::clear_transients($product_id);
        
        return array(
            'id' => $comment_id,
            'product_id' => $product_id,
            'reviewer' => $reviewer,
            'reviewer_email' => $reviewer_email,
            'review' => $review,
            'rating' => intval($rating),
            'date_created' => current_time('mysql'),
            'status' => 'approved',
            'message' => 'Recenzja została pomyślnie dodana!'
        );
    }
    
    /**
     * Create reply to review with reCAPTCHA verification
     */
    public function create_review_reply($request) {
        $parent_id = $request->get_param('parent_id');
        $product_id = $request->get_param('product_id');
        $reviewer = $request->get_param('reviewer');
        $reviewer_email = $request->get_param('reviewer_email');
        $reply = $request->get_param('reply');
        $recaptcha_token = $request->get_param('recaptcha_token');
        
        // Verify reCAPTCHA if token provided
        if (!empty($recaptcha_token)) {
            if (!$this->verify_recaptcha($recaptcha_token, 'submit_reply')) {
                return new WP_Error('recaptcha_failed', 'Weryfikacja anty-bot nie powiodła się. Spróbuj ponownie.', array('status' => 400));
            }
        }
        
        // Check if parent review exists
        $parent_comment = get_comment($parent_id);
        if (!$parent_comment) {
            return new WP_Error('parent_not_found', 'Opinia nadrzędna nie została znaleziona', array('status' => 404));
        }
        
        // Check if product exists
        $product = wc_get_product($product_id);
        if (!$product) {
            return new WP_Error('product_not_found', 'Produkt nie został znaleziony', array('status' => 404));
        }
        
        // Sanitize input data to prevent XSS
        $reviewer = sanitize_text_field(wp_strip_all_tags($reviewer));
        $reviewer_email = sanitize_email($reviewer_email);
        $reply = sanitize_textarea_field(wp_strip_all_tags($reply));
        
        // Additional security checks
        if (empty($reviewer) || empty($reviewer_email) || empty($reply)) {
            return new WP_Error('missing_data', 'Wszystkie pola są wymagane', array('status' => 400));
        }
        
        if (!is_email($reviewer_email)) {
            return new WP_Error('invalid_email', 'Nieprawidłowy adres email', array('status' => 400));
        }
        
        // Check if user is admin
        $current_user = wp_get_current_user();
        $is_admin = $current_user->ID > 0 && user_can($current_user, 'manage_woocommerce');
        
        // Create reply comment data
        $comment_data = array(
            'comment_post_ID' => $product_id,
            'comment_author' => $reviewer,
            'comment_author_email' => $reviewer_email,
            'comment_content' => $reply,
            'comment_type' => 'review_reply',
            'comment_parent' => $parent_id,
            'user_id' => $current_user->ID ?: 0,
            'comment_author_IP' => $_SERVER['REMOTE_ADDR'] ?? '',
            'comment_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'comment_date' => current_time('mysql'),
            'comment_approved' => 1, // Auto-approve for now
        );
        
        // Insert comment
        $comment_id = wp_insert_comment($comment_data);
        
        if (!$comment_id) {
            return new WP_Error('reply_creation_failed', 'Nie udało się utworzyć odpowiedzi', array('status' => 500));
        }
        
        // Add metadata to identify as admin reply if needed
        if ($is_admin) {
            add_comment_meta($comment_id, 'is_admin_reply', 1);
        }
        
        return array(
            'id' => $comment_id,
            'parent_id' => $parent_id,
            'product_id' => $product_id,
            'reviewer' => $reviewer,
            'reviewer_email' => $reviewer_email,
            'reply' => $reply,
            'date_created' => current_time('mysql'),
            'is_admin' => $is_admin,
            'status' => 'approved',
            'message' => 'Odpowiedź została pomyślnie dodana!'
        );
    }
    
    /**
     * Get replies for a review
     */
    public function get_review_replies($request) {
        $review_id = $request->get_param('review_id');
        
        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Getting replies for review ID: ' . $review_id);
        }
        
        // Check if parent review exists
        $parent_comment = get_comment($review_id);
        if (!$parent_comment) {
            return new WP_Error('review_not_found', 'Opinia nie została znaleziona', array('status' => 404));
        }
        
        // Get replies recursively
        $formatted_replies = $this->get_replies_recursive($review_id);
        
        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Found ' . count($formatted_replies) . ' replies for review ' . $review_id);
        }
        
        return array(
            'replies' => $formatted_replies,
            'total' => count($formatted_replies)
        );
    }
    
    /**
     * Get replies recursively for nested structure
     */
    private function get_replies_recursive($parent_id) {
        // Get direct replies to this parent
        $replies = get_comments(array(
            'parent' => $parent_id,
            'type' => 'review_reply',
            'status' => 'approve',
            'orderby' => 'comment_date',
            'order' => 'ASC'
        ));
        
        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('get_replies_recursive called for parent_id: ' . $parent_id . ', found ' . count($replies) . ' replies');
            foreach ($replies as $reply) {
                error_log('Reply ID: ' . $reply->comment_ID . ', Parent: ' . $reply->comment_parent . ', Content: ' . substr($reply->comment_content, 0, 50));
            }
        }
        
        $formatted_replies = array();
        foreach ($replies as $reply) {
            $is_admin_reply = get_comment_meta($reply->comment_ID, 'is_admin_reply', true) == '1';
            
            $formatted_reply = array(
                'id' => $reply->comment_ID,
                'parent_id' => $parent_id,
                'reviewer' => sanitize_text_field($reply->comment_author),
                'reviewer_email' => sanitize_email($reply->comment_author_email),
                'date_created' => $reply->comment_date,
                'reply' => wp_strip_all_tags($reply->comment_content),
                'verified' => false, // Replies don't have verified purchase status
                'is_admin' => $is_admin_reply,
                'status' => $reply->comment_approved == '1' ? 'approved' : 'pending',
                'replies' => array() // Initialize empty replies array
            );
            
            // Recursively get replies to this reply
            $nested_replies = $this->get_replies_recursive($reply->comment_ID);
            if (!empty($nested_replies)) {
                $formatted_reply['replies'] = $nested_replies;
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    error_log('Reply ID ' . $reply->comment_ID . ' has ' . count($nested_replies) . ' nested replies');
                }
            }
            
            $formatted_replies[] = $formatted_reply;
        }
        
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('get_replies_recursive returning ' . count($formatted_replies) . ' replies for parent_id: ' . $parent_id);
        }
        
        return $formatted_replies;
    }
    
    /**
     * Save review rating from standard WordPress comment forms
     */
    public function save_review_rating($comment_id, $approved, $commentdata) {
        if (isset($_POST['rating']) && !empty($_POST['rating'])) {
            $rating = intval($_POST['rating']);
            if ($rating >= 1 && $rating <= 5) {
                add_comment_meta($comment_id, 'rating', $rating);
                
                // Update product rating
                $product_id = $commentdata['comment_post_ID'];
                WC_Comments::clear_transients($product_id);
            }
        }
    }
    
    /**
     * Get reCAPTCHA site key for frontend
     */
    public function get_site_key() {
        return $this->site_key;
    }
    
    /**
     * Check if reCAPTCHA is enabled
     */
    public function is_enabled() {
        return !empty($this->site_key) && !empty($this->secret_key);
    }
}

// Initialize the class
Modeo_Recaptcha::get_instance();