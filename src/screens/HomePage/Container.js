import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Linking,
} from 'react-native';
import {Icon, Header, Item, Input, Card, Body, Toast} from 'native-base';
import _Container from '@container/_Container';
import {color} from '@values/colors';
import _Tabs from '@tabs/_Tabs';
import HomePageStyle from '@homepage/HomePageStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import {strings} from '@values/strings';
import {getTotalCartCount} from '@homepage/HomePageAction';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import IconPack from '../OnBoarding/Login/IconPack';
import Theme from '../../values/Theme';

var userId = '';

const CallComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginHorizontal: 18,
          borderBottomWidth: 0.8,
          borderColor: '#D3D3D3',
          marginBottom: 10,
          top:10
        }}>
        <Text
          style={{
            ...Theme.ffLatoRegular16,
            color: color.brandColor,
            marginBottom: 7,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCallModalVisible: false,
      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,

    };
    userId = global.userId;
  }

  showCallPopup = () => {
    this.setState({isCallModalVisible: true});
  };

  hideCallPopup = () => {
    this.setState({isCallModalVisible: false});
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successAllParameterVersion,
      errorAllParamaterVersion,
    } = nextProps;
    let newState = null;

    if (successAllParameterVersion > prevState.successAllParameterVersion) {
      newState = {
        ...newState,
        successAllParameterVersion: nextProps.successAllParameterVersion,
      };
    }
    if (errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
      newState = {
        ...newState,
        errorAllParamaterVersion: nextProps.errorAllParamaterVersion,
      };
    }

    return newState;
  }


  onNotificationPress() {
    this.props.navigation.navigate('Notification');
  }

  renderSearchbar = () => {
    this.props.navigation.navigate('SearchScreen');
  };

  renderCall = () => {
    // alert('call');
    this.showCallPopup();
  };


  _pressCall = (phone) => {
    const url = Platform.OS == 'ios' ? `tel://${phone}` : `tel:${phone}`;

    //TODO ios
    //const url = 'tel://+123456789';
    Linking.openURL(url);
  };

  render() {
    const {safeAreaView} = HomePageStyle;

    const {allParameterData} = this.props

    const whatsApp = allParameterData.whatsapp
    const emailID = allParameterData.email
    const call = allParameterData.call

    return (
      <SafeAreaView style={safeAreaView}>
        <_Container
          showHeader
          showSearch
          showNotification
          showCalling
          showLogo={false}
          showBack={false}
          showLoading={false}
          onSearchPress={() => this.renderSearchbar()}
          onCallingPress={() => this.renderCall()}
          onNotificationPress={() => this.onNotificationPress()}>
          <_Tabs count={global.totalCartCount} />
        </_Container>
        
        <Modal
          isVisible={this.state.isCallModalVisible}
          transparent={true}
          onRequestClose={() => this.hideCallPopup()}
          onBackdropPress={() => this.hideCallPopup()}
          onBackButtonPress={() => this.hideCallPopup()}
          style={{margin: 0}}>
          <TouchableWithoutFeedback style={{flex: 1}}>
            <View
              style={{
                marginHorizontal: 16,
                borderRadius: 14,
                backgroundColor:'#FFFFFF'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: color.green,
                  borderTopLeftRadius:10,borderTopRightRadius:10

                }}>
                <Text style={{ fontSize: 20, marginLeft: 20,
                    color: '#FFFFFF',
                    ...Theme.ffLatoMedium18,               
                    marginVertical: Platform.OS === 'android' ? 10 : 12,}}>
                  Get In Touch
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isCallModalVisible: false,
                    })
                  }>
                  <Image
                    style={{width: hp(2.5), height: hp(2.5), margin: 15}}
                    source={IconPack.WHITE_CLOSE}
                  />
                </TouchableOpacity>
              </View>

              <CallComponent title="Phone Call" onPress={()=>this._pressCall(call)} />

              <CallComponent
                title="WhatsApp"
                onPress={() => { Linking.openURL(`whatsapp://send?phone=91${whatsApp}&text=${''}`);
                }}
              />
              <CallComponent
                title="Email"
                onPress={() => { Linking.openURL(`mailto:${emailID}?subject=write a subject`)}}
              />

              <View style={{flexDirection: 'row',justifyContent: 'space-around', }}>
                <ActionButtonRounded
                  title="CANCEL"
                  onButonPress={() => this.setState({isCallModalVisible: false})}
                  containerStyle={{marginBottom: 10,marginTop:10}}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
   
   
      </SafeAreaView>
    );
  }
}

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
    backgroundColor: color.green,
    height: hp(6),
    width: wp(40),
    justifyContent: 'center',
    borderRadius: 45,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ffffff',
    ...Theme.ffLatoBold16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

  };
}

export default connect(
  mapStateToProps,
  {getTotalCartCount},
)(Container);
