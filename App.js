import 'react-native-gesture-handler';
import * as React from 'react';
import Scene from '@navigation/Scene';
import {Root} from 'native-base';
import {View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '@redux/store';
import SplashScreen from 'react-native-splash-screen'

 import firebase from 'react-native-firebase';
 import { Notification, NotificationOpen } from 'react-native-firebase';


const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount = async () => {
    // console.disableYellowBox = true;
     SplashScreen.hide()

    await this.checkPermission();

     this.createNotificationListeners()
   //  firebase.notifications().setBadge(0)
     firebase.notifications().removeAllDeliveredNotifications()
 
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }


  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      //console.warn("fcmToken", fcmToken);
    } else {
    }
  }


  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }


  createNotificationListeners = async () => {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      console.warn('NOTIFICATION_DISPALYED_LISTENER', notification)
    });

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      console.warn('NOTIFICATION_ON_NOTIFCATION', notification)
      if (Platform.OS === "android") {
        console.warn("for android");
        this.androidMessageHandle(notification);
        
      
      }
       else if(Platform.OS ==='ios'){
         console.warn("ios iosMessageHandle")
        this.iosMessageHandle(notification);
      }
  
      // store.dispatch({ 
      //   type: "PICKUPS_FETCH_PICKUP_DATES",
      // });
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const { data, notificationId } = notificationOpen.notification;
      //const actionType = getNextScreen(data)
      //this.redirectToNextScreenAndMarkAsRead(data.gsNotificationId, actionType, data.payloadID )
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {

      const action = notificationOpen.action;

      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;

    

      const { data, notificationId } = notification;
      //const actionType = getNextScreen(data)
      //this.redirectToNextScreenAndMarkAsRead(data.gsNotificationId, actionType , data.payloadID )
    }
  }




  //for android notification  sound icon 
  androidMessageHandle = notification => {
    const { title, subtitle, data} = notification.data;

    // Build a channel(android only)
    const channel = new firebase.notifications.Android.Channel('test-channel', 'test-channel', firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

    console.warn("channel",channel)

    firebase.notifications().android.createChannel(channel);
    // .setNotificationId(data.gsNotificationId)

    console.warn("notification",notification)
    console.warn("notification.data",notification.data)


    notification  
      .setTitle(title)
      .setBody(subtitle)
      .setSound('default')
      .android.setChannelId("test-channel")
      .android.setAutoCancel(true)
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      //.android.setClickAction(notification.android.clickAction)
     // .android.setSmallIcon("ic_notification") // create this icon in Android Studio
      //.android.setColor("#0d185c")
    firebase.notifications().displayNotification(notification);
    //firebase.notifications().setBadge(parseInt(data.badge))
  
  };


  iosMessageHandle = notification => {
    console.warn("iosMessageHandle",notification)

    const { title, subtitle, data} = notification;
    notification
    .setTitle(title)
    .setBody(subtitle)
    .setSound('default')
    //.setData({actionType: data.actionType,})
    // .ios.setBadge(parseInt(data.badge));
    firebase.notifications().displayNotification(notification);
  };


  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }




  render() {
    return (
      <View style={{flex: 1}}>
        <Root>
          <Provider store={store}>
            <Scene />
          </Provider>
        </Root>
      </View>
    );
  }
}

export default App;

