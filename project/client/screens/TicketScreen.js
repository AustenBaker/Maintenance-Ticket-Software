import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ColorScheme } from '../stores';

const colorScheme = new ColorScheme();

const TICKETS = [
  { id: '1', title: 'Test Ticket', description: 'Yeet', },
  { id: '2', title: 'Anotha One', description: 'DJ Khaled' },
  { id: '3', title: 'Do Not Click', description: 'Click me' },
  { id: '4', title: 'Kachow', description: 'Gotta go fast' }
];

export default function TicketScreen() {
  let themeContainer =
    colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
  let themeLargeTitle =
    colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
  let themeBodyText =
    colorScheme.theme === 'light' ? styles.lightBodyText : styles.darkBodyText;
  let themeItem =
    colorScheme.theme === 'light' ? '#FFF' : '#1C1C1E';


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
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#8E8E93' : itemTheme },
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
    color: '#000',
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 8,
   marginBottom: 8,
   fontSize: 34,
   color: '#fff',
   textAlign: 'center',
},
   lightBodyText: {
     fontSize: 17,
     color: '#000',
     textAlign: 'left',
  },
  darkBodyText: {
    fontSize: 17,
    color: '#FFF',
    textAlign: 'left',
 },
  item: {
    padding: 15,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 0.5,
  },
  iosLightContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  iosLightThemeText: {
    color: '#000'
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  iosDarkThemeText: {
    color: '#F2F2F7'
  },
});
