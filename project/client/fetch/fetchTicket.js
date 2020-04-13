const fetch = require("node-fetch")

const PATH = 'http://127.0.0.1:3001'


/**
 * @param {string} email 
 * @param {string} aptComplex
 * @param {string} unit 
 * @param {string} issue 
 * @param {string} details 
 * @param {boolean} emergency
 * @param {number} resolveTime 
 * @param {string} progress
 * @param {boolean} closed 
 */
export async function submitTicket(email, aptComplex, unit, issue, details, emergency, resolveTime, progress, closed){
    const response = await fetch(PATH + '/ticket/create', {
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
    }).then(res => res).then(data => {
      console.log("TICKET SUBMITTED")
      console.log(data)
      return data
    }). catch(err => {
        console.log("TICKET ERROR")
        console.log(err)
      return err
    })
    console.log(response)
    return await response.json()
};
/**
 * 
 * @param {number} id 
 */
export async function deleteTicket(id){
    const response = fetch(PATH + '/ticket/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    }).then(res => res).then(data => {
      console.log("delete done")
      console.log(data)
      return data
    }). catch(err => {
      return err
    })
    return await response
};

/**
 * @param {string} email 
 * @param {string} aptComplex
 * @param {string} unit 
 * @param {string} issue 
 * @param {string} details 
 * @param {boolean} emergency
 * @param {number} resolveTime 
 * @param {string} progress
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
        }).then(res => res).then(data => {
        return data
    }). catch(err => {
        return err
    })
    return await response
}
/**
 * 
 * @param {string} email 
 */
export async function getTicketsFromEmail(email){ 
    const response = fetch(PATH + '/ticket/' + email, {
        method: 'GET'
    }).then(res => res).then(data => {
        return data
    }). catch(err => {
        return err
    })
    return await response
}
/**
 * 
 * @param {number} id 
 */
export async function getTicketFromId(id){ 
    const response = await fetch(PATH + '/ticket/' + id, {
        method: 'GET'
    }).then(res => res).then(data => {
        return data;
    }). catch(err => {
        return err
    })
    return await response.json();

}