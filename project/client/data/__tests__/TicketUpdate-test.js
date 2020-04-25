import * as React from 'react';
import { Text, TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { fireEvent, render, wait, getByPlaceholderText, getByDisplayValue, getByRole, getByLabelText, getByTestId, getByTitle, getByText } from '@testing-library/react-native';
import * as JestNative from '@testing-library/jest-native';
import * as CONSTANTS from '../../constants/Reference';
import Ticket from '../Ticket';
import TicketUpdate from '../TicketUpdate';
import { userStore, ticketStore, colorScheme } from '../../stores/index';


expect.extend({...JestNative});

jest.disableAutomock();

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

describe(`TicketUpdate`, () => {
    jest.useFakeTimers();

    beforeEach(() => {
      // TODO: test setup
    });

    afterEach(() => {
      // TODO: test cleanup
    });


    it(`renders the ticket update`, () => {
      const tree = renderer.create(<TicketUpdate timestamp={0}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`renders the ticket update creation screen`, () => {
      const tree = renderer.create(<TicketUpdate edit_mode timestamp={0}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
