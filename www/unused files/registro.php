<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Registro</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	
</head>
<body>
	<?php

	/*Con el require_once haremos uso del archivo Config.php donde guardamos en constantes los datos requeridos para conectarnos a la BD.*/
	require_once "Config.php";


	/*La función spl_autoload_register permite cargar o llamar automáticamente una función que le pasemos, es decir es un "autoloader", dentro pasaremos un "require_once" con un parametro $clase, el truco es que, cuando instanciemos una clase que no esta en nuestro archivo, esa variable tomara el nombre de la clase, en el caso más abajo será "Database", así si en un futuro tenemos muchas clases en distintos archivos, no tendremos que hacer un "require" o un "include" por cada una.*/

	spl_autoload_register(function($clase){
		require_once "$clase.php";

	});

	/*"extract" tomara los datos del Array que vienen el POST y los convertira en variables declarandolas usando como valor los "name" que tienen cada input de nuestro formulario, es decir, de lo extraido en POST saldran las variables $nombre y $hobby con los valores que hayamos introducido en el formulario.*/

	extract($_POST, EXTR_OVERWRITE);

	//Instanciamos la clase Database para hacer la conexión y las consultas.

	$db= new Database(DB_HOST,DB_USER,DB_PASS,DB_NAME);

	/*Con $validarUsuario haremos una pequeña validación, que consiste en que no se registren nombres de usuario que ya esten en BD; pasamos la columna, la tabla y el valor del formulario, entonces en "validarDatos" llegara la consulta "SELECT nombre FROM usuarios WHERE nombre= 'fulanito'" si resulta que encuentra algo entonces con la propiedad "num_rows" de la consulta mandará un valor de 1 registro.*/

	$validarUsuario= $db->validarDatos("nombre","usuarios",$nombre);
	if($validarUsuario>0){
		echo "Usuario ya registrado, ingrese otros datos. <a href='index.php'>Regresar</a>";
	}else{
		//echo "Usuario ingresado con éxito";
		/*Ahora si no está registrado el nombre que le pasamos entonces haremos el registro; en la función "preparar" mandaremos la inserción de datos usando las variables que previamente "extract" extrajo de lo venido en el POST.*/

			//$db->preparar("INSERT INTO usuarios VALUES (?,?,?)");
			$db->preparar("INSERT INTO usuarios VALUES (NULL,'$nombre','$hobby')");
			/*Ahora por regla usaremos el "ejecutar" y ya se habra logrado la inserción en la BD*/
			$db->ejecutar();
			echo("Te has registrado perfectamente.");
			/*Liberamos para que podamos hacer la siguiente consulta, es regla.*/
			$db->liberar();
		/*Ahora en vez de insertar haremos una selección de todos los datos y ejecutaremos*/

			$db->preparar("SELECT * FROM usuarios");
			$db->ejecutar();

		/*Aquí haremos uso de la consulta que estaba encapsulada en la clase, por que haremos uso del método "bind_result" que nos asigna cada registro que la consulta haya hecho a las variables que le suministremos (Se declaran dentro del mismo paso de parametros).*/

			$db->prep()->bind_result($id,$nombre_BD,$hobby_BD);

		/*Aquí crearemos la tabla a base del uso de "echo" con código HTML*/

			echo '<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">Nombre</th>
			      <th scope="col">Hobby</th>
			    </tr>
			  </thead>
			  <tbody>';

		/*Para mostrar en fila cada resultado encontrado en la BD, haremos uso del metodo "resultado" que recordemos tiene el "return $this->prep->fetch();" el metodo "fetch" de la consulta trae una fila de la tabla resultado de la consulta, usamos un while para que itere con cada registro encontrado, de no usarlo, entonces solo nos enviaria la primera fila de todo lo encontrado*/ 

			  while($db->resultado()){
			  	echo"
			  	<tr>
			      <td>$nombre_BD</td>
			      <td>$hobby_BD</td>
			    </tr>
			    ";
			  } 
			 echo '</tbody>
			</table>';
		/*Liberamos la consulta*/

			$db->liberar();

		/*Y finalmente cerramos toda la conexión*/
		
			$db->cerrar();
	}

	

	?>
<script src="js/jquery-3.5.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>