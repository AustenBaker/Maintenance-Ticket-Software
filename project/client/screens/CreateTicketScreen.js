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
      value: 0,
    };
  }

  render(){
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="Apartment Complex:"
          style={styles.textInput}    
        />
        <TextInput
          placeholder="Unit Number"
          style={styles.textInput}
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
          style={styles.textInput}
        />
        <TextInput
          placeholder="Details:"
          style={styles.largeTextInput}
        />
        <TextInput
          placeholder="Other Notes:"
          style={styles.largeTextInput}
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    width: '90%',
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 18,
    color: 'black',
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});

export default CreateTicketScreen;