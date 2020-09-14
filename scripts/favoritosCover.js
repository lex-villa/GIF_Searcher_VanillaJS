
const btnNavFavoritos = document.getElementById('btn-nav-fav')
const logoGIFOHome = document.getElementById('logo-img')

const gifoSectionContainer = document.getElementById('create-GIFO-section')
const trenGIFOcover = document.getElementById('trendingGIFOS')

const principalCoverSection = document.getElementById('cover-page')
const favoritosCover = document.getElementById('favoritos-cover')
const favEmptyContainer = document.getElementById('fav-empty-container')
const favsGIFOSContainer = document.getElementById('favs-container')


btnNavFavoritos.addEventListener('click', () => {
    principalCoverSection.style.display = 'none'
    favoritosCover.style.display = 'block'
    gifoSectionContainer.style.display = 'none'

    let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))

    if (arrayGifos.length === 0) {
        favEmptyContainer.style.display = 'block'
        favsGIFOSContainer.style.display = 'none'

    } else {
        favEmptyContainer.style.display = 'none'
        favsGIFOSContainer.innerHTML = ''
        createCardsFavoritos()
        favsGIFOSContainer.style.display = 'grid'

    }
})

logoGIFOHome.addEventListener('click', () => {
    principalCoverSection.style.display = 'block'
    favoritosCover.style.display = 'none'
    favEmptyContainer.style.display = 'none'
    favsGIFOSContainer.style.display = 'none'
    gifoSectionContainer.style.display = 'none'
    trenGIFOcover.style.display = 'block'
})




const createCardsFavoritos = () => {
    let searchResult = JSON.parse(localStorage.getItem("arrayGifos"))

    /** To  get Blob for download*/
    const getImage = async (urlImage) => {
        try {
            let response = await fetch(urlImage)
            let gifBlob = await response.blob()

            return gifBlob

        } catch (error) {
            console.log(error)
        }
    }
    /** */

    searchResult.forEach(gifElement => {
        const imageURL = gifElement.url
        const user = gifElement.user
        const title = gifElement.title

        const figureContainer = document.createElement('figure')
        figureContainer.classList.add("figure-Favs-Container")

        const imgTag = document.createElement('img')
        imgTag.src = imageURL
        imgTag.classList.add("favs-results-styles")


        const divModalContainer = document.createElement("div")
        divModalContainer.classList.add("modal-favs-class")

        const divIconSection = document.createElement("div")
        divIconSection.classList.add("icons-section-hoverFavs")

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

        let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))
        if (arrayGifos === null) {
            arrayGifos = []
            localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
        }
        if (arrayGifos.length === 0) {
            iconLikeImg.src = "./images/icon-fav-hover.svg"
        } else {
            if (!arrayGifos.find(element => element.url === imageURL)) {
                iconLikeImg.src = "./images/icon-fav-hover.svg"
            } else {
                iconLikeImg.src = "./images/icon-fav-active.svg"
            }
        }



        iconLikeImg.classList.add('btn-img-iconLike-hover')
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
        divCaptionSection.classList.add("caption-section-hoverFavs")

        const pTagUser = document.createElement('p')
        pTagUser.classList.add("userCaption-favs")
        const pTagtitle = document.createElement('p')
        pTagtitle.classList.add("tituloCaption-favs")
        pTagUser.innerHTML = user
        pTagtitle.innerHTML = title

        divCaptionSection.appendChild(pTagUser)
        divCaptionSection.appendChild(pTagtitle)

        divModalContainer.appendChild(divCaptionSection)


        figureContainer.appendChild(imgTag)
        figureContainer.appendChild(divModalContainer)

        favsGIFOSContainer.appendChild(figureContainer)
    })

    const gifsFromSearchResult = document.querySelectorAll('.favs-results-styles')
    const gifsFromSearchResultArray = Array.from(gifsFromSearchResult)


    gifsFromSearchResultArray.forEach(gifElement => {
        gifElement.addEventListener('click', event => {
            const imageToShow = event.target.attributes.src.nodeValue
            const image = document.getElementById("modal-content-id")
            image.src = imageToShow

            const iconLikeImg = document.querySelector('.like-icon')

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))
            if (arrayGifos === null) {
                arrayGifos = []
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            }
            if (arrayGifos.length === 0) {
                iconLikeImg.src = "./images/icon-fav-hover.svg"
            } else {
                if (!arrayGifos.find(element => element.url === imageToShow)) {
                    iconLikeImg.src = "./images/icon-fav-hover.svg"
                } else {
                    iconLikeImg.src = "./images/icon-fav-active.svg"
                }
            }

            const indexOfElement = (gifsFromSearchResultArray.indexOf(event.target))
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
            const url = event.target.currentSrc
            const iconElement = event.target.nextElementSibling.childNodes[0].childNodes[0].childNodes[0]
            console.log(event)
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

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))

            if (arrayGifos === null) {
                arrayGifos = []
                //arrayGifos.push({ url: url, user: user, title: title, })
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            } else {
                if (!arrayGifos.find(element => element.url === url) || arrayGifos.length === 0) {
                    iconElement.attributes[0].nodeValue = './images/icon-fav-hover.svg'

                } else {
                    const index = arrayGifos.findIndex(element => element.url === url)
                    iconElement.attributes[0].nodeValue = './images/icon-fav-active.svg'

                }
            }
        })
    })

    /** */
    const figuresContainers = document.querySelectorAll(".modal-favs-class");

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
            const iconLikeImg = document.querySelector('.like-icon')

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))
            if (arrayGifos === null) {
                arrayGifos = []
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            }
            if (arrayGifos.length === 0) {
                iconLikeImg.src = "./images/icon-fav-hover.svg"
            } else {
                if (!arrayGifos.find(element => element.url === imageToShow)) {
                    iconLikeImg.src = "./images/icon-fav-hover.svg"
                } else {
                    iconLikeImg.src = "./images/icon-fav-active.svg"
                }
            }

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

    /** Store GIFOS in LocalStorage*/
    let iconLikeArray = document.querySelectorAll('.btn-img-iconLike-hover')


    iconLikeArray.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const urlToSave = event.srcElement.offsetParent.offsetParent.parentElement.childNodes[0].src
            const user = event.srcElement.offsetParent.nextSibling.firstChild.textContent
            const title = event.srcElement.offsetParent.nextSibling.lastChild.textContent

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))

            if (arrayGifos === null) {
                arrayGifos = []
                arrayGifos.push({ url: urlToSave, user: user, title: title, })
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            } else {
                if (!arrayGifos.find(element => element.url === urlToSave) || arrayGifos.length === 0) {
                    arrayGifos.push({ url: urlToSave, user: user, title: title, })
                    localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
                    event.target.src = './images/icon-fav-active.svg'
                } else {
                    const index = arrayGifos.findIndex(element => element.url === urlToSave)
                    arrayGifos.splice(index, 1)
                    localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
                    event.target.src = './images/icon-fav-hover.svg'
                }
            }
        })
    })
    /** */

}



