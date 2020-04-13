const request = require('supertest');
const app = require('../index')

describe("TESTING CATAGORIES", function() {
    this.timeout(15000)
    describe('1. Accounts',function() { 
        //register
        it('fetch /register', async function(done){
               // .send({username: 'testing', password: 'isThisWorking?!'})
               
        })

        //login
        it('POST /login', function(done){
               // .send({username: 'testing', password: 'isThisWorking?!'})
        })

        //logout
        it('POST /logout', function(done){
                //.expect(302, done)
        })

        //delete account
        it('Delete', function(done){
                //.send({username: 'testing'})
                //.expect(200, done)
        })
        
        //Check if account is still there
        it('POST /login w/ no account', function(done){
                //.send({username: 'testing', password: 'isThisWorking?!'})
                //.expect(403, done)
        })
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', function() {
        it('Create /ticket/', function(done){
                //.send({issue: 'testing', emergency: false, resolvedTime: 0, progress: "VIEWED",closed: false })
               // .expect(200, done)
        })

        it('GET /ticket/:id', function(done){
            this.timeout(15000)
                .get('/ticket/1585610325626')
                .expect('Content-Type', /json/)
                .expect(200,done)
        })

        it("Delete /ticket/", function(done){
            request(app)
                .delete('/ticket/45681654645')
                .expect(404,done) //just for the time being
                //.expect(200,done)
            done()
        })
    })

})





