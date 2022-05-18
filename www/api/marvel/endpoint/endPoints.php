<?php
    /* Obtain system paths or directories */
    include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
    
    /* API name: URL of the API to be consumed */
    $apiUrl = "https://gateway.marvel.com:".PORT;

    /* FILTERS: filters used to create different Endpoints for the API */
    $filterExamplePdf = "/v1/public/characters?ts=1652853787110&apikey=b63e6111b207aaef530b033d989f6384&hash=03d4d3479b8e499240d264a1e19818c5";
    $filter_two = "/v1/public/characters?ts={$timestamp}&apikey={$publicKey}&hash={$hash}";

    /* ENDPOINTS : Endpoints are the URLs of an API or backend that respond to a request*/
    $endPointExamplePdf = $apiUrl.$filterExamplePdf;
    $endPointTwo = $apiUrl.$filter_two;
?>