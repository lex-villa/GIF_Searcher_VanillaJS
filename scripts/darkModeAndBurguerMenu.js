/** Elementos de HTML para la seccion del Burguer Menu */
const burguerIcon = document.getElementById('burguer-icon');
const ulMenu = document.getElementById('ul-menu');
/** Variables seccion Burger Menu */
let isClicked = false;
let widthScreen = window.innerWidth

/** Elementos de HTML para la sección DARK MODE */
const cssDarks = document.getElementById('cssDarks');
const darkMode = document.getElementById('dark-mode');
/** Elementos icono de HTML para la seccion DARK MODE */
const logo = document.getElementById('logo-img');
const createGifo = document.getElementById('create-gifo');
const searchIcon = document.getElementById('searchIcon');

/** DARK MODE lógica de funcionamiento*/
/** Camnia colores e iconos dependiendo si el usuario eligió el DARK MODE*/
const turnDark = () => {
    if (isDark) {
        cssDarks.href = '';
        isDark = false;
        localStorage.setItem("isDark", true);
        /* ICONS */
        burguerIcon.src = "./images/button-close.svg";
        logo.src = './images/logo-mobile.svg';
        searchIcon.src = './images/icon-search.svg';
        createGifo.src = './images/button-crear-gifo.svg';
    } else {
        cssDarks.href = './style/css/darkModeVariables.css';
        isDark = true;
        localStorage.setItem("isDark", false);
        /* ICONS */
        burguerIcon.src = "./images/button-close-dark.svg";
        logo.src = './images/logo-mobile-darks.svg';
        searchIcon.src = './images/icon-search-darks.svg';
        createGifo.src = "./images/button-crear-gifo-darks.svg";
    }
};

/** Variables seccion DARK MODE */
let isDark = localStorage.getItem("isDark");
if (isDark === null) {
    isDark = true;
    turnDark();
} else {
    isDark = isDark === "true";
    turnDark();
}; 


darkMode.addEventListener("click", turnDark);


/*********************************************************************************/


/** Sección de la lógica del funcionamiento del Burguer Menu */
const deployBurguerDefault = (widthScreenParam) => {
    if(widthScreenParam <= 1169) {
        ulMenu.style.height = '0px';
        isDark ? burguerIcon.src = "./images/burger-dark.svg" : burguerIcon.src = "./images/burger.svg";
    } else {
        ulMenu.style.height = '100vh';
    };
};

burguerIcon.addEventListener("click", () => {
    if (isClicked) {
        ulMenu.style.height = '0px';
        isClicked = false;
        
        isDark ? burguerIcon.src = "./images/burger-dark.svg" : burguerIcon.src = "./images/burger.svg";

    } else {
        ulMenu.style.height = '100vh';
        isClicked = true;
        isDark ? burguerIcon.src =  "./images/button-close-dark.svg" : burguerIcon.src = "./images/button-close.svg";
    }
});


deployBurguerDefault(widthScreen);

window.addEventListener("resize", () => {
    let widthScreen = window.innerWidth;
    deployBurguerDefault(widthScreen);
});
