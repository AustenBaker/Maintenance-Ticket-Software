//import { submitTicket, deleteTicket, updateTicket, getTicketsFromEmail, getTicketFromId} from '../fetchTicket';
//import { getTicketFromId } from '../fetchTicket';
var ticketFetch = require('../ticket');
var userFetch = require('../user');
var expect = require('chai').expect;
//import { handleLogin, logout, register, deleteAccount, getUserFromUsername, update} from '../fetchUser' ;

describe("TESTING CATAGORIES", function() {
    this.timeout(15000)
    describe('1. Accounts',function() { 
       //register
        it('fetch POST /account/register', async function(){
            const res = await userFetch.register("golfkid","topSecret","kyle","schn",["parkway","hill crest"],
                                                "kyle2@gmail.com",2624739108,2,"Go for it","res","I swear I am nice",
                                                [],false)
            expect(res.username).equal("golfkid")
        })

        //login
        it('fetch POST /account/login', async function(){
            const res = await userFetch.handleLogin("golfkid","topSecret")
            //res.json() gets data from request
            expect(res.status).equal(200)
        })

        //update
        it("fetch POST /account/update")

        //logout
        it('fetch POST /account/logout', async function(){
            const res = await userFetch.logout()
            expect(res.status).equal(200)
        })

        it('fetch GET /account/:username', async function(){
            const res = await userFetch.getUserFromUsername("golfkid")
            expect(res.first).equal('kyle')
        })

        //delete account
        it('fetch DELETE /account/delete', async function(){
            const res = await userFetch.deleteAccount("golfkid")
            expect(res.status).equal(200)
        })

        //Check if account is still there
        it.skip('fetch POST /account/login (no account)', function(){

        })
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', async function() {
        let newTicketID = ""
        it('fetch POST /ticket/create', async function(){
            const res = await ticketFetch.submitTicket("g@a.com","parker way apt","213","Door wont open","jammed some how",false,5,"No progress",false)
            newTicketID = res.id
            expect(res.id).to.be.a('number')
        })
        
        // TODO: needs to be implemented in backend
        it.skip('fetch POST /ticket/update', async function(){
            const res = await ticketFetch.updateTicket("a@a.com","parker way apt","213","I SWITCHED THIS","jammed some how",true,5,"No progress",false)
            console.log("CHANGING TICKET")
            console.log(res)
            expect(res.id).to.be.a('number')
        })

        it('fetch GET /ticket/:id', async function(){
            const res = await ticketFetch.getTicketFromId(newTicketID)
            expect(res.issue).equal("Door wont open")
        })

        it("fetch Delete /ticket/delete", async function(){
            const res = await ticketFetch.deleteTicket(newTicketID)
            expect(res.status).equal(200)
        })


        it.skip("get ticket array for user from their email")
    })

})





