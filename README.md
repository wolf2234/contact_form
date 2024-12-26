# Contact Form

Сама форма знаходиться в функції `functions.php->art_feedback()`. Для того, щоб її використовувати, треба просто вставити в `index.php` шордкод `<?php echo do_shortcode('[art_feedback]'); ?>`, який повертає цю форму.

## Налаштування Бази данных.

В файлі "functions.php" потрібно знайти функцію "ajax_action_callback()" і замінити значення наступних змінних на свої власні:

-   $servername = "MySQL-8.2";
-   $username="viktor";
-   $password="1234";
-   $dbname="wp_db_feedback";
-   $tablename="wp_table_feedback";
