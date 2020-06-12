
const balanceDisplay = document.getElementById('balance')
const betDisplay = document.getElementById('bet-amount')
const winDisplay = document.getElementById('win')

class Game {
    constructor(name, balance) {
        this.name = name
        this.balance = balance
        this.bet = balance / 100
    }

    updateBalance(win = 0) {
        balanceDisplay.innerText = Game.numberFormat(this.balance += win)
    }

    updateBet(change = 0) {
        betDisplay.innerText = Game.numberFormat(this.bet += change)
    }

    updateWin(win = 0) {
        winDisplay.innerText = Game.numberFormat(win)
    }

    clearDisplays() {
        balanceDisplay.innerText = '--'
        betDisplay.innerText = '--'
        winDisplay.innerText = '--'
        playerMessage.innerText = 'Good Luck!'
        slotMessage.innerText = 'Hello Slot Player!'
    }

    static numberFormat(number) {
        const numArry = Math.round(number).toString().split(".")

        numArry[0] = '$' + numArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numArry.join('.')
    }  
}

// Game Related Functions

function spinStart() {
    if(game) {
        if (game.bet <= 1) {
            return alert("Bet must be greater than 0 to spin!")
        }
        else if (game.balance <= game.bet) {
            return alert("Make a deposit to continue playing!")
        }

        game.updateWin()
        slotMessage.innerText = 'Spinning!'

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

        // Generate array of images to be displayed in succession for each reel
        const reel1SpinArry = createSpinArry(initialImgArry[0], winImg1, 1)
        const reel2SpinArry = createSpinArry(initialImgArry[1], winImg2, 2)
        const reel3SpinArry = createSpinArry(initialImgArry[2], winImg3, 3)
        
        // start spin in slot machine
        spin(reelArry[0], reel1SpinArry)
        spin(reelArry[1], reel2SpinArry)
        spin(reelArry[2], reel3SpinArry)

        // delay remaining function until spins are finished
        window.setTimeout(()=> {
            const winAmount = game.bet * winMultiplier

            game.updateBalance(winAmount)
            game.updateWin(winAmount)

            // Play sound if winning spin
            if (winAmount > 0) {winSound.play()}

            // update database with new user balance
            user.balance = game.balance
            updateUserBalance()
            
            slotMessage.innerText = `You won ${winMultiplier} X your bet!`

            // Reset initial image array to winning images
            initialImgArry[0] = winImg1
            initialImgArry[1] = winImg2
            initialImgArry[2] = winImg3

        }, (reel3SpinArry.length + 2)*150, winMultiplier) 
    } 
}

function calcWin(winArry, winCodeArry) {
    if (winArry[0] === winArry[1] && winArry[0] === winArry[2]) {
        return 10
    } else if (winCodeArry.includes(1)) {
        const numBarArry = winCodeArry.filter((el) => el === 1)
        if (numBarArry.length === 1) { 
            return 2 
        } else if (numBarArry.length === 2) {
            return 5
        } 
    } else if (winCodeArry.every((el) => el === 2)) {
        return 3
    } else if (winCodeArry.every((el) => el === 3)) {
        return 2
    } else { return 0}
}

function createSpinArry(initialImage, winImage, spins) {
    const initialIndex = IMAGES.findIndex((image) => image.source === initialImage.source)
    const finalIndex = IMAGES.findIndex((image) => image.source === winImage.source)
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
            reel.appendChild(img)
        }, (i + 1)*150)  
    }
}
