import * as React from 'react';
import * as JestNative from '@testing-library/jest-native';
import renderer from 'react-test-renderer';
import Ticket from '../Ticket';

expect.extend({...JestNative})

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

//renders ticket screen
test('renders correctly', () => {
    const tree = renderer.create(<Ticket />).toJSON();
    expect(tree).toMatchSnapshot();
});

//renders ticket edit screen
test('renders ticket edit screen correctly', () => {
    const tree = renderer.create(<Ticket ticket_edit_mode />).toJSON();
    expect(tree).toMatchSnapshot();
});