import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import IntroScreen from "./src/screens/IntroScreen";
import JetScreen from "./src/screens/JetScreen";
import CityScreen from "./src/screens/CityScreen";
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
  return (
    <StoreProvider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              title: "DopeyWars"
            }}
          >
            <Stack.Screen
              name="Intro"
              component={IntroScreen}
            />
            <Stack.Screen
              name="Jet"
              component={JetScreen}
            />
            <Stack.Screen
              name="City"
              component={CityScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
