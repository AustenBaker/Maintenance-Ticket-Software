var ticketFetch = require('../ticket');
var userFetch = require('../user');

//var expect = require('chai').expect;

import * as JestNative from '@testing-library/jest-native';
expect.extend({...JestNative});

// jest -t "binding-test" --verbose --coverage
describe("Frontend to backend bindings", function() {
    let newTicketID = ""
    this.timeout(15000)
    describe('1. Accounts',function() { 
       //register
        it('fetch POST /account/register', async function(){
            const res = await userFetch.register({ 
                first:"kyle", 
                last:"schn", 
                units:["parkway","hill crest"],
                username:"golfkid", 
                password:"topSecret", 
                email:"kyle2@gmail.com", 
                phone:2624739108, 
                contactPreference:"Text",
                entryPermission:"Knock",
                type:"res", 
                note:"Go for it", 
                tickets:[],
                activate:true,
            })
            expect(res.username).equal("golfkid")
        })

        //login
        it('fetch POST /account/login', async function(){
            const res = await userFetch.login({username:"golfkid",password:"topSecret"})
            expect(res.first).to.be.a('string')
        })

        //update
        it.skip("fetch POST /account/update")

        //logout
        it('fetch POST /account/logout', async function(){
            const res = await userFetch.logout()
            expect(res.loggedIn).equal(false)
        })

        it('fetch GET /account/:username', async function(){
            const res = await userFetch.getUserFromUsername("golfkid")
            expect(res.first).equal('kyle')
        })

        

        //Check if account is still there
        it.skip('fetch POST /account/login (no account)', function(){

        })
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', async function() {
        it('fetch POST /ticket/create', async function(){
            const res = await ticketFetch.submit({
                email: "kyle2@gmail.com",
                aptComplex: "parkway",
                unit: "524",
                issue: "I SWITCHED THIS",
                emergency: false,
                resolvedTime: 1,
                progress: "waiting",
                closed: false
            })
            newTicketID = res.id
            console.log(res)
            expect(res.id).to.be.a('number')
        })
        
        it.skip('fetch POST /ticket/update', async function(){
            const res = await ticketFetch.updateTicket({
                email: "kyle2@gmail.com",
                aptComplex: "parkway",
                unit: "524",
                issue: "I SWITCHED THIS",
                emergency: false,
                resolvedTime: 1,
                progress: "waiting",
                closed: true
            })
            expect(res.closed).equal(true)
        })

        it.skip('fetch GET /ticket/:id', async function(){
            const res = await ticketFetch.getTicketFromId(newTicketID)
            expect(res.issue).equal("Door wont open")
        })

        it.skip("get ticket array for user from their email")
    })

    describe('4. Clean up created entries', async function() {
        //delete account
        it('fetch DELETE /account/delete', async function(){
            const res = await userFetch.deleteAccount("golfkid")
            expect(res.status).equal(200)
        })

        it("fetch Delete /ticket/delete", async function(){
            const res = await ticketFetch.deleteTicket(newTicketID)
            expect(res.status).equal(200)
        })

    })

})





