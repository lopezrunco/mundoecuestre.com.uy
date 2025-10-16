<?php

/**
 * Template Name: Shows
 * 
 * @package Mundo Ecuestre WP Theme
 */

get_header();
?>

<section>
    <div class="container">
        <div class="post-module" data-category-id="5" data-posts="60">
            <div class="root"></div>
            <div class="skeleton"></div>
        </div>
        <script src="<?php echo get_template_directory_uri(); ?>/custom/dist/src/main.js" type="module"></script>
    </div>
</section>

<?php 
    // get_template_part('template-parts/monthly-events');
    get_footer(); 
?>
