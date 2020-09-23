import React, { Component } from 'react';
import { color } from '@values/colors';
import { View, Image, Platform, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Input, Item, Label } from 'native-base';
import { validateEmail, validateMobNum, validateName, validatePassword, validateUserName } from "@values/validate";


export default class _FloatingInputBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: undefined,
      isValid: undefined,
      showPassword: false,
      isFocused: false,
    };
  }


  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  onChangeText = text => {
    const {
      type,
      inputKey,
      onChangeText,
      minLength,
      maxLength,
      inputId
    } = this.props;
    let isValid = false;

    if (text && text.length > 0) {
      switch (type) {

        case "mobileNumber":
          isValid = validateMobNum(text);
          break;

        case "emailId":
          isValid = validateEmail(text);
          break;

        case "password":
          isValid = validatePassword(text);
          break;

        case "firstName":
          isValid = validateName(text);
          break;

        case "lastName":
          isValid = validateName(text);
          break;

        case "userName":
          isValid = validateUserName(text);
          break;

        default:
          break;
      }
    }
    this.setState({ isValid, text });
    onChangeText && onChangeText({ inputKey, isValid, value: text, inputId });
  };


  render() {
    const { label, zeroMarginFromLeft, secureText, maxLength, value, style, keyboardType, onFocus, minLength, disabled, ...props } = this.props

    const { isFocused } = this.state;

    const labelStyle = {
      position: 'absolute',
      left: zeroMarginFromLeft ? 5 : 20,
      top: !isFocused && value === null ? hp(3.5) : value === '' ? hp(3.5): 0,
      fontSize: 14,
      color: color.textNote
      // fontSize: !isFocused && value === null ? 16 : value=== '' ? 16 : 14 ,

      // color: !isFocused && value === null  ? '#aaa' : value === '' ? '#aaa' : '#000',
    };
    return (
      <View style={{ paddingTop: 15 }}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <Input
            {...props}
            style={{ width: wp(90), alignSelf: 'center', height: Platform.OS === 'ios' ? hp(4.6) : hp(5.2),fontSize: hp(2),  color: color.teritaryGray, borderBottomWidth: 1, borderBottomColor: color.textNote }} 
            secureTextEntry={secureText}
            maxLength={maxLength}
            onChangeText={this.onChangeText}
            value={value}
            disabled={disabled ? disabled : false}
            minLength={minLength}
            keyboardType={keyboardType || "default"}
            // style={{ width: wp(85), fontSize: hp(2), alignSelf: 'center', color: color.teritaryGray, secureText }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
      </View>
    );
  }
}
