const container = document.getElementById('container')
const btnSpin = document.getElementById('spin-button')
const reel1 = document.getElementById('reel-1')
const reel2 = document.getElementById('reel-2')
const reel3 = document.getElementById('reel-3')

let reel1Img = reel1.querySelector('img')
let reel2Img = reel2.querySelector('img')
let reel3Img = reel3.querySelector('img')

const playerMessageDiv = document.getElementById('messages')

// Define image object (each reel image will be an instance)

class ReelImage {
    constructor(source, position) {
        this.source = source
        this.position = position  
    }

    get element() {
        const img = document.createElement('img')
        img.src = this.source
        return img
    }

    
}

const imgSeven = new ReelImage('images/seven.png', 1)
console.log(imgSeven)
reel1.appendChild(imgSeven.element)

const imgBar = new ReelImage('images/bar.png', 1)
console.log(imgBar)
reel2.appendChild(imgBar.element)

reel3.appendChild(imgSeven.element)

const greeting = document.createElement('p')
greeting.classList.add('message-text')
greeting.innerText = 'Hello Slot Player!'
playerMessageDiv.appendChild(greeting)

btnSpin.addEventListener('click', spin)

function spin() {
    console.log('Spin Button Pressed!!')
    spinInterval(()=>{
        setTimeout(()=>selectImg1(), 0)
        setTimeout(()=>selectImg2(), 500)
    }, 1000, 5)   
}

function spinInterval(callback, delay, repetitions) {
    let reps = 0
    let intervalID = window.setInterval(()=>{
        callback()

        if (++reps === repetitions) {
            window.clearInterval(intervalID)
        }
    }, delay)
}

function selectImg1() {
    reel1Img = reel1.querySelector('img')
    reel1.removeChild(reel1Img)
    reel1Img = imgBar.element
    // reel1Img.classList.add('img-spin')
    reel1.appendChild(reel1Img)  

    // reel2Img = reel2.querySelector('img')
    // reel2.removeChild(reel2Img)
    // reel2Img = imgBar.element
    // reel2Img.classList.add('img-spin')
    // reel2.appendChild(reel2Img)  

    // reel3Img = reel3.querySelector('img')
    // reel3.removeChild(reel3Img)
    // reel3Img = imgBar.element
    // reel3Img.classList.add('img-spin')
    // reel3.appendChild(reel3Img)  
}

function selectImg2() {
    reel1Img = reel1.querySelector('img')
    reel1.removeChild(reel1Img)
    reel1Img = imgSeven.element
    // reel1Img.classList.add('img-spin')
    reel1.appendChild(reel1Img)

    // reel2Img = reel2.querySelector('img')
    // reel2.removeChild(reel2Img)
    // reel2Img = imgSeven.element
    // reel2Img.classList.add('img-spin')
    // reel2.appendChild(reel2Img)  

    // reel3Img = reel3.querySelector('img')
    // reel3.removeChild(reel3Img)
    // reel3Img = imgSeven.element
    // reel3Img.classList.add('img-spin')
    // reel3.appendChild(reel3Img)  
}