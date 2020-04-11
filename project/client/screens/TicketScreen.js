import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ColorScheme } from '../stores';
import Colors from '../constants/Colors'

const colorScheme = new ColorScheme();

const TICKETS = [
  { id: '1', title: 'Test Ticket', description: 'Yeet', },
  { id: '2', title: 'Anotha One', description: 'DJ Khaled' },
  { id: '3', title: 'Do Not Click', description: 'Click me' },
  { id: '4', title: 'Kachow', description: 'Gotta go fast' }
];

export default function TicketScreen({ navigation }) {
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

  return (
    <SafeAreaView style={styles.container, themeContainer}>
      <FlatList data={TICKETS}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          description={item.description}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
          itemTheme={themeItem}
          bodyTheme={themeBodyText}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selected}
    />
    </SafeAreaView>
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
