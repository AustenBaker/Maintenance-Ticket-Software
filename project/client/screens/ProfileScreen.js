import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { userStore, colorScheme } from '../stores';
import Colors from '../constants/Colors'

import { MonoText } from '../components/StyledText';
import User from '../data/User';

export default function ProfileScreen(properties) {

  // if (!userStore.loggedIn) properties.navigation.replace('Root');

  let themeContainer =
    colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
  let themeLargeTitle =
    colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
  let themeBodyText =
    colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;
  let themeItem =
    colorScheme.theme === 'light' ? Colors.white : Colors.iosDarkTable;
  let themeSeparator =
    colorScheme.theme === 'light' ? Colors.iosLightSeparator : Colors.iosDarkSeparator;

  // TODO: Check for valid session and then load user values
  // from UserStore if it exists and if session is valid
  // otherwise redirect to login page


  //correct use of states
  let testUser = {
    first: userStore.first,
    last: userStore.last,
    email: userStore.email,
    phone: userStore.phone + '',
    contactPreference: userStore.contactPreference,
    entryPermission: userStore.entryPermission,
    note: userStore.note || '',
    units: userStore.units,
    tickets: userStore.tickets,
  };
  console.log(testUser);
  return (
    <View style={styles.container, themeContainer}>
      <ScrollView>
        <View>
          <User {...testUser}/>
        </View>
      </ScrollView>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosLightContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iosLightThemeText: {
    color: Colors.black
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  iosDarkThemeText: {
    color: Colors.white
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  navigationFilename: {
    marginTop: 5,
  },
});
