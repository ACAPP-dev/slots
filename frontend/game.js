
const balanceDisplay = document.getElementById('balance')
const betDisplay = document.getElementById('bet-amount')
const winDisplay = document.getElementById('win')


class Game {
    constructor(name, balance) {
        this.name = name
        this.balance = balance
    }

    // add methods including spin?

    updateBalance(win = 0) {
        balanceDisplay.innerText = Game.numberFormat(this.balance += win)
    }

    updateBet(bet = this.balance / 100, change = 0) {
        betDisplay.innerText = Game.numberFormat(bet += change)
    }

    updateWin(win = 0) {
        winDisplay.innerText = Game.numberFormat(win)
    }

    static numberFormat(number) {
        const numArry = number.toString().split(".")

        numArry[0] = '$' + numArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numArry.join('.')

    }
}