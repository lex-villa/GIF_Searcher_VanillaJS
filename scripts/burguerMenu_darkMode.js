/** HTML Elements */
const burguerIcon = document.getElementById('burguer-icon')
const ulMenuBurguer = document.getElementById('ul-menu')
/** HTML Elements Dark Mode*/
const cssDarks = document.getElementById('cssDarks');
const darkModeBtn = document.getElementById('dark-mode');
/** HTLM Elements for icons dark mode */
const logo = document.getElementById('logo-img');
const createGifoBtn = document.getElementById('create-gifo');
export const searchIconBtn = document.getElementById('search-icon');

/** Variables */
let isClicked = false
let widthScreen = window.innerWidth

/** Functions */
const deployBurguerDefault = (widthScreenParam) => {
    if(widthScreenParam <= 1169) {
        ulMenuBurguer.style.height = '0'
        isDark ? burguerIcon.src = "./images/burger-dark.svg" : burguerIcon.src = "./images/burger.svg";
        
        isClicked = false
    } else {
        ulMenuBurguer.style.height = '100px'
        isClicked = true
    };
};

/** Functions dark mode */
const turnDark = () => {
    if (isDark) {
        cssDarks.href = '';
        isDark = false;
        localStorage.setItem("isDark", true)
        /* ICONS */
        burguerIcon.src = "./images/button-close.svg"
        logo.src = './images/logo-mobile.svg'
        searchIconBtn.src = './images/icon-search.svg'
        createGifoBtn.src = './images/button-crear-gifo.svg'
    } else {
        cssDarks.href = './styles/css/variablesDarkMode.css'
        isDark = true;
        localStorage.setItem("isDark", false)
        /* ICONS */
        burguerIcon.src = "./images/button-close-dark.svg"
        logo.src = './images/logo-mobile-darks.svg'
        searchIconBtn.src = './images/icon-search-darks.svg'
        createGifoBtn.src = "./images/button-crear-gifo-darks.svg"
    }
};

/** Event Listeners */
/** dark mode logic */
let isDark = localStorage.getItem("isDark");
if (isDark === null) {
    isDark = true;
    turnDark();
} else {
    isDark = isDark === "true";
    turnDark();
}; 

darkModeBtn.addEventListener("click", turnDark);

/** burger menu logic */
burguerIcon.addEventListener('click', () => {
    if (isClicked) {
        ulMenuBurguer.style.height = '0'
        isClicked = false
        isDark ? burguerIcon.src = "./images/burger-dark.svg" : burguerIcon.src = "./images/burger.svg";
    } else {
        ulMenuBurguer.style.height = '100vh'
        isClicked = true
        isDark ? burguerIcon.src =  "./images/button-close-dark.svg" : burguerIcon.src = "./images/button-close.svg";
    }
})

deployBurguerDefault(widthScreen);
window.addEventListener("resize", () => {
    let widthScreen = window.innerWidth;
    deployBurguerDefault(widthScreen);
});