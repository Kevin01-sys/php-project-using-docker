<?php

require_once "db.php";

/**
* class Users
*/

class users_model extends Connect {
    private $db; // will be an instance of the class mysqli
    private $users; // to be an initiative to leave a complete list of all users

	public function __construct(){
		$this->db = parent::connection();
		$this->users = array();
	}

    /* Get all active users from database */
    public function get_users(){
        $this->users = [];
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE estado = 1");
        $stmt->execute();
        $stmt->bind_result($id,$run,$nombre_BD,$hobby_BD,$estado_BD);
			// fetch(): so it will go through row by row in the log of what it finds
			while($stmt->fetch()){
				$this->users['status'] = 'ok';
				$this->users['data'][]  = ["id"=> $id,"run" => $run,"nombre" => $nombre_BD,"hobby" => $hobby_BD];
				}

                $stmt->free_result();
                $stmt->close();

                return $this->users;

    }
    
    /* Store users in the database */
    public function store_users($run,$nombre, $hobby){
		$query = "INSERT INTO usuarios VALUES(NULL,?,?,?,1)";
		$stmt = $this->db->prepare($query);
	    // Binds variables to a prepared statement
	    $stmt->bind_param('sss',$run,$nombre,$hobby);
        // execute() -> Returns true on success or false on error.
		$result = $stmt->execute();

        $stmt->free_result();
        $stmt->close();

        // ternary operator: if result is True return 1, if result is False return 0
        return $result? 1 : 0;

    }

    public function update_users($run, $nombre, $hobby,$id){
		// Prepara una sentencia SQL con parámetros de signos de interrogación
		$query= "UPDATE usuarios SET run=?, nombre=?, hobby=? WHERE id = ?";
		// Se valida el resultado de preparación: null o 1 
	    $stmt = $this->db->prepare($query);
	    // Vincula variables a una sentencia preparada como parámetros
	    $stmt->bind_param('sssi',$run,$nombre,$hobby,$id);
		$result = $stmt->execute();

        $stmt->free_result();
        $stmt->close();

        // ternary operator: if result is True return 1, if result is False return 0
        return $result? 1 : 0;
    }

    public function find_user(){
        
    }

    /* static method: Get all active users from database */
    public static function static_get_users(){
        $db = self::connection();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE estado = 1");
        $stmt->execute();
        $stmt->bind_result($id,$run,$nombre_BD,$hobby_BD,$estado_BD);
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