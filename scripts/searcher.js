/** Imported HTML Elements */
import { searchIconBtn } from './burguerMenu_darkMode.js'
/** HTML Elements */
export const searchResultsContainer = document.getElementById('search-results-container')
const searchSection = document.getElementById('search-results')
const searchedthing = document.getElementById('searched-thing')
const verMasBtn = document.getElementById('ver-mas-btn')
export const input = document.getElementById('seacrh-input')
const containerSuggestions = document.getElementById('recommendations')
const completeInputContainer = document.getElementById('searchBox')

/** Variables */
var verMasCounter = 1;
let isIconX = false

/*************************************************************** */
/** FUNCTIONS */
const suggestionsAPIcall = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/tags/related/"
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2"
    const query = userQuery
    const endpoint = `${baseURL}${query}?api_key=${apikey}`

    try {
        const response = await fetch(endpoint)
        if (response.ok) {
            const responseJson = await response.json()

            return responseJson.data
        } else {
            throw new Error("La llamada a la API de sugerencias falló");
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de sugerencias: ${error}`)
    }
}

/** */
const searchGIF = async (userQuery) => {
    const baseURL = "https://api.giphy.com/v1/gifs/search?"
    const apikey = "isa5RTREAjmlL4Sr9iYEx9g5QycePeF2"
    const query = userQuery
    const limit = 12
    let offset = 0
    if (verMasCounter === 1) {
        /** Do nothing */
    } else {
        offset = limit * (verMasCounter - 1);
    }
    const endpoint = `${baseURL}api_key=${apikey}&q=${query}&limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const responseJson = await response.json()

            return responseJson.data

        } else {
            throw new Error(`La llamada a la API de busqueda falló`);
        }
    } catch (error) {
        console.error(`Error en la llamada a la API de busqueda: ${error}`)
    }
}

/** */
const createAndPaintSuggestions = async (inValue) => {
    containerSuggestions.innerHTML = ''
    isIconX = true;

    completeInputContainer.classList.remove('passive-styles')
    completeInputContainer.classList.add('active-styles')

    const suggestions = await suggestionsAPIcall(inValue)

    /** Fill HTLM container for suggestions */
    suggestions.forEach(suggestion => {
        const nameSuggestion = suggestion.name

        const liTag = document.createElement('li')
        liTag.classList.add('suggestionCreated')

        liTag.innerHTML = "<img src='./images/icon-search-gray.svg' class='searchIconGray'> " + nameSuggestion;

        containerSuggestions.appendChild(liTag)
    });

    /** when click to a suggestion, it trigger a search */
    const suggestionsElement = document.querySelectorAll('.suggestionCreated')

    suggestionsElement.forEach(element => {
        element.addEventListener('click', (event) => {
            const suggestion = event.target.childNodes[1].data.trim();
            input.value = suggestion;
            containerSuggestions.innerHTML = "";

            completeInputContainer.classList.add('passive-styles');
            completeInputContainer.classList.remove('active-styles');
            isIconX = false;
            searchResultsContainer.innerHTML = "";
            createCardsForSearch(suggestion);
        })
    })
}

/** */
export const createCardsForSearch = async inValue => {
    const searchResult = await searchGIF(inValue)
    console.log(searchResult)
    searchSection.style.display = 'block'
    searchedthing.innerHTML = inValue

    /** To  get Blob for download*/
    const getImage = async (urlImage) => {
        try {
            let response = await fetch(urlImage)
            let gifBlob = await response.blob()
            console.info(gifBlob)
            return gifBlob

        } catch (error) {
            console.log(error)
        }
    }
    /** */

    searchResult.forEach(gifElement => {
        const imageURL = gifElement.images.fixed_height_downsampled.url
        const user = gifElement.source_tld
        const title = gifElement.title

        const figureContainer = document.createElement('figure')
        figureContainer.classList.add("figureDeskContainer")

        const imgTag = document.createElement('img')
        imgTag.src = imageURL
        imgTag.classList.add("search-results-styles")


        const divModalContainer = document.createElement("div")
        divModalContainer.classList.add("modal-desk-class")

        const divIconSection = document.createElement("div")
        divIconSection.classList.add("icons-section-hoverDesk")

        const figureIconLike = document.createElement("figure")
        const figureIconDownload = document.createElement("a")
        getImage(imageURL).then((blob => {
            const urlB = URL.createObjectURL(blob)

            figureIconDownload.href = urlB
            figureIconDownload.download = 'myGiphy.gif'
        })).catch(console.error)
        const figureIconMax = document.createElement("figure")
        figureIconLike.classList.add("figure-icons")
        figureIconDownload.classList.add("figure-icons")
        figureIconMax.classList.add("figure-icons")

        const iconLikeImg = document.createElement("img")
        const iconDownLoadImg = document.createElement("img")
        const iconMaxImg = document.createElement("img")
        iconLikeImg.src = "./images/icon-fav-hover.svg"
        iconDownLoadImg.src = "./images/icon-download.svg"
        iconDownLoadImg.classList.add('btn-img-iconDownload-hover')
        iconMaxImg.src = "./images/icon-max.svg"
        iconMaxImg.classList.add('btn-img-iconMax-hover')

        figureIconLike.appendChild(iconLikeImg)
        figureIconDownload.appendChild(iconDownLoadImg)
        figureIconMax.appendChild(iconMaxImg)

        divIconSection.appendChild(figureIconLike)
        divIconSection.appendChild(figureIconDownload)
        divIconSection.appendChild(figureIconMax)

        divModalContainer.appendChild(divIconSection)


        const divCaptionSection = document.createElement("div")
        divCaptionSection.classList.add("caption-section-hoverDesk")

        const pTagUser = document.createElement('p')
        pTagUser.classList.add("userCaption-desk")
        const pTagtitle = document.createElement('p')
        pTagtitle.classList.add("tituloCaption-desk")
        pTagUser.innerHTML = user
        pTagtitle.innerHTML = title

        divCaptionSection.appendChild(pTagUser)
        divCaptionSection.appendChild(pTagtitle)

        divModalContainer.appendChild(divCaptionSection)


        figureContainer.appendChild(imgTag)
        figureContainer.appendChild(divModalContainer)

        searchResultsContainer.appendChild(figureContainer)
    })

    /** This to make the GIF's clickeable to make them big (just mobile) */
    const gifsFromSearchResult = document.querySelectorAll('.search-results-styles')
    const gifsFromSearchResultArray = Array.from(gifsFromSearchResult)

    const indexToHelp = (verMasCounter - 1) * 12

    gifsFromSearchResultArray.forEach(gifElement => {
        gifElement.addEventListener('click', event => {
            const imageToShow = event.target.attributes.src.nodeValue
            const image = document.getElementById("modal-content-id")
            image.src = imageToShow

            const indexOfElement = (gifsFromSearchResultArray.indexOf(event.target) - indexToHelp)
            const userGifo = searchResult[indexOfElement].source_tld
            const titleGifo = searchResult[indexOfElement].title
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
        /** */
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
    const figuresContainers = document.querySelectorAll(".modal-desk-class");

    figuresContainers.forEach(x => {
        x.addEventListener('mouseleave', event => {
            const modalElement = event.target

            modalElement.style.display = "none"
        })
    })

    /** Section to add event listeners to the icon buttons in the hover cards */
    const iconMaxArray = document.querySelectorAll(".btn-img-iconMax-hover")

    iconMaxArray.forEach(icon => {
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

export const setValueTo1 = () => {
    verMasCounter = 1
}

/*************************************************************** */
/** EVENT LISTENERS */
verMasBtn.addEventListener('click', () => {
    const valueToSearch = searchedthing.innerHTML

    verMasCounter += 1
    createCardsForSearch(valueToSearch)
})

/**  */
input.addEventListener('keyup', e => {
    let inputValue = input.value.trim()

    if (inputValue === '') {
        completeInputContainer.classList.remove('active-styles')
        completeInputContainer.classList.add('passive-styles')
        isIconX = false;
    } else {
        createAndPaintSuggestions(inputValue)
    }

    if (e.keyCode === 13 && inputValue != "") {
        if (e.keyCode !== 8) {
            searchResultsContainer.innerHTML = ""
        }

        input.innerHTML = ''
        containerSuggestions.innerHTML = ''
        completeInputContainer.classList.remove('active-styles')
        completeInputContainer.classList.add('passive-styles')

        isIconX = false

        verMasCounter = 1
        createCardsForSearch(inputValue)
    }
})

/** */
searchIconBtn.addEventListener('click', () => {
    searchResultsContainer.innerHTML = ''
    let inputValue = input.value

    if ((inputValue != '') && (isIconX === false)) {
        verMasCounter = 1
        createCardsForSearch(inputValue)
    } else {
        containerSuggestions.innerHTML = ''
        input.value = ''
        completeInputContainer.classList.remove('active-styles')
        completeInputContainer.classList.add('passive-styles')
    }
})