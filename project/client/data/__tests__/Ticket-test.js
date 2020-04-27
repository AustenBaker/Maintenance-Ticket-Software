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
test('renders editTicket() view correctly', () => {
  const ticket_view_mode = 1;
  const tree = renderer.create(<Ticket ticket_view_mode={ticket_view_mode}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders ticketList() view correctly', () => {
  const ticket_view_mode = 2;
  const tree = renderer.create(<Ticket ticket_view_mode={ticket_view_mode}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe(`The following are enabled from user perspective: `, () => {
  const { getByTestId } = render(<Ticket />);
  test('ticket_number', () => {
    expect(getByTestId(`ticket_number`)).toBeEnabled();
  });

  test.skip('unit_number', () => {
    expect(getByTestId(`unit_number`)).toBeEnabled();
  });

  test('status', () => {
    expect(getByTestId(`status`)).toBeEnabled();
  });

  test.skip('timestamp', () => {
    expect(getByTestId(`timestamp`)).toBeEnabled();
  });

  test.skip('location', () => {
    expect(getByTestId(`location`)).toBeEnabled();
  });


  //add things
});
