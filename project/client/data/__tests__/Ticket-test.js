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
test('renders displayTicketDetails( ) correctly', () => {
  const tree = renderer.create(<Ticket />).toJSON();
  expect(tree).toMatchSnapshot();
});

//renders ticket edit screen DOESNT UPDATE CODE COVERAGE
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

test('Submit Ticket Update Button, should change ticket_view_mode to 0', () => {
  let tempMock = jest.fn()
  let component = renderer.create(
    <Ticket 
      idkgit={tempMock}
    />
  );
});

//this doesnt change code coverage
test('check ticket data', () => {
  const ticket = {
    ticket_number: 99999,
    unit_number: 316,
    ticket_view_mode: 0,
  };

  expect(ticket).toMatchSnapshot({
    ticket_number: expect.any(Number),
    unit_number: expect.any(Number),
    ticket_view_mode: expect.any(Number),
  });  
});

