
class User {
    constructor(id, name, username, balance) {
        this.id = id
        this.name = name
        this.username = username
        this.balance = balance
    }
}

// User Related Functions

function loginUser(event) {
    event.preventDefault()

    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username: event.target.username.value, password: event.target.password.value})
    }

    fetch('http://localhost:3000/sessions', configObject)
        .then (resp => resp.json())
        .then (json => {
            if (json.response) {
                loginForm.reset()
                displayMessage(json.response, 'red')
            } else {
                makeUser(json)
            }
        })
}

function displayMessage(message, color) {
    messageDiv.innerText = message
    messageDiv.style.color = color
    messageDiv.style.display = 'block'

    setTimeout(()=>{
        messageDiv.style.display = 'none'
        messageDiv.innerText = ''
    }, 5000)
}

function createUser(event) {
    event.preventDefault()

    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({name: event.target.name.value, username: event.target.username.value, password: event.target.password.value})
    }

    fetch('http://localhost:3000/users', configObject)
        .then (resp => resp.json())
        .then (json => {
            if (json.response) {
                newUserForm.reset()
                displayMessage(json.response, 'red')
            } else {
                makeUser(json)
            }
        })
}

function makeUser(json) {
    user = new User(json.id, json.name, json.username, json.balance)
    
    updateDisplay(user)

    // Create game instance and load balance in slot machine
    game = new Game(user.name, user.balance)

    game.updateBalance()
    game.updateBet()
    game.updateWin()
    playerMessage.innerText = `Good Luck ${user.name}!`
    slotMessage.innerText = 'Ready to Spin!'
}

function updateDisplay(user) {
    loginBar = document.getElementById('login-bar')
    logoutBar = document.getElementById('logout-bar')
    loginForm = document.getElementById('log-in-form')
    newUserForm = document.getElementById('new-user-form')
    const loginDiv = document.getElementById('log-in-div')
    const newUserDiv = document.getElementById('new-user-div')

    if (user && user.balance < 10) {
        displayMessage('Login Successful! Use deposit button below to make a deposit!', 'black')
    } else {
        displayMessage('Login Successful!', 'green')
    }

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
        body: JSON.stringify({id: user.id, transaction_type: type, amount: parseFloat(amount)})
    }

    fetch('http://localhost:3000/transactions', configObject)
        .then (resp => resp.json())
        .then (json => {
            if (json.response) {
                displayMessage('Unable to process transaction!', 'red')
            } else {
                displayMessage('Transaction successful!', 'green')
                user.balance = json.balance
                game.balance = user.balance
                game.updateBalance()
                game.updateBet()
            }
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
        .then (resp => resp.json())
        .then (json => { 
            if (json.response) {
                displayMessage('Error updating game balance!', 'red')
            }
        })
}

function getTransactions() {
    if (user) {
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(resp => resp.json())
        .then(json => {
            displayTransactions(json)
        })
    } else {alert("Please log in to view transactions!")}
}

function displayTransactions(json) {
    const existingTable = document.getElementById('transactions-table')
    if (existingTable) {
        existingTable.parentElement.removeChild(existingTable)
    }
    transactionTable = document.createElement('table')
    transactionTable.id = 'transactions-table'

    const tableRow = document.createElement('tr')
    const tableHead1 = document.createElement('th')
    const tableHead2 = document.createElement('th')
    const tableHead3 = document.createElement('th')
    tableHead1.innerText = 'Date'
    tableRow.append(tableHead1)
    tableHead2.innerText = 'Type'
    tableRow.append(tableHead2)
    tableHead3.innerText = 'Amount'
    tableRow.append(tableHead3)
    transactionTable.appendChild(tableRow)

    for (const trans of json) {
        const tableRow = document.createElement('tr')
        const tableData1 = document.createElement('td')
        const tableData2 = document.createElement('td')
        const tableData3 = document.createElement('td')
        const transDate = new Date(trans.created_at)
        tableData1.innerText = `${transDate.getMonth() + 1}/${transDate.getDate()}/${transDate.getFullYear()}`
        tableRow.appendChild(tableData1)

        const typeString = trans.transaction_type === 1 ? 'Deposit' : 'Withdrawal' 
        tableData2.innerText = typeString
        tableRow.appendChild(tableData2)

        tableData3.innerText = Game.numberFormat(trans.amount)
        tableRow.appendChild(tableData3)

        transactionTable.appendChild(tableRow)
    }
    tableDiv.appendChild(transactionTable)
    displayTransactionsDiv.style.display = 'block'
    displayTransactionsDiv.className = "visible"
    viewTransactionsBtn.innerText = 'Hide Transactions'
}
