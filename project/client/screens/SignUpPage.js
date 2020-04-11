import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { ColorScheme } from '../stores';
import { AppearanceProvider } from 'react-native-appearance';

const colorScheme = new ColorScheme();

export default function SignUpScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    const [fname, onChangeFname] = React.useState('');
    const [lname, onChangeLname] = React.useState('');
    const [address, onChangeAddr] = React.useState('');
    const [unit, onChangeUnit] = React.useState('');

    const themeContainerStyle =
      colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    const themeTextBoxStyle =
      colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    const themeLargeTitle =
      colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
    const themeKeyboard =
      colorScheme.theme === 'light' ? 'light' : 'dark';

  return (
    <AppearanceProvider>
    <View style={styles.container, themeContainerStyle}>

          <Text style={themeLargeTitle}>Let’s Get Started</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeEmail(text)}
            value={email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangePass(text)}
            value={pass}
          />

          <TextInput
            secureTextEntry
            placeholder="First Name"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeFname(text)}
            value={fname}
          />
          <TextInput
            secureTextEntry
            placeholder="Last Name"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeLname(text)}
            value={lname}
          />
          <TextInput
            secureTextEntry
            placeholder="Address"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeAddr(text)}
            value={address}
          />
          <TextInput
            secureTextEntry
            placeholder="Unit"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeUnit(text)}
            value={unit}
          />
          <Button
            onPress={() => handleLogin(user, pass) }
            style={themeLargeTitle}
            title="Sign Up"
            accessibilityLabel="Sign Up Button"
          />

          <Button
            onPress={() => navigation.replace('Root') }
            style={themeLargeTitle}
            title="I have an account"
            accessibilityLabel="Go to Login page"
          />

    </View>
    </AppearanceProvider>
  );
}

SignUpScreen.navigationOptions = {
  header: null,
};

function handleLogin(user, pass) {
    fetch('http://127.0.0.1:3001/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    }).then(res => res.json()).then(data => {
        // This is successful login, data = { first, last, username . . .}
    }).catch(err => {
        // Error login, error code is err.error
    })
}

// User landing page: check login status:
function componentDidMount() {
    fetch('/account', { method: 'POST' }).then(res => res.json()).then(data => {
        // User has logged in before, session cookie is valid
    }).catch(err => {
        // User did not login, or session has expired
        // redirect back to un-authenticated route or login screen
    })
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  lightLargeTitle: {
    marginTop: 50,
    marginBottom: 8,
    fontSize: 34,
    color: '#000',
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 50,
   marginBottom: 8,
   fontSize: 34,
   color: '#fff',
   textAlign: 'center',
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
  smallImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  iosLightContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center'
  },
  iosLightThemeText: {
    color: '#000'
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
  },
  iosDarkThemeText: {
    color: '#F2F2F7'
  }
});
