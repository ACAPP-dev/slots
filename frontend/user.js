
function loginUser(event) {
    event.preventDefault()

    configObject = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({username: event.target.username.value, password: event.target.password.value})
    }

    fetch('http://localhost:3000/sessions', configObject)
        .then (resp => resp.json)
        .then (json => {
            console.log('User Logged In')
            console.log(json)
        })
        .catch (error => {
            console.log('error!')
        })
}

function createUser(event) {
    event.preventDefault()
    console.log('user created')
}

