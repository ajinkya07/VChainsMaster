import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet, ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Body, Container, Content, Header, Left, Right, Toast } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { connect } from 'react-redux';
import { afterOtpRequest, sendOtpRequest } from "@forgotPassword/ForgotAction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '@values/colors';
import IconPack from '@login/IconPack';


const { width, height } = Dimensions.get('window');
const hRem = height / 1600;


class VerifyOtp extends React.Component {
  constructor(props) {
    super(props);

    const otp = this.props.route.params.otp;
    const mobile = this.props.route.params.mobile;
    const password = this.props.route.params.password;

    this.state = {
      finalCode: '',
      code: '',
      receivedOtp: otp,
      receivedMobile: mobile,
      receivedPassword: password,
      successOTPVersion: 0,
      errorOTPVersion: 0,
      successForgotVersion: 0,
      errorForgotVersion: 0,

    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successOTPVersion, errorOTPVersion,
      successForgotVersion, errorForgotVersion

    } = nextProps;
    let newState = null;

    if (successOTPVersion > prevState.successOTPVersion) {
      newState = {
        ...newState,
        successOTPVersion: nextProps.successOTPVersion,
      };
    }
    if (errorOTPVersion > prevState.errorOTPVersion) {
      newState = {
        ...newState,
        errorOTPVersion: nextProps.errorOTPVersion,
      };
    }

    if (successForgotVersion > prevState.successForgotVersion) {
      newState = {
        ...newState,
        successForgotVersion: nextProps.successForgotVersion,
      };
    }
    if (errorForgotVersion > prevState.errorForgotVersion) {
      newState = {
        ...newState,
        errorForgotVersion: nextProps.errorForgotVersion,
      };
    }

    return newState;
  }


  async componentDidUpdate(prevProps, prevState) {
    const { otpData ,forgotData} = this.props

    if (this.state.successOTPVersion > prevState.successOTPVersion) {
      if (otpData.ack === '1') {
        this.props.navigation.navigate('SignIn')
        this.showToast('Password changed successfully', 'success')
      }
      else {
        this.showToast('Please contact admin', 'danger')
      }
    }

    if (this.state.errorOTPVersion > prevState.errorOTPVersion) {
      this.showToast(this.props.errorMsg, 'danger')
    }


    if (this.state.successForgotVersion > prevState.successForgotVersion) {
      if (forgotData.otp != "") {
        this.showToast("OTP sent successfully", 'success')
        this.setState({receivedOtp:forgotData.otp})
      }
    }
    if (this.state.errorForgotVersion > prevState.errorForgotVersion) {
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

  verifyOtp = () => {
    const {
      finalCode, receivedMobile, receivedOtp, receivedPassword
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
        const data = new FormData();
        data.append('mobile_number', receivedMobile);
        data.append('otp', finalCode);
        data.append('password', receivedPassword);

        this.props.afterOtpRequest(data)
      }
    } catch (err) {
      console.log("err", err);
      this.showToast(error, 'danger')
    }
  }


  resendOtp = () => {
    const data = new FormData();
    data.append('mobile_number', this.state.receivedMobile);

    this.props.sendOtpRequest(data)
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
              <View style={{ marginBottom: 30,marginTop:hp(2), alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.verifyOtp()}>
                  <Image
                    style={styles.VerifyButtonStyle}
                    source={require('../../../assets/image/ForwardArrow.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.resendOtp()}>
                <Text
                  style={{ color: '#ffffff', fontSize: hp(2), fontWeight: 'bold',
                  fontFamily: 'Lato-Regular',
                  letterSpacing: 1.3,
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
    borderWidth:2

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
    isFetching: state.forgotReducer.isFetching,
    error: state.forgotReducer.error,
    errorMsg: state.forgotReducer.errorMsg,
    successOTPVersion: state.forgotReducer.successOTPVersion,
    errorOTPVersion: state.forgotReducer.errorOTPVersion,
    otpData: state.forgotReducer.otpData,

    successForgotVersion: state.forgotReducer.successForgotVersion,
    errorForgotVersion: state.forgotReducer.errorForgotVersion,
    forgotData: state.forgotReducer.forgotData,


  };
}


export default connect(mapStateToProps, { afterOtpRequest, sendOtpRequest })(VerifyOtp);
