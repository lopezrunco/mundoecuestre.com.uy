<?php

/**
 * Template Name: Contact
 * 
 * @package Mundo Ecuestre WP Theme
 */

get_header();
get_template_part('template-parts/contact-info'); 
?>

<section>
    <article class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-title">
                    <h2>Formulario de contacto</h2>
                    <div class="separator"></div>
                </div>
            </div>
            <div class="col-lg-7 offset-lg-3 mb-5 mb-lg-0">
                <?php
                // Dev form
                // echo do_shortcode('[contact-form-7 id="14d1f0a" title="Formulario de contacto"]');

                // Prod form
                echo do_shortcode('[contact-form-7 id="f163abf" title="Formulario de contacto"]'); 
                ?>
            </div>
            <div class="col-12">
                <?php get_template_part('template-parts/social-icons'); ?> 
            </div>
        </div>
    </article>
</section>

<?php get_footer();