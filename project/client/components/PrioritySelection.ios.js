import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native';

import Colors from '../constants/Colors';
import { ColorScheme } from '../stores';

const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const colorScheme = new ColorScheme();

IsEnabled = () => {
  this.setState({ isEnabled: false })
}

export default class PrioritySelection extends React.Component {
  render() {
    return (
      <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
    );
  }
}
