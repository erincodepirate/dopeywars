/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Main from './Main';
import { name as appName } from './app.json';

if (!__DEV__) {
    console.log = () => { };
}

AppRegistry.registerComponent(appName, () => Main);
