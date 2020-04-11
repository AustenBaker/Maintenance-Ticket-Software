import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


import Colors from '../constants/Colors';
import { ColorScheme } from '../stores';

const colorScheme = new ColorScheme();

class PrioritySelection extends React.Component {
  render() {
    let radioColor =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    let radioLabel =
      colorScheme.theme === 'light' ? Colors.black : Colors.white;
    return (
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
    );
  }
}
