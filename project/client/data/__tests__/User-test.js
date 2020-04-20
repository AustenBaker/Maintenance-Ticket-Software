import * as React from 'react';
import { FormInput, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { fireEvent, render, wait, getByPlaceholderText, getByDisplayValue, getByRole, getByLabelText, getByTestId, getByTitle, getByText } from '@testing-library/react-native';
import * as JestNative from '@testing-library/jest-native';
import * as CONSTANTS from '../../constants/Reference';

import User from '../UserTwo';
import { TextInput } from 'react-native-gesture-handler';

expect.extend({...JestNative});

jest.disableAutomock();

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

const SAMPLE_USER = [{
    username: "frontend",
    first: "Peter",
    last: "Piper",
    units: [{
      property: CONSTANTS.PROPERTY.WSP,
      number: '1703'
    }],
    email: 'pick@peck.com',
    phone: '123-456-7890',
    contactPreference: CONSTANTS.PREFERRED_CONTACT.EMAIL,
    entryPermission: CONSTANTS.ENTRY_PERMISSION.ACC,
    type: CONSTANTS.USER_TYPE.RES,
    note: "",
    edit_mode: false,
    tickets: [],
    activate: true
  },
  {
    username: "dev",
    first: "Red",
    last: "Rover",
    units: [{
      property: CONSTANTS.PROPERTY.WSP,
      number: '1703'
    }],
    email: 'ima@yahoo.com',
    phone: '123-456-7890',
    contactPreference: CONSTANTS.PREFERRED_CONTACT.TXT,
    entryPermission: CONSTANTS.ENTRY_PERMISSION.NOT,
    type: CONSTANTS.USER_TYPE.MNT,
    note: "",
    edit_mode: false,
    tickets: [],
    activate: true
  },
  {
    username: "mgt",
    first: "Harry",
    last: "Chin",
    units: [],
    email: "ineed@shave.com",
    phone: "0987-654-321",
    contactPreference: CONSTANTS.PREFERRED_CONTACT.TXT,
    entryPermission: CONSTANTS.ENTRY_PERMISSION.ANY,
    type: CONSTANTS.USER_TYPE.MGMT,
    note: "",
    edit_mode: false,
    tickets: [],
    activate: true
  }
];

const SAMPLE_USER_PWD = [
  "12345678",
  "S0m3Secur3P@$$w0rd",
  "management"
];


describe(`User`, () => {
    jest.useFakeTimers();

    beforeEach(() => {
      // TODO: test setup
    });

    afterEach(() => {
      // TODO: test cleanup
    });


    it(`renders the user screen`, () => {
      const tree = renderer.create(<User />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`renders the user profile editing screen`, () => {
      const tree = renderer.create(<User edit_mode />).toJSON();
      expect(tree).toMatchSnapshot();
    });


    describe(`created with default values`, () => {
      const { getByTestId, getByTitle, getByText, baseElement } = render(<User />);

      let testElement = getByTestId(`user-name`);
      test(`renders User name`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByTestId(`user-first`);
      test(`renders User first name`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByTestId(`user-last`);
      test(`renders User last name`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByTestId(`user-email`);
      test(`renders User email`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: Figure out how to test to verify
      // this item is _not_ displayed without
      // crashing the test -.-
      // testElement = getByTestId(`user-phone`);
      test.skip(`does not render User phone number`, () => {
        expect(testElement).toBeUndefined();
      });

      // TODO: Figure out how to test this in a
      // way that doesn't break the test
      // testElement = getByText(/\*/);
      test.skip(`does not render User contact preferences`, () => {
        expect(testElement).toBeUndefined();
      });

      testElement = getByTestId(`user-entry`);
      test(`renders User entry permissions`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out a method to test this
      // that doesn't break the test
      // testElement = getByTestId(`user-note`);
      test.skip(`does not render User note`, () => {
        expect(testElement).toBeUndefined();
      });

      testElement = getByTestId(`edit-button`);
      test(`renders Edit Button`, () => {
        expect(testElement).toBeEnabled();
      });

      /**
      test(``, () => {
        expect(testElement).toBeEnabled();
      });
       */
    });

    // TODO: figure out how to implement query selectors to find
    // relevant properties & values for validation tests
    describe(`created with default values in edit_mode`, () => {
      const { getByPlaceholderText, getByTestId, getByTitle, getByText, baseElement } = render(<User edit_mode/>);
      let testElement = getByPlaceholderText(`First Name`);
      test(`has the placeholder first name`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByPlaceholderText(`Last Name`);
      test(`has the placeholder last name`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out how to test units assigned
      // this way won't work
      test.skip(`has the placeholder unit assigned`, () => {
        expect(testElement).toHaveProperty(units);
        expect(testElement.props.units).arrayContaining([`1703`]);
        expect(testElement.props.units).toHaveLength(1);
      });

      testElement = getByPlaceholderText(`default@CastlebergCommunities.com`);
      test(`has the placeholder email address`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByPlaceholderText(`000-000-0000`);
      test(`has the default phone number`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out why this test is not working
      // the RCTPicker is not rendering the testId in
      // the render()???
      // testElement = getByTestId(`user-contact`);
      test.skip(`has the default contact preference`, () => {
        expect(testElement).toBeEnabled();
      });

      // testElement = getByTestId(`user-entry-w`);
      test.skip(`has the default entry permission`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out how to test this value
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      // testElement = getByPlaceholderText(CONSTANTS.USER_TYPE.RES);
      test.skip(`has the default user type`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: why is this also having problems?
      // it shows up in the snapshot, and the error
      // message, so what is going on?
      // testElement = getByTestId(`edit-note`);
      test.skip(`has the default user note`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out how to test this
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      test.skip(`has no tickets`, () => {
        // expect(tree.props).toHaveProperty(tickets);
        expect(tree.props.tickets).toBeUndefined();
      });

      testElement = getByTestId(`update-button`);
      test(`has an Update Button`, () => {
        expect(testElement).toBeEnabled();
      });

      // TODO: Figure out why getBy are throwing declaration exceptions instead of
      // returning 'undefined' when target is not found
      // testElement = getByTestId(`create-button`);
      // test(`does not have a Create Account Button`, () => {
      //   expect(testElement).toBeUndefined();
      // });

      testElement = getByTestId(`reset-button`);
      test(`has a Reset Button`, () => {
        expect(testElement).toBeEnabled();
      });

      testElement = getByTestId(`cancel-button`);
      test(`has a Cancel Button`, () => {
        expect(testElement).toBeEnabled();
      });

    });

    /**
    it(``, () => {
      // TODO: Add more tests
    });

    it(``, () => {
      // TODO: Add more tests
    });
     */
  });
