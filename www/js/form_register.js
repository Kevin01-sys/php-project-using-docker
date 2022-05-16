const $selectRegion = document.getElementById('region'),
 $selectCommune = document.getElementById('commune');
let postObjTest = { 
    id: 1, 
    title: "What is AJAX", 
    body: "AJAX stands for Asynchronous JavaScript..."
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

const loadCommunes = (region = undefined) => {
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

$selectRegion.onchange = () => { // if the value changes, the following happens
    let value = $selectRegion.value;
    console.log(`Obtaining select: ${$selectRegion.value}`);
    loadCommunes(value);
}

document.addEventListener("DOMContentLoaded", () => { // when loading HTML document
    loadRegions();
});