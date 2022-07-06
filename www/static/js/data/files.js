export const file = {
    getJsonTest : function(){
        const url = `/data/json/problem.json`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            console.log(json_data);
        })
        .catch((error) => {
            console.log(error)
        })
    },
    getXmlTest : function(){
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
               if (xmlhttp.status == 200) {
                   var jsonObject = {};
                   //console.log(xmlhttp.responseText);
                   jsonObject = JSON.parse(xmlhttp.responseText);
                   console.log(jsonObject);
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
        const url = "/data/json/problem.json";
        xmlhttp.open(method, url , true);
        xmlhttp.send();
    }
}