import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


import { MonoText } from '../components/StyledText';

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

  render(){

    return (
      <View style={styles.container, themeContainer}>

        <TextInput
          placeholder="Apartment Complex"
          placeholderTextColor={themeBodyText}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => onChangeUser(text)}
        />

        <TextInput
        placeholder="Unit Number"
        placeholderTextColor={themeBodyText}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => onChangeUser(text)}
        />

        <Text style={{fontSize:20, padding: 10}}>Ticket Importance Level</Text>
        <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          labelStyle={{fontSize: 20, paddingRight: 30, paddingBottom: 5 }}
          buttonSize={30}
          buttonColor={'black'}
          onPress={value => this.setState({value:value})}
        />

        <TextInput
          placeholder="Issue"
          placeholderTextColor={themeBodyText}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => onChangeUser(text)}
        />
        <TextInput
          placeholder="Details"
          placeholderTextColor={themeBodyText}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => onChangeUser(text)}
        />
        <TextInput
          placeholder="Other Notes"
          placeholderTextColor={themeBodyText}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => onChangeUser(text)}
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
    alignItems: 'center',
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
    borderColor: '#fff',
    borderWidth: 2,
    fontSize: 18,
    color: '#fff',
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
  },
  iosLightThemeText: {
    color: '#000'
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  iosDarkThemeText: {
    color: '#F2F2F7'
  },
});

export default CreateTicketScreen;
