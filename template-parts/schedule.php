<?php
require_once get_template_directory() . '/functions.php';
if (file_exists(SCHEDULE_DATA_PATH)) {
    $json_data = file_get_contents(SCHEDULE_DATA_PATH);
    $schedule_data = json_decode($json_data, true);
}
?>

<section class="schedule">
    <article class="container">
        <div class="row">
            <div class="section-title fade-in delay-level3">
                <h2>Emisión televisiva semanal</h2>
                <div class="separator"></div>
            </div>
        </div>
        <div class="row">
            <table class="table table-striped">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">Canal</th>
                        <th scope="col">Días de estreno</th>
                        <th scope="col">Días de repetición</th>
                        <th scope="col">Plataforma</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($schedule_data as $row) {
                        echo "<tr>";
                        echo "<td>{$row['canal']}</td>";
                        echo "<td>{$row['dias_estreno']}</td>";
                        echo "<td>{$row['dias_repeticion']}</td>";
                        echo "<td>{$row['plataforma']}</td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </article>
</section>