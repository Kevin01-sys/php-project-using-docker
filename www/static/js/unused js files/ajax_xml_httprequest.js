// all functions work, left for documentation in future projects
const loadRegions = () => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               const json_data = JSON.parse(xmlhttp.responseText);
               let option = new Option();
               let id;
               let region;
               for (const position in json_data.data) {
                   id = json_data.data[position].id;
                   region = json_data.data[position].region;
                   option = new Option(region, id); // a new option is created
                   $selectRegion.add(option); // the option is added to the select
              }
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    const method = 'GET';
    const url = "../controllers/region_list_controller.php";
    xmlhttp.open(method, url , true);
    xmlhttp.send();
}

const loadCommunesXml = (region = undefined) => {
    const objectSend = { // object to be sent is created
        idRegion : region,
    }
    const post = JSON.stringify(objectSend);  // Object is transformed to a json format valid for sending
    console.log(`JSON to send: ${post}`);
    
    const xmlhttp = new XMLHttpRequest();
    let method = 'POST';
    const url = "../controllers/commune_list_controller.php";
    xmlhttp.open(method, url , true);
    xmlhttp.send(post);

    xmlhttp.onload = () => {
        if(xmlhttp.status === 200) {
            const json_data = JSON.parse(xmlhttp.responseText);
            console.log(json_data); // Object JSON fetched
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
        }
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
         }
         else { 
             alert('something else other than 200 was returned');
         }
    }
}

function loadRegions() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               const json_data = JSON.parse(xmlhttp.responseText);
               let id;
               let region;
               let $optionWhile;
               let $optionPrint;
               for (const position in json_data.data) {
                   id = json_data.data[position].id;
                   region = json_data.data[position].region;
                   $optionWhile = `<option value="${id}">${region}</option>`;
                   ($optionPrint === undefined) ? $optionPrint = `${$optionWhile}` : $optionPrint = `${$optionPrint}${$optionWhile}`;
              }
              $selectRegion.innerHTML = $optionPrint;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("GET", "../controllers/region_list_controller.php", true);
    xmlhttp.send();
}

const validateCedula = () => {
    const usuario = {
        rut: '19.563.580-3',
        documento: '523000983',
    }
    const url = `http://65.20.99.1:3000/validador?rut=${usuario.rut}&documento=${usuario.documento}`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((json_data) => {
        $divTestLoader.style.display = "none"; //Once the data has been fetched, the loader is hidden.
        console.log(`Show validateCedula API results:`);
        console.log(json_data);
    })
    .catch((error) => {
        console.log(error)
    })
}

$inputRut.onkeyup = () => { 
    let test = $inputRut.value;
    console.log(test);  
    console.log('testing inputRut');
}

const loadRegions = () => {
    const url = "../controllers/region_list_controller.php";
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
}

const loadCommunesFetch = (region = undefined) => {
    const objectSend = { // object to be sent is created
        idRegion : region,
    }
    const jsonSend = JSON.stringify(objectSend);  // Object is transformed to a json format valid for sending
    console.log(`JSON to send: ${jsonSend}`);

    const url = "../controllers/commune_list_controller.php";
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