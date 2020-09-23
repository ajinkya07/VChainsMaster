import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
const {width, height} = Dimensions.get('window');
import {sendOtpRequest} from '@forgotPassword/ForgotAction';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginFields from '@login/LoginFields';
import {color} from '@values/colors';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successForgotVersion: 0,
      errorForgotVersion: 0,
    };
    this.mobileRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {successForgotVersion, errorForgotVersion} = nextProps;
    let newState = null;

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
    const {forgotData} = this.props;

    if (this.state.successForgotVersion > prevState.successForgotVersion) {
      if (forgotData.otp != '') {
        this.showToast('OTP sent successfully', 'success');
        this.props.navigation.navigate('VerifyOtp', {
          mobile: forgotData.mobile_number,
          otp: forgotData.otp,
          password: this.state.password,
        });
      } else {
        this.showToast('Please contact admin', 'danger');
      }
    }
    if (this.state.errorForgotVersion > prevState.errorForgotVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }

  onInputChanged = ({inputKey, isValid, value}) => {
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

  sendOtp = () => {
    const {password, isPassword, mobileNo, isMobile} = this.state;

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
      }
      if (!isPassword) {
        error = 'Password must be atleast 4 character long';
        throw new Error();
      } else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);

        this.props.sendOtpRequest(data);
      }
    } catch (err) {
      console.log('err', err);
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
    const {mobileNo, password} = this.state;

    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.select({
                ios: -90,
                android: 0,
              })}
              style={{flex: 1}}>
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
                      alignItems:'center',
                      marginTop:hp(3),
                      height: hp(19),
                    }}>
                    
                    <View style={{marginBottom: hp(5)}}>
                    <Text style={{fontFamily: 'Lato-Bold',textAlign:'center',
                     letterSpacing: 2,fontSize: 30, color: '#FFFFFF',}}>
                        V CHAINS
                      </Text>
                      <Text style={{
                          fontFamily: 'Lato-Regular', marginTop:hp(0.5),
                          fontSize: 14, color: '#0d185c',textAlign:'center'
                        }}>
                          THE CHAIN WIZARDS
                      </Text>

                    </View>

                    <Text
                      style={{
                        fontSize: hp(2.2),
                        color: '#ffffff',marginHorizontal:20,
                        textAlign: 'center',
                        fontFamily: 'Lato-Regular',
                      }}>
                      Enter the Mobile No. associated with your Account
                    </Text>
                  </View>
            

                  <View style={{ marginTop: hp(3) }}>
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
                      onSubmitEditing={() => this.passwordRef.current.focus()}
                    />
                    <LoginFields
                      value={password ? password : null}
                      type="password"
                      inputKey="password"
                      maxLength={10}
                      minLength={10}
                      onChangeText={this.onInputChanged}
                      placeholder=" New Password"
                      returnKeyType="done"
                      secureTextEntry
                      placeholderTextColor="#ffffff"
                      isSecure={true}
                      Icon={IconPack.KEY_LOGO}
                      textInputRef={this.passwordRef}
                    />

                  </View>
                  <ActionButtonRounded
                    title="GET OTP"
                    onButonPress={() => this.sendOtp()}
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
  flex: {flex: 1},
  buttonStyle: {
    marginTop: 65,
    marginBottom: 22,
  },
  loaderView: {
    position: 'absolute',
    height: hp(80),
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
    isFetching: state.forgotReducer.isFetching,
    error: state.forgotReducer.error,
    errorMsg: state.forgotReducer.errorMsg,
    successForgotVersion: state.forgotReducer.successForgotVersion,
    errorForgotVersion: state.forgotReducer.errorForgotVersion,
    forgotData: state.forgotReducer.forgotData,
  };
}

export default connect(
  mapStateToProps,
  {sendOtpRequest},
)(ForgotPassword);

//-------------ActionButtonCommon-----------//
const ActionButtonRounded = ({title, onButonPress, containerStyle}) => {
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

//-----------xxxxx//----------------------//
