import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { local } from './Local';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.warn("[FCMService] Permission Rejected", error);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.warn("[FCMService] User does not have a devices token")
                }
            }).catch(error => {
                console.warn("[FCMService] getToken Rejected", error);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {
                console.warn("[FCMService] Request Permission Rejected", error);
            })
    }

    deleteToken = () => {
        console.warn("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                console.warn("[FCMService] Delete Token Error", error);
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.warn("[FCMService] OnNotificationOpenedApp getInitialNotification", remoteMessage);
            if (remoteMessage) {
                const notification = remoteMessage;
                onOpenNotification(notification);
            }
        });

        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.warn("[FCMService] getInitialNotification getInitialNotification", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage;
                    local.cancelAllLocalNotifications();
                    onOpenNotification(notification);
                }
            });

        //Forground state message
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.warn("[FCMService] A new FCm message arrived", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data
                } else {
                    notification = remoteMessage.data
                }

                onNotification(notification);
            }
        });

        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            console.warn("[FCMService] New token refresh", fcmToken);
            onRegister(fcmToken);
        });
    }

    unRegister = () => {
        this.messageListener();
    }

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            console.warn('sdfghjkldfgh', "stopAlarmRing");
        }
    }

}

export const fcmService = new FCMService()
