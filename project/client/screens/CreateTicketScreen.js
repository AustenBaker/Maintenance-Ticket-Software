import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ColorScheme } from '../stores';
import Colors from '../constants/Colors';
import request from 'request';
const express = require('supertest')
const app = express();
const colorScheme = new ColorScheme();

var radio_props = [
  {label: 'low',       value: 2},
  {label: 'normal',    value: 0 },
  {label: 'emergency', value: 1 }
]

class CreateTicketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  submitTicket() {
    request(app)
        .post('/ticket/create')
        .send({issue: "PLEASE WORK", emergency: false, resolvedTime: 0, progress: "VIEWED",closed: false })
        .expect(200, done)
    done()
  }

  render(){

    let themeContainer =
      colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    let themeTextBox =
      colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    let themeBodyText =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    let themeKeyboard =
      colorScheme.theme === 'light' ? 'light' : 'dark';
    let radioColor =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    let radioLabel =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;

    return (
      <View style={styles.container, themeContainer}>

        <TextInput
          placeholder="Apartment Complex"
          placeholderTextColor={Colors.iosSystemGray}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.setState({ apt: text })}
        />

        <TextInput
        placeholder="Unit Number"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.setState({ unit: text })}
        />

        <Text style={{ color: themeBodyText }}>Emergency</Text>
        <PrioritySelection />

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
          onChangeText={text => this.setState({ issue: text })}
        />
        <TextInput
          placeholder="Details"
          placeholderTextColor={Colors.iosSystemGray}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.setState({ details: text })}
        />
        <TextInput
          placeholder="Other Notes"
          placeholderTextColor={Colors.iosSystemGray}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.setState({ notes: text })}
        />
        <Button
          title="Create Ticket Request"
          accessibilityLabel="Create Ticket Request Button"
          onPress = {this.submitTicket}
        />
      </View>
    );
  }
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

export default CreateTicketScreen;
