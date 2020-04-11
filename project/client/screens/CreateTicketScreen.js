import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ColorScheme } from '../stores';

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

  onChangeApt = (text) => {
    this.setState({ apt: text })
  }

  onChangeUnit = (text) => {
    this.setState({ unit: text })
  }

  onChangeIssue = (text) => {
    this.setState({ issue: text })
  }

  onChangeDetails = (text) => {
    this.setState({ details: text })
  }

  onChangeNotes = (text) => {
    this.setState({ notes: text })
  }

  render(){

    let themeContainer =
      colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    let themeTextBox =
      colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    let themeBodyText =
      colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;
    let themeKeyboard =
      colorScheme.theme === 'light' ? 'light' : 'dark';
    let radioColor =
      colorScheme.theme === 'light' ? '#000' : '#FFF';
    let radioLabel =
      colorScheme.theme === 'light' ? '#000' : '#FFF';

    return (
      <View style={styles.container, themeContainer}>

        <TextInput
          placeholder="Apartment Complex"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.onChangeApt(text)}
        />

        <TextInput
        placeholder="Unit Number"
        placeholderTextColor='#8E8E93'
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
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.onChangeIssue(text)}
        />
        <TextInput
          placeholder="Details"
          placeholderTextColor='#8E8E93'
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.onChangeDetails(text)}
        />
        <TextInput
          placeholder="Other Notes"
          placeholderTextColor='#8E8E93'
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
    borderColor: '#000',
    borderWidth: 2,
    fontSize: 18,
    color: '#000',
},
  darkTextInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    width: '90%',
    borderColor: '#FFF',
    borderWidth: 2,
    fontSize: 18,
    color: '#FFF',
},
  largeTextInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 120,
    width: '90%',
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 18,
    color: 'black',
  },
  iosLightContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  iosLightThemeText: {
    color: '#000'
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
  },
  iosDarkThemeText: {
    color: '#F2F2F7'
  },
});

export default CreateTicketScreen;
