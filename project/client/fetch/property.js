const PATH = 'http://127.0.0.1:3001'
import fetch from 'isomorphic-fetch'

export async function create(body) {
    const res = await fetch(PATH + '/property/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    });
    return res.json();
}

export async function update(body) {
    const res = await fetch(PATH + '/property/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    })
    return res.json();
}

export async function deleteProperty(propID) {
    const res = await fetch(PATH + '/property/delete',{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:propID})
    })
    return res;
}

export async function getProperty(propName){
    console.log("GETTING PROP" + propName)
    const res = await fetch(PATH + '/property/' + propName, {
        method: 'GET'
    })
    return await res.json()
}