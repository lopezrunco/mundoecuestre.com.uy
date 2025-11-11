<?php
$post_url = urlencode(get_permalink());
$post_title = urlencode(get_the_title());
?>

<div class="social-share">
    <h5>Compartir:</h5>
    <div class="icons">
        <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $post_url; ?>" target="_blank">
            <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/intent/tweet?url=<?php echo $post_url; ?>&text=<?php echo $post_title; ?>" target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $post_url; ?>&title=<?php echo $post_title; ?>" target="_blank">
            <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://api.whatsapp.com/send?text=<?php echo $post_title . '%20' . $post_url; ?>" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>
</div>