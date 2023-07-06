import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import { Text, useTheme, Menu, Divider, IconButton, Provider, Button, Dialog } from 'react-native-paper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import IntroScreen from "./src/screens/IntroScreen";
import JetScreen from "./src/screens/JetScreen";
import CityScreen from "./src/screens/CityScreen";
import GameoverScreen from "./src/screens/GameoverScreen";
import { dopeReducer } from './src/reducers/DopeReducer';
import { cityReducer } from './src/reducers/CityReducer';
import CustomNavigationBar from './src/components/CustomNavigationBar';
import AboutContent from './src/components/AboutContent';

const Stack = createStackNavigator();
const Store = configureStore({
  reducer: combineReducers({
    dopeState: dopeReducer,
    cityState: cityReducer
  }),
})



export default function App() {
  const [aboutVisible, setAboutVisible] = React.useState(false);

  const showAboutDialog = () => setAboutVisible(true);

  const hideAboutDialog = () => setAboutVisible(false);
  const theme = useTheme();
  const styles = StyleSheet.create({
    titleText: {
      fontSize: 32,
      color: theme.colors.onPrimary
    },
    title: {
      flexDirection: "row"
    },
    dialog: {
      height: 450
    }
  });

  function Title(props: any) {
    return <Text style={styles.titleText}> {props.title}</Text>
  }

  return (
    <StoreProvider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "DopeyWars",
            headerStyle: { backgroundColor: theme.colors.primary },
            header: (props) => <CustomNavigationBar {...props} showAboutDialog={showAboutDialog} />,
            cardStyle: { backgroundColor: theme.colors.surface },
            animationEnabled: false,
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
              headerTitle: (props) => <Title {...props} title="Where to?" />,
            }}
          />
          <Stack.Screen
            name="City"
            component={CityScreen}
            options={({ route }) => {
              let place = '';
              if (route.params != undefined && 'place' in route.params) {
                place = String(route.params.place);
              }
              return (
                {
                  headerTitle: (props) => <Title {...props} title=
                    {place} />,
                })
            }
            }
          />
          <Stack.Screen
            name="Gameover"
            component={GameoverScreen}
            options={{
              headerTitle: (props) => <Title {...props} title="Game Over" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Dialog
        style={styles.dialog}
        visible={aboutVisible}
        onDismiss={hideAboutDialog}>
        <Dialog.Content>
            <AboutContent />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideAboutDialog}>
            Ok 
          </Button>
        </Dialog.Actions>
      </Dialog>
    </StoreProvider>
  );
}
