<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <title><?php bloginfo('name'); ?></title>
</head>
<body>
        <div class="container">
            <main class="main">
                <?php echo do_shortcode('[art_feedback]'); ?>
            </main>
        </div>
    <?php wp_footer(); ?>
</body>

</html>