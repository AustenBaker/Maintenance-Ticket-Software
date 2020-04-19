import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { colorScheme } from '../stores';
import Colors from '../constants/Colors';

// may need to pass in navigation?
export default function LoginScreen({ navigation }) {
    const [user, onChangeUser] = React.useState('');
    const [pass, onChangePass] = React.useState('');

    let themeContainerStyle =
      colorScheme.theme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    let themeTextBox =
      colorScheme.theme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    let themeLargeTitle =
      colorScheme.theme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
    let themeBodyText =
      colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;
    let themeKeyboard =
      colorScheme.theme === 'light' ? 'light' : 'dark';

  return (
    <SafeAreaView style={styles.container, themeContainerStyle}>
          <Image source={require('../assets/images/uwcrest.png')}
            style={styles.smallImage}/>

          <Text style={themeLargeTitle}>Welcome Back</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBox}
            onChangeText={text => onChangeUser(text)}
            value={user}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor='#8E8E93'
            autoCapitalize="none"
            keyboardAppearance={themeKeyboard}
            style={themeTextBox}
            onChangeText={text => onChangePass(text)}
            value={pass}
          />

          <Button
            onPress={() => handleLogin(user, pass) }
            style={themeLargeTitle}
            title="Sign In"
            accessibilityLabel="Sign In Button"
          />

          <Button
            onPress={() => navigation.replace('SignUp') }
            style={themeBodyText}
            title="Don’t have an account?"
            accessibilityLabel="Go to Sign Up page"
          />

          <Button
            onPress={() => navigation.replace('Tabs') }
            style={themeBodyText}
            title="Skip Sign In"
            accessibilityLabel="Secret Dev Button to Skip Sign In"
          />

    </SafeAreaView>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

function handleLogin(user, pass) {
    fetch('http://127.0.0.1:3001/account/login', {
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
  },
  lightLargeTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 34,
    color: Colors.black,
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 8,
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
  iosLightThemeText: {
    color: Colors.black,
    fontSize: 17
  },
  iosLightContainer: {
    flex: 1,
    backgroundColor: Colors.iosLightBar,
    alignItems: 'center'
  },
  iosDarkThemeText: {
    color: Colors.white,
    fontSize: 17
  },
  iosDarkContainer: {
    flex: 1,
    backgroundColor: Colors.iosDarkBar,
    alignItems: 'center'
  },
});
