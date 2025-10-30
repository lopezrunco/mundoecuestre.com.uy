<?php
require_once get_template_directory() . '/functions.php';

if (file_exists(INTERNATIONAL_EVENTS_DATA_PATH)) {
    $json_data = file_get_contents(INTERNATIONAL_EVENTS_DATA_PATH);
    $international_events_data = json_decode($json_data, true);
}
if (file_exists(INTERNATIONAL_COUNTRIES_DATA_PATH)) {
    $json_data = file_get_contents(INTERNATIONAL_COUNTRIES_DATA_PATH);
    $international_countries_data = json_decode($json_data, true);
}

$no_image_placeholder = NO_IMAGE_PLACEHOLDER;
?>

<section class="international">
    <article class="container">
        <div class="row">
            <div class="section-title fade-in delay-level3">
                <h2>Internacional</h2>
                <div class="separator"></div>
            </div>
        </div>
        <div class="row mb-5">
            <?php foreach ($international_events_data as $international_event) :
                $event_image_name = isset($international_event['img-name']) ? $international_event['img-name'] : null;
                $event_image_url = $event_image_name
                    ? get_template_directory_uri() . '/assets/images/international/' . $event_image_name
                    : $no_image_placeholder;
                $event_title = isset($international_event['title']) ? esc_html($international_event['title']) : 'Sin título';
            ?>
                <div class="col-sm-4 mb-2 text-center">
                    <div class="international-card">
                        <img src="<?php echo $event_image_url; ?>" alt="<?php echo $event_title; ?>" />
                        <h5><?php echo $event_title; ?></h5>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="row">
            <?php foreach ($international_countries_data as $international_country) :
                $country_image_name = isset($international_country['img-name']) ? $international_country['img-name'] : null;
                $country_image_url = $country_image_name
                    ? get_template_directory_uri() . '/assets/images/international/' . $country_image_name
                    : $no_image_placeholder;
                $country_name = isset($international_country['title']) ? esc_html($international_country['title']) : 'Sin nombre';
            ?>
                <div class="col-6 col-sm-4 col-md-3 mb-2 text-center">
                    <div class="international-card">
                        <img src="<?php echo $country_image_url; ?>" alt="<?php echo $country_name; ?>" />
                        <h5><?php echo $country_name; ?></h5>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </article>
</section>