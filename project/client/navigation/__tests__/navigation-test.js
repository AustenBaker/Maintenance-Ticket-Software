//mocha -r esm binding-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import BottomTabNavigator from '../BottomTabNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import useLinking from '../useLinking'

// jest --verbose --coverage "navigation-test.js"

describe("Navigation", function() {
    //this.timeout(15000)
    it.skip('BottomTabNavigator rendering', function(){
        const tree = renderer.create(<BottomTabNavigator { ...{} , '/testing' } />)
        expect(tree).toMatchSnapshot();
    })
    /*it.skip('useLinking', function(){
        console.log(useLinking)
        expect(useLinking.config.Root.path).equal('test');
    })*/
})





