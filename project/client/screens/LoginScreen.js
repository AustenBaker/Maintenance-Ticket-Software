import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen() {
    const [user, onChangeUser] = React.useState('');
    const [pass, onChangePass] = React.useState('');

  return (
    <View style={styles.container}>
          <Image source={require('../assets/images/uwcrest.png')}
            style={styles.smallImage}/>

          <Text style={styles.largeTitle}>Log In</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor='gray'
            autoCapitalize="none"
            keyboardAppearance='dark'
            style={styles.textInput}
            onChangeText={text => onChangeUser(text)}
            value={user}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor='gray'
            autoCapitalize="none"
            keyboardAppearance='dark'
            style={styles.textInput}
            onChangeText={text => onChangePass(text)}
            value={pass}
          />

          <Button
            onPress={() => handleLogin(user, pass) }
            style={styles.largeTitle}
            title="Sign In"
            accessibilityLabel="Sign In Button"
          />

    </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
 largeTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  smallImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
