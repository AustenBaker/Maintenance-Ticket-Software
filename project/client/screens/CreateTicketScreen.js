import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, SafeAreaView, Switch, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
//import { PrioritySelection } from '../components/PrioritySelection'
import { colorScheme, ticketStore, userStore } from '../stores';
import Colors from '../constants/Colors';
import * as CONSTANTS from '../constants/Reference';
import { submit } from '../fetch/ticket';


var radio_props = [
  {label: 'normal', value: false },
  {label: 'emergency', value: true }
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

  toggleSwitch = () => {
      //onValueChange of the switch this function will be called
      this.setState({emergency: !this.state.emergency});
      //state changes according to switch
      //which will result in re-render the text
   }

   submitTicket = async () => {
    console.log("submitting the ticket");
    const { email } = userStore;
    const data = await submit({ ...this.state, email });

    if (data.error) alert(data.error);
    else alert(`ticket submitted: ID=${data.id}`);
  }

  render(){

//    if (!userStore.loggedIn) this.props.navigation.replace('Root');

    let themeContainer =
      colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    let themeTextBox =
      colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    let themeBodyText =
      colorScheme.theme === 'light' ? styles.lightText : styles.darkText;
    let themeKeyboard =
      colorScheme.theme === 'light' ? 'light' : 'dark';
    let radioColor =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    let radioLabel =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    let themePicker =
      colorScheme.theme === 'light' ? styles.lightPicker : styles.darkPicker;

    // set up property selections for Picker
    let properties = [];
    for (let property in CONSTANTS.PROPERTY) {
      properties.push(
        <Picker.Item
          label={CONSTANTS.PROPERTY[property]}
          value={CONSTANTS.PROPERTY[property]}
          key={property}
        />
      );
    };

    return (
      <View style={styles.container, themeContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>

        <Text style={themeBodyText}>
          <Text style={themeBodyText}>
            Emergency?
            {'  '}
            No
            {'  '}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={ this.state.emergency ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.setState({ emergency: !this.state.emergency })}
            value={this.state.emergency}
          />
          <Text style={themeBodyText}>
            {'  '}
            Yes
          </Text>
        </Text>
        <Text>
          {'\n'}
        </Text>
      <View style={{flex: 1, flexDirection: 'row', alignContent: 'stretch', alignItems: 'center', minWidth: '100%', marginHorizontal: 20, paddingHorizontal: 55}}>
      <View style={{flex: .4, minWidth: '50%'}}>
        <Text style={themeBodyText}>
          Unit Assigned:
          {' '}
        </Text>
        <TextInput
        placeholder="Unit Number"
        placeholderTextColor={Colors.iosSystemGray}
        keyboardAppearance={themeKeyboard}
        style={themeTextBox}
        onChangeText={text => this.setState({ unit: text })}
        />
        </View>

        <View style={{flex: .4, minWidth: '50%'}}>
        <Text style={themeBodyText}>
          Property:
          {' '}
        </Text>
        <Picker
          placeholder="Apartment Complex"
          placeholderTextColor={Colors.iosSystemGray}
          style={themePicker}
          selectedValue={this.state.aptComplex}
          onValueChange={(itemValue, itemKey) => this.setState({ aptComplex: itemValue })}
          children={properties}
        />
        </View>
      </View>

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
  lightPicker: {
    marginVertical: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.black,
    borderBottomWidth: 2,
    color: Colors.black,
  },
  darkPicker: {
    marginVertical: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.white,
    borderBottomWidth: 2,
    color: Colors.white,
  },
  lightText: {
    marginVertical: 4,
    height: 20,
    width: '90%',
    fontSize: 18,
    color: Colors.black,
  },
  darkText: {
    marginVertical: 4,
    height: 20,
    width: '90%',
    fontSize: 18,
    color: Colors.white,
  },
  lightTextInput: {
    marginVertical: 8,
    height: 40,
    width: '90%',
    borderColor: Colors.black,
    borderBottomWidth: 2,
    fontSize: 18,
    color: Colors.black,
},
  darkTextInput: {
    marginVertical: 8,
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
    flex: 1,
    backgroundColor: Colors.black,
  },
});

export default CreateTicketScreen;
