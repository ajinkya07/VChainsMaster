import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconPack from '@login/IconPack';
import {color} from '@values/colors';
import Theme from '../../values/Theme';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      _animatedIsFocused: new Animated.Value(this.props.value === '' ? 0 : 1),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  handleFocus = () =>
    this.setState({
      isFocused: true,
    });
  handleBlur = () =>
    this.setState({
      isFocused: false,
    });
  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [26, 0],
      }),
      color: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', color.brandColor],
      }),
      fontSize: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      marginLeft: 10,
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        {this.props.imageIcon === 'profile' ? (
          <View
            style={{
              marginTop: 21,
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                !isFocused
                  ? require('../../assets/image/Account/NAMe.png')
                  : require('../../assets/image/BlueIcons/Account.png')
              }
              style={{width: 25, height: 25, resizeMode: 'cover'}}
            />
          </View>
        ) : null}

        {this.props.imageIcon === 'email' ? (
          <View
            style={{
              marginTop: 21,
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                !isFocused
                  ? IconPack.GRAY_EMAIL
                  : require('../../assets/image/Profile/Email.png')
              }
              style={{width: 25, height: 25, resizeMode: 'cover'}}
            />
          </View>
        ) : null}
        {this.props.imageIcon === 'Mobile' ? (
          <View
            style={{
              marginTop: 21,
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                !isFocused
                  ? IconPack.GRAY_EMAIL
                  : require('../../assets/image/Profile/mobile.png')
              }
              style={{width: 25, height: 25, resizeMode: 'cover'}}
            />
          </View>
        ) : null}
        {this.props.imageIcon === 'comments' ? (
          <View
            style={{
              marginTop: 21,
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={!isFocused ? IconPack.GRAY_EMAIL : IconPack.REMARK}
              style={{width: 25, height: 25, resizeMode: 'cover'}}
            />
          </View>
        ) : null}
        <View
          style={[
            {
              paddingTop: 16,
              width: '95%',
            },
            {width: this.props.width},
          ]}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
            {...props}
            style={{
              height: 38,
              ...Theme.ffLatoRegular16,
              color: '#000',
              borderBottomWidth: !isFocused ? 0.7 : 2,
              borderBottomColor: !isFocused ? '#a3a3a3' : '#11255a',
              marginLeft: 3,
            }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={this.props.textInputRef}
            onSubmitEditing={this.props.onSubmitEditing}
            returnKeyType="next"
          />
          {isFocused && this.props.value !== '' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 30,
                right: 12,
                bottom: 1,
              }}
              onPress={() => this.props.resetValue()}>
              <Image
                source={IconPack.CLOSE_ONE}
                style={{
                  width: 14,
                  height: 14,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
