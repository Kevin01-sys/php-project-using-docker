<?php
	/* With the require_once we make use of the file users_model.php*/
	include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
	require_once (MODEL_PATH."users_model.php");

	$dataObtain = json_decode(file_get_contents('php://input')); // Get JSON and decode it
	$idRegion = $dataObtain->idRegion;

	// The model for querying the database is instantiated.
	$user = new UsersModel();

	// get list of communes
	$data = $user->obtain_communes($idRegion);

	//returns data as JSON format
	echo json_encode($data);
 ?>