<?php
	/* With the require_once we make use of the file users_model.php*/
	require_once "../models/users_model.php";

	$json = file_get_contents('php://input');
	$dataObtain = json_decode($json);
	$idRegion = $dataObtain->idRegion;

	// The model for querying the database is instantiated.
	$user = new UsersModel();

	// get list of communes
	$data = $user->obtain_communes($idRegion);

	//returns data as JSON format
	echo json_encode($data);
 ?>