import * as React from 'react';
import * as JestNative from '@testing-library/jest-native';
import renderer from 'react-test-renderer';
import { getByPlaceholderText, render, getByTestId } from '@testing-library/react-native';
import Ticket from '../Ticket';
import * as CONSTANTS from '../../constants/Reference';

expect.extend({...JestNative})

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

//renders ticket screen
test('renders display view correctly', () => {
    const tree = renderer.create(<Ticket />).toJSON();
    expect(tree).toMatchSnapshot();
});

//renders ticket edit screen
test('renders ticket edit view correctly', () => {
    const tree = renderer.create(<Ticket ticket_edit_mode />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe(`The following are enabled from user perspective: `, () => {
  const { getByTestId } = render(<Ticket />);
  test('ticket_number', () => {
    expect(getByTestId(`ticket_number`)).toBeEnabled();
  });

  test('unit_number', () => {
    expect(getByTestId(`unit_number`)).toBeEnabled();
  });

  test('status', () => {
    expect(getByTestId(`status`)).toBeEnabled();
  });

  test('location', () => {
    expect(getByTestId(`location`)).toBeEnabled();
  });

  test('timestamp', () => {
    expect(getByTestId(`timestamp`)).toBeEnabled();
  });


});
