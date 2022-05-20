export const objCity = {
    loadRegions : function($selectLoad = undefined){
        const url = "/controllers/region_list_controller.php";
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            //const $selectLoad = document.getElementById('region');
            const $fragment = document.createDocumentFragment(); // The fragment object will contain all the "options" elements
            //let  id, region;
            for (const position in json_data.data) {
                const $option = document.createElement("option");
                $option.value=json_data.data[position].id;
                $option.textContent = json_data.data[position].region;
                //console.log($option);
                $fragment.appendChild($option); // option is added to the fragment
           }
           //console.log($fragment);
           $selectLoad.appendChild($fragment); // Only one insertion is made to the DOM, the fragment is inserted
        })
        .catch((error) => {
            console.log(error)
        })
    },
    loadCommunes: function ($selectLoad = undefined, region = undefined){
        const objectSend = { // object to be sent is created
            idRegion : region,
        }
        const jsonSend = JSON.stringify(objectSend);  // Object is transformed to a json format valid for sending
        //console.log(`JSON to send: ${jsonSend}`);
    
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
            //console.log(json_data);
            $selectLoad.innerHTML = ""; // The options are cleared each time the communes are searched for
            const $fragment = document.createDocumentFragment(); // The fragment object will contain all the "options" elements
            const $option = document.createElement("option");
            $option.value=0;
            $option.textContent = 'Elegir comuna';
            $fragment.appendChild($option); // option initial is added to the fragment
            for (const position in json_data.data) {
                const $option = document.createElement("option");
                $option.value=json_data.data[position].id;
                $option.textContent = json_data.data[position].comuna;
                $fragment.appendChild($option); // option is added to the fragment
           }
           $selectLoad.appendChild($fragment); // Only one insertion is made to the DOM, the fragment is inserted
           $selectLoad.options.selectedIndex = 0; // option 0 will always be the presentation to the user
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const objRut = {
	// Validates the rut with its complete string "XXXXXXXX-X"
	validateRut : function (rutComplete = undefined) {
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
    validateCedula : function ($divLoader = undefined) {
        const usuario = {
            rut: '19.563.580-3',
            documento: '523000983',
        }
        const url = `http://65.20.99.1:3000/validador?rut=${usuario.rut}&documento=${usuario.documento}`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            $divLoader.style.display = "none"; /* Once the data has been fetched, the loader is hidden. */
            console.log(`Show validateCedula API results:`);
            console.log(json_data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const image = {
    showImage : function ($fileImage = undefined, $imgToDisplay = undefined) {
        const file = $fileImage.files[0]; // object containing the image
        console.log(file);
        const reader = new FileReader(); // The FileReader object allows web applications to read files (or buffered information) stored on the client asynchronously
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            $imgToDisplay.src = reader.result;
            //console.log($imgToDisplay);
          }
        }
    }
}