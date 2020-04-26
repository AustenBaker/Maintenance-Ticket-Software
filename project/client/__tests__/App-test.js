import * as React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../navigation/BottomTabNavigator', () => 'BottomTabNavigator');

describe('App', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it.skip(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
