const fetch = require("node-fetch")

const PATH = 'http://127.0.0.1:3001'


/**
 * 
 * @param {String} user = Username of user
 * @param {String} pass = Password of user
 */
export async function handleLogin(user, pass) {
    // TODO: either here or somewhere else, validate
    // data form before making post request to server
    // (see constants/Reference.js REGEX for valid input
    // patterns)
    const response = await fetch(PATH + '/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    }).then(res => res).then(data => {
        return data
    }).catch(err => {
        return err;
    })
    // TODO: Add in response data validation check?
    return await response
}

export async function logout(){
    const response = await fetch(PATH + '/account/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    }).then(res => res).then(data => {
        return data
    }).catch(err => {
        return err
    })
    return await response
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} first 
 * @param {String} last 
 * @param {Array} units 
 * @param {String} email 
 * @param {String} phone 
 * @param {String} contactPreference 
 * @param {String} entryPermission 
 * @param {String} type 
 * @param {String} note 
 * @param {Array} tickets 
 * @param {Boolean} activate 
 */
export async function register(username, password, first, last, units, email, phone, contactPreference, entryPermission, type, note, tickets, activate) {
    // TODO:  Validate data before updating to server/database?
    const response = await fetch(PATH + '/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username:username, 
            password:password, 
            first:first, 
            last:last, 
            units:units, 
            email:email, 
            phone:phone, 
            contactPreference:contactPreference, 
            entryPermission:entryPermission, 
            type:type, 
            note:note, 
            tickets:tickets, 
            activate:activate
        })
    }).then(res => res).then(data => {
        return data
    }).catch(err => {
        return err
    })
    return await response.json()
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
    }).then(res => res).then(data => {
        return data
    }).catch(err => {
        return err
    })
    return await response
}

export async function getUserFromUsername(username){ 
    const response = await fetch(PATH + '/account/' + username, {
        method: 'GET'
    }).then(res => res).then(data => {
        return data
    }).catch(err => {
        return err
    })
    //console.log(response.json())
    return await response.json()
}

/**
 * @param body = {username, password, first, last, units, email, phone, contactPreference, entryPermission, type, note, tickets, activate}
 */

export async function update(username, password, first, last, units, email, phone, contactPreference, entryPermission, type, note, tickets, activate) {
    // TODO: Validate user update data
    const response = await fetch(PATH + '/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            first: first,
            last: last,
            units : units,
            email: email,
            phone: phone,
            contactPreference: contactPreference,
            entryPermission: entryPermission,
            type: type,
            note: note,
            tickets: tickets,
            activate: activate
        })
    }).then(res => res).then(data => {
        console.log("Update Successful")
        return data
    }).catch(err => {
        console.log("Error during update: " + err)
        return err
    })
    return await response.json()
}