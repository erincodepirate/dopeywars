import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from "./IntroScreen";
import JetScreen from "./JetScreen";
import CityScreen from "./CityScreen";

const Stack = createStackNavigator();



export default function App() {
  return (
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
  );
}
