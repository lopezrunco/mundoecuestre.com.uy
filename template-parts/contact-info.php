<?php
require_once get_template_directory() . '/functions.php';
if (file_exists(COMPANY_DATA_PATH)) {
    $json_data = file_get_contents(COMPANY_DATA_PATH);
    $company_data = json_decode($json_data, true);
}
if (file_exists(OFFICES_DATA_PATH)) {
    $json_data = file_get_contents(OFFICES_DATA_PATH);
    $offices_data = json_decode($json_data, true);
}
?>

<?php foreach ($offices_data as $office) : ?>
    <section class="contact-info <?= $office['bgColorClass']; ?>">
        <article class="container fade-in delay-level3">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2>Comunidad Mundo Ecuestre</h2>
                        <div class="separator"></div>
                        <?php foreach($company_data['join-us'] as $pharagraph) { ?>
                            <p><?php echo $pharagraph; ?></p>
                        <?php } ?>
                    </div>
                </div>
                <?php foreach ($office['data'] as $data_item) : ?>
                    <div class="col-lg-6">
                        <div class="content-wrapper">
                            <i class="<?= $data_item['icon']; ?>"></i>
                            <p class="description"><?= $data_item['title']; ?></p>
                            <h5>
                                <?php foreach ($data_item['content'] as $content_item) : ?>
                                    <a
                                        href="<?= $content_item['link']; ?>"
                                        target="_blank">
                                        <?= $content_item['info']; ?>
                                    </a>
                                <?php endforeach; ?>
                            </h5>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </article>
    </section>
<?php endforeach; ?>