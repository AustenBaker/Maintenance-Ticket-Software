import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import TicketScreen from '../screens/TicketScreen';
import UserScreen from '../screens/UserScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Tickets"
        component={TicketScreen}
        options={{
          title: 'Tickets',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-filing" />,
        }}
      />
      <BottomTab.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: 'Create Ticket',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add-circle" />,
        }}
      />
        <BottomTab.Screen
          name="Profile"
          component={UserScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-person" />,
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
      return 'Create Ticket';
    case 'Profile':
      return 'My Profile';
    case 'Login':
      return 'Login';
  }
}
