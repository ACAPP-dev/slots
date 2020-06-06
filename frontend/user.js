
class User {
    constructor(name, username, balance) {
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
    user = new User(json.name, json.username, json.balance)
    
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