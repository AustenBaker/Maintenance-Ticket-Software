import * as React from 'react';
import { FormInput, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { fireEvent, render, wait, getByPlaceholderText, getByDisplayValue } from '@testing-library/react-native';
import * as JestNative from '@testing-library/jest-native';
import * as CONSTANTS from '../../constants/Reference';

import User from '../User';
import { TextInput } from 'react-native-gesture-handler';

expect.extend({...JestNative});

jest.disableAutomock();

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

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


    // TODO: figure out how to implement query selectors to find
    // relevant properties & values for validation tests
    describe(`created with default values`, () => {
      const { getByPlaceholderText, getByTestId, getByDisplayValue, baseElement } = render(<User />);
      let testElement = getByPlaceholderText(`First Name`);
      test(`has the placeholder first name`, () => {
        expect(testElement).toBeEnabled;
      });

      testElement = getByPlaceholderText(`Last Name`);
      test(`has the placeholder last name`, () => {
        expect(testElement).toBeEnabled;
      });

      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      // testElement = getByPlaceholderText("1703");
      test.skip(`has the placeholder unit assigned`, () => {
        expect(testElement).toHaveProperty(units);
        expect(testElement.props.units).arrayContaining([`1703`]);
        expect(testElement.props.units).toHaveLength(1);
      });

      testElement = getByPlaceholderText(`default@CastlebergCommunities.com`);
      test(`has the placeholder email address`, () => {
        expect(testElement).toBeEnabled;
      });

      testElement = getByPlaceholderText(`000-000-0000`);
      test(`has the placeholder phone number`, () => {
        expect(testElement).toBeEnabled;
      });

      // TODO: figure out why this test is not working
      testElement = getByDisplayValue(CONSTANTS.PREFERRED_CONTACT.EMAIL);
      test(`has the default contact preference`, () => {
        expect(testElement).toBeEnabled;
      });

      testElement = getByDisplayValue(CONSTANTS.ENTRY_PERMISSION.ACC);
      test(`has the default entry permission`, () => {
        expect(testElement).toBeEnabled;
      });

      // TODO: figure out how to test this value
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      // testElement = getByPlaceholderText(CONSTANTS.USER_TYPE.RES);
      test.skip(`has the default user type`, () => {
        expect(testElement).toBeEnabled;
      });

      testElement = getByTestId(`note-edit`);
      test(`has the default note`, () => {
        expect(testElement).toBeEnabled;
      });

      // TODO: figure out how to test this properly
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      test.skip(`has the default edit mode`, () => {
        expect(tree.props).toHaveProperty(edit_mode, false);
      });

      // TODO: figure out how to test this
      // this isn't rendered and can't be tested this way
      // need an accessor somehow....
      test.skip(`has no tickets`, () => {
        // expect(tree.props).toHaveProperty(tickets);
        expect(tree.props.tickets).toBeUndefined();
      });

    });

    it(``, () => {
      // TODO: Add more tests
    });

    it(``, () => {
      // TODO: Add more tests
    });

  });
