/** Other HTML elements */
const btnCreateGifo = document.getElementById('button-crea-gif')
const principalCoverSection = document.getElementById('cover-page')
const favoritosCover = document.getElementById('favoritos-cover')
const favEmptyContainer = document.getElementById('fav-empty-container')
const favsGIFOSContainer = document.getElementById('favs-container')
const trenGIFOcover = document.getElementById('trendingGIFOS')
const containerResults = document.getElementById('search-results')
const myGifosGIFOSContainerSection = document.getElementById('MisGifos-cover')
/** HTML elements from Create Gifo section */
const gifoSectionContainer = document.getElementById('create-GIFO-section')
const btnStart = document.getElementById('btn-start')
const btnRecord = document.getElementById('btnRecordId')
const btnFinish = document.getElementById('btnFinishId')
const btnUpload = document.getElementById('btnUploadId')
const video = document.getElementById('screenVideo')
const pTags = document.querySelectorAll('.p-createSection')
const numberBtns = document.querySelectorAll('.btns')

/** Functions */
const myGIFsLocalStrg = JSON.parse(localStorage.getItem("myGIFs"));
if (!myGIFsLocalStrg) {
    myGIFsLocalStrg = []
}

async function uploadGIF(gif) {
    const res = await fetch("https://upload.giphy.com/v1/gifs" + "?api_key=isa5RTREAjmlL4Sr9iYEx9g5QycePeF2", {
        method: 'POST',
        body: gif,
    });

    const uploadResults = await res.json();
    console.log("subida de gifo")
    console.log(uploadResults)

    myGIFsLocalStrg.push(uploadResults.data.id)
    localStorage.setItem('myGIFs', JSON.stringify(myGIFsLocalStrg));
}
/** Acceso a la camara para generar un stream de video */
let stream = null;
const constraints = {
    audio: false,
    video: {
        width: 640,
        height: 360,
    },
};

async function getAccess() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {

            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
}
/** */
/** Todo lo que pasa cuando das click en comenzar */
const stepOne = async () => {
    pTags[0].innerHTML = '¿Nos das acceso a tu cámara?'
    pTags[1].innerHTML = 'El acceso a tu camara sera valido solo'
    pTags[2].innerHTML = 'por el tiempo en el que estes creando el GIFO'

    getAccess()

    pTags.forEach(tag => {
        tag.style.display = 'none'
    })

    video.style.display = 'block'
    btnStart.style.display = 'none'
    btnRecord.style.display = 'block'
    numberBtns[0].style.background = '#572EE5'
    numberBtns[0].style.color = 'white'

}

/** */

/** funcion para grabar */
let blob = null;
let recorder;

function recordingGif() {

    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function (stream) {
            recorder = new RecordRTC(stream, {
                type: 'gif',
                mimeType: 'video/webm',
                recorderType: GifRecorder,
                disableLogs: true,
                quality: 6,
                width: 640,
                height: 360
            });
            recorder.startRecording();
            recorder.stream = stream;
        });
}

/** Todo lo que pasa cuando das click en grabar */
const stepTwo = async () => {
    numberBtns[0].style.background = 'white'
    numberBtns[0].style.color = '#572EE5'
    numberBtns[1].style.background = '#572EE5'
    numberBtns[1].style.color = 'white'
    btnRecord.style.display = 'none'
    btnFinish.style.display = 'block'

    recordingGif()
}

/** */

/** Funcion para detener grabacion */
function stopMakingGif() {

    btnFinishId.style.display = 'none';
    btnUpload.style.display = 'block'

    recorder.stopRecording(stopRecordingCallBack);

}

function stopRecordingCallBack() {

    blob = recorder.getBlob();

    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(blob)

    recorder.stream.stop();
    recorder.destroy();
    recorder = null

    invokeSaveAsDialog(blob);
}

/** Todo lo que pasa cuando das click en finalizar */
const stepThree = async () => {
    numberBtns[1].style.background = 'white'
    numberBtns[1].style.color = '#572EE5'
    numberBtns[2].style.background = '#572EE5'
    numberBtns[2].style.color = 'white'



    stopMakingGif()

}


const stepFour = () => {
    let form = new FormData();

    form.append('file', blob, 'myGIF.gif');

    

    uploadGIF(form)
    btnUpload.style.display = 'none'
}

/******************************************************************************* */
/** Add Event Listeners */
btnCreateGifo.addEventListener('click', () => {
    gifoSectionContainer.style.display = 'block'

    principalCoverSection.style.display = 'none'
    favoritosCover.style.display = 'none'
    favEmptyContainer.style.display = 'none'
    favsGIFOSContainer.style.display = 'none'
    trenGIFOcover.style.display = 'none'
    containerResults.style.display = 'none'
    myGifosGIFOSContainerSection.style.display = 'none'
})

btnStart.addEventListener('click', () => {
    stepOne()
})

btnRecord.addEventListener('click', () => {
    stepTwo()
})

btnFinish.addEventListener('click', () => {
    stepThree()
})

btnUpload.addEventListener('click', () => {
    stepFour()
})
/** */







