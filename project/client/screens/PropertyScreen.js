import * as React from 'react';
import { TextInput, Button, Dropdown } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Header } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorScheme } from '../stores';
import Colors from '../constants/Colors';
import {Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider} from "react-native-popup-menu";

export default function PropertyScreen({navigation}) {
  const [addUnit, onChangeAddUnit] = React.useState('');
  const [addResidentToUnit, onChangeAddResident] = React.useState('');
  const [addPropertyName, onChangeAddPropertyName] = React.useState('');
  const [addPropertyStreetAddress, onChangeAddPropertyStreetAddress] = React.useState('');
  const [addPropertyZipcode, onChangeAddPropertyZipcode] = React.useState('');
  const [addCity, onChangeAddCity] = React.useState('');
  const [inputUnit, onChangeInputUnit] = React.useState('');

  let themeKeyboard =
    colorScheme.theme === 'light' ? 'light' : 'dark';
  let theme =
    colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
  let themeTitle =
    colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
  let themeBodyText =
    colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
  let themeSeparator =
    colorScheme.theme === 'light' ? Colors.iosLightSeparator : Colors.iosDarkSeparator;
/**
 * Need to do: make sure only maintenance and manager can access the appropriate settings
 * Need to do: tie in backend functionality
 * Need to do: test
 * For the menu provider those are dummy values, it should be connected to the backend so it pulls the available residents 
 * per unit so that the user can choose.
 */
    return(
      <AppearanceProvider>
          <SafeAreaView style={styles.container, theme}>
          <Text style={themeTitle}>Property/Unit Management Page</Text>

          <TextInput
          placeholder="Add Unit Number"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText} 
          onChangeAddUnit={text => onChangeAddUnit(text)}
          value = {addUnit}
          /> 
         <TextInput
          placeholder="Add Resident to Unit"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeAddResident={text => onChangeAddResident(text)}
          value = {addResidentToUnit}
          /> 

        <Button
        onPress={() => navigation.replace('Add') }
        style={themeBodyText}
        title="Add"
        accessibilityLabel="Add to Unit"
        />

        <Text style={themeTitle}>Add Property</Text>

        <TextInput
          placeholder="Property Name"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeAddPropertyName={text => onChangeAddPropertyName(text)}
          value = {addPropertyName}
          /> 
        <TextInput
          placeholder="Street Address"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeAddPropertyStreetAddress={text => onChangeAddPropertyStreetAddress(text)}
          value = {addPropertyStreetAddress}
          /> 
        <TextInput
          placeholder="City"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeAddCity={text => onChangeAddCity(text)}
          value = {addCity}
          /> 
        <TextInput
          placeholder="Zipcode"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeAddPropertyZipcode={text => onChangeAddPropertyZipcode(text)}
          value = {addPropertyZipcode}
          />
        <Button
        onPress={() => navigation.replace('Add') }
        style={themeBodyText}
        title="Add Property"
        accessibilityLabel="Add Property"
        />
        <TextInput
          placeholder="Enter the Unit (in all lowercase)"
          autoCapitalize="none"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeBodyText}      
          onChangeInputUnit={text => onChangeInputUnit(text)}
          value = {inputUnit}
        />       
        <MenuProvider>
            <MenuOptions>
            <MenuTrigger>
                <Text style = {styles.headerText}>to Resident (if there's a new resident make sure you add them first)</Text>
            </MenuTrigger>
            <MenuOption value = {"Rachel"}>
                    <Text style={styles.menuContent}>Rachel</Text>
                </MenuOption>
                <MenuOption value = {"Jerry"}>
                    <Text style={styles.menuContent}>Jerry</Text>
                </MenuOption>
            </MenuOptions>
        </MenuProvider>
          </SafeAreaView>
      </AppearanceProvider>
    );
}

function updateProperty(addUnit, addResidentToUnit) {
    fetch('http://127.0.0.1:3001/property/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addUnit: addUnit, addResidentToUnit: addResidentToUnit })
    }).then(res => res.json()).then(data => {
        
    }).catch(err => {
        // error code is err.error...update not successful
    })
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
  headerText: {
      fontSize : 30,
      margin: 15,
      fontWeight: "bold"
  },
  menuContent: {
      color: Colors.black,
      fontWeight: "bold",
      padding: 2,
      fontSize: 30,
  },
    darkLargeTitle: {
     marginTop: 8,
     marginBottom: 8,
     fontSize: 34,
     color: Colors.white,
     textAlign: 'center',
  },
    lightTextInput: {
      marginTop: 8,
      marginBottom: 8,
      height: 40,
      width: '90%',
      borderColor: Colors.black,
      borderBottomWidth: 2,
      fontSize: 18,
      color: Colors.black,
  },
    darkTextInput: {
      marginTop: 8,
      marginBottom: 8,
      height: 40,
      width: '90%',
      borderColor: Colors.white,
      borderBottomWidth: 2,
      fontSize: 18,
      color: Colors.white,
  },
    smallImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    iosLightThemeText: {
      color: Colors.black,
      fontSize: 17
    },
    iosLightContainer: {
      flex: 1,
      backgroundColor: Colors.iosLightBar,
      alignItems: 'center'
    },
    iosDarkThemeText: {
      color: Colors.white,
      fontSize: 17
    },
    iosDarkContainer: {
      flex: 1,
      backgroundColor: Colors.iosDarkBar,
      alignItems: 'center'
    },
});
