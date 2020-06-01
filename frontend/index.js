
// Event listener to run after html is parsed

document.addEventListener('DOMContentLoaded', () => {

const fetchImagesURL = 'http://localhost:3000/images'
const IMAGES = []

const container = document.getElementById('container')
const btnSpin = document.getElementById('spin-button')
const reel1 = document.getElementById('reel-1')
const reel2 = document.getElementById('reel-2')
const reel3 = document.getElementById('reel-3')

const img = document.createElement('img')
const reelArry = [reel1, reel2, reel3]

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
        img.src = IMAGES[generateRandom()].source
        reelArry[i].appendChild(img)
    }

}

const greeting = document.createElement('p')
greeting.classList.add('message-text')
greeting.innerText = 'Hello Slot Player!'
playerMessageDiv.appendChild(greeting)

btnSpin.addEventListener('click', spin)

function spin() {
    // Spin reel 1
    spinInterval(spinSelection()
    
         500)1000, 5)   

    // Spin reel 2

    // Spin reel 3
}

// setTimeout(()=>selectImg1(), 0)
        
function spinInterval(callback, delay, repetitions) {
    let reps = 0
    let intervalID = window.setInterval(()=>{
        callback()

        if (++reps === repetitions) {
            window.clearInterval(intervalID)
        }
    }, delay)
}

function spinSelection() {



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