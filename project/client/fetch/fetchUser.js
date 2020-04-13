const fetch = require("node-fetch")

const PATH = 'http://127.0.0.1:3001'


/**
 * 
 * @param {String} user = Username of user
 * @param {String} pass = Password of user
 */
export async function handleLogin(user, pass) {
    const response = await fetch(PATH + '/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    }).then(res => res.json()).then(data => {
        console.log("Login Successful")
        return data
    }).catch(err => {
        console.log("Error during loggin: " + err)
        return err
    })
    console.log(response)
    return await response
}


export async function logout(){
    const response = await fetch(PATH + '/account/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    }).then(res => res.json()).then(data => {
        console.log("Logout Successful")
        return data
    }).catch(err => {
        console.log("ERROR during logout: " + err)
        return err
    })
    return await response.json()
}

/**
 * 
 * @param {String} first 
 * @param {String} last 
 * @param {Array} units 
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {Number} phone 
 * @param {Number} contactPreference 
 * @param {String} entryPermission 
 * @param {String} type 
 * @param {String} note 
 * @param {Array} tickets 
 * @param {Boolean} activate 
 */
export async function createAccount(first, last, units, username, password, email, phone, contactPreference, entryPermission, type, note, tickets, activate) {
    const response = await fetch(PATH + '/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first:first, 
                                last:last, 
                                units:units, 
                                username:username, 
                                password:password, 
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
        method: 'GET',
    }).then(res => res.json()).then(data => {
        console.log("User Found from Username Successful")
        return data
    }).catch(err => {
        console.log("ERROR getting user from username: " + err)
        return err
    })
    return await response
}

/**
 * @param body = {username, password, first, last, email, type}
 */

export async function update(username, password, first, last, email, type) {
    const response = await fetch(PATH + '/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, first: first, last: last, username: username, email: email, type: type })
    }).then(res => res.json()).then(data => {
        console.log("Update Successful")
        return data
    }).catch(err => {
        console.log("Error during update: " + err)
        return err
    })
    return await response.json()
}