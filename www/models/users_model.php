<?php
	include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
    require_once (CONFIG_PATH."db.php");
/**
* class Users
*/

class UsersModel extends Connect {
    private $db; // will be an instance of the class mysqli
    private $users; // to be an initiative to leave a complete list of all users
    private $communes;
    private $regions; 

	public function __construct(){
		$this->db = parent::connection();
		$this->users = array();
        $this->communes = array();
        $this->regions = array();
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

    /* Get all active region from database */
    public function obtain_regions(){
        $this->regions = [];
        $stmt = $this->db->prepare("SELECT * FROM regiones");
        $stmt->execute();
        $stmt->bind_result($id,$region,$abreviatura, $capital);
			while($stmt->fetch()){
				$this->regions['status'] = 'ok';
				$this->regions['data'][]  = ["id"=> $id,"region" => $region];
				}

                $stmt->free_result();
                $stmt->close();

                return $this->regions;

    }

    /* Get all active region from database */
    public function obtain_communes($idRegion){
        $this->communes = [];
        $query = "SELECT comunas.id, comunas.comuna FROM comunas
        INNER JOIN provincias ON comunas.provincia_id = provincias.id
        INNER JOIN regiones ON provincias.region_id = regiones.id
        WHERE regiones.id=?";
        $stmt = $this->db->prepare($query);
        // Binds variables to a prepared statement
	    $stmt->bind_param('i',$idRegion);
        $stmt->execute();
        $stmt->bind_result($id,$comuna);
			while($stmt->fetch()){
				$this->communes['status'] = 'ok';
				$this->communes['data'][]  = ["id"=> $id,"comuna" => $comuna];
				}

                $stmt->free_result();
                $stmt->close();

                return $this->communes;

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