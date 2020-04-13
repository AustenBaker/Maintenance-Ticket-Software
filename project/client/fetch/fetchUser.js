const PATH = 'http://127.0.0.1:3001'


/**
 * 
 * @param user username of client
 * @param pass password of client
 */
async function handleLogin(user, pass) {
    fetch(PATH + '/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    }).then(res => res.json()).then(data => {
        console.log("Login Successful")
    }).catch(err => {
        console.log("Error during loggin: " + err)
    })
}


async function logout(){
    fetch(PATH + '/account/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    }).then(res => res.json()).then(data => {
        console.log("Logout Successful")
    }).catch(err => {
        console.log("ERROR during logout: " + err)
    })
}
/**
 * 
 * @param body = {username, password, first, last, usernmae, email, type}
 */
async function register(username, password, first, last, username, email, type) {
    fetch(PATH + '/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, first: first, last: last, username: username, email: email, type: type })
    }).then(res => res.json()).then(data => {
        console.log("Register Successful")
    }).catch(err => {
        console.log("ERROR during registration: " + err)
    })
}


async function deleteAccount(username){ 
    fetch(PATH + '/account/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: username
    }).then(res => res.json()).then(data => {
        console.log("Delete Account Successful")
    }).catch(err => {
        console.log("ERROR deleting account: " + err)
    })
}

async function getUserFromUsername(username){ 
    fetch(PATH + '/account/:username', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: username
    }).then(res => res.json()).then(data => {
        console.log("User Found from Username Successful")
    }).catch(err => {
        console.log("ERROR getting user from username: " + err)
    })
}

/**
 * @param body = {username, password, first, last, usernmae, email, type}
 */

async function update(username, password, first, last, username, email, type) {
    fetch(PATH + '/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, first: first, last: last, username: username, email: email, type: type })
    }).then(res => res.json()).then(data => {
        console.log("Update Successful")
    }).catch(err => {
        console.log("Error during update: " + err)
    })
}