'use strict';

const request = require('supertest');
const app = require('../index')

describe("TESTING CATAGORIES", function() {
    describe('1. Accounts',function() { 
        it.skip("testing this")
        //register
       /* it('POST /register', function(done){
            request(app)
                .post('/register')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect({success:true}, done)
        })

        //login
        it('POST /login', function(done){
            request(app)
                .post('/login')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect({success:true}, done)
        })

        //logout
        it('POST /logout', function(done){
            request(app)
                .post('/logout')
                .expect({success:true}, done)
        })

        //delete account
        it('Delete', function(done){
            request(app)
                .post('/delete')
                .send({username: 'testing'})
                .expect({success:true}, done)
        })
        
        //Check if account is still there
        it('POST /login w/ no account', function(done){
            request(app)
                .post('/login')
                .send({username: 'testing', password: 'isThisWorking?!'})
                .expect(403, done)
        })*/
    })

    describe('2. Property',function() { 
        it.skip("Future Developement")
        
    })

    describe('3. Ticket', function() {
        it.skip("Future Development")
    })

})





