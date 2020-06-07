
// Event listener to run after html is parsed
var game

document.addEventListener('DOMContentLoaded', () => {



let loginBar = document.getElementById('login-bar')
const loginLink = loginBar.querySelector('#login-link')
const loginDiv = document.getElementById('log-in-div')
const newUserDiv = document.getElementById('new-user-div')
loginLink.addEventListener('click', ()=> {
    newUserDiv.style.display = 'none'
    loginDiv.style.display = 'block'
})

const newUserLink = loginBar.querySelector('#new-user-link')
newUserLink.addEventListener('click', ()=> {
    loginDiv.style.display = 'none'
    newUserDiv.style.display = 'block'
})


let logoutBar = document.getElementById('logout-bar')
const logoutLink = logoutBar.querySelector('#logout-link')
logoutLink.addEventListener('click', ()=> {
    // need to save balance to database

    logoutBar.style.display = 'none'
    loginBar.style.display = 'block'
})

let loginForm = document.getElementById('log-in-form')
loginForm.addEventListener('submit', loginUser)

let newUserForm = document.getElementById('new-user-form')
newUserForm.addEventListener('submit', createUser)

const fetchImagesURL = 'http://localhost:3000/images'

const winObject = []

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

const reduceBet = document.getElementById('reduce-bet')
reduceBet.addEventListener('click', Game.changeBet)

const increaseBet = document.getElementById('increase-bet')
increaseBet.addEventListener('click', Game.changeBet)


// Fetch images from database function & create instances
fetchImages()

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
greeting.id = 'message-text'
greeting.innerText = 'Hello Slot Player!'
playerMessageDiv.appendChild(greeting)

// Spin functionality

btnSpin.addEventListener('click', spinStart)

function spinStart() {
    // Deduct Bet Amount from Balance and update display
    game.balance -= game.bet
    game.updateBalance()

    // Select final image for each reel
    const winImg1 = IMAGES[generateRandom()]
    const winImg2 = IMAGES[generateRandom()]
    const winImg3 = IMAGES[generateRandom()]
    const winArry = [winImg1.imageID, winImg2.imageID, winImg3.imageID]
    const winCodeArry = [winImg1.win_code, winImg2.win_code, winImg3.win_code]
    // Calculate win amount (if any)
    const winMultiplier = calcWin(winArry, winCodeArry)
    console.log(`Win Multiplier: ${winMultiplier}`)

    // Generate array of images to be displayed in succession for each reel
    const reel1SpinArry = createSpinArry(initialImgArry[0], winImg1, 1)
    const reel2SpinArry = createSpinArry(initialImgArry[1], winImg2, 2)
    const reel3SpinArry = createSpinArry(initialImgArry[2], winImg3, 3)
    // debugger
    // start spin in slot machine
    spin(reelArry[0], reel1SpinArry)
    spin(reelArry[1], reel2SpinArry)
    spin(reelArry[2], reel3SpinArry)

    // delay remaining function until spins are finished

    window.setTimeout(()=> {
        // add remaining function to display win
        
        const winAmount = game.bet * winMultiplier
        // const newBalance = game.balance += winAmount
        // debugger
        game.updateBalance(winAmount)
        game.updateWin(winAmount)

        const playerMessageDiv = document.getElementById('messages')
        const playerMessage = playerMessageDiv.querySelector('p')
        playerMessage.innerText = `You won ${winMultiplier} X your bet!`

    }, (reel3SpinArry.length + 2)*150, winMultiplier)  
}

function calcWin(winArry, winCodeArry) {
    console.log(`Win Array: ${winArry}`)
    console.log(`Win Code Array: ${winCodeArry}`)
    // const sortedWinArry = winArry.sort().join()
    
    // console.log(`Sorted Win Array: ${sortedWinArry}`)

    if (winArry[0] === winArry[1] && winArry[0] === winArry[2]) {
        console.log('all elements match!')
        return 10
    } else if (winCodeArry.includes(1)) {
        console.log('Includes at least 1 wincode of 1!')
        const numBarArry = winCodeArry.filter((el) => el === 1)
        if (numBarArry.length === 1) { return 2 }
        else if (numBarArry.length === 2) {return 5 }
    } else if (winCodeArry.every((el) => el === 2)) {
        console.log('Includes 2s!')
        return 3
    } else if (winCodeArry.every((el) => el === 3)) {
        console.log('Includes all 3s!')
        return 2
    } else { return 0}
    
}

function createSpinArry(initialImage, winImage, spins) {
    const initialIndex = IMAGES.findIndex((image) => image.source === initialImage.source)
    const finalIndex = IMAGES.findIndex((image) => image.source === winImage.source)
    
    console.log(`Starting Image: ${initialImage.source}`)
    console.log(`Win Image: ${winImage.source}`)
    
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
})
