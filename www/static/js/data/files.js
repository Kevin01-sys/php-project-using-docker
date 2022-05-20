export const file = {
    getJsonTest : function(){
        const url = `/data/json/data_test.json`;
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
                   let i,
                    title,
                    artist,
                    country;
                   const $xmlDoc = xmlhttp.responseXML,
                    $elementsCdList = $xmlDoc.getElementsByTagName("CD");
                   console.log($xmlDoc);
                   for (i = 0; i < $elementsCdList.length; i++) {
                    title = $elementsCdList[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
                    artist = $elementsCdList[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
                    country = $elementsCdList[i].getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue;
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
        const url = "/data/xml/cd_catalog.xml";
        xmlhttp.open(method, url , true);
        xmlhttp.send();
    }
}