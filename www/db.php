<?php 
require_once('config.php');
	/**
	* Conexion a bbdd usando mysqli
	*/
	class Connect 
	{
		//protected $con;
		
		protected static function connection(){
			// da error porque: $this se refiere al contexto de la instancia actual del objecto. Los metodos static no pertencen a la instancia del objeto
			//$this->con = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
			$con = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
        if($con->connect_errno){
            echo "error<br>Fallo la conexion con Mysql, tipo de error -> ({$con->connect_error}) <a href='index.php'>Regresar</a>";  
        }
			return $con;
		}

	}
?>