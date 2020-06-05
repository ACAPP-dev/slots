
const balanceDisplay = document.getElementById('balance')
const betDisplay = document.getElementById('bet')
const winDisplay = document.getElementById('win')


class Game {
    constructor(name, balance) {
        this.name = name
        this.balance = balance
    }

    // add methods including spin?

    updateBalance(win = 0) {
        balanceDisplay.innerText = this.balance += win
    }

    updateBet(bet = this.balance / 10, change = 0) {
        betDisplay.innerText += change
    }

    updateWin(win = 0) {
        winDisplay.innerText += win
    }
}