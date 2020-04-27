import * as React from 'react';
import { FormInput, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { fireEvent, render, wait, getByPlaceholderText, getByDisplayValue, getByRole, getByLabelText, getByTestId, getByTitle, getByText } from '@testing-library/react-native';
import * as JestNative from '@testing-library/jest-native';
import * as CONSTANTS from '../../constants/Reference';

import User from '../User';
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
      number: '1703',
      property: CONSTANTS.PROPERTY.WSP,
    }],
    email: 'pick@peck.com',
    phone: '123-456-7890',
    contactPreference: CONSTANTS.PREFERRED_CONTACT.EMAIL,
    entryPermission: CONSTANTS.ENTRY_PERMISSION.ACC,
    type: CONSTANTS.USER_TYPE.RES,
    note: "Kids will be at home with sitter.",
    edit_mode: false,
    tickets: [],
    activate: true
  },
  {
    username: "dev",
    first: "Red",
    last: "Rover",
    units: [{
      number: '1703',
      property: CONSTANTS.PROPERTY.WSP,
    }],
    email: 'ima@yahoo.com',
    phone: '123-456-7890',
    contactPreference: CONSTANTS.PREFERRED_CONTACT.TXT,
    entryPermission: CONSTANTS.ENTRY_PERMISSION.NOT,
    type: CONSTANTS.USER_TYPE.MNT,
    note: "The dog that doesn't bark will bite.",
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

    it(`renders the first test user correctly`, () => {
      const tree = renderer.create(<User {...SAMPLE_USER[1]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe(`created with default values`, () => {
      const { getByTestId, getByTitle, getByText, baseElement } = render(<User />);

      let testElement = null;
      test(`renders User name`, () => {
        testElement = getByTestId(`user-name`);
        expect(testElement).toBeEnabled();
      });

      test(`renders User first name`, () => {
        testElement = getByTestId(`user-first`);
        expect(testElement).toBeEnabled();
      });

      test(`renders User last name`, () => {
        testElement = getByTestId(`user-last`);
        expect(testElement).toBeEnabled();
      });

      test(`renders User email`, () => {
        testElement = getByTestId(`user-email`);
        expect(testElement).toBeEnabled();
      });

      // TODO: Figure out how to test to verify
      // this item is _not_ displayed without
      // crashing the test -.-
      test(`renders User phone number`, () => {
        testElement = getByTestId(`user-phone`);
        expect(testElement).toBeEnabled();
      });

      // TODO: Figure out how to test this in a
      // way that doesn't break the test
      // test(`does not render User contact preferences`, () => {
      //   testElement = getByText(/\*/);
      //   expect(testElement).toBeUndefined();
      // });

      test(`renders User entry permissions`, () => {
        testElement = getByTestId(`user-entry`);
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out a method to test this
      // that doesn't break the test
      test.skip(`does not render User note`, () => {
        testElement = getByTestId(`user-note`);
        expect(testElement).toBeUndefined();
      });

      test(`renders Edit Button`, () => {
        testElement = getByTestId(`edit-button`);
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
      let testElement = null;
      test(`has the placeholder first name`, () => {
        testElement = getByPlaceholderText(`First Name`);
        expect(testElement).toBeEnabled();
      });

      test(`has the placeholder last name`, () => {
        testElement = getByPlaceholderText(`Last Name`);
        expect(testElement).toBeEnabled();
      });

      test(`has the placeholder email address`, () => {
        testElement = getByPlaceholderText(`your.email@server.com`);
        expect(testElement).toBeEnabled();
      });

      test(`has the default phone number`, () => {
        testElement = getByPlaceholderText(`###-###-####`);
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out why this test is not working
      // the RCTPicker is not rendering the testId in
      // the render()???
      test.skip(`has the default contact preference`, () => {
        testElement = getByTestId(`user-contact`);
        expect(testElement).toBeEnabled();
      });

      test.skip(`has the default entry permission`, () => {
        testElement = getByTestId(`user-entry-w`);
        expect(testElement).toBeEnabled();
      });

      // TODO: figure out how to test this value
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      test.skip(`has the default user type`, () => {
        testElement = getByPlaceholderText(CONSTANTS.USER_TYPE.RES);
        expect(testElement).toBeEnabled();
      });

      // TODO: why is this also having problems?
      // it shows up in the snapshot, and the error
      // message, so what is going on?
      test(`has the default user note`, () => {
        testElement = getByPlaceholderText(`Enter note here.`);
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
