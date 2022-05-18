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
 $btnGetCharacters = document.getElementById("btnGetCharacters"); 

const postObjTest = { 
    id: 1, 
    title: "What is AJAX", 
    body: "AJAX stands for Asynchronous JavaScript..."
}

const objRut = {
	// Validates the rut with its complete string "XXXXXXXX-X"
	validateRut : function (rutComplete) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutComplete ))
			return false;
		let tmp 	= rutComplete.split('-');
		let digv	= tmp[1]; 
		let rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (this.dv(rut) == digv );
	},
	dv : function(T){
		let M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	},
    validateCedula : function () {
        const usuario = {
            rut: '19.563.580-3',
            documento: '523000983',
        }
        const url = `http://65.20.99.1:3000/validador?rut=${usuario.rut}&documento=${usuario.documento}`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            $divTestLoader.style.display = "none"; /* Once the data has been fetched, the loader is hidden. */
            console.log(`Show validateCedula API results:`);
            console.log(json_data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

const objCity = {
    loadRegions : function(){
        const url = "/controllers/region_list_controller.php";
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            let option = new Option(), id, region;
            for (const position in json_data.data) {
                id = json_data.data[position].id;
                region = json_data.data[position].region;
                option = new Option(region, id); // a new option is created
                $selectRegion.add(option); // the option is added to the select
           }
        })
        .catch((error) => {
            console.log(error)
        })
    },
    loadCommunes: function (region = undefined){
        const objectSend = { // object to be sent is created
            idRegion : region,
        }
        const jsonSend = JSON.stringify(objectSend);  // Object is transformed to a json format valid for sending
        console.log(`JSON to send: ${jsonSend}`);
    
        const url = "/controllers/commune_list_controller.php";
        const methodSend = 'POST';
    
        fetch(url, {
            method: methodSend,
            body: jsonSend,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((json_data) => {
            console.log(json_data);
            $selectCommune.innerHTML = ""; // The options are cleared each time the communes are searched for
            let option = new Option('Elegir comuna', 0); // create option 0 
            $selectCommune.add(option); // the presentation option is added
            let id;
            let comuna;
            for (const position in json_data.data) {
                id = json_data.data[position].id;
                comuna = json_data.data[position].comuna;
                option = new Option(comuna, id);
                $selectCommune.add(option);
           }
           $selectCommune.options.selectedIndex = 0; // option 0 will always be the presentation to the user
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

const showImage = () => {
    const file = $inputFileImage.files[0]; // object containing the image
    console.log(file);
    const reader = new FileReader(); // The FileReader object allows web applications to read files (or buffered information) stored on the client asynchronously
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        $imgTestImage.src = reader.result;
        //console.log($imgTestImage);
      }
    }
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

const getCharacters = () => {
    const usuario = {
        rut: '19.563.580-3',
        documento: '523000983',
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=b63e6111b207aaef530b033d989f6384`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((json_data) => {
        console.log(json_data);
    })
    .catch((error) => {
        console.log(error)
    })
}

const getCharacters1 = () => {
    // you will also have to setup the referring domains on your marvel developer portal
    const PRIV_KEY = "";
    const PUBLIC_KEY = "b63e6111b207aaef530b033d989f6384";
    // you need a new ts every request   
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    // the api deals a lot in ids rather than just the strings you want to use
    let characterId = '1009718'; // wolverine
    let url = 'http://gateway.marvel.com:80/v1/public/comics';
    let endpoint = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    const usuario = {
        rut: '19.563.580-3',
        documento: '523000983',
    }
    console.log(endpoint);
    fetch(endpoint)
    .then(response => response.json())
    .then((json_data) => {
        console.log(json_data);
    })
    .catch((error) => {
        console.log(error)
    })
}

$selectRegion.onchange = () => { // if the value changes, the following happens
    let value = $selectRegion.value;
    console.log(`Obtaining select: ${$selectRegion.value}`);
    objCity.loadCommunes(value);
}

$btnTestLoader.onclick = () => {
    $divTestLoader.style.display = "block"; /* loader is displayed */
    objRut.validateCedula();
}

$btnImageClean.onclick = () => {
    //console.log(`Antes de limpiar la img: ${$imgTestImage.src}`);
    //console.log(`Antes de limpiar el input file: ${$inputFileImage.value}`);
    $imgTestImage.src = "https://placeimg.com/200/200/tech";
    $inputFileImage.value = "";
    //console.log(`Despues de limpiar el input file: ${$inputFileImage.value}`);
    //console.log(`Despues de limpiar la img: ${$imgTestImage.src}`);
}

$btnGetCharacters.onclick = () => {
    console.log('testing Get characters');
    getCharacters();
}

$inputFileImage.onchange = () => { 
    showImage();
} 

document.addEventListener("DOMContentLoaded", () => { // when loading HTML document
    objCity.loadRegions();
    $formRegister.addEventListener('submit', validateFormRegister);
});