<?php
/**
* clase Users
*/
require_once "db.php";

class users_model extends Connect {
    private $db; //sera una instancia de la clase mysqli
    private $users; // ser una instacia para dejar una lista completa de todos los usuarios

	public function __construct(){
		$this->db = parent::connection();
		$this->users = array();
	}

    function get_users(){
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE estado = 1");
        $stmt->execute();
        $stmt->bind_result($id,$run,$nombre_BD,$hobby_BD,$estado_BD);
			// resultado() en Database hace un fetch() por lo que ira pasando fila por fila en el registro de lo que encuentra
			while($stmt->fetch()){
				$users['status'] = 'ok';
				$users['data'][]  = ["id"=> $id,"run" => $run,"nombre" => $nombre_BD,"hobby" => $hobby_BD];
				}
                $stmt->free_result();
                $stmt->close();

                return $users;

    }
}

?>