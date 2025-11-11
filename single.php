<?php
get_header();
?>

<section>
    <article class="container">
        <div class="row">
            <?php
                if (have_posts()) {
                    while (have_posts()) {
                        the_post();

                        $current_post_slug = get_post_field('post_name', get_post());
                        $api_url = 'https://mundoecuestre.com.uy/wp-json/wp/v2/posts?slug=' . $current_post_slug;
                        $response = wp_remote_get($api_url);

                        if (!is_wp_error($response)) {
                            $body = wp_remote_retrieve_body($response);
                            $data = json_decode($body);

                            if (!empty($data)) {
                                $remote_post = $data[0]; // First match.
                                $acf = $remote_post->acf;
                                $featured_image_url = '';

                                if (!empty($remote_post->featured_media)) {
                                    $media_id = $remote_post->featured_media;
                                    $media_api_url = 'https://mundoecuestre.com.uy/wp-json/wp/v2/media/' . $media_id;
                                    $media_response = wp_remote_get($media_api_url);

                                    if (!is_wp_error($media_response)) {
                                        $media_body = wp_remote_retrieve_body($media_response);
                                        $media_data = json_decode($media_body);

                                        if (!empty($media_data->source_url)) {
                                            $featured_image_url = $media_data->source_url;
                                        }
                                    }
                                }

                                if (!empty($featured_image_url)) {
                                    echo '<div class="col-md-3 offset-md-3">';
                                        echo '<img src="' . esc_url($featured_image_url) . '" alt="' . esc_attr($remote_post->title->rendered) . '" width="100%" class="border border-radius mb-4">';
                                    echo '</div>';
                                } else {
                                    echo '<div class="col-md-3 offset-md-3">';
                                        echo '<img src="' . esc_url(get_template_directory_uri() . '/assets/images/mundo-ecuestre-show-thumb.png') . '" alt="' . esc_attr($remote_post->title->rendered) . '" width="100%" class="border border-radius mb-4">';
                                    echo '</div>';
                                }

                                if (!empty($acf)) {
                                    echo '<div class="col-md-4">';
                                        echo '<h4 class="mb-3">' . get_the_title() . '</h4>';
                                        if (!empty($acf->inicio_de_la_transmision)) {
                                            $datetime = new DateTime($acf->inicio_de_la_transmision);

                                            $months = [
                                                1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
                                                5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
                                                9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
                                            ];

                                            $day = $datetime->format('d');
                                            $month = $months[(int)$datetime->format('m')];
                                            $year = $datetime->format('Y');

                                            $formatted_date = "$day de $month de $year";

                                            echo '<p><strong>Emisión:</strong> ' . esc_html($formatted_date) . '</p>';
                                        }
                                        if (!empty($acf->ubicacion)) {
                                            echo '<p><strong>Ubicación:</strong> ' . esc_html($acf->ubicacion) . '</p>';
                                        }
                                        if (!empty($acf->enlace_transmision)) {
                                            echo '<a href="' . esc_url($acf->enlace_transmision) . '" target="_blank" class="btn btn-outline"><i class="fa-solid fa-video"></i> Ver ahora</a>';
                                        }
                                    echo '</div>';
                                } else {
                                    echo '<p>No se encontraron datos personalizados para este evento.</p>';
                                }
                            } else {
                                echo '<p>No se encontró información sobre este evento.</p>';
                            }
                        } else {
                            echo '<p>Error al conectar con Wordpress.</p>';
                        }
                            
                    } // endwhile
                } // endif
            ?>
        </div>
    </article>
</section>

<?php get_footer(); ?>