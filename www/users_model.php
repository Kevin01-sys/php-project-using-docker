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

/*     Get all active users from database */
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

/*  static method:   Get all active users from database */
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