import PushNotification from "react-native-push-notification"
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from "react-native";

class Local {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[Local] onRegister:", token);
            },
            onNotification: function (notification) {
                console.warn("[Local] onNotification:", notification);
                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                // onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);
                onOpenNotification(notification.data);

                //only call callback if not from foreground
                if (Platform.OS === 'ios') {
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* Android and ios Only Properties */
            ...this.buildIOSNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
            // channelId: "32",
            // badge: true,
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }

        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[Local] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
    }

    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
}

export const local = new Local();
