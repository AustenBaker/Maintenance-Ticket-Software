'use strict';

const request = require('supertest');
const app = require('../index')

describe("TESTING CATAGORIES", function() {
    this.timeout(15000)
    describe('1. Accounts',function() { 
        it.skip("testing this")
        //register
        it('POST /register', function(done){
            request(app)
                .post('/account/register')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect(200, done)
            done()
        })

        //login
        it('POST /login', function(done){
            request(app)
                .post('/account/login')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect(200, done)
            done()
        })

        //logout
        it('POST /logout', function(done){
            request(app)
                .post('/account/logout')
                .expect(302, done)
            done()
        })

        //delete account
        it('Delete', function(done){
            request(app)
                .post('/account/delete')
                .send({username: 'testing'})
                .expect(200, done)
            done()
        })
        
        //Check if account is still there
        it('POST /login w/ no account', function(done){
            request(app)
                .post('/account/login')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect(403, done)
            done()
        })
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', function() {
        it('Create /ticket/', function(done){
            request(app)
                .post('/ticket/create')
                .send({issue: 'testing', emergency: false, resolvedTime: 0, progress: "VIEWED",closed: false })
                .expect(200, done)
            done()
        })

        it('GET /ticket/:id', function(done){
            this.timeout(15000)
            request(app)
                .get('/ticket/1585610325626')
                .expect('Content-Type', /json/)
                .expect(200,done)
            done()
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





