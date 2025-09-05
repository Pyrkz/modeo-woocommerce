<?php get_header(); ?>

<div class="container py-8">
    <?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            ?>
            <article class="bg-white rounded-lg shadow p-6 mb-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-4"><?php the_title(); ?></h1>
                <div class="prose max-w-none">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        }
    } else {
        ?>
        <div class="bg-white rounded-lg shadow p-6 text-center">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono treści</h1>
            <p class="text-gray-600">Przepraszamy, nie ma tutaj żadnej treści do wyświetlenia.</p>
        </div>
        <?php
    }
    ?>
</div>

<?php get_footer(); ?>