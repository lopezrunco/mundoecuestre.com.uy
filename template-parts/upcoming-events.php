<section>
    <div class="container">
        <div class="row">
            <div class="section-title fade-in delay-level3">
                <h2>Transmisiones</h2>
                 <p>Realizamos transmisiones cubriendo todos los deportes de a caballo.</p>
                <div class="separator"></div>
            </div>
        </div>
        <div id="root" data-posts="4"></div>
        <div id="skeleton"></div>
        <div class="row mt-5">
            <div class="col-12">
                <?php
                    $broadcast_page_url = get_permalink(get_page_by_path('transmisiones'));
                    echo '<a class="btn btn-primary" href="' . esc_url($broadcast_page_url) . '">Ver todas las transmisiones <i class="fa-solid fa-chevron-right"></i></a>'
                ?>
            </div>
        </div>
        <script src="<?php echo get_template_directory_uri(); ?>/custom/dist/src/main.js" type="module"></script>
    </div>
</section>