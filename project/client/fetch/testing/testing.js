//import { submitTicket, deleteTicket, updateTicket, getTicketsFromEmail, getTicketFromId} from '../fetchTicket';
//import { getTicketFromId } from '../fetchTicket';
var ticketFetch = require('../fetchTicket')
var userFetch = require('../fetchUser')
var expect = require('chai').expect
//import { handleLogin, logout, register, deleteAccount, getUserFromUsername, update} from '../fetchUser' ;

describe("TESTING CATAGORIES", function() {
    this.timeout(15000)
    describe('1. Accounts',function() { 
       //register
        it.skip('fetch /register', async function(done){
            const res = await userFetch.register("kyle","schn",["parkway","hill crest"],"golfkid",
                                                "topSecret","kyle2@gmail.com",2624739108,2,"Go for it","res","I swear I am nice",
                                                [],false)
            expect(res.username).equal("golfkid")
        })

        //login
        it.skip('POST /login', async function(){
            const res = await userFetch.handleLogin("golfkid","topSecret")
            console.log("Logging on")
            expect(res.status).equal(200)
        })

        //logout
        it.skip('POST /logout', async function(){
            const res = await userFetch.logout()
            expect(res.status).equal(200)
        })

        //delete account
        it.skip('Delete', async function(){
            const res = await userFetch.deleteAccount("golfkid")
            console.log(res)
            expect(res.status).equal(200)
        })
        
        //Check if account is still there
        it.skip('POST /login w/ no account', function(done){
                //.send({username: 'testing', password: 'isThisWorking?!'})
                //.expect(403, done)
        })

        it('Get user from username', async function(){
            const res = await userFetch.getUserFromUsername("golfkid")
            expect(res.first).equal('kyle')
        })
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', async function() {

        it.skip('Create /ticket/', async function(){
            const res = await ticketFetch.submitTicket("a@a.com","parker way apt","213","Door wont open","jammed some how",false,5,"No progress",false)
            console.log("CREATE TICKET")
            console.log(res)
            expect(res.id).equal("")
        })
        
        it.skip('Create /ticket/', async function(){
            const res = await ticketFetch.submitTicket("a@a.com","parker way apt","213","I SWITCHED THIS","jammed some how",true,5,"No progress",false)
            console.log("CHANGING TICKET")
            console.log(res)
            expect(res.id).equal("")
        })

        it.skip("Delete /ticket/", async function(){
            const res = await ticketFetch.deleteTicket(1586790128216)
            expect(res.status).equal(200)
        })

        it.skip('GET /ticket/:id', async function(){
            const res = await ticketFetch.getTicketFromId("1585938940652")
            expect(res.issue).equal("testing")
        })


        it.skip("get ticket array for user from their email")
    })

})





