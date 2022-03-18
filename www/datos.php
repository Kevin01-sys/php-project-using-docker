<?php 
$conexion=mysqli_connect('localhost','root','1234','prueba');
$id_categoria=$_POST['id_categoria'];

	$sql="SELECT *
	FROM t_mundo 
	WHERE id_continente='$id_categoria'";

	$result=mysqli_query($conexion,$sql);

	$cadena="<label>SELECT 2 (Nivel)</label> 
			<select id='lista2' name='lista2'>";

	while ($ver=mysqli_fetch_row($result)) {
		//$cadena=$cadena."<option value='.$ver[0].'>sadf	</option>";
		$cadena=$cadena.'<option value='.$ver[0].'>'.utf8_encode($ver[2]).'</option>';
	}

	echo  $cadena."</select>";
	

?>