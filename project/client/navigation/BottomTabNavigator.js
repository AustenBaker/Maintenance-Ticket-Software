import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import TicketScreen from '../screens/TicketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import PropertyScreen from '../screens/PropertyScreen';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorScheme } from '../stores';
import Colors from '../constants/Colors';
import { checkLoginStatus } from '../fetch/user';
import { userStore } from '../stores';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Tickets';

export default function BottomTabNavigator({ navigation, route }) {
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

  // Checks for login status
  React.useEffect(() => {
    (async () => {
      const data = await checkLoginStatus();
      if (!data.loggedIn) navigation.replace('Root');

      // Sets userStore

      const { username, first, last, units, email, phone,
        contactPreference, entryPermission, type, note,
        tickets, activate } = data;

      userStore.loggedIn = true;
      userStore.username = username;
      userStore.first = first;
      userStore.last = last;
      userStore.units = units;
      userStore.email = email;
      userStore.phone = phone;
      userStore.contactPreference = contactPreference;
      userStore.entryPermission = entryPermission;
      userStore.type = type;
      userStore.note = note;
      userStore.tickets = tickets;
      userStore.activate = activate;
    })();
  }, []);

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
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
            name={Platform.OS === 'ios' ? "ios-person" : "md-person"} />,
          }}
          />
          <BottomTab.Screen
          name="Property"
          component={PropertyScreen}
          options={{
            title: 'Property',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
            name={Platform.OS === 'ios' ? "ios-business" : "md-business"} />,
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
    case 'Property':
      return 'Property';
  }
}
