import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { userStore, colorScheme } from '../stores';
import Colors from '../constants/Colors';
import { AppearanceProvider } from 'react-native-appearance';
import { register } from '../fetch/user';

export default function SignUpScreen({ navigation }) {
    const [username, onChangeUsername] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    const [fname, onChangeFname] = React.useState('');
    const [lname, onChangeLname] = React.useState('');
    const [phone, onChangePhone]  = React.useState('');
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

  
  async function handleRegister() {
    const data = await register({
      username,
      email,
      password: pass,
      first: fname,
      last: lname,
      phone: +phone,
      type: 'resident',
      contactPreference: 'email',
      entryPermissions: 'ANY',
    });

    if (data.error) alert(data.error);
    else {
      const { username, first, last, units, email, phone,
        contactPreference, entryPermission, type, note,
        tickets, activate } = data;

      userStore.loggedIn = true;
      userStore.username = username;
      userStore.first = first;
      userStore.last = last;
      userStore.units = units;
      userStore.email = email;
      userStore.phone = phone;
      userStore.contactPreference = contactPreference;
      userStore.entryPermission = entryPermission;
      userStore.type = type;
      userStore.note = note;
      userStore.tickets = tickets;
      userStore.activate = activate;

      navigation.replace('BottomTabNavigator');
    }
  }

  return (
    <AppearanceProvider>
    <View style={styles.container, themeContainerStyle}>

          <Text style={themeLargeTitle}>Let’s Get Started</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeUsername(text)}
            value={username}
          />
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
            placeholder="First Name"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeFname(text)}
            value={fname}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeLname(text)}
            value={lname}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangePhone(text)}
            value={phone}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeAddr(text)}
            value={address}
          />
          <TextInput
            placeholder="Unit"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBoxStyle}
            onChangeText={text => onChangeUnit(text)}
            value={unit}
          />
          <Button
            onPress={() => handleRegister() }
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
    color: Colors.black,
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 50,
   marginBottom: 8,
   fontSize: 34,
   color: Colors.white,
   textAlign: 'center',
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
    borderColor: Colors.white,
    borderBottomWidth: 2,
    fontSize: 18,
    color: Colors.white,
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
    backgroundColor: Colors.iosLightBar,
    alignItems: 'center'
  },
  iosLightThemeText: {
    color: Colors.black
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: Colors.iosDarkBar,
    alignItems: 'center'
  },
  iosDarkThemeText: {
    color: Colors.white
  }
});
