import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { userStore, colorScheme } from '../stores';
import Colors from '../constants/Colors';

import { checkLoginStatus, login } from '../fetch/user';


class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  // Checks for login status once app loads (to login page)
  async componentDidMount() {
    const data = await checkLoginStatus();
    if (data.loggedIn)
      this.props.navigation.replace('BottomTabNavigator');
  }

  async handleLogin() {
    const data = await login(this.state);

    // Login successful
    if (!data.error) {
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

      this.props.navigation.replace('BottomTabNavigator');
    }

    // Login failed
    else {
      alert('Login failed');
    }
  }

  render() {
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
              onChangeText={text => this.setState({ username: text })}
              //value={this.state.username}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor='#8E8E93'
              autoCapitalize="none"
              keyboardAppearance={themeKeyboard}
              style={themeTextBox}
              onChangeText={text => this.setState({ password: text })}
              //value={this.state.password}
            />

            <Button
              onPress={() => this.handleLogin() }
              style={themeLargeTitle}
              title="Sign In"
              accessibilityLabel="Sign In Button"
            />

            <Button
              onPress={() => this.props.navigation.replace('SignUp') }
              style={themeBodyText}
              title="Don’t have an account?"
              accessibilityLabel="Go to Sign Up page"
            />

            <Button
              onPress={() => this.props.navigation.replace('BottomTabNavigator', () => {
                let testUser = {
                  username: "MurphysLaw",
                  first: "Mary",
                  last: "Sue",
                  units: [{
                    number: '1703',
                    property: 'Whispering Pines'
                  },],
                  email: "someday@somepl.ace",
                  phone: "123-456-7890",
                  contactPreference: "text",
                  entryPermission: "notify",
                  note: "The dog definitely bites.",
                  tickets: [],
                  activate: true,
                };

                for (let key in testUser) {
                  userStore[key] = testUser[key];
                }
                userStore.loggedIn = true;
              }) }
              style={themeBodyText}
              title="Skip Sign In"
              accessibilityLabel="Secret Dev Button to Skip Sign In"
            />

      </SafeAreaView>
    );
  }
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

export default LoginPage;
