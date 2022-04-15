<?php
	/*Con el require_once haremos uso del archivo Config.php donde guardamos en constantes los datos requeridos para conectarnos a la BD.*/
	require_once "config.php";
	require_once "Database.php";
	//require_once "users_model.php";

	// Instantiate the Database class to make the connection and the queries
	$db= new Database();
/* 	$user = new users_model();
	$data = $user->get_users(); */

	// The list with all users is brought
	$data = $db->listarUsuarios();

	//returns data as JSON format
	echo json_encode($data);
 ?>