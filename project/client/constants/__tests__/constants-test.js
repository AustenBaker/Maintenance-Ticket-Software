
var reference = require('../Reference');

//mocha -r esm binding-test.js
var expect = require('chai').expect;

// jest --verbose --coverage
/*testProperty: {
    'ticket_number': 12345678,
    'timestamp': 0,
    'status': reference.STATUS.OPEN,
    'location': reference.PROPERTY.LAA,
    'unit_number': 200,
    'email': "kyle@gmail.com",
    'username': "golfKid",
    'user': reference.USER_TYPE.RES,
    'emergency': reference.EMERGENCY.NO,
    'activate': true,
    'edit_mode': "AHHH",
    'ticket_issue': "Door is locked",
    'note': "please help",
    'details': "I am stuck outside",
    'first': "Kyle",
    'last': "Schneider",
    'ticket_issue_title': "Locked out",
    'password': "topSecret",
    'phone': 2624739108,
    'type': reference.USER_TYPE.RES,
    'entryPermission': "any",
    'contactPreference': "text",
    'ticket_view_mode': ((item) => {return item in TICKET_VIEW}),
    'units': [],
    'ticket_updates': []
}*/
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
