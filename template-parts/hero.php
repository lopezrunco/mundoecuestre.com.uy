<?php
require_once get_template_directory() . '/functions.php';
if (file_exists(COMPANY_DATA_PATH)) {
    $json_data = file_get_contents(COMPANY_DATA_PATH);
    $company_data = json_decode($json_data, true);
}
?>

<div class="hero">
	<div class="gray-overlay">
		<div class="container">
			<div class="content-wrapper fade-in delay-level2">
				<h6 class="subtitle">Apoyando todos los deportes ecuestres</h6>
				<h1 class="title"><?= $company_data['companyName']; ?></h1>
				<p>
					Un programa único en su estilo ya que cubre todos los deportes de a caballo: polo, equitación, enduro, cuarto de milla, caballos árabes y criollos. Se recorre todo el país para exhibir caballos, jinetes y amazonas en diferentes categorías, edades y actividades. Con coberturas de eventos internacionales acompañando y apoyando como siempre todos los deportes ecuestres.
				</p>
				<!-- <?php
				$contact_page_url = get_permalink(get_page_by_path('contacto'));
				echo '<a class="btn btn-primary" href="' . esc_url($contact_page_url) . '">Contacto <i class="fa-solid fa-chevron-right"></i></a>'
				?> -->
			</div>
			<div class="video-bg">
				<video autoplay muted loop playsinline preload="auto">
					<source src="<?php echo get_template_directory_uri(); ?>/assets/videos/home-video.mp4" type="video/mp4">
				</video>
			</div>
		</div>
	</div>
</div>