import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, SafeAreaView, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
//import { PrioritySelection } from '../components/PrioritySelection'
import { userStore, colorScheme } from '../stores';
import Colors from '../constants/Colors';
import { submit } from '../fetch/ticket';


var radio_props = [
  {label: 'low',       value: 2},
  {label: 'normal',    value: 0 },
  {label: 'emergency', value: 1 }
]

class CreateTicketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      aptComplex: "",
      unit: "",
      issue: "",
      details: "",
      emergency: false,
    };
  }

  toggleSwitch = (value) => {
      //onValueChange of the switch this function will be called
      this.setState({emergency: value})
      //state changes according to switch
      //which will result in re-render the text
   }

   submitTicket = async () => {
    console.log("submiting the ticket");
    const { email } = userStore;
    const data = await submit({ ...this.state, email });
    
    if (data.error) alert(data.error);
    else alert(`ticket submitted: ID=${data.id}`);
  }

  render(){

    if (!userStore.loggedIn) this.props.navigation.replace('Root');

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
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>

        <Text style={{fontSize: 20, padding: 15, color: radioColor }}>Emergency</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={ this.emergency ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={this.toggleSwitch}
        value={this.emergency}
      />

        <Text style={{fontSize: 20, padding: 15, color: radioColor }}>Ticket Importance Level</Text>
      <RadioForm
        labelColor={radioLabel}
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        labelStyle={{
          fontSize: 20,
          paddingTop: 5,
          paddingRight: 8,
          paddingLeft: 8,
          paddingBottom: 5,
          color: radioLabel }}
        buttonSize={20}
        buttonColor={radioColor}
        onPress={value => this.setState({value:value})}
      />

        <TextInput
          placeholder="Apartment Complex"
          placeholderTextColor={Colors.iosSystemGray}
          keyboardAppearance={themeKeyboard}
          style={themeTextBox}
          onChangeText={text => this.setState({ aptComplex: text })}
        />

        <TextInput
        placeholder="Unit Number"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.setState({ unit: text })}
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
          onPress = {() => this.submitTicket()}
        />
        </View>
      </ScrollView>
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
    borderBottomWidth: 2,
    fontSize: 18,
    color: Colors.black,
},
  darkTextInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.iosDarkIcon,
    borderBottomWidth: 2,
    fontSize: 18,
    color: Colors.white,
},
  iosLightContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iosDarkContainer: {
    flexGrow: 1,
    backgroundColor: Colors.black,
  },
});

export default CreateTicketScreen;
