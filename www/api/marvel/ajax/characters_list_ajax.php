<?php 
	include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
	require_once (API_MARVEL_CONFIG_PATH."config.php"); 

    $currentDate = new DateTime("America/Santiago"); // Instantiating a DateTime with current time (UTC)
    $timestamp = $currentDate->getTimestamp(); // Returns the Unix timestamp representing the date
    //echo $currentDate->format('Y-m-d H:i:sP');
    //echo $timestamp;
    $hash =  md5($timestamp.PRIV_KEY.PUBLIC_KEY); //The md5() function calculates the MD5 hash of a string.
    $publicKey=PUBLIC_KEY; // is left in another variable to be used by curly braces

    require_once (API_MARVEL_ENDPOINT_PATH."endPoints.php");
    $data=json_decode(file_get_contents($endPointTwo)); /* obtain API data */

    //returns data as JSON format
	echo json_encode($data);
?>