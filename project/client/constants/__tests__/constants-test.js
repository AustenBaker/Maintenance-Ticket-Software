var reference = require('../Reference');

//mocha -r esm binding-test.js
var expect = require('chai').expect;

// jest --verbose --coverage
const testProperty= [
    ['ticket_number', 12345678],
    ['timestamp', 0],
    ['status', 'OPEN'],
    ['location', 'LAA'],
    ['unit_number', '200'],
    ['email', "kyle@gmail.com"],
    ['username', "golfKid"],
    ['user', 'RES'],
    ['emergency', 'NO'],
    ['activate', true],
    ['edit_mode', true],
    ['ticket_issue', "Door is locked"],
    ['note', "please help"],
    ['details', "I am stuck outside"],
    ['first', "Kyle"],
    ['last', "Schneider"],
    ['ticket_issue_title', "Locked out"],
    ['password', "topSecret"],
    ['phone', '2624739108'],
    ['type', 'RES'],
    ['entryPermission', 'ACC'],
    ['contactPreference', "text"],
    ['ticket_view_mode', ((item) => {return item in TICKET_VIEW})],
    ['units', []],
    ['ticket_updates', []]
];

describe("Constants", function() {
    describe('Reference',function() { 

        //readableTimeStamp function
        it('readableTimeStamp (INVALID TIME)', async function(){
            let res = reference.readableTimestamp(-8640000000000001)
            expect(res).equal(null)
        })

        it('readableTimeStamp (milliseconds)', async function(){
            let res = reference.readableTimestamp(0)
            expect(res).equal('12/31/1969 6:00:00 PM')
        })

        it('readableTimeStamp (morning)', async function(){
            let res = reference.readableTimestamp('12/31/1969 6:00:00 AM')
            expect(res).equal('12/31/1969 6:00:00 AM')
        })

        it('readableTimeStamp (12am-1am)', async function(){
            let res = reference.readableTimestamp('01/20/2010 12:00:12 AM')
            expect(res).equal('1/20/2010 12:00:12 AM')
        })

        it('readableTimeStamp (afternoon)', async function(){
            let res = reference.readableTimestamp('12/31/1969 6:00:00 PM')
            expect(res).equal('12/31/1969 6:00:00 PM')
        })

    })
   

    describe('Individual Validate functions',function() { 
        ///// Validate functions
        test.each(testProperty)("validate (%p)", (property,value) => {
            let res = reference.validate(property, value)
            console.log(res)
            expect(res).equal(true)
        })
/*
        it('validate (ticket_number)', function(){
            let res = reference.validate('ticket_number', '618684231')
            console.log(res)
            expect(res).equal(true)
        })

        it('validate ()', function(){
            let res = reference.validate('', '')
            console.log(res)
            expect(res).equal(true)
        })

        it('validate ()', function(){
            let res = reference.validate('', '')
            console.log(res)
            expect(res).equal(true)
        })

        it('validate (password type)', function(){
            let res = reference.validate('password', 'Te$t1')
            expect(res).equal(true)
        })

        it('validate (resident type)', function(){
            let res = reference.validate('type', 'RES')
            expect(res).equal(true)
        })
        */
    })
})





