<?php
require_once get_template_directory() . '/functions.php';
if (file_exists(COMPANY_DATA_PATH)) {
    $json_data = file_get_contents(COMPANY_DATA_PATH);
    $company_data = json_decode($json_data, true);
}
?>

<section class="company-images bg-light">
    <article class="container">
        <div class="component-wrapper">
            <?php foreach($company_data['company-images'] as $image) { ?>
                <div class="image-wrapper border-radius">
                    <img 
                        width="100%"
                        class="box-shadow"
                        src="<?php echo get_template_directory_uri() . '/assets/images/about-us/' . esc_attr($image); ?>" 
                        alt="Nosotros" 
                    />
                </div>
            <?php } ?>
        </div>
    </article>
</section>


