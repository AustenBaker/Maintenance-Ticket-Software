//mocha -r esm binding-test.js
import * as React from 'react';
import renderer from 'react-test-renderer';
import BottomTabNavigator from '../BottomTabNavigator';
import useLinking from '../useLinking';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// jest --verbose --coverage "navigation-test.js"

describe("Navigation", function() {
    //this.timeout(15000)
    /*it.skip('BottomTabNavigator rendering', function(){
        const tree = renderer.create(<BottomTabNavigator { ...{} , '/testing' } />)
        expect(tree).toMatchSnapshot();
    })*/
    it.skip('useLinking', async function(){
        const containerRef = React.useRef();
        const { getInitialState } = useLinking(containerRef);
        console.log(getInitialState)
        expect(res.config.Root.path).equal('test');
    })
})





