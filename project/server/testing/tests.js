'use strict';

const request = require('supertest');
const app = require('../index')

describe('/login',function() { 
    it('Login throws no errors', function(done){
        request(app)
            .post('/login')
            .send({username: 'harry', password: '$2b$10$1/1.Uhm9qED2PVUoc6yeLuMBRyOBP1qbNvcjoZZCO2lxeCnVf7tzG'})
            .expect({success:true}, done)
    })
})




