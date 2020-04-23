import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorScheme, ticketStore, userStore } from '../stores';
import Colors from '../constants/Colors';
import * as CONSTANTS from '../constants/Reference';

import Ticket from '../data/Ticket2';

export default function TicketScreen({ navigation }) {
//  if (!userStore.loggedIn) navigation.replace('Root');

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


  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  let testTicket = {
    ticket_number: 1234,
    timestamp: 202004220730,
    status: CONSTANTS.STATUS.OPEN,
    location: CONSTANTS.PROPERTY.WSP,
    unit_number: '1703',
    email: 'i.am@home.ru',
    emergency: false,
    ticket_issue_title: 'Leaky faucet',
    ticket_issue: 'Bathroom faucet closest to door is constantly dripping, about 1 drop every 5 seconds.',
    ticket_updates: [{
      timestamp: 202004220830,
      email: 'kyle@CastlebergCommunities.com',
      details: 'Gasket rotted.  New gasket ordered.  Should arrive 2 days, will replace then.',
    },],

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
