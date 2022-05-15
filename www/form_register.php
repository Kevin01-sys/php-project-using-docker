<?php
require_once "./config/db.php";
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form>
        <label for="region">Escoger una región:</label>
        <?php
        $db = Connect::connection();
        $stmt = $db->prepare("SELECT * FROM regiones");
        $stmt->execute();
        $stmt->bind_result($id,$region,$abreviatura, $capital);
        ?>

        <select name="region" id="region">
        <?php

        while($stmt->fetch()){
            $regiones = <<<TEXT
            <option value="$id">$region</option>
            TEXT;
            echo $regiones;
            }
        ?>
        </select>
        <div>

        <input id="testButton" type="button" class="btn btn-primary" value="button">
        <input id="testInput" type="input" class="btn btn-primary" value="input">
    </form>
    <h1>Hola</h1>
    <!-- file on which JavaScript tests will be performed -->
    <script src="js/form_register.js" type="module"></script>
</body>
</html>