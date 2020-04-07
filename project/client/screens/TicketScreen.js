import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

const TICKETS = [
  { id: 1, title: 'Test Ticket', description: 'Yeet', },
  { id: 2, title: 'Anotha One', description: 'DJ Khaled' },
  { id: 3, title: 'Do Not Click', description: 'Click me' },
  { id: 4, title: 'Kachow', description: 'Gotta go fast' }
];

export default function TicketScreen() {
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
    <SafeAreaView style={styles.container}>
      <FlatList data={TICKETS}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          description={item.description}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selected}
    />
    </SafeAreaView>
  );
}

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#c7c7cc' : '#fff' },
      ]}
    >
      <Text style={styles.bodyText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  largeTitle: {
     marginTop: 8,
     marginBottom: 8,
     fontSize: 34,
     color: 'black',
     textAlign: 'center',
   },
   bodyText: {
     fontSize: 17,
     color: 'black',
     textAlign: 'left',
  },
  item: {
    padding: 20,
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 1,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
});
