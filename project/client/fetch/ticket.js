const PATH = 'http://127.0.0.1:3001'
const fetch = require("node-fetch");


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
export async function submit(body){
    const res = await fetch(PATH + '/ticket/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
};
/**
 * 
 * @param {number} id 
 */
export async function deleteTicket(id){
    const response = fetch(PATH + '/ticket/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id:id})
    }).then(res => res).then(data => {
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
export async function updateTicket(body){
    const res = await fetch(PATH + '/ticket/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
        }).then(res => res).then(data => {
        return data
    }). catch(err => {
        return err
    })
    return res.json();
}
/**
 * 
 * @param {string} email 
 */
export async function getTicketsFromEmail(email){ 
    const res = await fetch(PATH + '/ticket/email/' + email);
    return await res.json();
}
/**
 * 
 * @param {number} id 
 */
export async function getTicketFromId(id){ 
    //console.log(PATH + '/ticket/id/' + id)
    const response = await fetch(PATH + '/ticket/id/' + id, {
        method: 'GET'
    }).then(res => res).then(data => {
        return data;
    }). catch(err => {
        return err
    })
    return await response.json();

}