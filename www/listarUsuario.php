<?php
	/* With the require_once we make use of the file users_model.php*/
	require_once "users_model.php";

	// The model for querying the database is instantiated.
	$user = new users_model();

	// The list with all users is brought
	$data = $user->get_users();
	//$data = users_model::static_get_users();

	//returns data as JSON format
	echo json_encode($data);
 ?>