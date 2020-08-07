//https://api.giphy.com/v1/gifs/search?api_key=isa5RTREAjmlL4Sr9iYEx9g5QycePeF2&q=abella%20danger
//https://api.giphy.com/v1/gifs/search?api_key={apikey}={busqueda}
//https://api.giphy.com/v1/gifs/search/tags?api_key=isa5RTREAjmlL4Sr9iYEx9g5QycePeF2&q=ma para autocopletar
//https://api.giphy.com/v1/tags/related/poke?api_key=isa5RTREAjmlL4Sr9iYEx9g5QycePeF2 para sugerencias
//api.giphy.com/v1/gifs/trending?api_key=isa5RTREAjmlL4Sr9iYEx9g5QycePeF2&limit=2 para trendings

const input = document.getElementById("search-input");
const searchIcon = document.getElementById("searchIcon");

const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";

const autocomplete = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/gifs/search/tags?";
    const query = userQuery;
    const endpoint = `${baseURL}api_key=${apikey}&q=${query}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const responseJson = await response.json();

            console.log(responseJson);
            console.log(responseJson.data);
            const recommendations = responseJson.data;
            console.log(recommendations);
            //pintar las recomm en el HTML
        } else {
            throw new Error("La llamada a la API de autocompletado falló");
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de autocompletado: ${error}`);
    };

};




