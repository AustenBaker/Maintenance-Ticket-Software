const PATH = 'http://127.0.0.1:3001'
const fetch = require("node-fetch");

export async function checkLoginStatus() {
    const res = await fetch(PATH + '/account/status', {
        method: 'POST'
    });
    return await res.json();
}

export async function login(body) {
    const res = await fetch(PATH + '/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await res.json();
}

export async function logout(){
    const res = await fetch(PATH + '/account/logout', {
        method: 'POST'
    });
    return await res.json();
}

/**
 * @param {json} body : body can have all of the following
 * @param {String} first 
 * @param {String} last 
 * @param {Array} units 
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {String} phone 
 * @param {String} contactPreference 
 * @param {String} entryPermission 
 * @param {String} type 
 * @param {String} note 
 * @param {Array} tickets 
 * @param {Boolean} activate 
 */
export async function register(body) {
    // TODO:  Validate data before updating to server/database?
    const res = await fetch(PATH + '/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await res.json();
}

/**
 * 
 * @param {*} username 
 */
export async function deleteAccount(username){ 
    const response = await fetch(PATH + '/account/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:username})
    })
    return await response
}

export async function getUserFromUsername(username){ 
    const response = await fetch(PATH + '/account/' + username, {
        method: 'GET'
    })
    return await response.json()
}

/**
 * @param body = {username, password, first, last, units, email, phone, contactPreference, entryPermission, type, note, tickets, activate}
 */

export async function update(body) {
    // TODO: Validate user update data
    const res = await fetch(PATH + '/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return res.json();
}

/**
 * 
 * @param {string} email 
 */
export async function getTicketsFromEmail(email){ 
    const res = await fetch(PATH + '/account/email/' + email, {
        method: 'GET'
    })
    return await res.json()
}