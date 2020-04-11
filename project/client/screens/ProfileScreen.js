import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { ColorScheme } from '../stores';
import Colors from '../constants/Colors'

import { MonoText } from '../components/StyledText';
import User from '../data/User';

const colorScheme = new ColorScheme();

export default function ProfileScreen() {

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

  // TODO: add in code that checks for active user session,
  // redirects to login if no active session found,
  // attempts to load user data into properties if found,
  // loads account creation page if referred to account creation
  var properties = {};
  return (
    <View style={styles.container, themeContainer}>
      <ScrollView>
        <View>
          <User {...properties}/>
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
