//import { submitTicket, deleteTicket, updateTicket, getTicketsFromEmail, getTicketFromId} from '../fetchTicket';
//import { getTicketFromId } from '../fetchTicket';
var ticket = require('../fetchTicket')
var expect = require('chai').expect
//import { handleLogin, logout, register, deleteAccount, getUserFromUsername, update} from '../fetchUser' ;

describe("TESTING CATAGORIES", function() {
    console.log("WORKKSDFLJSDKFJ")
    this.timeout(15000)
    describe('1. Accounts',function() { 
        it.skip("testing this")
       /* //register
        it('fetch /register', async function(done){
            const res = await register("testing", "pass32", "Kyle", "Schneider", "golferkid", "@outlook.com","RES")
            console.log(res)
            expect(res).toEqual("success")
        })

        //login
        it('POST /login', function(done){
               // .send({username: 'testing', password: 'isThisWorking?!'})
        }).skip

        //logout
        it('POST /logout', function(done){
                //.expect(302, done)
        }).skip

        //delete account
        it('Delete', function(done){
                //.send({username: 'testing'})
                //.expect(200, done)
        }).skip
        
        //Check if account is still there
        it('POST /login w/ no account', function(done){
                //.send({username: 'testing', password: 'isThisWorking?!'})
                //.expect(403, done)
        }).skip*/
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', async function() {
        it('Create /ticket/', function(){
            const res = await ticket.submitTicket("a@a.com","parker way apt","213","Door wont open","jammed some how",false,)
                //.send({issue: 'testing', emergency: false, resolvedTime: 0, progress: "VIEWED",closed: false })
               // .expect(200, done)
        }).skip

        it('GET /ticket/:id', async function(){
            const res = await ticket.getTicketFromId("1585938940652")
            expect(res.issue).equal("testing")
        })
        
        it.skip("Future Developement")
/*
        it("Delete /ticket/", function(done){
               // .delete('/ticket/45681654645')
               // .expect(404,done) //just for the time being
                //.expect(200,done)
        }).skip*/
        
    })

})





