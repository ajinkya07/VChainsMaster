import React, {useState, Component} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconPack from '@login/IconPack';
const {width, height} = Dimensions.get('window');
import {
  validateEmail,
  validateMobNum,
  validateName,
  validatePassword,
  validateUserName,
} from '@values/validate';
import {color} from '@values/colors';

class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
      isValid: undefined,
      showPassword: false,
      secureInput: false,
    };
  }

  onChangeText = text => {
    const {
      type,
      inputKey,
      onChangeText,
      minLength,
      maxLength,
      inputId,
    } = this.props;
    let isValid = false;

    console.log('this.props', this.props);
    console.log('text', text);

    if (text && text.length > 0) {
      switch (type) {
        case 'mobileNo':
          isValid = validateMobNum(text);
          break;

        case 'emailId':
          isValid = validateEmail(text);
          break;

        case 'password':
          isValid = validatePassword(text);
          break;

        case 'fullName':
          isValid = validateName(text);
          break;

        case 'organisation':
          isValid = validateName(text);
          break;

        default:
          break;
      }
    }
    this.setState({isValid, text});
    onChangeText && onChangeText({inputKey, isValid, value: text, inputId});
  };

  setSecureInput = secureInput => {
    if (this.props.isSecure) {
      this.setState({
        secureInput: !this.state.secureInput,
      });
    }
  };

  render() {
    const {
      containerStyle,
      isSecure,
      placeholder,
      maxLength,
      minLength,
      keyboardType,
      ref,
      returnKeyType,
      textInputRef,
      onSubmitEditing,
      placeholderTextColor,
      Icon,
    } = this.props;
    const {isPasswordField, secureInput} = this.state;

    return (
      <View
        style={[loginFieldsStyles.mainContainerStyle, containerStyle || null]}>
        <TextInput
          maxLength={maxLength}
          minLength={minLength}
          style={loginFieldsStyles.textInput}
          placeholderTextColor={loginFieldsStyles.whiteColor}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          selectionColor={loginFieldsStyles.whiteColor}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={this.onChangeText}
          secureTextEntry={isSecure && !secureInput}
          keyboardType={keyboardType ? keyboardType : 'default'}
          ref={textInputRef}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        <View style={loginFieldsStyles.loginIconStyle}>
          <Image
            style={loginFieldsStyles.userTextInputButtonLeft}
            source={Icon}
          />
        </View>
        {isSecure && (
          <View style={loginFieldsStyles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setSecureInput(secureInput)}>
              <Image
                style={loginFieldsStyles.userTextInputButtonRight}
                source={!secureInput ? IconPack.UNHIDE : IconPack.HIDE}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const loginFieldsStyles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    backgroundColor: '#FFFFFF25',
    borderRadius: 40,
    paddingLeft: 42,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.9,
  },
  whiteColor: {
    color: '#fff',
  },
  mainContainerStyle: {
    height: 70,
    width: width - 36,
    //width: Appstore.wWidth -30,
  },
  userTextInputButtonRight: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  userTextInputButtonLeft: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  buttonStyle: {
    position: 'absolute',
    right: 12,
    top: 20,
    bottom: 0,
    justifyContent: 'center',
  },
  loginIconStyle: {
    position: 'absolute',
    right: 0,
    top: 20,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
  },
});

export default LoginFields;
