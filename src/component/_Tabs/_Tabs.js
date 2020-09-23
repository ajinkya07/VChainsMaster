import React, {Component, createRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  BackHandler,
  Alert,
  ToastAndroid,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import _Container from '@container/_Container';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import {color} from '@values/colors';

import HomePage from '@homepage/HomePage';
import AccountContainer from '@accountContainer/AccountContainer';
import CartContainer from '@cartContainer/CartContainer';
import Customizable from '@customOrder/Customizable';
import CategoryContainer from '@category/CategoryContainer';
// import Customizable from '../../screens/Customize/Customizable'
import BottomTabIcon from '@tabs/BottomTabIcon'

var totalDuration = 0.0;
var backPressed = 0;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribeFocus = this.props.navigation.addListener('focus', e => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    });
    this.unsubscribeBlur = this.props.navigation.addListener('blur', e => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    });

    // onButtonPress = () => {
    //     BackHandler.removeEventListener(
    //         'hardwareBackPress',
    //         this.handleBackButton,
    //     );
    // };
  }
  handleBackButton = () => {
    // Alert.alert(
    //     'Exit App',
    //     'Exiting the application?',
    //     [
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
    //     {text: 'OK', onPress: () => BackHandler.exitApp(),},
    //     ],
    //      {cancelable: false,},
    // );
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      ToastAndroid.show('Press again to close app', ToastAndroid.SHORT);
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }

    return true;
  };

  componentWillUnmount() {
    this.unsubscribeFocus();
    this.unsubscribeBlur();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HomePage navigation={this.props.navigation} />
      </View>
    );
  }
}

class CategoryScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CategoryContainer navigation={this.props.navigation} />
      </View>
    );
  }
}

class CustomOrderScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Customizable navigation={this.props.navigation} />
      </View>
    );
  }
}

class CartScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CartContainer navigation={this.props.navigation} />
      </View>
    );
  }
}

class AccountScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AccountContainer navigation={this.props.navigation} />
      </View>
    );
  }
}

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function _Tabs() {
  var totalCartCount = 0;
  totalCartCount = global.totalCartCount;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {height: Platform.OS === 'ios' ? hp(10) : hp(9)},
        activeTintColor: color.brandColor,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: hp(1.8),
          margin: 0,
          padding: 0,
          bottom: 2,
          top: 2,
        },
      }}
      //barStyle={{ backgroundColor: '#EEF8F7', }}
      barStyle={{backgroundColor: '#FFFFFF'}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          activeTintColor: color.brandColor,
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return (
                <Image
                  style={{height: hp(3.5), width: hp(3.5), marginTop: -2}}
                  source={require('../../assets/image/Tabs/home_grey.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{height: hp(3), width: hp(3), marginTop: 3}}
                  source={require('../../assets/image/Tabs/home_lightgrey.png')}
                />
              );
            }
          },
        }}
        component={Container}
      />

      <Tab.Screen
        name="Category"
        options={{
          tabBarLabel: 'Category',
          activeTintColor: color.brandColor,

          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return (
                <Image
                  style={{height: hp(3.2), width: hp(3.2), marginTop: -2}}
                  source={require('../../assets/image/Tabs/category_grey.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{height: hp(2.5), width: hp(2.5), marginTop: 4}}
                  source={require('../../assets/image/Tabs/category_lightgrey.png')}
                />
              );
            }
          },
        }}
        component={CategoryScreen}
      />

      <Tab.Screen
        name="Cart"
        options={{
          tabBarLabel: 'Cart',
          activeTintColor: color.brandColor,
          // tabBarBadge: totalCartCount ? totalCartCount : 0,
          tabBarIcon: (props) => <BottomTabIcon {...props} />

        //   tabBarIcon: ({color, size, focused}) => {
        //     if (focused) {
        //       return (
        //         <Image
        //           style={{height: hp(3.5), width: hp(3.5), marginTop: -2}}
        //           source={require('../../assets/image/BlueIcons/Cart.png')}
        //         />
        //       );
        //     } else {
        //       return (
        //         <Image
        //           style={{height: hp(2.8), width: hp(2.8), marginTop: 3}}
        //           source={require('../../assets/image/BlueIcons/Cart-White.png')}
        //         />
        //       );
        //     }
        //   },
        
      }}
        component={CartScreen}
      />

      <Tab.Screen
        name="Customize"
        options={{
          tabBarLabel: 'Customize',
          activeTintColor: color.brandColor,
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return (
                <Image
                  style={{height: hp(3.5), width: hp(3.5), marginTop: -2}}
                  source={require('../../assets/image/Tabs/customeorder_grey.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{height: hp(2.8), width: hp(2.8), marginTop: 3}}
                  source={require('../../assets/image/Tabs/customorder_lightgrey.png')}
                />
              );
            }
          },
        }}
        component={CustomOrderScreen}
      />

      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: 'Account',
          activeTintColor: color.brandColor,
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return (
                <Image
                  style={{height: hp(3.5), width: hp(3.5), marginTop: -2}}
                  source={require('../../assets/image/Tabs/profie_grey.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{height: hp(2.8), width: hp(2.8), marginTop: 3}}
                  source={require('../../assets/image/Tabs/profile_lightgrey.png')}
                />
              );
            }
          },
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}
