import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import TicketScreen from '../screens/TicketScreen';
import UserScreen from '../screens/UserScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ColorScheme } from '../stores';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Profile';

export default function BottomTabNavigator({ navigation, route }) {
  const colorScheme = new ColorScheme();
  let themeTabBar =
    colorScheme.theme === 'light' ? Colors.iosLightBar : Colors.iosDarkBar;
  let themeTabBarBorder =
    colorScheme.theme === 'light' ? Colors.iosLightBorder : Colors.iosDarkBorder;
  let themeInactiveLabel =
    colorScheme.theme === 'light' ? Colors.iosLightIcon : Colors.iosDarkIcon;
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{
        inactiveTintColor: themeInactiveLabel,
        activeBackgroundColor: themeTabBar,
        inactiveBackgroundColor: themeTabBar,
        style: {borderTopColor: themeTabBarBorder}
      }} >
      <BottomTab.Screen
        name="Tickets"
        component={TicketScreen}
        options={{
          title: 'Tickets',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
          name={Platform.OS === 'ios' ? "ios-filing" : "md-filing" } />,
        }}
      />
      <BottomTab.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: 'New Ticket',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
          name={Platform.OS === 'ios' ? "ios-add-circle" : "md-add-circle"} />,
        }}
      />
        <BottomTab.Screen
          name="Profile"
          component={UserScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
            name={Platform.OS === 'ios' ? "ios-person" : "md-person"} />,
          }}
          />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Tickets':
      return 'Tickets';
    case 'CreateTicket':
      return 'New Ticket';
    case 'Profile':
      return 'My Profile';
    case 'Login':
      return 'Login';
  }
}
