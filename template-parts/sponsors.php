<?php
// Load static JSON ata.
require_once get_template_directory() . '/functions.php';

if (file_exists(SPONSORS_DATA_PATH)) {
    $json_data = file_get_contents(SPONSORS_DATA_PATH);
    $items = json_decode($json_data, true); // Decode as associative array. 
} else {
    $items = array();
}

$no_image_placeholder = NO_IMAGE_PLACEHOLDER;
?>


<?php if (!empty($items)) : ?>
    <!-- Desktop Version -->
    <section class="sponsors-slider d-none d-lg-block">
        <article class="container fade-in delay-level2 px-0">
            <div class="row">
                <div class="section-title">
                    <h2>Nuestros sponsors</h2>
                </div>
            </div>

            <div class="sponsors-carousel-wrapper position-relative">
                <div class="sponsors-track d-flex align-items-center overflow-hidden">
                    <div class="sponsors-inner d-flex">
                        <?php foreach ($items as $item) :
                            $image_name = isset($item['img-name']) ? $item['img-name'] : null;
                            $image_url = $image_name
                                ? get_template_directory_uri() . '/assets/images/sponsors/' . $image_name
                                : $no_image_placeholder;
                            $link = isset($item['link']) ? esc_url($item['link']) : '#';
                            $title = isset($item['title']) ? esc_html($item['title']) : 'Sin título';
                        ?>
                            <div class="sponsor-item text-center">
                                <a href="<?php echo $link; ?>" target="_blank" rel="noopener">
                                    <img 
                                        class="img-fluid border-radius"
                                        src="<?php echo $image_url; ?>" 
                                        alt="<?php echo $title; ?>" 
                                    />
                                </a>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="controls">
                    <button class="carousel-control-prev custom-prev" type="button">
                        <i class="fa-solid fa-chevron-left position-arrow"></i>
                    </button>
                    <button class="carousel-control-next custom-next" type="button">
                        <i class="fa-solid fa-chevron-right position-arrow"></i>
                    </button>
                </div>

            </div>
        </article>
    </section>

    <!-- Mobile Version -->
    <section class="sponsors-slider d-block d-lg-none">
        <article class="container">
            <div class="row">
                <div class="section-title mb-0">
                    <h2>Nuestros sponsors</h2>
                </div>
            </div>

            <div id="sponsorsCarouselMobile" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner py-5">
                    <?php foreach ($items as $index => $item) :
                        $image_name = isset($item['img-name']) ? $item['img-name'] : null;
                        $image_url = $image_name
                            ? get_template_directory_uri() . '/assets/images/sponsors/' . $image_name
                            : $no_image_placeholder;

                        $link = isset($item['link']) ? esc_url($item['link']) : '#';
                        $title = isset($item['title']) ? esc_html($item['title']) : 'Sin título';
                    ?>
                        <div class="carousel-item px-5 <?php echo $index === 0 ? 'active' : ''; ?>">
                            <a href="<?php echo $link; ?>" target="_blank" rel="noopener">
                                <img 
                                    class="d-block w-100 border-radius box-shadow" 
                                    src="<?php echo $image_url; ?>" 
                                    alt="<?php echo $title; ?>" 
                                />
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>

                <a class="carousel-control-prev" href="#sponsorsCarouselMobile" role="button" data-slide="prev">
                    <i class="fa-solid fa-chevron-left position-arrow"></i>
                </a>
                <a class="carousel-control-next" href="#sponsorsCarouselMobile" role="button" data-slide="next">
                    <i class="fa-solid fa-chevron-right position-arrow"></i>
                </a>
            </div>
        </article>
    </section>
<?php endif; ?>