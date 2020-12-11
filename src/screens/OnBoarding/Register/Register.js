import React, { useState, Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Toast,
} from 'native-base';
import IconPack from '@login/IconPack';
import { color } from '@values/colors';
import { OTPregisterRequest } from '@register/RegisterAction';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import {
  validateEmail,
  validateMobNum,
  validateName,
  validatePassword,
  validateUserName,
} from '@values/validate';


const { width, height } = Dimensions.get('window');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      isFullName: false,
      emailId: '',
      isEmail: false,
      organisation: '',
      isOrganisation: false,
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successRegisterVersion: 0,
      errorRegisterVersion: 0,
    };
    this.fullNameRef = React.createRef();
    this.mobileRef = React.createRef();
    this.emailRef = React.createRef();
    this.organisationRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successRegisterVersion, errorRegisterVersion } = nextProps;
    let newState = null;

    if (successRegisterVersion > prevState.successRegisterVersion) {
      newState = {
        ...newState,
        successRegisterVersion: nextProps.successRegisterVersion,
      };
    }
    if (errorRegisterVersion > prevState.errorRegisterVersion) {
      newState = {
        ...newState,
        errorRegisterVersion: nextProps.errorRegisterVersion,
      };
    }
    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { OTPregisterData } = this.props;

    if (this.state.successRegisterVersion > prevState.successRegisterVersion) {
      if (OTPregisterData.otp != '') {
        this.showToast('OTP sent successfully', 'success');
        this.props.navigation.navigate('VerifyOtpForRegister', {
          mobile: OTPregisterData.mobile_number,
          otp: OTPregisterData.otp,
          password: this.state.password,
          emailId: this.state.emailId,
          organisation: this.state.organisation,
          fullName: this.state.fullName,
        });
      } else {
        this.showToast('Please contact admin', 'danger');
      }
    }
    if (this.state.errorRegisterVersion > prevState.errorRegisterVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }

  onInputChanged = ({ inputKey, isValid, value }) => {
    let validationKey = '';
    switch (inputKey) {
      case 'fullName':
        validationKey = 'isFullName';
        break;

      case 'mobileNo':
        validationKey = 'isMobile';
        break;

      case 'emailId':
        validationKey = 'isEmail';
        break;

      case 'organisation':
        validationKey = 'isOrganisation';
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

  register = () => {
    const {
      password,
      isPassword,
      mobileNo,
      isMobile,
      fullName,
      isFullName,
      organisation,
      isOrganisation,
      emailId,
      isEmail,
    } = this.state;

    let error = '';
    try {
      if (fullName === '') {
        error = 'Please enter full name';
        throw new Error();
      }
      if (mobileNo === '') {
        error = 'Please enter mobile number';
        throw new Error();
      }
      if (!isMobile) {
        error = 'Please enter valid mobile number';
        throw new Error();
      }
      if (emailId === '') {
        error = 'Please enter email address';
        throw new Error();
      }
      if (!isEmail) {
        error = 'Please enter valid email address';
        throw new Error();
      }
      if (organisation === '') {
        error = 'Please enter organisation name';
        throw new Error();
      }
      if (password == '') {
        error = 'Please enter password';
        throw new Error();
      }
      if (!isPassword) {
        error = 'Password must be atleast 4 character long';
        throw new Error();
      } else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);

        this.props.OTPregisterRequest(data);
      }
    } catch (err) {
      this.showToast(error, 'danger');
    }
  };

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );
  };

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  render() {

    const { fullName, emailId, organisation, mobileNo, password } = this.state;

    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.select({
                ios: -100,
                android: 500,
              })}
              style={{ flex: 1 }}>
              <Header style={styles.headerStyle}>
                <Left>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      style={styles.backImage}
                      source={require('../../../assets/image/back.png')}
                    />
                  </TouchableOpacity>
                </Left>
                <Body />
                <Right />
              </Header>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={styles.viewContainer}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: hp(4),
                      height: hp(15),
                    }}>
                    <Text style={{
                      fontFamily: 'Lato-Bold', textAlign: 'center',
                      letterSpacing: 2, fontSize: 30, color: '#FFFFFF',
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
                    value={fullName ? fullName : null}
                    type="fullName"
                    inputKey="fullName"
                    maxLength={100}
                    minLength={3}
                    onChangeText={this.onInputChanged}
                    placeholder="Full name"
                    returnKeyType="next"
                    placeholderTextColor="#ffffff"
                    Icon={IconPack.PROFILE}
                    onSubmitEditing={() => this.mobileRef.current.focus()}
                  />
                  <LoginFields
                    value={mobileNo ? mobileNo : null}
                    type="mobileNo"
                    inputKey="mobileNo"
                    maxLength={10}
                    minLength={10}
                    onChangeText={this.onInputChanged}
                    placeholder="Mobile"
                    returnKeyType="next"
                    placeholderTextColor="#ffffff"
                    Icon={IconPack.MOBILE_LOGO}
                    keyboardType="phone-pad"
                    textInputRef={this.mobileRef}
                    onSubmitEditing={() => this.emailRef.current.focus()}
                  />
                  <LoginFields
                    value={emailId ? emailId : null}
                    type="emailId"
                    inputKey="emailId"
                    maxLength={100}
                    minLength={3}
                    onChangeText={this.onInputChanged}
                    placeholder="Email"
                    returnKeyType="next"
                    placeholderTextColor="#ffffff"
                    Icon={IconPack.EMAIL}
                    textInputRef={this.emailRef}
                    onSubmitEditing={() => this.organisationRef.current.focus()}
                  />
                  <LoginFields
                    value={organisation ? organisation : null}
                    type="organisation"
                    inputKey="organisation"
                    placeholder="Organisation"
                    maxLength={100}
                    minLength={3}
                    onChangeText={this.onInputChanged}
                    returnKeyType="next"
                    placeholderTextColor="#ffffff"
                    Icon={IconPack.ORGANISATION}
                    textInputRef={this.organisationRef}
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
                  <ActionButtonRounded
                    title="REGISTER"
                    onButonPress={() => this.register()}
                    containerStyle={styles.buttonStyle}
                  />
                </View>
              </ScrollView>
              {this.props.isFetching && this.renderLoader()}
            </KeyboardAvoidingView>
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
    marginTop: 30,
    marginBottom: 50,
  },
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: 14,
    height: 26,
    marginLeft: 20,
  },
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.registerReducer.isFetching,
    error: state.registerReducer.error,
    errorMsg: state.registerReducer.errorMsg,
    successRegisterVersion: state.registerReducer.successRegisterVersion,
    errorRegisterVersion: state.registerReducer.errorRegisterVersion,
    OTPregisterData: state.registerReducer.OTPregisterData,
  };
}

export default connect(mapStateToProps, { OTPregisterRequest })(Register);


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
    //backgroundColor: '#11255a',
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
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    letterSpacing: 1.3,
  },
});
