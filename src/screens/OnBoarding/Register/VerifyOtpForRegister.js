import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet, ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { Body, Container, Content, Header, Left, Right, Toast } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { connect } from 'react-redux';
import { registerAfterOtpRequest, OTPregisterRequest } from "@register/RegisterAction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '@values/colors';
import IconPack from '@login/IconPack';


const { width, height } = Dimensions.get('window');
const hRem = height / 1600;


class VerifyOtpForRegister extends React.Component {
  constructor(props) {
    super(props);

    const otp = this.props.route.params.otp;
    const mobile = this.props.route.params.mobile;
    const password = this.props.route.params.password;
    const email = this.props.route.params.emailId;
    const org = this.props.route.params.organisation;
    const fullName = this.props.route.params.fullName;


    this.state = {
      finalCode: '',
      code: '',
      receivedOtp: otp,
      receivedMobile: mobile,
      receivedPassword: password,
      receivedFullName: fullName,
      receivedEmail: email,
      receivedOrg: org,
      successOTPRegisterVersion: 0,
      errorOTPRegisterVersion: 0,
      successRegisterVersion: 0,
      errorRegisterVersion: 0,

    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successOTPRegisterVersion, errorOTPRegisterVersion,
      successRegisterVersion, errorRegisterVersion

    } = nextProps;
    let newState = null;

    if (successOTPRegisterVersion > prevState.successOTPRegisterVersion) {
      newState = {
        ...newState,
        successOTPRegisterVersion: nextProps.successOTPRegisterVersion,
      };
    }
    if (errorOTPRegisterVersion > prevState.errorOTPRegisterVersion) {
      newState = {
        ...newState,
        errorOTPRegisterVersion: nextProps.errorOTPRegisterVersion,
      };
    }

    //FOR RESEND OTP
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
    const { OTPregisterData, registerData } = this.props

    if (this.state.successOTPRegisterVersion > prevState.successOTPRegisterVersion) {
      if (registerData.ack === '1') {
        this.props.navigation.navigate('SignIn')
        this.showToast(registerData.msg, 'success')
      }
      else {
        this.showToast('Please contact admin', 'danger')
      }
    }

    if (this.state.errorOTPRegisterVersion > prevState.errorOTPRegisterVersion) {
      this.showToast(this.props.errorMsg, 'danger')
    }

    // FOR RESEND OTP & after Register form Click 
    if (this.state.successRegisterVersion > prevState.successRegisterVersion) {
      if (OTPregisterData.otp != "") {
        this.showToast("OTP sent successfully", 'success')
        this.setState({ receivedOtp: OTPregisterData.otp })
      }
    }
    if (this.state.errorRegisterVersion > prevState.errorRegisterVersion) {
      this.showToast(this.props.errorMsg, 'danger')
    }
  }

  saveCode = (code) => {
    console.log("code", code);

    this.setState({ code: code })
  }

  finalEnteredOtp = (finalCode) => {
    console.log("finalCode", finalCode);

    this.setState({ finalCode: finalCode })
  }


  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    )
  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : "danger",
      duration: duration ? duration : 2500
    });
  }

  verifyOtpForRegister = () => {
    const {
      finalCode, receivedMobile, receivedOtp, receivedPassword,
      receivedFullName, receivedOrg, receivedEmail
    } = this.state;

    console.log("this.state", this.state);


    let error = "";
    try {

      if (finalCode.length !== 4) {
        error = "Please enter OTP";
        throw new Error();
      }
      if (finalCode !== receivedOtp.toString()) {
        error = "Please enter valid OTP";
        throw new Error();
      }
      else {
        const reg_source = Platform.OS === 'ios' ? 'ios' : 'android';

        const data = new FormData();
        data.append('full_name', receivedFullName);
        data.append('mobile_number', receivedMobile);
        data.append('email_id', receivedEmail);
        data.append('organization', receivedOrg);
        data.append('password', receivedPassword);
        data.append('reg_source', reg_source);

        this.props.registerAfterOtpRequest(data)
      }
    } catch (err) {
      console.log("err", err);
      this.showToast(error, 'danger')
    }
  }


  resendOtp = () => {
    const data = new FormData();
    data.append('mobile_number', this.state.receivedMobile);

    this.props.OTPregisterRequest(data)
  }



  render() {
    const { code, finalCode, receivedMobile } = this.state

    return (
      <Container style={styles.containerStyle}>
        <ImageBackground source={IconPack.LOGIN_BG}
          style={styles.bgImage}>
          <Header style={styles.headerStyle}>
            <Left>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image style={styles.backImage}
                  source={require('../../../assets/image/back.png')} />
              </TouchableOpacity>
            </Left>
            <Body />
            <Right />
          </Header>
          <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
            <View style={styles.mainContainerStyle}>
              <Text style={styles.titleStyle}>Verification Code</Text>
              <Text style={styles.descriptionStyle}>
                Enter the OTP sent for verification on mobile number :{' '}
                <Text style={styles.numberStyle}>{receivedMobile}</Text>
              </Text>

              <OTPInputView
                ref={ref => null}
                pinCount={4}
                codeInputFieldStyle={styles.otpInputStyle}
                codeInputHighlightStyle={styles.otpInputHighlightStyle}
                style={styles.otpContainerStyle}
                onCodeChanged={(code) => this.saveCode(code)}
                onCodeFilled={(finalCode) => this.finalEnteredOtp(finalCode)}

              />
              <View style={{ marginBottom: 30, marginTop: hp(2), alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.verifyOtpForRegister()}>
                  <Image
                    style={styles.VerifyButtonStyle}
                    source={require('../../../assets/image/ForwardArrow.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.resendOtp()}>
                <Text
                  style={{
                    color: '#ffffff', fontSize: hp(2),
                    fontFamily: 'Lato-Regular',
                    letterSpacing: 1.3,
                    fontWeight: 'bold'
                  }}>
                  RESEND CODE
                </Text>
              </TouchableOpacity>
            </View>

            {
              this.props.isFetching && this.renderLoader()
            }
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  otpInputStyle: {
    width: 50,
    height: 50,
    color: '#fff',
    borderRadius: 10,
    borderColor: '#c4c0b6',
    borderWidth: 2
  },
  otpInputHighlightStyle: {
    width: 50,
    height: 50,
    color: 'black',
    borderRadius: 10,
    borderColor: '#5a97c2',
  },
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: hp(3.5),
    marginTop: hRem * 160,
  },
  descriptionStyle: {
    color: '#fff',
    marginTop: hp(5),
    fontSize: hp(2.2),
    width: wp(90),
    textAlign: 'center',
  },
  numberStyle: {
    fontSize: 16,
  },
  otpContainerStyle: {
    width: width - 120,
    height: 80,
    marginVertical: 18,
  },
  VerifyButtonStyle: {
    width: 68,
    height: 68,
  },
  backImage: {
    width: 14,
    height: 26,
    marginLeft: 20,
  },
  bgImage: {
    height: '100%',
    width: '100%',
  },
  loaderView: {
    position: 'absolute', height: hp(80), width: wp(100),
    alignItems: 'center', justifyContent: 'center'
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.registerReducer.isFetching,
    error: state.registerReducer.error,
    errorMsg: state.registerReducer.errorMsg,
    successOTPRegisterVersion: state.registerReducer.successOTPRegisterVersion,
    errorOTPRegisterVersion: state.registerReducer.errorOTPRegisterVersion,
    OTPregisterData: state.registerReducer.OTPregisterData,

    successRegisterVersion: state.registerReducer.successRegisterVersion,
    errorRegisterVersion: state.registerReducer.errorRegisterVersion,
    registerData: state.registerReducer.registerData,


  };
}


export default connect(mapStateToProps, { registerAfterOtpRequest, OTPregisterRequest })(VerifyOtpForRegister);
