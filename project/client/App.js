import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/LoginPage'
import useLinking from './navigation/useLinking';
import Colors from './constants/Colors';
import { observer } from 'mobx-react';
import { UserStore, TicketStore, ColorScheme } from './stores';
const userStore = new UserStore();
const ticketStore = new TicketStore();
const colorScheme = new ColorScheme();

const Stack = createStackNavigator();

function AppContainer() {
  return (
    <AppearanceProvider>
      <App userStore={userStore} ticketStore={ticketStore} colorScheme={colorScheme}/>
    </AppearanceProvider>
  )
}

export default observer(AppContainer);

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  let themeStatusBarStyle =
    colorScheme.theme === 'light' ? 'dark-content' : 'light-content';
  let themeTextStyle =
    colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;
  let themeContainerStyle =
    colorScheme.theme === 'light' ? styles.iosLightSafeArea : styles.iosDarkSafeArea;
  let headerBackgroundColor =
    colorScheme.theme === 'light' ? Colors.iosLightBar : Colors.iosDarkBar;
  let headerBorderColor =
    colorScheme.theme === 'light' ? Colors.iosLightBorder : Colors.iosDarkBorder;
  let headerTextColor =
    colorScheme.theme === 'light' ? Colors.black : Colors.white;

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
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: headerBackgroundColor,
                shadowColor: headerBorderColor,
              },
              headerTintColor: headerTextColor,
              headerTitleStyle: { fontSize: 17 },
              }}
          >
            <Stack.Screen name="Root" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
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
  iosLightSafeArea: {
    backgroundColor: Colors.iosLightBar
  },
  iosLightThemeText: {
    color: Colors.black
  },
  iosDarkSafeArea: {
    backgroundColor: Colors.iosDarkBar
  },
  iosDarkThemeText: {
    color: Colors.white
  }
});
