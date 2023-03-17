import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import { Text, useTheme } from 'react-native-paper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Image, StyleSheet, View, Appearance } from 'react-native';
import IntroScreen from "./src/screens/IntroScreen";
import JetScreen from "./src/screens/JetScreen";
import CityScreen from "./src/screens/CityScreen";
import GameoverScreen from "./src/screens/GameoverScreen";
import { dopeReducer } from './src/reducers/DopeReducer';
import { cityReducer } from './src/reducers/CityReducer';

const Stack = createStackNavigator();
const Store = configureStore({
  reducer: combineReducers({
    dopeState: dopeReducer,
    cityState: cityReducer
  }),
})



export default function App() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    titleImage: {
      width: 48,
      height: 48
    },
    titleText: {
      fontSize: 32,
      color: theme.colors.onPrimary
    },
    title: {
      flexDirection: "row"
    }
  });

  function LogoTitle(props: any) {
    return <View style={styles.title}>
      <Image
        style={styles.titleImage}
        source={require("./images/raccicon.png")}
      />
      <Text style={styles.titleText}> {props.title}</Text>
    </View>
  }
  return (
    <StoreProvider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "DopeyWars",
            headerStyle: { backgroundColor: theme.colors.primary },
            cardStyle: { backgroundColor: theme.colors.surface }
          }}
        >
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Jet"
            component={JetScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} title="Where to?" />,
              headerLeft: () => <></>
            }}
          />
          <Stack.Screen
            name="City"
            component={CityScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} title={Store.getState().cityState.currentCity} />,
              headerLeft: () => <></>
            }}
          />
          <Stack.Screen
            name="Gameover"
            component={GameoverScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} title="Game Over" />,
              headerLeft: () => <></>
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
