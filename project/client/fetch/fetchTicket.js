const fetch = require("node-fetch")

const PATH = 'http://127.0.0.1:3001'

/**
 * @param {string} email 
 * @param {string} apt 
 * @param {string} unit 
 * @param {string} issue 
 * @param {string} details 
 * @param {boolean} emerg 
 * @param {number} resolveTime 
 * @param {string} prog 
 * @param {boolean} closed 
 */
export async function submitTicket(email, aptComplex, unit, issue, details, emergency, resolveTime, progress, closed){
    const response = fetch(PATH + '/ticket/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, 
                            aptComplex: aptComplex, 
                            unit: unit, 
                            issue: issue, 
                            details: details, 
                            emergency: emergency, 
                            resolveTime: resolveTime, 
                            progress: progress, 
                            closed: closed})
    }).then(res => res.json()).then(data => {
      console.log("Ticket submition successful")
      return data
    }). catch(err => {
      console.log("ERROR submitting ticket: " + err)
      return err
    })
    return await response.json()
};


export async function deleteTicket(id){
    const response = fetch(PATH + '/ticket/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: id
    }).then(res => res.json()).then(data => {
      console.log(res)
      return data
    }). catch(err => {
      return err
    })
    return await response.json()
};

/**
 * @param {string} email 
 * @param {string} apt 
 * @param {string} unit 
 * @param {string} issue 
 * @param {string} details 
 * @param {boolean} emerg 
 * @param {number} resolveTime 
 * @param {string} prog 
 * @param {boolean} closed 
 */
export async function updateTicket(email, aptComplex, unit, issue, details, emergency, resolveTime, progress, closed){
    const response = fetch(PATH + '/ticket/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, 
            aptComplex: aptComplex, 
            unit: unit, 
            issue: issue, 
            details: details, 
            emergency: emergency, 
            resolveTime: resolveTime, 
            progress: progress, 
            closed: closed})
        }).then(res => res.json()).then(data => {
        console.log("Ticket Update Successful")
        return data
    }). catch(err => {
        console.log("ERROR updating ticket: " + err)
        return err
    })
    return await response.json()
}

export async function getTicketsFromEmail(email){ 
    const response = fetch(PATH + '/ticket/' + email, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        console.log("Get tickets from email Successful")
        return data
    }). catch(err => {
        console.log("ERROR getting tickets from email: " + err)
        return err
    })
    return await response.json()
}

export async function getTicketFromId(id){ 
    const response = await fetch(PATH + '/ticket/' + id, {
        method: 'GET'
    }).then(res => res).then(data => {
        console.log("Get ticket from id Successful")
        return data;
    }). catch(err => {
        console.log("ERROR getting ticket from id: " + err)
        return err
    })
    return await response.json();

}