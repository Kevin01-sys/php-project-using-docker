<?php
	/* With the require_once we make use of the file users_model.php*/
	require_once "../models/users_model.php";

	$informacion = [];

	// Accessing incoming PUT or DELETE data from PHP
/* 	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		parse_str(file_get_contents("php://input"),$_POST);
	} else if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		parse_str(file_get_contents("php://input"),$_POST);
	} */

	/* It is working when you send data in json object. */
/* 	$test = @file_get_contents('php://input');
	$r = json_decode($test);
	print_r($r); */

	//The $_POST data is fetched
	parse_str(file_get_contents("php://input"),$_POST);
	extract($_POST, EXTR_OVERWRITE);

	// The model for querying the database is instantiated.
	$user = new users_model();

	// They are executed according to what $opcion brings
	switch ($opcion) {

		case 'registrar':
			//If the variables are empty, the user is prompted on the screen to fill in all fields
			if($run != "" && $nombre != "" && $hobby != ""){
				$validarUsuario= $user->validate_data("run","usuarios",$run);
				// Validates if the user exists
				if($validarUsuario>0){
					$informacion["respuesta"] = "EXISTE";
					echo json_encode($informacion);
				}else{
					$result=$user->store_user($run,$nombre, $hobby);
					verificar_resultado($result);
				}
				
			}else{
				$informacion["respuesta"] = "VACIO";
				echo json_encode($informacion);
			}
			break;		

		case 'modificar':
			$result=$user->update_user($run,$nombre, $hobby,$id);
			verificar_resultado($result);
			break;

		case 'eliminar':
			$result=$user->delete_user($id);
			verificar_resultado($result);
			break;

	}
	
	/* Validates if the user table could be modified or changed. */
	function verificar_resultado($resultado){
		if (! $resultado )  $informacion["respuesta"] = "ERROR";
		else $informacion["respuesta"] = "BIEN";
		echo json_encode($informacion);
	}

?>
