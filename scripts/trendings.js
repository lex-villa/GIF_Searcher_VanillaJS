import { searchGIF, imgContainer, input } from "./searchbar.js";
const imgContainerTrends = document.getElementById("trendings-results-container");

const trendingList = document.querySelectorAll(".trending-item");

const createTrendList = async () => {
    const arrayTrends = await trendingSearch();

    console.log(arrayTrends);
    console.log(trendingList)
    for (let i = 0; i < arrayTrends.length; i++) {
        trendingList[i].innerHTML = arrayTrends[i] + ", ";
    };
};


const trendingSearch = async () => {
    const baseURL = "https://api.giphy.com/v1/trending/searches?";
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";

    const endpoint = `${baseURL}api_key=${apikey}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const responseJson = await response.json();
            let arrayTrends = [];

            for (let i = 0; i < 5; i++) {
                arrayTrends[i] = responseJson.data[i];
            };

            return arrayTrends;

        } else {
            throw new Error("La llamada a la lista de trendings fallo");
        }
    } catch (error) {
        console.error(`Algo salio mal en la llamada de la lista de trendings ${error}`);
    };
};

trendingList.forEach(item => {
    item.addEventListener("click", (event) => {
        const itemToSearch = event.target.innerHTML;
        input.value = itemToSearch;
        imgContainer.innerHTML = "";
        searchGIF(itemToSearch);
    });
});



createTrendList();

const searchTrendsGIFS = async () => {
    const baseURL = "https://api.giphy.com/v1/gifs/trending?";
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";
    const limit = 8;
    
    const endpoint = `${baseURL}api_key=${apikey}&limit=${limit}`;

    try {
        const response = await fetch(endpoint);

        if(response.ok) {
            const responseJson = await response.json();

            return responseJson.data;

        } else {
            throw new Error("La llamada a los gifs en tendencia fallo");
        }
    } catch(error) {
        console.error(`Algo salio mal en la llamada a los gifs en tendencia ${error}`);
    }
};

const createTrendsGifs = async () => {
    const dataJson = await searchTrendsGIFS();

    dataJson.forEach(element => {
        const imgURL = element.images.fixed_height_downsampled.url;
        const user = element.source_tld;
        const title = element.title;

        const figureContainer = document.createElement("figure");
        figureContainer.classList.add("figure-container-trends");
        const modalTrendsGifs = document.getElementById("modal-trends");
        const modalTrendsCloned = modalTrendsGifs.cloneNode(true);
        

        const imgTag = document.createElement("img");
        imgTag.src = imgURL;
        imgTag.classList.add("trending-results-styles");

        figureContainer.appendChild(imgTag);
        figureContainer.appendChild(modalTrendsCloned);
        
    
        const userCaption = document.getElementById("userCaptionTrends-id");
        const titleCaption = document.getElementById("tituloCaptionTrends-id");

        userCaption.innerHTML = user;
        titleCaption.innerHTML = title;

        
        imgContainerTrends.appendChild(figureContainer);

    });

    
};

createTrendsGifs();