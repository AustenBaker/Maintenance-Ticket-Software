import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function LoginScreen() {
    const [user, onChangeUser] = React.useState('');
    const [pass, onChangePass] = React.useState('');

    let colorScheme = Appearance.getColorScheme();
    let subscription = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ colorScheme: Appearance.getColorScheme() });
    });
    const themeContainerStyle =
      colorScheme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
    const themeTextBox =
      colorScheme === 'light' ? styles.lightTextInput : styles.darkTextInput;
    const themeLargeTitle =
      colorScheme === 'light' ? styles.lightLargeTitle : styles.darkLargeTitle;
    const themeKeyboard =
      colorScheme === 'light' ? 'light' : 'dark';

  return (
    <AppearanceProvider>
    <View style={styles.container, themeContainerStyle}>
          <Image source={require('../assets/images/uwcrest.png')}
            style={styles.smallImage}/>

          <Text style={themeLargeTitle}>Log In</Text>

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

    </View>
    </AppearanceProvider>
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
    alignItems: 'center',
  },
  lightLargeTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 34,
    color: '#000',
    textAlign: 'center',
},
  darkLargeTitle: {
   marginTop: 8,
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
