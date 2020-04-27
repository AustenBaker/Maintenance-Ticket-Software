
var reference = require('../Reference');

//mocha -r esm binding-test.js
var expect = require('chai').expect;

// jest --verbose --coverage
const testProperty= {
  good: [
    ['ticket_number', 12345678],
    ['timestamp', 0],
    ['status', 'Open ticket'],
    ['location', 'Lincoln Avenue Apartments'],
    ['unit_number', '200'],
    ['email', "kyle@gmail.com"],
    ['username', "golfKid"],
    ['user', 'kyle@gmail.com'],
    ['emergency', false],
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
    ['type', 'resident'],
    ['entryPermission', 'accompanied'],
    ['contactPreference', "text"],
    ['ticket_view_mode', 0],
    ['units', []],
    ['ticket_updates', []]
  ],
  bad: [
    ['ticket_number', 'cat'],
    ['timestamp', 'blue'],
    ['status', 'green'],
    ['location', 'window'],
    ['unit_number', '@#$'],
    ['email', "thewind"],
    ['username', "57"],
    ['user', 'gout'],
    ['emergency', 'NO'],
    ['activate', 'please'],
    ['edit_mode', 'free'],
    ['ticket_issue', "<script />"],
    ['note', "<script />"],
    ['details', "<script />"],
    ['first', "1"],
    ['last', "2"],
    ['ticket_issue_title', "<script />"],
    ['password', "47"],
    ['phone', 'bluemoon37'],
    ['type', 'KING'],
    ['entryPermission', 'Pay tribute'],
    ['contactPreference', "full body"],
    ['ticket_view_mode', 47],
    ['units', ['green']],
    ['ticket_updates', ['red','blue','purple']]
  ],
};

describe("Constants", function() {
    describe('Reference',function() {

        //readableTimeStamp function
        it('readableTimeStamp (INVALID TIME)', async function(){
            let res = reference.readableTimestamp(-8640000000000001);
            expect(res).to.be.null;
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

        // Validate function
        it('validate (resident type) INVALID PASSWORD', function(){
            let res = reference.validate('password', 'testing')
            expect(res).be.false
        })

        it(`validate (resident type) VALID PASSWORD`, function() {
            let res = reference.validate('password', 'thisshouldbelongenough')
            expect(res).be.true
        })

        it(`validate phone number`, function() {
            let res = reference.validate('phone', '123-456-7890');
            expect(res).be.true;
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

        it(`validate phone number INVALID`, () => {
            let res = reference.validate('phone', 'hello');
            expect(res).be.false;
        })

        it(`validate (resident type) user name`, () => {
            let res = reference.validate('first', 'Mary');
            expect(res).be.true;
        })
    })

    describe('Colors',function() {
        it.skip("Future Development", function(){
            let res = reference.validate('type', reference.USER_TYPE.RES)
            expect(res).equal(true)
        })

    })
})
