
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
            console.log(json)
            makeUserObject(json)
        })
        .catch (error => {
            return console.log('error! ' + error)
        })
}

function createUser(event) {
    event.preventDefault()
    console.log('user created')
}

function makeUserObject(json) {
    user = new User(json.name, json.username, json.balance)
    // change welcome message
    // load balance in slot machine
    // hide forms and display log out message
    console.log(user)
}