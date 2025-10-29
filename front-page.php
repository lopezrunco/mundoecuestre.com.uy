<?php
get_header();
get_template_part('template-parts/hero');
get_template_part('template-parts/upcoming-events');
get_template_part('template-parts/latest-shows');
get_template_part('template-parts/schedule');
get_template_part('template-parts/sponsors');

// Start Call to action section variables and template part
$cta_bg_image_url = '/assets/images/call-to-action-bg.jpg';
$cta_subtitle = 'Póngase en contacto con nosotros para recibir información detallada y resolver cualquier duda.';
$cta_title = '¿Interesado en nuestros servicios?';
$contact_page = get_page_by_path('contacto');
$cta_button_url = get_permalink($contact_page->ID);
$cta_button_text = 'Contáctenos';
$cta_icon = 'fa-message';
include get_template_directory() . '/template-parts/call-to-action.php';
// End Call to action section variables and template part

get_template_part('template-parts/instagram-feed');
get_footer();
?>
