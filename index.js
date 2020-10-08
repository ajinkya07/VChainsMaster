/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { local } from './DS/Local';
import messaging from '@react-native-firebase/messaging';


messaging().setBackgroundMessageHandler(async remoteMessage => {

    const options = {
        soundName: 'default',
        playSound: true,
    }

    local.showNotification(
        0,
        remoteMessage.data.title,
        remoteMessage.data.subtitle,
        remoteMessage.data,
        options,
    )

});

AppRegistry.registerComponent(appName, () => App);
