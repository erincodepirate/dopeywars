import * as React from 'react';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { Appearance } from 'react-native';
import App from './App';


export default function Main() {
    let themeToUse = MD3LightTheme;
    if (Appearance.getColorScheme() === 'dark') {
        themeToUse = MD3DarkTheme;
    }
    return (
        <PaperProvider theme={themeToUse}>
            <App />
        </PaperProvider>
    );
}