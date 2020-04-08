import * as React from 'react';
import { FormInput, Text } from 'react-native';
import renderer from 'react-test-renderer';

import User from '../User';

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
      const tree = renderer.create(<User edit_mode="true" />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe(`created with default values`, () => {
      const tree = renderer.create(<User />).toJSON();
      test(`has the default first name`, () => {
        expect(tree.props).toHaveProperty(first_name, `FirstName`);
      });

      test(`has the default last name`, () => {
        expect(tree.props).toHaveProperty(last_name, `LastName`);
      });

      test(`has the default unit assigned`, () => {
        expect(tree.props).toHaveProperty(units);
        expect(tree.props.units).arrayContaining([`1703`]);
        expect(tree.props.units).toHaveLength(1);
      });

      test(`has the default email address`, () => {
        expect(tree.props).toHaveProperty(email, `default@CastlebergCommunities.com`);
      });

      test(`has the default phone number`, () => {
        expect(tree.props).toHaveProperty(phone, `000-000-0000`);
      });

      test(`has the default contact preference`, () => {
        expect(tree.props).toHaveProperty(contact, `email`);
      });

      test(`has the default entry permission`, () => {
        expect(tree.props).toHaveProperty(entry_permission, `accompanied`);
      });

      test(`has the default user type`, () => {
        expect(tree.props).toHaveProperty(user_type, `resident`);
      });

      test(`has the default note`, () => {
        expect(tree.props).toHaveProperty(edit_mode,``);
      });

      test(`has the default edit mode`, () => {
        expect(tree.props).toHaveProperty(edit_mode, `false`);
      });

      test(`has no tickets`, () => {
        expect(tree.props).toHaveProperty(tickets);
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
