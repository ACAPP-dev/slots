
// Event listener to run after html is parsed

document.addEventListener('DOMContentLoaded', () => {

const fetchImagesURL = 'http://localhost:3000/images'
const IMAGES = []

const container = document.getElementById('container')
const btnSpin = document.getElementById('spin-button')
const reel1 = document.getElementById('reel-1')
const reel2 = document.getElementById('reel-2')
const reel3 = document.getElementById('reel-3')

const reelArry = [reel1, reel2, reel3]
const initialImgArry = []

const img = document.createElement('img')


let reel1Img = reel1.querySelector('img')
let reel2Img = reel2.querySelector('img')
let reel3Img = reel3.querySelector('img')
let reel1Selection = 0
let reel2Selection = 0
let reel3Selection = 0

const playerMessageDiv = document.getElementById('messages')

fetchImages()



// Define image object (each reel image will be an instance)

class ReelImage {
    constructor(imageID, name, source) {
        this.imageID = imageID
        this.name = name
        this.source = `images/${source}`
        // debugger
        ReelImage.addImage(this)
    }

    static addImage(instance) {
        IMAGES.push(instance)
    }

    get element() {
        const img = document.createElement('img')
        img.src = this.source
        return img
    }
 
}


// Fetch images from database function & create instances

function fetchImages() {
    fetch(fetchImagesURL)
    .then(resp => resp.json())
    .then(json => {
        createImages(json)
    })
}

function createImages(json) {
    json.forEach(image => {
        new ReelImage(image['id'], image['name'], image['source'])
    });
    console.log(IMAGES)
    // invoke function to display initial images on reels
    displayImages()
}

// Define function to generate random numbers for reels

function generateRandom() {
    const max = IMAGES.length
    // debugger
    return Math.floor(Math.random() * Math.floor(max))
}

function displayImages() {
    // Display initial image on reels
    for (let i=0; i<3; i++) {
        const img = document.createElement('img')
        initialImgArry.push(IMAGES[generateRandom()])
        img.src = initialImgArry[i].source
        reelArry[i].appendChild(img)
    }

}

const greeting = document.createElement('p')
greeting.classList.add('message-text')
greeting.innerText = 'Hello Slot Player!'
playerMessageDiv.appendChild(greeting)

// Spin functionality below

btnSpin.addEventListener('click', spinStart)

function spinStart() {
    // Select final image for each reel
    const winImg1 = IMAGES[generateRandom()]
    const winImg2 = IMAGES[generateRandom()]
    const winImg3 = IMAGES[generateRandom()]

    // Generate array of images to be displayed in succession for each reel
    
    const reel1SpinArry = createSpinArry(initialImgArry[0], winImg1, 3)



    // Spin reel 1 (0 in array) (arguments: reel#, finalImg, initialImg, #spins)
    // initialSpin(0, winImg1, InitialImgArry[0], 3)
    
    
    // Spin reel 2
    // initialSpin(1, winImg2, InitialImgArry[1], 4)
    // finalSpin(1, winImg2)

    // Spin reel 3
    // initialSpin(2, winImg3, InitialImgArry[2], 5)
    // finalSpin(2, winImg3)
}

// setTimeout(()=>selectImg1(), 0)

function createSpinArry(initialImage, winImage, spins) {
    const initialIndex = IMAGES.findIndex((image) => image.source === initialImage.source)
    const finalIndex = IMAGES.findIndex((image) => image.source === winImage.source)
    console.log(initialImage.source)
    console.log(winImage.source)
    const returnArry = IMAGES.slice(initialIndex).concat( 
        IMAGES, IMAGES, IMAGES.slice(0, finalIndex))
    debugger

}


function spinInterval(callback, delay, reel, winImage, spins) {
    let reps = 0
    let intervalID = window.setInterval(()=> {
        callback()

        if (++reps === spins) {
            window.clearInterval(intervalID)
            console.log('final spin called')
            finalSpin(reel, winImage)
        }
    }, delay)
    
}

// Spin Steps - reel 1
// determine winning image
// determine starting image
// loop through images with delay between each image
// stop on winning image after specified number of loops

function initialSpin(reel, winImage, initialImage, spins) {
    const currentReel = reelArry[reel]
    let index = IMAGES.findIndex((image) => image.source === initialImage.source)
    let j = 0
    for (let i=index; i<IMAGES.length; i++) {
        window.setTimeout(()=> {
            const reelImg = currentReel.querySelector('img')
            currentReel.removeChild(reelImg)
            const img = document.createElement('img')
            img.src = IMAGES[i].source
            // reel1Img.classList.add('img-spin')
            currentReel.appendChild(img)
            
        }, j * 200)  
        j++      
    }
    spinInterval(()=>midSpin(0, winImage), 200 * IMAGES.length, reel, winImage, spins)
    
}

function midSpin(reel, winImage) {
    const currentReel = reelArry[reel]
    let j = 1
    for (let i=0; i<IMAGES.length; i++) {
        window.setTimeout(()=> {
            const reelImg = currentReel.querySelector('img')
            currentReel.removeChild(reelImg)
            const img = document.createElement('img')
            img.src = IMAGES[i].source
            // reel1Img.classList.add('img-spin')
            currentReel.appendChild(img)
        }, j*200)  
        j++      
    }
    console.log(`midSpin for reel: ${reel}`)
}

function finalSpin(reel, winImage) {
    const currentReel = reelArry[reel]
    let index = IMAGES.findIndex((image) => image.source === winImage.source)
    let j = 1
    for (let i=0; i<=index; i++) {
        // console.log(i)
        window.setTimeout(()=> {
            const reelImg = currentReel.querySelector('img')
            
            // debugger
            currentReel.removeChild(reelImg)
            const img = document.createElement('img')
            img.src = IMAGES[i].source
            
            // reel1Img.classList.add('img-spin')
            currentReel.appendChild(img)  
            
        }, j * 200)  
        j++      
    }
    console.log(`winning image for reel: ${currentReel.id} ${winImage.source}`)
}




// function selectImg1() {
//     reel1Img = reel1.querySelector('img')
//     reel1.removeChild(reel1Img)
//     reel1Img = imgBar.element
//     // reel1Img.classList.add('img-spin')
//     reel1.appendChild(reel1Img)  

//     // reel2Img = reel2.querySelector('img')
//     // reel2.removeChild(reel2Img)
//     // reel2Img = imgBar.element
//     // reel2Img.classList.add('img-spin')
//     // reel2.appendChild(reel2Img)  

//     // reel3Img = reel3.querySelector('img')
//     // reel3.removeChild(reel3Img)
//     // reel3Img = imgBar.element
//     // reel3Img.classList.add('img-spin')
//     // reel3.appendChild(reel3Img)  
// }

// function selectImg2() {
//     reel1Img = reel1.querySelector('img')
//     reel1.removeChild(reel1Img)
//     reel1Img = imgSeven.element
//     // reel1Img.classList.add('img-spin')
//     reel1.appendChild(reel1Img)

//     // reel2Img = reel2.querySelector('img')
//     // reel2.removeChild(reel2Img)
//     // reel2Img = imgSeven.element
//     // reel2Img.classList.add('img-spin')
//     // reel2.appendChild(reel2Img)  

//     // reel3Img = reel3.querySelector('img')
//     // reel3.removeChild(reel3Img)
//     // reel3Img = imgSeven.element
//     // reel3Img.classList.add('img-spin')
//     // reel3.appendChild(reel3Img)  
// }


})