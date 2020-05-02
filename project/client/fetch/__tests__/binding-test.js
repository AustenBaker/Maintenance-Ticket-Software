var ticketFetch = require('../ticket');
var userFetch = require('../user');
var propertyFetch = require('../property');

//mocha -r esm binding-test.js
var expect = require('chai').expect;

// jest --verbose --coverage

describe("Frontend to backend bindings", function() {
    let newTicketID1 = ""
    let newTicketID2 = ""
    //this.timeout(15000)
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

        it('fetch POST /account/status', async function(){
            const res = await userFetch.checkLoginStatus()
            expect(res.loggedIn).equal(false)
        })

        //login
        it('fetch POST /account/login', async function(){
            const res = await userFetch.login({username:"golfkid",password:"topSecret"})
            expect(res.first).to.be.a('string')
        })

        it('fetch POST /account/login (WRONG PASSWORD)', async function(){
            const res = await userFetch.login({username:"golfkid",password:"wrong"})
            expect(res.error).equal("WRONG_PASSWORD")
        })

        //update
        it("fetch POST /account/update", async function(){
            const res = await userFetch.update({ 
                first:"kyle", 
                last:"schn", 
                units:["parkway","hill crest"],
                username:"golfkid", 
                password:"topSecret", 
                email:"kyle2@gmail.com", 
                phone:2624739108, 
                contactPreference:"call",
                entryPermission:"Knock",
                type:"res", 
                note:"Go for it", 
                tickets:[],
                activate:true,
            })
            expect(res.contactPreference).equal("call")
        })

        //logout
        it('fetch POST /account/logout', async function(){
            const res = await userFetch.logout()
            expect(res.loggedIn).equal(false)
        })

        it('fetch GET /account/:username', async function(){
            const res = await userFetch.getUserFromUsername("golfkid")
            expect(res.first).equal('kyle')
        })

    })

    describe('2. Ticket', function() {
        it('fetch POST /ticket/create', async function(){
            const res = await ticketFetch.submit({
                email: "kyle2@gmail.com",
                aptComplex: "parkway",
                unit: "524",
                issue: "I SWITCHED THIS",
                emergency: false,
                resolvedTime: 1,
                progress: "waiting",
                closed: true
            })
            newTicketID1 = await res.id
            expect(res.id).to.be.a('number')
        })
        
        it('fetch POST /ticket/create', async function(){
            const res = await ticketFetch.submit({
                email: "kyle2@gmail.com",
                aptComplex: "parkway",
                unit: "524",
                issue: "Created another",
                emergency: false,
                resolvedTime: 1,
                progress: "waiting",
                closed: true
            })
            newTicketID2 = await res.id
            expect(res.id).to.be.a('number')
        })

        it('fetch POST /ticket/update', async function(){
            const res = await ticketFetch.update({
                ticketID: newTicketID1,
                email: "kyle2@gmail.com",
                aptComplex: "parkway",
                unit: "524",
                issue: "I SWITCHED THIS",
                emergency: false,
                resolvedTime: 1,
                progress: "hurry",
                closed: true
            })
            expect(res.progress).equal("hurry")
        })

        it('fetch GET /ticket/:id', async function(){
            const res = await ticketFetch.getTicketFromId(newTicketID1)
            expect(res.issue).equal("I SWITCHED THIS")
        })

        it("get ticket array for user from their email", async function(){
            const res = await userFetch.getTicketsFromEmail("kyle2@gmail.com")
            expect(res[0]).equal(newTicketID1)
        })
    })

    describe('3. Propety', function() {
        it('fetch POST /property/create', async function() {
            const res = await propertyFetch.create( {name:"New Property", id:49865431, location:"234 Way Dr., WI 53703"} )
            expect(res.name).equal("New Property")
        })

        it('fetch GET /property/:property', async function() {
            const res = await propertyFetch.getProperty("New Property")
            expect(res.id).equal(49865431)
        })

        it.skip('fetch PUT /property/update', async function() {
            const res = await propertyFetch.update({propName:"New property name", id:49865431, location:"234 Way Dr., WI 53703"})
            expect(res.name).equal("New property name")
        })

        it.skip('fetch GET /property/:property', async function() {
            const res = await propertyFetch.getProperty("New prop name")
            expect(res.id).equal(49865431)
        })
    })

    describe('4. Clean up created entries', function() {
        //delete accounts and try to update no existant stuff
        it('fetch DELTE /property/delete', async function(){
            const res = await propertyFetch.deleteProperty(49865431)
            expect(res.status).equal(200)
        })
        it('fetch DELETE /account/delete', async function(){
            const res = await userFetch.deleteAccount("golfkid")
            expect(res.status).equal(200)
        })

        it('fetch DELETE /account/delete (NO ACCOUNT)', async function(){
            const res = await userFetch.deleteAccount("golfkid")
            expect(res.status).equal(404)
        })

        it('fetch POST /account/login (NO ACCOUNT)', async function(){
            const res = await userFetch.login({username:"golfkid",password:"topSecret"})
            expect(res.error).equal("NO_SUCH_USER")
        })

        it("fetch Delete /ticket/delete", async function(){
            const res = await ticketFetch.deleteTicket(newTicketID1)
            expect(res.status).equal(200)
        })

        it("fetch Delete /ticket/delete", async function(){
            const res = await ticketFetch.deleteTicket(newTicketID2)
            expect(res.status).equal(200)
        })

        it("fetch Delete /ticket/delete (NO TICKET)", async function(){
            const res = await ticketFetch.deleteTicket(newTicketID1)
            expect(res.status).equal(404)
        })
    })

})





