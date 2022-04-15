<?php

	/*Con el require_once haremos uso del archivo config.php donde guardamos en constantes los datos requeridos para conectarnos a la BD.*/
	require_once "config.php";
	//require_once "database.php";
	// PDO
	$conexion=new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME."",DB_USER,DB_PASS);
	// mysqli, de manera procesal
	//$conexion=mysqli_connect('localhost','root','1234','prueba');
	// mysqli, de manera orientado a objetos
	//$conexion=new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);

	/*"extract" tomara los datos del Array que vienen el POST y los convertira en variables declarandolas usando como valor los "name" que tienen cada input de nuestro formulario, es decir, de lo extraido en POST saldran las variables $nombre y $hobby con los valores que hayamos introducido en el formulario.*/
	extract($_POST, EXTR_OVERWRITE);
	//$id_categoria=$_POST['id_categoria'];
	//$nivel=$_POST['nivel'];

	$data = array();
	//Se prepara la consulta
	$sql="SELECT * FROM t_mundo WHERE id_continente='$id_categoria' AND id='$nivel'";

	//$query=mysqli_query($conexion,$sql);
	$query=$conexion->query($sql);	
	// Se cuenta el número de filas que obtuvo de la consulta 
	$numerofilas=$query->rowCount();

	//if($query->num_rows > 0){
	if($numerofilas > 0){
		//$userData = $query->fetch_assoc();
	    $userData = $query->fetch(PDO::FETCH_ASSOC);
	    $data['status'] = 'ok';
	    $data['result'] = $userData;
		}else{
	    	$data['status'] = 'err';
	        $data['result'] = '';
	       }

	//returns data as JSON format
	echo json_encode($data);
	
?>