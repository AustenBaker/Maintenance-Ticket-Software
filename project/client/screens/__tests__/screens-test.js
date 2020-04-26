//mocha -r esm binding-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import LoginPage from '../LoginPage';
import ProfileScreen from '../ProfileScreen';
import CreateTicketScreen from '../CreateTicketScreen';
import DetailedTicketPage from '../DetailedTicketPage';
import PropertyScreen from '../PropertyScreen';
import SignUpPage from '../SignUpPage';
//import TicketScreen from '../TicketScreen';

// jest --verbose --coverage "screens-test.js"

describe("Screen Tests", function() {
    //this.timeout(15000)
    describe('Rendering tests',function() { 
        it('LoginPage rendering', function(){
            const tree = renderer.create(<LoginPage />)
            expect(tree).toMatchSnapshot();
        })
        it('ProfileScreen rendering', function(){
            const tree = renderer.create(<ProfileScreen />)
            expect(tree).toMatchSnapshot();
        })
        it('CreateTicketScreen rendering', function(){
            const tree = renderer.create(<CreateTicketScreen />)
            expect(tree).toMatchSnapshot();
        })
        it('DetailedTicketPage rendering', function(){
            const tree = renderer.create(<DetailedTicketPage />)
            expect(tree).toMatchSnapshot();
        })
        it('PropertyScreen rendering', function(){
            const tree = renderer.create(<PropertyScreen />)
            expect(tree).toMatchSnapshot();
        })
        it('SignUpPage rendering', function(){
            const tree = renderer.create(<SignUpPage />)
            expect(tree).toMatchSnapshot();
        })
      /*  it.skip('TicketScreen rendering', function(){
            const tree = renderer.create(<TicketScreen />)
            expect(tree).toMatchSnapshot();
        })*/
    })

    describe('SignUpPage',function() { 
        it.skip("Future Developement", function(){
            
        })
        
    })
})





