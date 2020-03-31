import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/uwcrest.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

          <Text style={styles.topText}>Log In</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor='gray'
            autoCapitalize="none"
            keyboardAppearance='dark'
            style={styles.textInput}
            onChangeText={text => onChangeUser(text)}
            //value={user}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor='gray'
            autoCapitalize="none"
            keyboardAppearance='dark'
            style={styles.textInput}
            onChangeText={text => onChangePass(text)}
            //value={pass}
          />
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
 topText: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
},
  textInput: {
    marginTop: 8,
    height: 40,
    width: '90%',
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 18,
    color: 'white',
},
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
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
