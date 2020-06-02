
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

// Spin functionality

btnSpin.addEventListener('click', spinStart)

function spinStart() {
    // Select final image for each reel
    const winImg1 = IMAGES[generateRandom()]
    const winImg2 = IMAGES[generateRandom()]
    const winImg3 = IMAGES[generateRandom()]

    // Generate array of images to be displayed in succession for each reel
    const reel1SpinArry = createSpinArry(initialImgArry[0], winImg1, 1)
    const reel2SpinArry = createSpinArry(initialImgArry[1], winImg2, 2)
    const reel3SpinArry = createSpinArry(initialImgArry[2], winImg3, 3)
    // debugger
    // start spin in slot machine
    spin(reelArry[0], reel1SpinArry)
    spin(reelArry[1], reel2SpinArry)
    spin(reelArry[2], reel3SpinArry)



}

function createSpinArry(initialImage, winImage, spins) {
    const initialIndex = IMAGES.findIndex((image) => image.source === initialImage.source)
    const finalIndex = IMAGES.findIndex((image) => image.source === winImage.source)
    
    console.log(initialImage.source)
    console.log(winImage.source)
    
    const returnArry = IMAGES.slice(initialIndex)
    
    for (let i=0; i<spins; i++) {
        returnArry.push(...IMAGES)
    }
    returnArry.push(...IMAGES.slice(0, finalIndex + 1))

    return returnArry
}

function spin(reel, imageArry) {
    for (let i=0; i<imageArry.length; i++) {
        window.setTimeout(()=> {
            const reelImg = reel.querySelector('img')
            reel.removeChild(reelImg)
            const img = document.createElement('img')
            img.src = imageArry[i].source
            // reel1Img.classList.add('img-spin')
            reel.appendChild(img)
        }, (i + 1)*150)  
    }
}
