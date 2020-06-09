
class User {
    constructor(id, name, username, balance) {
        this.id = id
        this.name = name
        this.username = username
        this.balance = balance
    }
}

function loginUser(event) {
    event.preventDefault()

    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username: event.target.username.value, password: event.target.password.value})
    }

    fetch('http://localhost:3000/sessions', configObject)
        .then (resp => {
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()}
        })
        .then (json => {
            console.log('User Logged In')
            makeUser(json)
        })
        .catch (error => {
            return console.log('error! ' + error)
        })
}

function createUser(event) {
    event.preventDefault()

    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({name: event.target.name.value, username: event.target.username.value, password: event.target.password.value})
    }

    fetch('http://localhost:3000/users', configObject)
        .then (resp => {
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()}
        })
        .then (json => {
            console.log('User Created and Logged In')
            makeUser(json)
        })
        .catch (error => {
            alert(`Error: ${error.statusText}`)
            return console.log('error! ' + error)
        })


}

function makeUser(json) {
    user = new User(json.id, json.name, json.username, json.balance)
    
    // change welcome message
    updateDisplay(user)

    // load balance in slot machine
    // hide forms and display log out message
    console.log(user)
    // debugger
    // Create game instance and load balance in slot machine
    game = new Game(user.name, user.balance)
    game.updateBalance()
    game.updateBet()
    game.updateWin()

    

    const message = document.getElementById('message-text')
    message.innerText = 'Ready to Spin!'

}

function updateDisplay(user) {
    loginBar = document.getElementById('login-bar')
    logoutBar = document.getElementById('logout-bar')
    loginForm = document.getElementById('log-in-form')
    newUserForm = document.getElementById('new-user-form')
    const loginDiv = document.getElementById('log-in-div')
    const newUserDiv = document.getElementById('new-user-div')

    loginBar.style.display = 'none'
    logoutBar.style.display = 'block'
    loginDiv.style.display = 'none'
    newUserDiv.style.display = 'none'
    loginForm.reset()
    newUserForm.reset()  
}

function processTransaction(type, amount) {
    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username: user.username, transaction_type: type, amount: parseFloat(amount)})
    }

    fetch('http://localhost:3000/transactions', configObject)
        .then (resp => {
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()}
        })
        .then (json => {
            // debugger
            user.balance = json.balance
            game.balance = user.balance
            game.updateBalance()
            game.updateBet()
            alert("Transaction Complete!")
            
        })
        .catch (error => {
            alert(`Error: ${error.statusText}`)
            return console.log('error! ' + error)
        })
}

function updateUserBalance() {
    // persist balance to database after spin

    configObject = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username: user.username, balance: user.balance})
    }

    fetch(`http://localhost:3000/users/${user.id}`, configObject)
        .then (resp => {
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()}
        })
        .then (json => {
            console.log(`Updated user balance after spin ${json.balance}`)
            
        })
        .catch (error => {
            alert(`Error: ${error.statusText}`)
            return console.log('error! ' + error)
        })
}

function getTransactions() {
    if (user) {
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            displayTransactions(json)
        })
    } else {alert("Please log in to view transactions!")}
}

function displayTransactions(json) {

    const table = tableDiv.querySelector('#display-transactions-table tbody')
    

    for (const trans of json) {
    const tableRow = document.createElement('tr')
    const tableData1 = document.createElement('td')
    const tableData2 = document.createElement('td')
    const tableData3 = document.createElement('td')
        // debugger
    const transDate = new Date(trans.created_at)
    tableData1.innerText = `${transDate.getMonth() + 1}/${transDate.getDate()}/${transDate.getFullYear()}`
    tableRow.appendChild(tableData1)

    const typeString = trans.transaction_type === 1 ? 'Deposit' : 'Withdrawal' 
    tableData2.innerText = typeString
    tableRow.appendChild(tableData2)

    tableData3.innerText = Game.numberFormat(trans.amount)
    tableRow.appendChild(tableData3)

    table.appendChild(tableRow)
    }
    tableDiv.style.display = 'block'


}
