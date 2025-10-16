<section class="bg-light">
    <div class="container">
        <div class="row">
            <div class="section-title fade-in delay-level3">
                <h2>Programas</h2>
                <div class="separator"></div>
            </div>
        </div>
        <div class="post-module" data-category-id="5" data-posts="4">
            <div class="root"></div>
            <div class="skeleton"></div>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <?php
                    $broadcast_page_url = get_permalink(get_page_by_path('programas'));
                    echo '<a class="btn btn-primary" href="' . esc_url($broadcast_page_url) . '">Ver todos los programas <i class="fa-solid fa-chevron-right"></i></a>'
                ?>
            </div>
        </div>
        <script src="<?php echo get_template_directory_uri(); ?>/custom/dist/src/main.js" type="module"></script>
    </div>
</section>