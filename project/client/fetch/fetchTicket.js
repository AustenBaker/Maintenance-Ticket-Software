
const PATH = 'http://127.0.0.1:3001'



async function submitTicket(email, apt, unit, issue, details, emerg, resolveTime, prog, closed){     
    fetch(PATH + '/ticket/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, aptComplex: apt, unit: unit, issue: issue, details: details, emergency: emerg, resolveTime: resolveTime, progress: prog, closed: closed})
    }).then(res => res.json()).then(data => {
      console.log("Ticket submition successful")
    }). catch(err => {
      console.log("ERROR submitting ticket: " + err)
    })
    //const data = await res.json();
    //console.log(data); // response data as an Object
};

async function deleteTicket(id){
    console.log(id)
    fetch(PATH + '/ticket/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: id
    }).then(res => res.json()).then(data => {
      console.log(res)
    }). catch(err => {
      
    })
};

/**
 * This method updates information in mongodb for ticket
 *
 * @returns true if updated correctly
 */
async function updateTicket(email, apt, unit, issue, details, emerg, resolveTime, prog, closed){
    console.log(ticketAttributes)
    fetch(PATH + '/ticket/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, aptComplex: apt, unit: unit, issue: issue, details: details, emergency: emerg, resolveTime: resolveTime, progress: prog, closed: closed})
    }).then(res => res.json()).then(data => {
        console.log("Ticket Update Successful")
    }). catch(err => {
        console.log("ERROR updating ticket: " + err)
    })
}

async function getTicketsFromEmail(email){ 
    console.log(ticketAttributes)
    fetch(PATH + '/ticket/:email', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: email
    }).then(res => res.json()).then(data => {
        console.log("Get tickets from email Successful")
    }). catch(err => {
        console.log("ERROR getting tickets from email: " + err)
    })
}

async function getTicketFromId(id){ 
    console.log(ticketAttributes)
    fetch(PATH + '/:id', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: id
    }).then(res => res.json()).then(data => {
        console.log("Get ticket from id Successful")
    }). catch(err => {
        console.log("ERROR getting ticket from id")
    })
}