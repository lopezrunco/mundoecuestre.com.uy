<?php

/**
 * Template Name: About
 * 
 * @package Mundo Ecuestre WP Theme
 */

get_header(); 
get_template_part('template-parts/company-description');
// get_template_part('template-parts/our-staff');

// Start Call to action section variables and template part
$cta_bg_image_url = '/assets/images/call-to-action-bg.jpg';
$cta_subtitle = 'Contáctenos y resolveremos sus dudas de inmediato';
$cta_title = '¿Interesado en nuestros servicios?';
$contact_page = get_page_by_path('contacto');
$cta_button_url = get_permalink($contact_page->ID);
$cta_button_text = 'Contacto';
$cta_icon = 'fa-comment';
include get_template_directory() . '/template-parts/call-to-action.php';
// End Call to action section variables and template part

get_footer(); 
?>