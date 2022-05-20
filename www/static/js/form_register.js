import {objCity, objRut, image} from '/static/js/form_register/register.js'
import {allCharacters} from '/static/js/api/marvel/get_request.js'
import {file} from '/static/js/data/files.js'

const 
 $selectRegion = document.getElementById('region'),
 $selectCommune = document.getElementById('commune'),
 $divTestLoader = document.getElementById("loader"),
 $imgTestImage = document.getElementById("image"),
 $inputFileImage = document.getElementById("imageFile"),
 $btnTestLoader = document.getElementById('testButtonLoader'),
 $btnImageClean = document.getElementById("imageClean"), 
 $inputRut = document.getElementById("rut"),
 $formRegister = document.getElementById("formRegister"),
 $btnGetClientCharacters = document.getElementById("btnGetClientCharacters"),  
 $btnGetServerCharacters = document.getElementById("btnGetServerCharacters"),
 $btnXmlTest = document.getElementById("btnXmlTest"),
 $btnJsonTest = document.getElementById("btnJsonTest");

const postObjTest = { 
    id: 1,  
    title: "What is AJAX", 
    body: "AJAX stands for Asynchronous JavaScript..."
}

const validateFormRegister = (e) =>{
    e.preventDefault();
    const formData = new FormData($formRegister);
    let rut = formData.get("rut");
    for(let [name, value] of formData) { // check the formdata object
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }
    if(rut==='') return alert("Rut no puede ir vacio");
    if(!objRut.validateRut(rut)) return alert(`Rut ${rut} ingresado no es valido`);
    //console.log(objRut.validateRut('19563580-3') ? 'rut ingresado es valido' : 'inválido');
    $formRegister.submit();
}

$selectRegion.onchange = () => { // if the value changes, the following happens
    let value = $selectRegion.value;
    console.log(`Obtaining select: ${$selectRegion.value}`);
    objCity.loadCommunes($selectCommune, value);
}

$btnTestLoader.onclick = () => {
    $divTestLoader.style.display = "block"; /* loader is displayed */
    objRut.validateCedula($divTestLoader);
}

$btnImageClean.onclick = () => {
    //console.log(`Antes de limpiar la img: ${$imgTestImage.src}`);
    //console.log(`Antes de limpiar el input file: ${$inputFileImage.value}`);
    $imgTestImage.src = "https://placeimg.com/200/200/tech";
    $inputFileImage.value = "";
    //console.log(`Despues de limpiar el input file: ${$inputFileImage.value}`);
    //console.log(`Despues de limpiar la img: ${$imgTestImage.src}`);
}

$btnGetClientCharacters.onclick = () => {
    console.log('testing client-side');
    allCharacters.getClientSide();
}

$btnGetServerCharacters.onclick = () => {
    console.log('testing server-side');
    allCharacters.getServerSide();
}

$inputFileImage.onchange = () => { 
    image.showImage($inputFileImage, $imgTestImage);
}

$btnXmlTest.onclick = () => {
    console.log('testing XML');
    file.getXmlTest();
}

$btnJsonTest.onclick = () => {
    console.log('testing jSON');
    file.getJsonTest();
}

document.addEventListener("DOMContentLoaded", () => { // when loading HTML document
    objCity.loadRegions($selectRegion);
    $formRegister.addEventListener('submit', validateFormRegister);
});