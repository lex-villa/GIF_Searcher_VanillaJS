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

const sugesstions = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/tags/related/";
    const query = userQuery;
    const endpoint = `${baseURL}${query}?api_key=${apikey}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const responseJson = await response.json();

            console.log(responseJson);
            return responseJson.data;

            //pintar las recomm en el HTML
        } else {
            throw new Error("La llamada a la API de sugerencias falló");
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de sugerencias: ${error}`);
    };

};

input.addEventListener("keyup", async () => {
    const container = document.getElementById('recommendations');
    container.innerHTML = "";
    let iconSearch = document.getElementById('searchIcon');
    iconSearch.src = './images/close.svg'

    let searchContainer = document.getElementById('searchBox');
    searchContainer.classList.add('active-styles');
    searchContainer.classList.remove('passive-styles');

    let inValue = input.value;
    let arrSugesstions = await sugesstions(inValue);
    const dataArray = await Object.values(arrSugesstions);
    console.log(dataArray);
    dataArray.forEach(element => {
        const nameSugesstion = element.name;
        const liTag = document.createElement("li");

        liTag.classList.add("suggestionCreated");
        container.appendChild(liTag);
        liTag.innerHTML = "<img src='./images/icon-search-gray.svg' class='searchIconGray'> " + nameSugesstion;
    });

    const suggesttionTag = document.querySelectorAll(".suggestionCreated");


    suggesttionTag.forEach(item => {
        item.addEventListener("click", event => {
            const suggestion = event.target.childNodes[1].data.trim();
            input.value = suggestion;
            container.innerHTML = "";
            iconSearch.src = "./images/icon-search.svg";
            searchContainer.classList.add('passive-styles');
            searchContainer.classList.remove('active-styles');
        });
    });

    

    /** Creacion de event listener al icono X para borrar todo */
    iconSearch.classList.add("iconX");
    let iconX = document.querySelector(".iconX")
    iconX.addEventListener("click", () => {
        container.innerHTML = "";
        input.value = '';
        iconSearch.src = "./images/icon-search.svg";
        searchContainer.classList.add('passive-styles');
        searchContainer.classList.remove('active-styles');
    });
});


/*********************************************************************************************/

const imgContainer = document.getElementById("search-results-container");

const createCardsForSearch = array => { //poner params extra para container y la classe
    array.forEach(element => {
        const imageURL = element.images.fixed_height_downsampled.url;

        const imgTag = document.createElement("img");
        imgTag.src = imageURL;
        imgContainer.appendChild(imgTag);
        imgTag.classList.add("search-results-styles");
    });
};

const searchGIF = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/gifs/search?";
    const query = userQuery;
    const limit = 12;
    const endpoint = `${baseURL}api_key=${apikey}&q=${query}&limit=${limit}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const responseJson = await response.json();

            console.log(responseJson);
            console.log(responseJson.data[0].embed_url);
            const dataArr = responseJson.data;

            createCardsForSearch(dataArr);

        } else {
            throw new Error(`La llamada a la API de busqueda falló`);
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de busqueda: ${error}`);
    }
};

input.addEventListener("keypress", e => {
    if (e.keyCode === 13) {
        let inputValue = input.value;
        searchGIF(inputValue);
    };
});
searchIcon.addEventListener("click", () => {
    let inputValue = input.value;
    searchGIF(inputValue);
});