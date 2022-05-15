const $testButton = document.getElementById("testButton");
const $testInput = document.getElementById("testInput");
const $regionSelect = document.getElementById('region');
const text = `<option value="hola">region</option>`;
$regionSelect.innerHTML = text;
console.log($regionSelect.options);
$testButton.onclick = () => loadXMLDoc();

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               console.log(xmlhttp.responseText);
               const json_data =JSON.parse(xmlhttp.responseText);
               console.log(json_data.data);
               //console.log(json_data.data[0].region);
               let text;
               let text2;
               for (const position in json_data.data) {
                   let id = json_data.data[position].id;
                   let region = json_data.data[position].region;
                   //console.log(`${position},${id},${region}`);
                   text = `<option value="${id}">${region}</option>`;
                   (text2 === undefined) ? text2 = `${text}` : text2 = `${text2}${text}`;
              }
              console.log(text2);
              $regionSelect.innerHTML = text2;
              console.log($regionSelect.options[14].textContent);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "../controllers/ajax_test.php", true);
    xmlhttp.send();
}