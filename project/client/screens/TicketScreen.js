import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header, TextComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorScheme, ticketStore, userStore } from '../stores';
import Colors from '../constants/Colors';
import * as CONSTANTS from '../constants/Reference';

import User from '../data/User';
import Ticket from '../data/Ticket';

export default function TicketScreen({ navigation }) {
  // if (!userStore.loggedIn) navigation.replace('Root');

  let themeContainer =
    colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
  let themeLargeTitle =
    colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
  let themeBodyText =
    colorScheme.theme === 'light' ? styles.lightBodyText : styles.darkBodyText;
  let themeItem =
    colorScheme.theme === 'light' ? Colors.white : Colors.iosDarkTable;
  let themeSeparator =
    colorScheme.theme === 'light' ? Colors.iosLightSeparator : Colors.iosDarkSeparator;

  let testTicket = {
    id: ticketStore.id,
    email: ticketStore.email,
    aptComplex: ticketStore.aptComplex,
    unit: ticketStore.unit,
    issue: ticketStore.issue,
    emergency: ticketStore.emergency,
    resolvedTime: ticketStore.resolvedTime,
    progress: ticketStore.progress,
    closed: ticketStore.closed,
  };

  return (
    <View style={styles.container, themeContainer}>
      <ScrollView>
        <View>
          <Ticket {...testTicket}/>
        </View>
      </ScrollView>
    </View>
  );
}


function Item({ id, title, selected, onSelect, itemTheme, bodyTheme }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailedView')}
      style={[
        styles.item,
        { backgroundColor: selected ? Colors.iosSystemGray : itemTheme },
      ]}
    >
      <Text style={bodyTheme}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightLargeTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 34,
    color: Colors.black,
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 8,
   marginBottom: 8,
   fontSize: 34,
   color: Colors.white,
   textAlign: 'center',
},
  lightBodyText: {
     fontSize: 17,
     color: Colors.black,
     textAlign: 'left',
  },
  darkBodyText: {
    fontSize: 17,
    color: Colors.white,
    textAlign: 'left',
 },
  item: {
    padding: 15,
    borderBottomColor: Colors.iosDarkSeparator,
    borderBottomWidth: 0.5,
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
});
