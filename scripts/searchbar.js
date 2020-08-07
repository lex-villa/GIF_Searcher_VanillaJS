/************************ VARIABLES ***************************************************/
let isX = false;
/************************ ELEMENTOS ***************************************************/
const input = document.getElementById("search-input");
const container = document.getElementById('recommendations');
const iconSearch = document.getElementById('searchIcon');
const searchContainer = document.getElementById('searchBox');
const imgContainer = document.getElementById("search-results-container");
const verMasBtn = document.getElementById("ver-mas-btn");
const wordContainer = document.getElementById("searched-thing");

/************************ FUNCIONES ***************************************************/
/** Crea los espacios donde se mostraran los GIF's recibidos de la busqueda */
const createCardsForSearch = array => {
    array.forEach(element => {
        const imageURL = element.images.fixed_height_downsampled.url;

        const imgTag = document.createElement("img");
        imgTag.src = imageURL;
        imgContainer.appendChild(imgTag);
        imgTag.classList.add("search-results-styles");
    });
};

/** */
const createAndPaintSuggestions = async (inValue) => {
    container.innerHTML = "";
    /** */
    iconSearch.src = './images/close.svg';
    isX = true;
    /** */
    searchContainer.classList.add('active-styles');
    searchContainer.classList.remove('passive-styles');
    /** */
    let arrSugesstions = await sugesstions(inValue);
    /** */
    const dataArray = await Object.values(arrSugesstions);
    console.log(dataArray);
    /** */
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
            isX = false;
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
        isX = false
    });
};

/** Llama a la API de GIPHY para realizar una busqueda */
const searchGIF = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/gifs/search?";
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";
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

            const separatorSearchResults = document.getElementById("separatorSearchResults");

            verMasBtn.style.display = "block";
            separatorSearchResults.style.display = 'block';

            const searchWord = userQuery;
            wordContainer.innerHTML = searchWord;

            createCardsForSearch(dataArr);

        } else {
            throw new Error(`La llamada a la API de busqueda falló`);
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de busqueda: ${error}`);
    }
};

/** Llama a la API de GIPHY por sugerencias de busqueda */
const sugesstions = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/tags/related/";
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";
    const query = userQuery;
    const endpoint = `${baseURL}${query}?api_key=${apikey}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const responseJson = await response.json();

            return responseJson.data;

            //pintar las recomm en el HTML
        } else {
            throw new Error("La llamada a la API de sugerencias falló");
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de sugerencias: ${error}`);
    };

};

/************************ EVENT LISTENERS ***************************************************/
/** */
input.addEventListener("keyup", e => { ///hacer que los listeners de apretar se lleven bien
    let inputValue = input.value.trim();

    if (e.keyCode === 13 && inputValue != "") {
        if (e.keyCode !== 8) {
            imgContainer.innerHTML = "";
        }

        container.innerHTML = "";
        input.value = '';
        iconSearch.src = "./images/icon-search.svg";
        searchContainer.classList.add('passive-styles');
        searchContainer.classList.remove('active-styles');
        isX = false
        console.log("entro a la parte verdadera del if")
        searchGIF(inputValue);

    } else {
        /**  */
        console.log("entro a la parte else del if")
        createAndPaintSuggestions(inputValue);
    };
});
/** */
searchIcon.addEventListener("click", () => {
    imgContainer.innerHTML = "";

    let inputValue = input.value;
    console.log(isX)
    if (inputValue != "" && isX === false) {
        searchGIF(inputValue);
    }
});
/** */
verMasBtn.addEventListener("click", () => {
    const valuetoSearch = wordContainer.innerHTML;
    searchGIF(valuetoSearch);
});