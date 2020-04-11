import * as React from 'react';
import * as JestNative from '@testing-library/jest-native';
import renderer from 'react-test-renderer';
import { getByPlaceholderText } from '@testing-library/react-native';
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

//describe(`placeholder tests, defaults`)
const { getByPlaceholderText } = render(<Ticket />);
let testedElement = getByPlaceholderText('99999');
test('has the placeholder ticket_number', () => {
    expect(testedElement).toBeEnabled;
});

testedElement = getByPlaceholderText(CONSTANTS.STATUS.OPEN);
test('has the placeholder status', () => {
    expect(testedElement).toBeEnabled;
});

testedElement = getByPlaceholderText(CONSTANTS.PROPERTY.WSP);
test('has the placeholder location', () => {
    expect(testedElement).toBeEnabled;
});