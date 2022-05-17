<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
require_once (CONFIG_PATH."config.php");
	/**
	* DB connection using mysqli
	*/
	class Connect 
	{
		//protected $con;
		
		public static function connection(){
			//It gives error because: $this refers to the context of the current instance of the object. Static methods do not belong to the object instance.
			//$this->con = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
			$con = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
			if($con->connect_errno){
				echo "error<br>Fallo la conexion con Mysql, tipo de error -> ({$con->connect_error}) <a href='index.html'>Regresar</a>";  
			}
			return $con;
		}

	}
?>