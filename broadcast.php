<?php

/**
 * Template Name: Broadcast
 * 
 * @package Mundo Ecuestre WP Theme
 */

get_header();
?>

<section>
    <div class="container">
        <div id="root" data-category-id="3" data-posts="60"></div>
        <div id="skeleton"></div>
        <script src="<?php echo get_template_directory_uri(); ?>/custom/dist/src/main.js" type="module"></script>
    </div>
</section>

<?php 
    // get_template_part('template-parts/monthly-events');
    get_footer(); 
?>