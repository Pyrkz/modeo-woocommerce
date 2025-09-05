<?php
/**
 * Optimized Modeo Reviews & Replies System
 * 
 * High-performance review system with advanced caching, database optimization,
 * and intelligent response handling for Next.js frontend.
 * 
 * @package Modeo_Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

class Modeo_Reviews_Optimized {
    
    /**
     * Singleton instance
     */
    private static $instance = null;
    
    /**
     * Cache group for object caching
     */
    const CACHE_GROUP = 'modeo_reviews';
    
    /**
     * Cache expiration times (in seconds)
     */
    const CACHE_REVIEWS = 300;      // 5 minutes
    const CACHE_STATS = 600;        // 10 minutes
    const CACHE_REPLIES = 180;      // 3 minutes
    
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
        $this->init_hooks();
        $this->init_api_endpoints();
    }
    
    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        // Clear caches when reviews/replies change
        add_action('wp_insert_comment', array($this, 'clear_review_caches'), 10, 2);
        add_action('wp_set_comment_status', array($this, 'clear_review_caches_by_comment'), 10, 2);
        add_action('delete_comment', array($this, 'clear_review_caches_by_comment'), 10, 2);
        
        // Database optimizations
        add_action('init', array($this, 'maybe_add_database_indexes'));
    }
    
    /**
     * Initialize optimized API endpoints
     */
    private function init_api_endpoints() {
        add_action('rest_api_init', function() {
            // Optimized reviews endpoint
            register_rest_route('modeo/v1', '/reviews/(?P<product_id>\d+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_optimized_reviews'),
                'permission_callback' => '__return_true',
                'args' => array(
                    'product_id' => array(
                        'required' => true,
                        'validate_callback' => function($param) {
                            return is_numeric($param) && $param > 0;
                        }
                    ),
                    'page' => array(
                        'default' => 1,
                        'validate_callback' => function($param) {
                            return is_numeric($param) && $param > 0;
                        }
                    ),
                    'per_page' => array(
                        'default' => 10,
                        'validate_callback' => function($param) {
                            return is_numeric($param) && $param > 0 && $param <= 50;
                        }
                    )
                )
            ));
            
            // Optimized review stats endpoint
            register_rest_route('modeo/v1', '/reviews/(?P<product_id>\d+)/stats', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_optimized_review_stats'),
                'permission_callback' => '__return_true',
                'args' => array(
                    'product_id' => array(
                        'required' => true,
                        'validate_callback' => function($param) {
                            return is_numeric($param) && $param > 0;
                        }
                    )
                )
            ));
            
            // Optimized replies endpoint
            register_rest_route('modeo/v1', '/review-replies/(?P<review_id>\d+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_optimized_replies'),
                'permission_callback' => '__return_true',
                'args' => array(
                    'review_id' => array(
                        'required' => true,
                        'validate_callback' => function($param) {
                            return is_numeric($param) && $param > 0;
                        }
                    )
                )
            ));
        });
    }
    
    /**
     * Get optimized product reviews with caching and database optimization
     */
    public function get_optimized_reviews($request) {
        $product_id = (int) $request['product_id'];
        $page = max(1, (int) $request->get_param('page'));
        $per_page = min(50, max(1, (int) $request->get_param('per_page')));
        
        // Generate cache key
        $cache_key = "reviews_{$product_id}_{$page}_{$per_page}";
        
        // Try to get from cache first
        $cached = wp_cache_get($cache_key, self::CACHE_GROUP);
        if (false !== $cached) {
            return rest_ensure_response($cached);
        }
        
        global $wpdb;
        
        // Optimized query with proper indexes
        $offset = ($page - 1) * $per_page;
        
        // Get reviews with single optimized query
        $reviews_query = $wpdb->prepare("
            SELECT 
                c.comment_ID as id,
                c.comment_post_ID as product_id,
                c.comment_author as reviewer,
                c.comment_author_email as reviewer_email,
                c.comment_content as review,
                c.comment_date_gmt as date_created,
                c.comment_approved as status,
                COALESCE(cm_rating.meta_value, '5') as rating,
                COALESCE(cm_verified.meta_value, '0') as verified_purchase,
                (
                    SELECT COUNT(*)
                    FROM {$wpdb->comments} cr
                    WHERE cr.comment_parent = c.comment_ID
                    AND cr.comment_type = 'review_reply'
                    AND cr.comment_approved = '1'
                ) as reply_count
            FROM {$wpdb->comments} c
            LEFT JOIN {$wpdb->commentmeta} cm_rating ON (
                c.comment_ID = cm_rating.comment_id 
                AND cm_rating.meta_key = 'rating'
            )
            LEFT JOIN {$wpdb->commentmeta} cm_verified ON (
                c.comment_ID = cm_verified.comment_id 
                AND cm_verified.meta_key = 'verified'
            )
            WHERE c.comment_post_ID = %d
            AND c.comment_type = 'review'
            AND c.comment_approved = '1'
            ORDER BY c.comment_date_gmt DESC
            LIMIT %d OFFSET %d
        ", $product_id, $per_page, $offset);
        
        $reviews = $wpdb->get_results($reviews_query);
        
        // Get total count with optimized query
        $total_query = $wpdb->prepare("
            SELECT COUNT(*)
            FROM {$wpdb->comments}
            WHERE comment_post_ID = %d
            AND comment_type = 'review'
            AND comment_approved = '1'
        ", $product_id);
        
        $total = (int) $wpdb->get_var($total_query);
        $total_pages = ceil($total / $per_page);
        
        // Process reviews data
        $processed_reviews = array();
        foreach ($reviews as $review) {
            $processed_reviews[] = array(
                'id' => (int) $review->id,
                'product_id' => (int) $review->product_id,
                'reviewer' => sanitize_text_field($review->reviewer),
                'reviewer_email' => is_email($review->reviewer_email) ? $review->reviewer_email : '',
                'review' => wp_kses_post($review->review),
                'rating' => max(1, min(5, (int) $review->rating)),
                'date_created' => $review->date_created,
                'verified_purchase' => (bool) $review->verified_purchase,
                'reply_count' => (int) $review->reply_count,
                'status' => $review->status === '1' ? 'approved' : 'pending'
            );
        }
        
        $response_data = array(
            'reviews' => $processed_reviews,
            'total' => $total,
            'total_pages' => $total_pages,
            'page' => $page,
            'per_page' => $per_page,
            'generated_at' => current_time('mysql', true)
        );
        
        // Cache the response
        wp_cache_set($cache_key, $response_data, self::CACHE_GROUP, self::CACHE_REVIEWS);
        
        return rest_ensure_response($response_data);
    }
    
    /**
     * Get optimized review statistics with caching
     */
    public function get_optimized_review_stats($request) {
        $product_id = (int) $request['product_id'];
        
        $cache_key = "stats_{$product_id}";
        
        // Try cache first
        $cached = wp_cache_get($cache_key, self::CACHE_GROUP);
        if (false !== $cached) {
            return rest_ensure_response($cached);
        }
        
        global $wpdb;
        
        // Optimized stats query
        $stats_query = $wpdb->prepare("
            SELECT 
                COUNT(*) as total_reviews,
                AVG(CAST(COALESCE(cm.meta_value, '5') AS DECIMAL(2,1))) as average_rating,
                SUM(CASE WHEN CAST(COALESCE(cm.meta_value, '5') AS UNSIGNED) = 5 THEN 1 ELSE 0 END) as rating_5,
                SUM(CASE WHEN CAST(COALESCE(cm.meta_value, '5') AS UNSIGNED) = 4 THEN 1 ELSE 0 END) as rating_4,
                SUM(CASE WHEN CAST(COALESCE(cm.meta_value, '5') AS UNSIGNED) = 3 THEN 1 ELSE 0 END) as rating_3,
                SUM(CASE WHEN CAST(COALESCE(cm.meta_value, '5') AS UNSIGNED) = 2 THEN 1 ELSE 0 END) as rating_2,
                SUM(CASE WHEN CAST(COALESCE(cm.meta_value, '5') AS UNSIGNED) = 1 THEN 1 ELSE 0 END) as rating_1
            FROM {$wpdb->comments} c
            LEFT JOIN {$wpdb->commentmeta} cm ON (
                c.comment_ID = cm.comment_id 
                AND cm.meta_key = 'rating'
            )
            WHERE c.comment_post_ID = %d
            AND c.comment_type = 'review'
            AND c.comment_approved = '1'
        ", $product_id);
        
        $stats = $wpdb->get_row($stats_query);
        
        $response_data = array(
            'total_reviews' => (int) $stats->total_reviews,
            'average_rating' => $stats->total_reviews > 0 ? round($stats->average_rating, 1) : 0,
            'rating_counts' => array(
                '5' => (int) $stats->rating_5,
                '4' => (int) $stats->rating_4,
                '3' => (int) $stats->rating_3,
                '2' => (int) $stats->rating_2,
                '1' => (int) $stats->rating_1
            ),
            'generated_at' => current_time('mysql', true)
        );
        
        // Cache stats for longer since they change less frequently
        wp_cache_set($cache_key, $response_data, self::CACHE_GROUP, self::CACHE_STATS);
        
        return rest_ensure_response($response_data);
    }
    
    /**
     * Get optimized review replies with recursive nesting
     */
    public function get_optimized_replies($request) {
        $review_id = (int) $request['review_id'];
        
        $cache_key = "replies_{$review_id}";
        
        // Try cache first
        $cached = wp_cache_get($cache_key, self::CACHE_GROUP);
        if (false !== $cached) {
            return rest_ensure_response($cached);
        }
        
        $replies = $this->get_replies_recursive($review_id);
        
        $response_data = array(
            'replies' => $replies,
            'total' => count($replies),
            'generated_at' => current_time('mysql', true)
        );
        
        // Cache replies
        wp_cache_set($cache_key, $response_data, self::CACHE_GROUP, self::CACHE_REPLIES);
        
        return rest_ensure_response($response_data);
    }
    
    /**
     * Recursively get replies with optimized database queries
     */
    private function get_replies_recursive($parent_id, $depth = 0) {
        // Prevent infinite recursion
        if ($depth > 5) {
            return array();
        }
        
        global $wpdb;
        
        // Optimized query to get direct replies
        $replies_query = $wpdb->prepare("
            SELECT 
                c.comment_ID as id,
                c.comment_post_ID as product_id,
                c.comment_parent as parent_id,
                c.comment_author as reviewer,
                c.comment_author_email as reviewer_email,
                c.comment_content as reply,
                c.comment_date_gmt as date_created,
                c.comment_approved as status,
                CASE WHEN u.ID IS NOT NULL THEN 1 ELSE 0 END as is_admin
            FROM {$wpdb->comments} c
            LEFT JOIN {$wpdb->users} u ON (
                c.comment_author_email = u.user_email 
                AND u.ID IN (
                    SELECT user_id 
                    FROM {$wpdb->usermeta} 
                    WHERE meta_key = '{$wpdb->prefix}capabilities' 
                    AND (meta_value LIKE '%administrator%' OR meta_value LIKE '%editor%')
                )
            )
            WHERE c.comment_parent = %d
            AND c.comment_type = 'review_reply'
            AND c.comment_approved = '1'
            ORDER BY c.comment_date_gmt ASC
        ", $parent_id);
        
        $replies = $wpdb->get_results($replies_query);
        
        $processed_replies = array();
        foreach ($replies as $reply) {
            $reply_data = array(
                'id' => (int) $reply->id,
                'product_id' => (int) $reply->product_id,
                'parent_id' => (int) $reply->parent_id,
                'reviewer' => sanitize_text_field($reply->reviewer),
                'reply' => wp_kses_post($reply->reply),
                'date_created' => $reply->date_created,
                'is_admin' => (bool) $reply->is_admin,
                'status' => $reply->status === '1' ? 'approved' : 'pending',
                'replies' => array() // Initialize empty replies array
            );
            
            // Get nested replies recursively
            $nested_replies = $this->get_replies_recursive($reply->id, $depth + 1);
            $reply_data['replies'] = $nested_replies;
            
            $processed_replies[] = $reply_data;
        }
        
        return $processed_replies;
    }
    
    /**
     * Clear review-related caches
     */
    public function clear_review_caches($comment_id, $comment) {
        if (!is_object($comment)) {
            $comment = get_comment($comment_id);
        }
        
        if (!$comment) {
            return;
        }
        
        $product_id = $comment->comment_post_ID;
        
        // Clear all related caches
        $this->clear_product_caches($product_id);
        
        // If it's a reply, also clear the parent review's reply cache
        if ($comment->comment_parent > 0) {
            wp_cache_delete("replies_{$comment->comment_parent}", self::CACHE_GROUP);
        }
    }
    
    /**
     * Clear caches by comment ID
     */
    public function clear_review_caches_by_comment($comment_id, $status = null) {
        $comment = get_comment($comment_id);
        if ($comment) {
            $this->clear_review_caches($comment_id, $comment);
        }
    }
    
    /**
     * Clear all caches for a product
     */
    private function clear_product_caches($product_id) {
        // Clear review pages (up to 20 pages)
        for ($page = 1; $page <= 20; $page++) {
            for ($per_page = 5; $per_page <= 50; $per_page += 5) {
                wp_cache_delete("reviews_{$product_id}_{$page}_{$per_page}", self::CACHE_GROUP);
            }
        }
        
        // Clear stats cache
        wp_cache_delete("stats_{$product_id}", self::CACHE_GROUP);
    }
    
    /**
     * Add database indexes for better performance
     */
    public function maybe_add_database_indexes() {
        global $wpdb;
        
        // Check if we need to add indexes
        $option_key = 'modeo_reviews_indexes_added';
        if (get_option($option_key)) {
            return;
        }
        
        // Add composite indexes for better query performance
        $indexes = array(
            "ALTER TABLE {$wpdb->comments} ADD INDEX idx_modeo_reviews (comment_post_ID, comment_type, comment_approved, comment_date_gmt)",
            "ALTER TABLE {$wpdb->comments} ADD INDEX idx_modeo_replies (comment_parent, comment_type, comment_approved)",
            "ALTER TABLE {$wpdb->commentmeta} ADD INDEX idx_modeo_rating (comment_id, meta_key, meta_value)"
        );
        
        foreach ($indexes as $sql) {
            $wpdb->query($sql);
        }
        
        // Mark as completed
        update_option($option_key, true);
    }
}

// Initialize the optimized reviews system
Modeo_Reviews_Optimized::get_instance();