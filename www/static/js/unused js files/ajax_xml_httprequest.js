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


const getXmlTest = () => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               let i,
                title,
                artist;
               const $xmlDoc = xmlhttp.responseXML;
               const $x = $xmlDoc.getElementsByTagName("CD");
               const $b = $xmlDoc.getElementsByTagName("CATALOG");
               const $c = $xmlDoc.getElementsByTagName("TITLE");
               console.log($xmlDoc);
               //console.log($x);
               //console.log($x[0].children);
               //console.log($x[0].getElementsByTagName("ARTIST")[0]);
               //console.log($c);
               //console.log($xmlDoc.activeElement.children);
               //console.log($x[0].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue);
               /* console.log($b);
               console.log($b[0].children);
               console.log($x);
               console.log($x[0])
               console.log($x[0].getElementsByTagName("ARTIST")[0])
               console.log($x[0].getElementsByTagName("ARTIST")[0].childNodes[0])
               console.log($x[0].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue) */
               for (i = 0; i <$x.length; i++) {
                title = $x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
                artist = $x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
                country = $x[i].getElementsByTagName("COUNTRY   ")[0].childNodes[0].nodeValue;
                console.log(`${title}, ${artist}, ${country}`);
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
    const url = "/xml/cd_catalog.xml";
    xmlhttp.open(method, url , true);
    xmlhttp.send();
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

/* Vue 2: working
<script>
var vm = new Vue({
el: '#app',
data: {
    name: 'Vue.js'
},
// define methods under the `methods` object
methods: {
    greet: function (event) {
    // `this` inside methods point to the Vue instance
    alert('Hello ' + this.name + '!')
    // `event` is the native DOM event
    alert(event.target.tagName)
    }
}
})
// you can invoke methods in JavaScript too
vm.greet() // -> 'Hello Vue.js!'
</script> */