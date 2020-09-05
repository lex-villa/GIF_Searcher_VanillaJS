/*************************************************************** */
/** IMPORTED HTML ELEMENTS */
import { input, createCardsForSearch, searchResultsContainer, setValueTo1 } from './searcher.js'

/*************************************************************** */
/** HTML ELEMENTS */
const trendingListItems = document.querySelectorAll('.trending-item')
const searchResultsContainerTrendGIFOS = document.getElementById('trending-results-container-GIFOS')
/*************************************************************** */
/** VARIABLES */


/*************************************************************** */
/** FUNCTIONS */
const trendingWordsSearch = async () => {
    const baseURL = "https://api.giphy.com/v1/trending/searches?"
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2"

    const endpoint = `${baseURL}api_key=${apikey}`

    try {
        const response = await fetch(endpoint)

        if (response.ok) {
            const responseJson = await response.json()
            let arrayTrends = []

            /** This for is beacuse just need 5 trending recommendations*/
            for (let i = 0; i < 5; i++) {
                arrayTrends[i] = responseJson.data[i]
            };

            return arrayTrends;

        } else {
            throw new Error("La llamada a la lista de trendings fallo")
        }
    } catch (error) {
        console.error(`Algo salio mal en la llamada de la lista de trendings ${error}`)
    };
};

/** */
const createTrendList = async () => {
    const arrayTrends = await trendingWordsSearch()

    for (let i = 0; i < arrayTrends.length; i++) {
        trendingListItems[i].innerHTML = arrayTrends[i] + ", "
    }
}

createTrendList();

/** */
const searchTrendsGIFOS = async () => {
    const baseURL = "https://api.giphy.com/v1/gifs/trending?";
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2";
    const limit = 12;

    const endpoint = `${baseURL}api_key=${apikey}&limit=${limit}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const responseJson = await response.json();

            return responseJson.data;

        } else {
            throw new Error("La llamada a los gifs en tendencia fallo");
        }
    } catch (error) {
        console.error(`Algo salio mal en la llamada a los gifs en tendencia ${error}`);
    }
};

/** */
const createCardsTrendingGifos = async () => {
    const searchResultApi = await searchTrendsGIFOS()
    console.log(searchResultApi)

    searchResultApi.forEach(gifElement => {
        const imageURL = gifElement.images.fixed_height_downsampled.url
        const user = gifElement.source_tld
        const title = gifElement.title

        const figureContainer = document.createElement('figure')
        figureContainer.classList.add("figureTrendingContainer")

        const imgTag = document.createElement('img')
        imgTag.src = imageURL
        imgTag.classList.add("search-resultsTrendingGifo-styles")


        const divModalContainer = document.createElement("div")
        divModalContainer.classList.add("modal-TrendingGifo-class")

        const divIconSection = document.createElement("div")
        divIconSection.classList.add("icons-section-hoverTrendingGifo")

        const figureIconLike = document.createElement("figure")
        const figureIconDownload = document.createElement("figure")
        const figureIconMax = document.createElement("figure")
        figureIconLike.classList.add("figure-icons-TrendingGifo")
        figureIconDownload.classList.add("figure-icons-TrendingGifo")
        figureIconMax.classList.add("figure-icons-TrendingGifo")
        const iconLikeImg = document.createElement("img")
        const iconDownLoadImg = document.createElement("img")
        const iconMaxImg = document.createElement("img")
        iconLikeImg.src = "./images/icon-fav-hover.svg"
        iconDownLoadImg.src = "./images/icon-download.svg"
        iconMaxImg.src = "./images/icon-max.svg"
        iconMaxImg.classList.add('btn-img-icon-TrendingGifo')

        figureIconLike.appendChild(iconLikeImg)
        figureIconDownload.appendChild(iconDownLoadImg)
        figureIconMax.appendChild(iconMaxImg)

        divIconSection.appendChild(figureIconLike)
        divIconSection.appendChild(figureIconDownload)
        divIconSection.appendChild(figureIconMax)

        divModalContainer.appendChild(divIconSection)


        const divCaptionSection = document.createElement("div")
        divCaptionSection.classList.add("caption-section-hoverTrendingGifo")

        const pTagUser = document.createElement('p')
        pTagUser.classList.add("userCaption-TrendingGifo")
        const pTagtitle = document.createElement('p')
        pTagtitle.classList.add("tituloCaption-TrendingGifo")
        pTagUser.innerHTML = user
        pTagtitle.innerHTML = title

        divCaptionSection.appendChild(pTagUser)
        divCaptionSection.appendChild(pTagtitle)

        divModalContainer.appendChild(divCaptionSection)


        figureContainer.appendChild(imgTag)
        figureContainer.appendChild(divModalContainer)

        searchResultsContainerTrendGIFOS.appendChild(figureContainer)
    })

    /** */
    const gifsFromSearchResult = document.querySelectorAll('.search-resultsTrendingGifo-styles')
    const gifsFromSearchResultArray = Array.from(gifsFromSearchResult)

    gifsFromSearchResultArray.forEach(gifElement => {
        gifElement.addEventListener('mouseenter', (event) => {
            const modalElement = event.target.nextElementSibling
            let widthScreen = window.innerWidth
            if (widthScreen >= 1025) {
                modalElement.style.display = "block"
            };
            window.addEventListener("resize", () => {
                widthScreen = window.innerWidth
                if (widthScreen < 1025) {
                    modalElement.style.display = "none"
                }
            })
        })
    })

    /** */
    const figuresContainers = document.querySelectorAll(".modal-TrendingGifo-class");

    figuresContainers.forEach(x => {
        x.addEventListener('mouseleave', event => {
            const modalElement = event.target

            modalElement.style.display = "none"
        })
    })

    /** Section to add event listeners to the icon buttons in the hover cards */
    const iconButtonsArray = document.querySelectorAll(".btn-img-icon-TrendingGifo")

    iconButtonsArray.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const imageToShow = event.srcElement.offsetParent.offsetParent.parentElement.childNodes[0].src
            const image = document.getElementById("modal-content-id")
            image.src = imageToShow

            const userGifo = event.srcElement.offsetParent.nextSibling.firstChild.textContent
            const titleGifo = event.srcElement.offsetParent.nextSibling.lastChild.textContent
            const userCaption = document.getElementById("userCaption-id")
            const titleCaption = document.getElementById("tituloCaption-id")
        
            userCaption.innerHTML = userGifo
            titleCaption.innerHTML = titleGifo

            const modal = document.getElementById("myModal")
            modal.style.display = "block"

            const bodyTag = document.querySelector('body')
            bodyTag.style.overflow = 'hidden'

            const closeBtn = document.getElementById("close-btn-modal-id")
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none"
                bodyTag.style.overflow = 'visible'
            }) 
        })
    })
}

createCardsTrendingGifos();

/*************************************************************** */
/** EVENT LISTENERS */
trendingListItems.forEach(itemList => {
    itemList.addEventListener('click', (event) => {
        const itemToSearch = event.target.innerHTML
        input.value = itemToSearch
        setValueTo1();
        searchResultsContainer.innerHTML = ''
        createCardsForSearch(itemToSearch)
    })
})
