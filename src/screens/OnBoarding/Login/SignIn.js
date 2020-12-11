import React, { useState, Component, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Container, Content, Icon, Toast } from 'native-base';
import IconPack from '@login/IconPack';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from '@values/colors';
import {
  validateEmail,
  validateMobNum,
  validateName,
  validatePassword,
  validateUserName,
} from '@values/validate';

import AsyncStorage from '@react-native-community/async-storage';
import { signInRequest, sendFCM } from '@login/LoginAction';

const { width, height } = Dimensions.get('window');


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successLoginVersion: 0,
      errorLoginVersion: 0,

      successFcmVersion: 0,
      errorFcmVersion: 0,
    };
    this.mobileRef = React.createRef();
    this.passwordRef = React.createRef();
    userId = global.userId;

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successLoginVersion, errorLoginVersion,
      successFcmVersion, errorFcmVersion
    } = nextProps;
    let newState = null;

    if (successLoginVersion > prevState.successLoginVersion) {
      newState = {
        ...newState,
        successLoginVersion: nextProps.successLoginVersion,
      };
    }
    if (errorLoginVersion > prevState.errorLoginVersion) {
      newState = {
        ...newState,
        errorLoginVersion: nextProps.errorLoginVersion,
      };
    }
    if (successFcmVersion > prevState.successFcmVersion) {
      newState = {
        ...newState,
        successFcmVersion: nextProps.successFcmVersion,
      };
    }
    if (errorFcmVersion > prevState.errorFcmVersion) {
      newState = {
        ...newState,
        errorFcmVersion: nextProps.errorFcmVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.successLoginVersion > prevState.successLoginVersion) {
      if (this.props.loginData.user_status === 'Available') {
        // this.showToast('Login successfull', 'success');
        // this.props.navigation.navigate('Container');
        this.sendFcmToken()

      } else {
        this.showToast('Please contact admin', 'danger');
      }
    }

    if (this.state.errorLoginVersion > prevState.errorLoginVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
    if (this.state.successFcmVersion > prevState.successFcmVersion) {
      this.props.navigation.navigate('Container');
    }

    if (this.state.errorFcmVersion > prevState.errorFcmVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }

  sendFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    const fcmData = new FormData();

    fcmData.append('worker_id', userId);
    fcmData.append('type', 'client');
    fcmData.append('gcm_no', fcmToken);

    await this.props.sendFCM(fcmData)

  }


  onInputChanged = ({ inputKey, isValid, value }) => {
    let validationKey = '';
    switch (inputKey) {
      case 'mobileNo':
        validationKey = 'isMobile';
        break;

      case 'password':
        validationKey = 'isPassword';
        break;
      default:
        break;
    }

    this.setState({
      [inputKey]: value,
      [validationKey]: isValid,
    });
  };

  renderLoader() {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );
  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  loginRequest = () => {
    const { password, isPassword, mobileNo, isMobile } = this.state;

    let error = '';
    try {
      if (mobileNo == '') {
        error = 'Please enter mobile number';
        throw new Error();
      }
      if (!isMobile) {
        error = 'Please enter valid mobile number';
        throw new Error();
      }
      if (password == '') {
        error = 'Please enter password';
        throw new Error();
      } else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);
        data.append('password', password);
        data.append('login_type', 'client');

        this.props.signInRequest(data);
      }
    } catch (err) {
      console.log('err', err);
      this.showToast(error, 'danger');
    }
  };

  showLoader = () => {
    return (
      <View style={[actionButtonRoundedStyle.mainContainerStyle]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      </View>
    );
  };

  render() {
    const { mobileNo, password } = this.state;

    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.select({
                ios: -150,
                android: 500,
              })}
              style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <Content
                  contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.viewContainer}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: hp(10),
                        height: hp(19),
                      }}>


                      <Text style={{
                        fontFamily: 'Lato-Bold',
                        textAlign: 'center', letterSpacing: 2, fontSize: 30, color: '#FFFFFF',
                      }}>
                        V CHAINS
                      </Text>
                      <Text style={{
                        fontFamily: 'Lato-Regular', marginTop: hp(0.5),
                        fontSize: 14, color: '#0d185c', textAlign: 'center'
                      }}>
                        THE CHAIN WIZARDS
                      </Text>
                    </View>


                    <LoginFields
                      value={mobileNo ? mobileNo : null}
                      type="mobileNo"
                      inputKey="mobileNo"
                      maxLength={10}
                      minLength={10}
                      onChangeText={this.onInputChanged}
                      placeholder="Mobile"
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      placeholderTextColor="#ffffff"
                      Icon={IconPack.MOBILE_LOGO}
                      onSubmitEditing={() => this.passwordRef.current.focus()}
                    />
                    <LoginFields
                      value={password ? password : null}
                      type="password"
                      inputKey="password"
                      maxLength={50}
                      minLength={4}
                      onChangeText={this.onInputChanged}
                      placeholder="Password"
                      returnKeyType="done"
                      secureTextEntry
                      placeholderTextColor="#ffffff"
                      isSecure={true}
                      Icon={IconPack.KEY_LOGO}
                      textInputRef={this.passwordRef}
                    />

                    <View style={{ justifyContent: 'flex-end', marginLeft: 110 }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassword')
                        }>
                        <Text
                          style={{
                            paddingVertical: 22,
                            fontSize: 18,
                            //color: '#fbcb84',
                            color: '#ffffff',
                            marginBottom: 10,
                            fontFamily: 'Lato-Regular',
                          }}>
                          Forgot your password ?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {!this.props.isFetching && (
                      <ActionButtonRounded
                        title="LOGIN"
                        onButonPress={() => this.loginRequest()}
                        containerStyle={styles.buttonStyle}
                      />
                    )}

                    {this.props.isFetching && this.showLoader()}

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          paddingTop: 12,
                          fontSize: 18,
                          //color: '#fbcb84',
                          color: '#FFFFFF',
                          fontFamily: 'Lato-Regular',
                        }}>
                        Don't have an account ?
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Register')
                        }>
                        <Text
                          style={{
                            fontSize: 18,
                            //color: '#fbcb84',
                            color: '#ffffff',
                            fontFamily: 'Lato-Bold',
                            paddingTop: 12,
                            marginLeft: 5,
                          }}>
                          Signup
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Content>
              </ScrollView>
            </KeyboardAvoidingView>
            {/* {this.props.isFetching && this.renderLoader()} */}
          </SafeAreaView>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    height: '100%',
    width: '100%',
  },
  flex: { flex: 1 },
  buttonStyle: {
    //marginTop: 60,
  },
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.loginReducer.isFetching,
    error: state.loginReducer.error,
    errorMsg: state.loginReducer.errorMsg,
    successLoginVersion: state.loginReducer.successLoginVersion,
    errorLoginVersion: state.loginReducer.errorLoginVersion,
    loginData: state.loginReducer.loginData,

    successFcmVersion: state.loginReducer.successFcmVersion,
    errorFcmVersion: state.loginReducer.errorFcmVersion,
    fcmData: state.loginReducer.fcmData,

  };
}

export default connect(mapStateToProps, { signInRequest, sendFCM })(SignIn);

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

        case 'firstName':
          isValid = validateName(text);
          break;

        case 'lastName':
          isValid = validateName(text);
          break;

        default:
          break;
      }
    }
    this.setState({ isValid, text });
    onChangeText && onChangeText({ inputKey, isValid, value: text, inputId });
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
      placeholderTextColor,
      Icon,
      keyboardType,
      ref,
      returnKeyType,
      textInputRef,
      onSubmitEditing,
    } = this.props;
    const { isPasswordField, secureInput } = this.state;

    return (
      <View
        style={[loginFieldsStyles.mainContainerStyle, containerStyle || null]}>
        <TextInput
          maxLength={maxLength}
          minLength={minLength}
          style={loginFieldsStyles.textInput}
          placeholderTextColor={'#FFFFFF'}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          selectionColor={'#FFFFFF'}
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
        <Image style={loginFieldsStyles.imageloginIconStyle} source={Icon} />
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
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 20,
    backgroundColor: '#FFFFFF25',
    borderRadius: 40,
    paddingLeft: 42,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.9,
  },
  whiteColor: {
    color: '#FFFFFF',
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
  imageloginIconStyle: {
    position: 'absolute',
    right: 0,
    top: 34,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: 22,
    height: 22,
  },
});

//-------------ActionButtonCommon-----------//
const ActionButtonRounded = ({ title, onButonPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle.mainContainerStyle,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <Text style={actionButtonRoundedStyle.titleStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle = StyleSheet.create({
  mainContainerStyle: {
    //backgroundColor: '#FFFFFF',
    height: 50,
    width: width - 36,
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ffffff',
    fontSize: hp(2),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    letterSpacing: 1.3,
  },
});
