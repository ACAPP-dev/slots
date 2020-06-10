
const IMAGES = []

// Define image object (each reel image will be an instance)
class ReelImage {
    constructor(imageID, name, source, win_code) {
        this.imageID = imageID
        this.name = name
        this.source = `images/${source}`
        this.win_code = win_code
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

// Image Related Functions

function fetchImages() {
    fetch(fetchImagesURL)
    .then(resp => resp.json())
    .then(json => {
        createImages(json)
    })
}

function createImages(json) {
    json.forEach(image => {
        new ReelImage(image['id'], image['name'], image['source'], image['win_code'])
    });
    // invoke function to display initial images on reels
    displayImages()
}

// Define function to generate random numbers for reels

function generateRandom() {
    const max = IMAGES.length
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