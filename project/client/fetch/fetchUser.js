const PATH = 'http://127.0.0.1:3001'


/**
 * 
 * @param user username of client
 * @param pass password of client
 */
function handleLogin(user, pass) {
    fetch(PATH + '/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}

//TODO: Unsure what needs to be sent, is it a session itself?

async function logout(session){ 
    fetch(PATH + '/account/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: session
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}
/**
 * 
 * @param body = {username, password, first, last, usernmae, email, type}
 */
async function register(body){ 
    fetch(PATH + '/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}


async function deleteAccount(username){ 
    fetch(PATH + '/account/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: username
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}

async function getUserFromUsername(username){ 
    fetch(PATH + '/account/:username', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: username
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}