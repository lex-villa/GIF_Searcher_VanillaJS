/** Other HTML elements */
const btnCreateGifo = document.getElementById('button-crea-gif')
const principalCoverSection = document.getElementById('cover-page')
const favoritosCover = document.getElementById('favoritos-cover')
const favEmptyContainer = document.getElementById('fav-empty-container')
const favsGIFOSContainer = document.getElementById('favs-container')
const trenGIFOcover = document.getElementById('trendingGIFOS')
/** HTML elements from Create Gifo section */
const gifoSectionContainer = document.getElementById('create-GIFO-section')
const btnStart = document.getElementById('btn-start')
const btnRecord = document.getElementById('btnRecordId')
const btnFinish = document.getElementById('btnFinishId')
const video = document.getElementById('screenVideo')
const pTags = document.querySelectorAll('.p-createSection')
const numberBtns = document.querySelectorAll('.btns')

/** Functions */

/** Acceso a la camara para generar un stream de video */
let stream = null;
const constraints = {
    audio: false,
    video: {
        width: 400,
        height: 320,
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
                width: 400,
                height: 320
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

/******************************************************************************* */
/** Add Event Listeners */
btnCreateGifo.addEventListener('click', () => {
    gifoSectionContainer.style.display = 'block'

    principalCoverSection.style.display = 'none'
    favoritosCover.style.display = 'none'
    favEmptyContainer.style.display = 'none'
    favsGIFOSContainer.style.display = 'none'
    trenGIFOcover.style.display = 'none'
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
/** */






