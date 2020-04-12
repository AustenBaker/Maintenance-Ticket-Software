
const PATH = 'http://127.0.0.1:3001'

async function submitTicket(ticketAttributes){ // note ticketAttributes must be in JSON.stringify Object
    console.log(ticketAttributes)
    fetch(PATH + '/ticket/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ prop1: 'val1', prop2: 'val2' })
      body: ticketAttributes
    }).then(res => res.json()).then(data => {
      console.log(res)
    }). catch(err => {
      
    })
    const data = await res.json();
    console.log(data); // response data as an Object
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
    const data = await res.json();
    console.log(data); // response data as an Object
};

// TODO: not created in backend yet
// TODO: add body to request!!!
/**
 * This method updates information in mongodb for ticket
 *
 * @returns true if updated correctly
 */
async function updateTicket(ticketAttributes){ // note ticketAttributes must be in JSON.stringify Object
    console.log(ticketAttributes)
    fetch(PATH + '/ticket/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ prop1: 'val1', prop2: 'val2' })
        body: ticketAttributes
    }).then(res => res.json()).then(data => {
        console.log(res)
    }). catch(err => {
        
    })
}

async function getTicketsFromEmail(email){ 
    console.log(ticketAttributes)
    fetch(PATH + '/ticket/:email', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: email
    }).then(res => res.json()).then(data => {
        console.log(res)
    }). catch(err => {
        
    })
}

async function getTicketsFromId(id){ 
    console.log(ticketAttributes)
    fetch(PATH + '/:id', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: id
    }).then(res => res.json()).then(data => {
        console.log(res)
    }). catch(err => {
        
    })
}