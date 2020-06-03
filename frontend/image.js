
const fetchImagesURL = 'http://localhost:3000/images'
const IMAGES = []


// Define image object (each reel image will be an instance)

class ReelImage {
    constructor(imageID, name, source, win_code) {
        this.imageID = imageID
        this.name = name
        this.source = `images/${source}`
        this.win_code = win_code
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