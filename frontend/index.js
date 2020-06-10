
let game
let user
let transactionTable

const tableDiv = document.getElementById('display-transactions-div')
let displayTransactionsDiv = document.getElementById('display-transactions-div')

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
    game.clearDisplays()
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
const playerMessage = document.getElementById('player-message')
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

const slotMessage = document.getElementById('slot-message')

const reduceBet = document.getElementById('reduce-bet')
reduceBet.addEventListener('click', changeBet)

const increaseBet = document.getElementById('increase-bet')
increaseBet.addEventListener('click', changeBet)

function changeBet(event) {
    const direction = event.target.id

    if (game) {
        if (direction === 'reduce-bet') {
            return game.updateBet(Math.floor(game.bet * -.10))
        } else if (direction === 'increase-bet') {
            return game.updateBet(Math.floor(game.bet * .10) || 1)
        }
    }
}

const bet1Btn = document.getElementById('bet1-btn')
bet1Btn.addEventListener('click', fixedBet)
const bet2Btn = document.getElementById('bet2-btn')
bet2Btn.addEventListener('click', fixedBet)
const bet3Btn = document.getElementById('bet3-btn')
bet3Btn.addEventListener('click', fixedBet)

function fixedBet(event) {
    if (game) {
        let fixedBet = 0
        switch (event.target.id) {
            case 'bet1-btn': fixedBet = 10.0
            break
            case 'bet2-btn': fixedBet = 50.0
            break
            case 'bet3-btn': fixedBet = 100.0
        }
        game.bet = fixedBet
        game.updateBet()
        console.log(fixedBet)
    }
}

const viewTransactionsBtn = document.getElementById('view-transactions-btn')
viewTransactionsBtn.addEventListener('click', ()=>{
    displayTransactionsDiv = document.getElementById('display-transactions-div')
    if (displayTransactionsDiv.className === 'hidden') {
        getTransactions()
    } else if (displayTransactionsDiv.className === 'visible') {
        displayTransactionsDiv.style.display = 'none'
        displayTransactionsDiv.className = 'hidden'
        viewTransactionsBtn.innerText = 'Last 5 Transactions'
    }
})

const payoutsDiv = document.getElementById('payouts-div')
const payoutsBtn = document.getElementById('payouts')
payoutsBtn.addEventListener('click', displayPayouts)
    
function displayPayouts() {
    if (payoutsDiv.className === 'hidden') {
        payoutsDiv.style.display = 'block'
        payoutsBtn.innerText = 'Hide Payouts'
        payoutsDiv.className = 'visible'
        
    } else if (payoutsDiv.className === 'visible') {
        payoutsDiv.style.display = 'none'
        payoutsBtn.innerText = 'View Payouts'
        payoutsDiv.className = 'hidden'
    }
}

const cashOut = document.getElementById('cash-out')
cashOut.addEventListener('click', () => {
    let amount = 0

    if (user) {
        amount = parseFloat(window.prompt('Enter withdrawal amount: ', '0'))
    }

    if (amount > 0 && amount <= user.balance) {
        processTransaction(2, amount)
    } else {
        alert("Please enter valid withdrawal amount!")
    }
})

const deposit = document.getElementById('deposit')
deposit.addEventListener('click', () => {
    let amount = 0

    if (user) {
        amount = parseFloat(window.prompt('Enter deposit amount: ', '0'))
    }

    if (amount > 0) {
        processTransaction(1, amount)
    }
})

// Fetch images from database function & create instances
fetchImages()

// Spin functionality
btnSpin.addEventListener('click', spinStart)