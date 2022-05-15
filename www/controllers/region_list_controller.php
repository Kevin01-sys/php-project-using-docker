<?php
	/* With the require_once we make use of the file users_model.php*/
	require_once "../models/users_model.php";

	// The model for querying the database is instantiated.
	$user = new UsersModel();

	$data = $user->obtain_regions();

	//returns data as JSON format
	echo json_encode($data);
 ?>