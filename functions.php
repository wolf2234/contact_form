<?php 
add_action('wp_enqueue_scripts', 'convert_bra_styles');
add_action('wp_enqueue_scripts', 'convert_bra_scripts');


function convert_bra_styles() {
    wp_enqueue_style('null-style', get_template_directory_uri() . '/assets/css/null-style.css');
    wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/assets/css/bootstrap.min.css');
    wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/assets/css/bootstrap.min.css.maps');
    wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/main-style.css');
}

function convert_bra_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'bootstrap-js', get_template_directory_uri() . '/assets/js/bootstrap.bundle.min.js', array('jquery'), null, true);
	wp_enqueue_script( 'bootstrap-js', get_template_directory_uri() . '/assets/js/bootstrap.bundle.min.js.map', array('jquery'), null, true);
	wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery'), null, true);
    wp_localize_script('scripts', 'feedback_object', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('feedback_nonce'),
    ));
}



add_shortcode( 'art_feedback', 'art_feedback' );
function art_feedback() {
	ob_start();
	?>
	<form id="id_feedback_form" class="form">
		<div class="mb-3">
			<label for="id_name" class="form-label">Name</label>
			<input id="id_name" type="text" name="form__name" class="form__name form-control" placeholder="Your Name" value=""/>
		</div>
		<div class="mb-3">
			<label for="id_email" class="form-label">Email</label>
			<input id="id_email" type="email" name="form__email" class="form__email form-control" placeholder="E-Mail" value=""/>
		</div>
		<div class="mb-3">
			<label for="id_title" class="form-label">Title</label>
			<input id="id_title" type="text" name="form__title" class="form__subject form-control" placeholder="Title" value=""/>
		</div>
		<?php wp_nonce_field('feedback_nonce'); ?>
		<div class="mb-3">
			<label for="id_comments" class="form-label">Сomments</label>
			<textarea id="id_comments" name="form__comments" class="form__comments form-control" placeholder="Сообщение" rows="10" cols="30"></textarea>
		</div>
		<button type="submit" class="form__btn btn btn-primary">Отправить сообщение</button>
	</form>
	<?php
	return ob_get_clean();
}

function send_email() {
    $to = sanitize_text_field($_POST['form_email']);
    $subject = sanitize_text_field($_POST['form_subject']);
    $message = sanitize_text_field($_POST['form_comments']);
    $headers = array('Content-Type: text/html; charset=UTF-8');
    wp_mail($to, $subject, $message, $headers);
}


function create_db_feedback($servername, $username, $password, $dbname, $tablename) {
	try {
		$conn = new PDO("mysql:host=$servername", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
		$conn->exec($sql);
		$conn->exec("USE $dbname");

		$sql = "CREATE TABLE IF NOT EXISTS $tablename (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			form_name VARCHAR(255) NOT NULL,
			form_email VARCHAR(255) NOT NULL,
			form_subject VARCHAR(255) NOT NULL,
			form_comments TEXT NOT NULL,
			submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			UNIQUE (form_email),
			UNIQUE (form_name)
		)";
		$conn->exec($sql);
	} catch (PDOException $e) {
		echo "Create Ошибка: " . $e->getMessage();
	}
	$conn = null;
}


function insert_data_db($servername, $username, $password, $dbname, $tablename) {
	$form_name = sanitize_text_field($_POST['form_name']);
    $form_email = sanitize_text_field($_POST['form_email']);
    $form_subject = sanitize_text_field($_POST['form_subject']);
    $form_comments = sanitize_text_field($_POST['form_comments']);


	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "INSERT INTO $tablename (form_name, form_email, form_subject, form_comments) 
				VALUES (:form_name, :form_email, :form_subject, :form_comments)";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(':form_name', $form_name);
		$stmt->bindParam(':form_email', $form_email);
		$stmt->bindParam(':form_subject', $form_subject);
		$stmt->bindParam(':form_comments', $form_comments);
		$stmt->execute();
		send_email();
	} catch (PDOException $e) {
		wp_send_json_error(['message' => 'Bad Request'], 400);
	}
	$conn = null;
}



add_action( 'wp_ajax_feedback_action', 'ajax_action_callback' );
add_action( 'wp_ajax_nopriv_feedback_action', 'ajax_action_callback' );
function ajax_action_callback() {
	if (wp_verify_nonce($_POST['form_nonce'], 'feedback_nonce')) {
		$servername = "MySQL-8.2"; // Change on yourself.
		$username="viktor"; // Change on yourself.
		$password="1234"; // Change on yourself.
		$dbname="wp_db_feedback"; // Change on yourself.
		$tablename="wp_table_feedback"; // Change on yourself.

		$functions = [
			'create_db_feedback',
			'insert_data_db'
		];
		for ($i = 0; $i < count($functions); $i++) {
			$functions[$i]($servername, $username, $password, $dbname, $tablename);
		}
	}
}

