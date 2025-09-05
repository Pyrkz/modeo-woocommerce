<?php 
get_header(); 
define('MODEO_HEADER_INCLUDED', true);
?>

<!-- Modeo Theme -->
<!-- DEBUG: Using page.php template -->
<!-- MARKER: WooCommerce uses DEFAULT templates -->

<?php if (is_checkout()): ?>
    <!-- DEBUG: Checkout detected - using WooCommerce DEFAULT checkout -->
    <?php echo '<!-- MARKER: PURE WOOCOMMERCE CHECKOUT - NO CUSTOM CODE -->'; ?>
    <div class="woocommerce">
        <?php
        // Simply display the page content - WooCommerce handles EVERYTHING
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
<?php elseif (is_account_page() || is_cart()): ?>
    <!-- Full-width layout for other e-commerce pages (no container, no padding) -->
    <div class="woocommerce-page-content ">
        <?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                ?>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
                <?php
            }
        }
        ?>
    </div>
<?php else: ?>
    <!-- Regular page layout with container -->
    <div class="container py-8">
        <?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg shadow p-6'); ?>>
                    <header class="entry-header mb-6">
                        <h1 class="entry-title text-3xl font-bold text-gray-900"><?php the_title(); ?></h1>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
                <?php
            }
        }
        ?>
    </div>
<?php endif; ?>

<?php get_footer(); ?>