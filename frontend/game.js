
const balanceDisplay = document.getElementById('balance')
const betDisplay = document.getElementById('bet-amount')
const winDisplay = document.getElementById('win')


class Game {
    constructor(name, balance) {
        this.name = name
        this.balance = balance
        this.bet = balance / 100
    }

    // add methods including spin?

    updateBalance(win = 0) {
        balanceDisplay.innerText = Game.numberFormat(this.balance += win)
    }

    updateBet(change = 0) {
        
        betDisplay.innerText = Game.numberFormat(this.bet += change)
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