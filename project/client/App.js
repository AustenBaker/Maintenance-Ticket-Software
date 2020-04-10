import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import { observer } from 'mobx-react';
import { UserStore, TicketStore } from './stores';
const userStore = new UserStore();
const ticketStore = new TicketStore();

const Stack = createStackNavigator();

function AppContainer() {
  return (
    <AppearanceProvider>
      <App userStore={userStore} ticketStore={ticketStore}/>
    </AppearanceProvider>
  )
}

export default observer(AppContainer);

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  let colorScheme = Appearance.getColorScheme();
  let subscription = Appearance.addChangeListener(({ colorScheme }) => {
    this.setState({ colorScheme: useColorScheme() });
  });

  const themeStatusBarStyle =
    colorScheme === 'light' ? 'dark-content' : 'light-content';
  const themeTextStyle =
    colorScheme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.iosLightContainer : styles.iosDarkContainer;
  const headerBackgroundColor =
    colorScheme === 'light' ? '#fff' : '#000';
  const headerTextColor =
    colorScheme === 'light' ? '#000' : '#fff';

    subscription.remove();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <SafeAreaView style={[styles.container, themeContainerStyle]}>
        <StatusBar barStyle={themeStatusBarStyle} />
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator
          screenOptions={{
              headerStyle: {
                backgroundColor: headerBackgroundColor
              },
              headerTintColor: headerTextColor,
              headerTitleStyle: { fontSize: 17 },
              }}
          >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosLightContainer: {
    backgroundColor: '#FFF',
  },
  iosLightThemeText: {
    color: '#000'
  },
  iosDarkContainer: {
    backgroundColor: '#000',
  },
  iosDarkThemeText: {
    color: '#FFF'
  }
});
