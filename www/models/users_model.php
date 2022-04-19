<?php

require_once "../config/db.php";

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
    
    /* Store user in the database */
    public function store_user($run,$nombre, $hobby){
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

    /* Update user in the database */
    public function update_user($run, $nombre, $hobby,$id){
		// Prepares a SQL statement with question mark parameters
		$query= "UPDATE usuarios SET run=?, nombre=?, hobby=? WHERE id = ?";
	    $stmt = $this->db->prepare($query);
	    // Binds variables to a prepared statement
	    $stmt->bind_param('sssi',$run,$nombre,$hobby,$id);
		$result = $stmt->execute();

        $stmt->free_result();
        $stmt->close();

        // ternary operator: if result is True return 1, if result is False return 0
        return $result? 1 : 0;
    }

    /* Deactivates or deletes a user from the database */
    public function delete_user($id){
		$query= "UPDATE usuarios SET estado=0 WHERE id = ?";
        $stmt = $this->db->prepare($query);
        if($stmt){
	    	// Binds variables to a prepared statement
		    $stmt->bind_param('i', $id);
		    $stmt->execute();

            $stmt->free_result();
            $stmt->close();

        }
        // ternary operator: if result is True return 1, if result is False return 0
        return $stmt? 1 : 0;

    }

    /* to check if the user already exists, sending as parameters, the column we want, from which table and under what condition, it is a simple SELECT */
    public function validate_data($column, $table, $condition){
        $result= $this->db->query("SELECT $column FROM $table WHERE $column = '$condition'");
        $check= $result->num_rows;
        return $check; 
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