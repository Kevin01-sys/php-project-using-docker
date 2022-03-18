<?php
	/*Con el require_once haremos uso del archivo Config.php donde guardamos en constantes los datos requeridos para conectarnos a la BD.*/
	require_once "config.php";
	/*La función spl_autoload_register permite cargar o llamar automáticamente una función que le pasemos, es decir es un "autoloader", dentro pasaremos un "require_once" con un parametro $clase, el truco es que, cuando instanciemos una clase que no esta en nuestro archivo, esa variable tomara el nombre de la clase, en el caso más abajo será "Database", así si en un futuro tenemos muchas clases en distintos archivos, no tendremos que hacer un "require" o un "include" por cada una.*/
	spl_autoload_register(function($clase){
		require_once "$clase.php";

	});
	$informacion = [];
	$estado=1;
	//Se traen los datos $_POST
	extract($_POST, EXTR_OVERWRITE);
	//Instanciamos la clase Database para hacer la conexión y las consultas.
	$db= new Database(DB_HOST,DB_USER,DB_PASS,DB_NAME);

	// Se ejecutan en función de lo que trae $opción
	switch ($opcion) {
		case 'registrar':
			//Si las variables vienen vacias se le avisa al usuario por pantalla que debe llenar todos los campos
			if($run != "" && $nombre != "" && $hobby != ""){
				$validarUsuario= $db->validarDatos("run","usuarios",$run);
				// si el usuario no existe se ingresa, sino se le avisa al usuario que no puede ingresarlo
				if($validarUsuario>0){
					$informacion["respuesta"] = "EXISTE";
					echo json_encode($informacion);
				}else{
					registrar($run,$nombre, $hobby, $db);
				}
				
			}else{
				$informacion["respuesta"] = "VACIO";
				echo json_encode($informacion);
			}
			break;		
		case 'modificar':
			modificar($id,$run, $nombre, $hobby, $db);
			break;

		case 'eliminar':
			eliminar($id,$db);
			break;

	}

	function registrar($run,$nombre, $hobby, $db){
		// Prepara una sentencia SQL con parámetros de signos de interrogación
		$query = "INSERT INTO usuarios VALUES(NULL,?,?,?,1)";
		$validarpreparar=$db->preparar($query);
	    	// Vincula variables a una sentencia preparada como parámetros
	    	$db->prep()->bind_param('sss',$run,$nombre,$hobby);
		    $resultado = $db->ejecutar();
			verificar_resultado($resultado);
		    $db->liberar();
			$db->cerrar();
	}

	function modificar($id,$run, $nombre, $hobby, $db){
		// Prepara una sentencia SQL con parámetros de signos de interrogación
		$query= "UPDATE usuarios SET run=?, nombre=?, hobby=? WHERE id = ?";
		// Se valida el resultado de preparación: null o 1 
	    $validarpreparar=$db->preparar($query);
	    	// Vincula variables a una sentencia preparada como parámetros
	    	$db->prep()->bind_param('sssi',$run,$nombre,$hobby,$id);
		    $resultado = $db->ejecutar();
			verificar_resultado($resultado);
		    $db->liberar();
			$db->cerrar();

	}

	function eliminar($id,$db){
		$query= "UPDATE usuarios SET estado=0 WHERE id = ?";
		$validarpreparar=$db->preparar($query);
	    // Si trae datos que ejecute el proceso de adjuntar variables a Query y ejecutarla
	    if ($validarpreparar==1){
	    	// Vincula variables a una sentencia preparada como parámetros
		    $db->prep()->bind_param('i', $id);
		    $resultado = $db->ejecutar();
			verificar_resultado($resultado);
		    $db->liberar();
			$db->cerrar();
	    } 
	    	else { // No se ejecuta y solo se muestra el mensaje de error en pantalla
	    	verificar_resultado($validarpreparar);
	    }
	}

	
	function verificar_resultado($resultado){
		if (! $resultado )  $informacion["respuesta"] = "ERROR";
		else $informacion["respuesta"] = "BIEN";
		echo json_encode($informacion);
	}

?>
