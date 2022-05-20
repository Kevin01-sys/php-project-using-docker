export const allCharacters = {
    getClientSide : function(){
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
    },
    getServerSide : function(){
        const ts = new Date().getTime();
        console.log(ts);
        let url = `/api/marvel/ajax/characters_list_ajax.php`;
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
}