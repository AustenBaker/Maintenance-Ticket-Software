import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { colorScheme } from '../stores';

export default function TabBarIcon(props) {
  let themeInactiveIcon =
    colorScheme.theme === 'light' ? Colors.iosLightIcon : Colors.iosDarkIcon;
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : themeInactiveIcon}
    />
  );
}
