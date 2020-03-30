import * as React from 'react';
import { FormInput, Text } from 'react-native';
import renderer from 'react-test-renderer';

import User from '../User';

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
}));

describe('User', () => {
    jest.useFakeTimers();
  
    beforeEach(() => {
      
    });
  
    it(`renders the user screen`, () => {
      const tree = renderer.create(<User />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it(`renders the user profile editing screen`, () => {
      const tree = renderer.create(<User edit_mode="true" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
