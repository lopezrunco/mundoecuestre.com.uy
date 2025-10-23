<?php
require_once get_template_directory() . '/functions.php';
if (file_exists(SOCIAL_DATA_PATH)) {
    $json_data = file_get_contents(SOCIAL_DATA_PATH);
    $social_data = json_decode($json_data, true);
}

get_template_part('template-parts/quick-links');
?>

<footer class="footer py-3 theme-bg-dark">
    <div class="container">
        <div class="d-flex align-items-center gap-3">
            <div class="social">
                <?php foreach ($social_data as $item) : ?>
                    <a href="<?= $item['link']; ?>" target="_blank" title="<?= $item['title']; ?>">
                        <i class="<?= $item['icon']; ?> me-3"></i>
                    </a>
                <?php endforeach; ?>
            </div>
            <small>
                <?php echo get_bloginfo('name'); ?> © <?php echo date("Y"); ?>
            </small>
            <?php echo do_shortcode('[visitor_counter]'); ?>
        </div>
        <?php dynamic_sidebar('footer-1'); ?>
    </div>
</footer>
</div>

<?php wp_footer(); ?>

<!-- Bootstrap scripts -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
    integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
    crossorigin="anonymous"></script>
</body>

</html>