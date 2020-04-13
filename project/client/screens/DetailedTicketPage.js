import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorScheme } from '../stores';
import Colors from '../constants/Colors';

export default function DetailedTicketPage() {

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

  return (
    <View style={styles.container, themeContainer}>

      <TextInput
        placeholder="Apartment Complex"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.onChangeApt(text)}
      />

      <TextInput
      placeholder="Unit Number"
      placeholderTextColor={Colors.iosSystemGray}
      keyboardAppearance={themeKeyboard}
      style={themeTextBox}
      onChangeText={text => this.onChangeUnit(text)}
      />

      <Text style={{fontSize:20, padding: 10, color: radioColor }}>Ticket Importance Level</Text>
      <RadioForm
        labelColor={radioLabel}
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        labelStyle={{fontSize: 20, paddingRight: 8, paddingLeft: 8, paddingBottom: 5, color: radioLabel }}
        buttonSize={20}
        buttonColor={radioColor}
        onPress={value => this.setState({value:value})}
      />

      <TextInput
        placeholder="Issue"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.onChangeIssue(text)}
      />
      <TextInput
        placeholder="Details"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.onChangeDetails(text)}
      />
      <TextInput
        placeholder="Other Notes"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.onChangeNotes(text)}
      />
      <Button
        title="Create Ticket Request"
        accessibilityLabel="Create Ticket Request Button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightTextInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.black,
    borderWidth: 2,
    fontSize: 18,
    color: Colors.black,
},
  darkTextInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.iosDarkIcon,
    borderWidth: 2,
    fontSize: 18,
    color: Colors.white,
},
  iosLightContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
});
