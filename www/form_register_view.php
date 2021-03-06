<?php 
$data['data'] = array("Peter"=>"35", "Ben"=>"37'", "Joe"=>"43");
$dataEncode = json_encode($data);
$dataStr= str_replace("'", "/",$dataEncode);
echo $dataEncode;
echo $dataStr;
//var_dump($data);
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de usuario</title>
    <!-- CSS used to style the sheet -->
	<link href="/static/css/form_register.css" rel="stylesheet" title="Default Style">
    <link rel="shortcut icon" href="#">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>
<body>
    <input type="text" value='<?php echo $dataEncode; ?>'>
    <input type="text" value="<?php echo $dataEncode; ?>">
    <input type="text" value="<?php print("$dataEncode"); ?>">
    <h1>Registro de usuarios</h1>
    <form method="POST" action="forms/receive_form.php" target="_blank" enctype="multipart/form-data" id="formRegister">
        <div>
            <label for="rut">Ingrese su rut:</label>
            <input type="text" id="rut" name="rut" maxlength="10" placeholder="Ej: 11111111-1">
        </div>
        <div>
            <label for="region">Escoger una región:</label>
            <select name="region" id="region">
                <option value="0">Escoger región</option>
                <!-- When the HTML is finished loading, it is loaded with an ajax function  -->
            </select>
        </div>
        <div>
            <label for="commune">Escoger una comuna:</label>
            <select name="commune" id="commune">
                <option value="0">Debe escoger primero una región</option>
            </select>
        </div>
        <section class="cards">
            <figure class="card">
              <img src="https://placeimg.com/200/200/tech" class="img" id="image" alt="Tech">
              <figcaption>Tech</figcaption>
              <label for="myfile">Selecciona una imagen:</label>
              <input type="file" id="imageFile" name="imageFile" accept="image/*">
              <input type="button" id="imageClean" name="imageClean" value="Limpiar imagen">
            </figure>
        </section>
        <input type="submit" value="Enviar datos">
    </form>
    <div>
        <h2>XML y JSON: extraer informacion directa de archivos </h2>
        <input id="btnXmlTest" type="button" class="btn btn-primary" value="Ejemplo XML">
        <input id="btnJsonTest" type="button" class="btn btn-primary" value="Ejemplo JSON">
    </div>
    <div id="apiValidateRut">
        <h2>API valida rut</h2>
        <input id="testButtonLoader" type="button" class="btn btn-primary" value="Ejemplo Loader">
        <!-- by default the loader is hidden -->
        <div style="display:none;" class="loader" id="loader"></div> 
    </div>
    <div id="apiMarvel">
        <h2>API Marvel</h2>
        <input id="btnGetClientCharacters" type="button" class="btn btn-primary" value="request client-side">
        <input id="btnGetServerCharacters" type="button" class="btn btn-primary" value="request server-side">
        <!-- by default the loader is hidden -->
    </div>
    <!--
        <h2>Iframe</h2>
        <a href="http://www.bing.com/" target="marco">Abrir buscador Bing</a>
        <iframe name="marco" width="100%" height="450" src="https://www.youtube.com/embed/Imeq3GeRttw"></iframe> 
    -->
    <!-- file on which JavaScript tests will be performed -->
    <script src="static/js/form_register.js" type="module"></script>
    <script>
        let jsonStr ='<?php echo $dataStr ?>';
        let jsonCorrect = jsonStr.replace("/","'");
        console.log(jsonStr);
        console.log(jsonCorrect);
        const jsonEnd = JSON.parse(jsonCorrect);
        console.log(jsonEnd);
    </script>
</body>
</html>