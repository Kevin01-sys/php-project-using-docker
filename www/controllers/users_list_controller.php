<?php
	/* With the require_once we make use of the file users_model.php*/
	include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
	require_once (MODEL_PATH."users_model.php");

	// The model for querying the database is instantiated.
	$user = new UsersModel();

	// The list with all users is brought
	$data = $user->get_users();
	//$data = UsersModel::static_get_users();

	//returns data as JSON format
	echo json_encode($data);
 ?>