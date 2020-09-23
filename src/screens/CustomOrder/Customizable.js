import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Content,
  Icon,
  Picker,
  ActionSheet,
  Toast,
} from 'native-base';
import IconPack from '@login/IconPack';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import moment from 'moment';
import {color} from '@values/colors';
import {submitCustomOrder} from '@customOrder/CustomOrderAction';
import Theme from '../../values/Theme';
import {ScrollView} from 'react-native-gesture-handler';

var BUTTONS = ['Take Photo', 'Choose from Library', 'Cancel'];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

var userId = '';
var karatIds=[]


const {width, height} = Dimensions.get('window');

class Customizable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      karatValue: '',
      grossWeight: '',
      netWeight: '',
      length: '',
      size: '',
      quantity: '',
      hookType: '',
      color: '',
      diameter: '',
      remark: '',
      isDateTimePickerVisible: false,
      imageUrl: '',
      date: '',
      imageData: '',

      successCustomOrderVersion: 0,
      errorCustomOrderVersion: 0,

      karat:{},
      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,
      
    };

    userId = global.userId;

    this.lengthRef = React.createRef();
    this.sizeRef = React.createRef();
    this.netWeightRef = React.createRef();
    this.quantityRef = React.createRef();
    this.hookTypeRef = React.createRef();
    this.colorTypeRef = React.createRef();
    this.diameterRef = React.createRef();
    this.remarkRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {successCustomOrderVersion, errorCustomOrderVersion, 
      successAllParameterVersion,errorAllParamaterVersion
    } = nextProps;
    let newState = null;

    if (successCustomOrderVersion > prevState.successCustomOrderVersion) {
      newState = {
        ...newState,
        successCustomOrderVersion: nextProps.successCustomOrderVersion,
      };
    }
    if (errorCustomOrderVersion > prevState.errorCustomOrderVersion) {
      newState = {
        ...newState,
        errorCustomOrderVersion: nextProps.errorCustomOrderVersion,
      };
    }

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

  async componentDidUpdate(prevProps, prevState) {
    
    const {customOrderData} = this.props;

    if (this.state.successCustomOrderVersion > prevState.successCustomOrderVersion ) {
      if (customOrderData.ack == '1') {
        Toast.show({
          text: this.props.errorMsg
            ? this.props.errorMsg
            : 'Order placed successfully',
          type: 'success',
        });

        this.setState({
          grossWeight: '',
          netWeight: '',
          length: '',
          quantity: '',
          remark: '',
          imageUrl: '',
          date: '',
          imageData: '',
        });
      }
    }
    if (this.state.errorCustomOrderVersion > prevState.errorCustomOrderVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }

  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    });
  };

  handleDatePicked(date) {
    let d = moment(new Date(date).toISOString().slice(0, 10)).format('DD-MM-YYYY',);

    this.setState({
      date: d,
      isDateTimePickerVisible: false,
    });
    // this.hideDateTimePicker();
  }

  handleGrossWeightChange = newText =>
    this.setState({
      grossWeight: newText,
      netWeight:newText
    });

  handleNetWeightChange = newText =>
    this.setState({
      netWeight: newText,
    });

  handleSizeChange = newText =>
    this.setState({
      size: newText,
    });

  handleLengthChange = newText =>
    this.setState({
      length: newText,
    });
  handleQuantityChange = newText =>
    this.setState({
      quantity: newText,
    });
  handleHookTypeChange = newText =>
    this.setState({
      hookType: newText,
    });
  handleColorChange = newText =>
    this.setState({
      color: newText,
    });

  handleDiameterChange = newText =>
    this.setState({
      diameter: newText,
    });

  handleRemarkChange = newText =>
    this.setState({
      remark: newText,
    });

  // image selection

  showActionSheet = () => {
    return ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: {
            this.openCamera();
            break;
          }
          case 1: {
            this.openImagePicker();
            break;
          }
        }
      },
    );
  };


  openCamera = () => {
    ImagePicker.openCamera({
      width: wp(95),
      height: hp(35),
      cropping: false,
      includeBase64: true,
      hideBottomControls: true,
    }).then(image => {
      this.setState({imageUrl: image.path, imageData: image});
    });
  };


  openImagePicker = () => {
    ImagePicker.openPicker({
      width: wp(95),
      height: hp(35),
      includeBase64: true,
      cropping: false,
      hideBottomControls: true,
    }).then(image => {
      this.setState({imageUrl: image.path, imageData: image});
    });
  };

  submitCustomOrder = async () => {
    const {
      imageData,
      grossWeight,
      karatValue,
      netWeight,
      size,
      length,
      quantity,
      hookType,
      color,
      diameter,
      remark,
      imageUrl,
      date,
    } = this.state;

    var timeStamp = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    var timeStampDate = moment(
      new Date(timeStamp).toISOString().slice(0, 10),
    ).format('DD-MM-YYYY');

    var photo = {
      uri:
        Platform.OS === 'android'
          ? imageData.path
          : imageData.path.replace('file://', ''),
      type: imageData.mime,
      name: imageData.modificationDate + '.jpg',
    };

    if (!grossWeight) {
      this.showToast('Please enter gross weight', 'danger');
    } else if (!netWeight) {
      this.showToast('Please enter net weight', 'danger');
    } else if (!length) {
      this.showToast('Please enter length', 'danger');
    }  else if (!quantity) {
      this.showToast('Please enter quantity', 'danger');
    }  else if (!date) {
      this.showToast('Please select delivery date', 'danger');
    } else if (date != '' && timeStampDate > date) {
      alert('Date must be 10 days greater');
    }
    else if (!imageUrl) {
      this.showToast('Please add image', 'danger');
    } else {
      const data = new FormData();

      data.append('user_id', userId);
      data.append('gross_wt', grossWeight);
      data.append('net_wt', netWeight);
      data.append('length', length);
      data.append('delivery_date', date);
      data.append('remark', remark);
      data.append('file', photo);
      data.append('melting_id', karatValue);
      data.append('quantity', quantity);


      await this.props.submitCustomOrder(data);
    }
  };



  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  
  setSelectedValue = karat => {
    this.setState({
      karatValue: karat,
    });
  };



  PickerDropDown = () => {
    const {karatValue} = this.state;
    const{allParameterData} = this.props

    let list = allParameterData && allParameterData.melting

    return (
      <View>
        <Picker
          iosIcon={
            <Image
              source={IconPack.DOWN_ARROW}
              style={{width: 12, height: 12, resizeMode: 'cover'}}
            />
          }
          mode="dropdown"
          style={{height: 40, width: wp(55)}}
          selectedValue={karatValue}
          onValueChange={(itemValue, itemIndex) =>this.setSelectedValue(itemValue)
          }>
          {list && list.length > 0 ? (
            list.map((listItem, index) => (
              <Picker.Item label={(listItem.melting_name).toString()} value={parseInt(`${listItem.id}`)} />
              )))

            : null
          }
        </Picker>
      </View>
    );
  };


  renderLoader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: hp(100),
          width: wp(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };



  render() {
    const {isDateTimePickerVisible} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <Container
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#f3fcf9',
              }}>
              {this.state.imageUrl == '' && (
                <Image
                  style={{
                    width: wp(95),
                    height: hp(30),
                    resizeMode: 'contain',
                  }}
                  source={IconPack.APP_LOGO}
                />
              )}
              {this.state.imageUrl !== '' && (
                <Image
                  style={{
                    width: wp(95),
                    height: hp(30),
                    resizeMode: 'contain',
                  }}
                  source={{uri: this.state.imageUrl}}
                />
              )}
            </View>

            <View
              style={{
                backgroundColor: '#f3fcf9',
                flex: 2,
              }}>
              <View
                style={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: '#ffffff',
                }}>
                <View style={{marginHorizontal: 16, marginTop: 20}}>
                  <FloatingLabelTextInput
                    label="Gross Weight (gm)"
                    value={this.state.grossWeight}
                    onChangeText={this.handleGrossWeightChange}
                    resetValue={this.resetFieldGross}
                    width="100%"
                    keyboardType="numeric"
                    onSubmitEditing={() => this.netWeightRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Net Weight (gm)"
                    value={this.state.netWeight}
                    onChangeText={this.handleNetWeightChange}
                    resetValue={this.resetFieldNet}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.netWeightRef}
                    onSubmitEditing={() => this.lengthRef.current.focus()}
                  />

                  <FloatingLabelTextInput
                    label="Length (Inches)"
                    value={this.state.length}
                    onChangeText={this.handleLengthChange}
                    resetValue={this.resetFieldLength}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.lengthRef}
                    onSubmitEditing={() => this.quantityRef.current.focus()}
                  />
{/* 
                  <FloatingLabelTextInput
                    label="Size (Inches)"
                    value={this.state.size}
                    onChangeText={this.handleSizeChange}
                    resetValue={this.resetFieldSize}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.sizeRef}
                    onSubmitEditing={() => this.quantityRef.current.focus()}
                  /> */}

                  <FloatingLabelTextInput
                    label="Quantity"
                    value={this.state.quantity}
                    onChangeText={this.handleQuantityChange}
                    resetValue={this.resetFieldQuantity}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.quantityRef}
                    onSubmitEditing={() => this.remarkRef.current.focus()}
                  />
                 
                  {/* <FloatingLabelTextInput
                    label="Hook Type"
                    value={this.state.hookType}
                    onChangeText={this.handleHookTypeChange}
                    resetValue={this.resetFieldHook}
                    width="100%"
                    textInputRef={this.hookTypeRef}
                    onSubmitEditing={() => this.colorTypeRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Color"
                    value={this.state.color}
                    onChangeText={this.handleColorChange}
                    resetValue={this.resetFieldColor}
                    width="100%"
                    textInputRef={this.colorTypeRef}
                    onSubmitEditing={() => this.diameterRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Diameter"
                    value={this.state.diameter}
                    onChangeText={this.handleDiameterChange}
                    resetValue={this.resetDiameter}
                    width="100%"
                    textInputRef={this.diameterRef}
                    onSubmitEditing={() => this.remarkRef.current.focus()}
                  /> */}

                  <FloatingLabelTextInput
                    label="Remarks"
                    value={this.state.remark}
                    onChangeText={this.handleRemarkChange}
                    resetValue={this.resetFieldRemark}
                    width="100%"
                    textInputRef={this.remarkRef}
                  />
                  <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop:10}}>
                    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                      <Text
                        style={{
                          ...Theme.ffLatoRegular16,
                          color: '#000000',
                          marginLeft: 10,
                        }}>
                        Melting
                      </Text>
                    </View>
                    {this.PickerDropDown()}
                    {/* <PickerDropDown /> */}
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: '#a3a3a3',
                        width: '100%',
                        height: 32,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.showDateTimePicker()}>
                        <Text
                          style={{
                            color: !this.state.date ? '#a3a3a3' : 'black',
                            marginTop: 5,
                            fontSize: 16,
                            marginLeft: 10,
                          }}>
                          {!this.state.date ? 'Delivery Date' : this.state.date}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {isDateTimePickerVisible && (
                    <DateTimePicker
                      isVisible={isDateTimePickerVisible}
                      onConfirm={date => this.handleDatePicked(date)}
                      onCancel={() => hideDateTimePicker()}
                    />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={{position: 'absolute', top: height / 3.8, right: wp(6)}}>
            <TouchableOpacity onPress={() => this.showActionSheet()}>
              <Image
                style={{
                  //position: 'absolute',
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
                source={IconPack.PLUS_ICON}
              />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => this.submitCustomOrder()}>
            <View
              style={{
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#11255a',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}>
              <Text style={{fontSize: 16, color: '#fbcb84'}}>SUBMIT ORDER</Text>
            </View>
          </TouchableOpacity>

          {this.props.isFetching && this.renderLoader()} */}
        </Container>
        <TouchableOpacity onPress={() => this.submitCustomOrder()}>
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#11255a',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <Text style={{fontSize: 16, color: '#fbcb84'}}>SUBMIT ORDER</Text>
          </View>
        </TouchableOpacity>

        {this.props.isFetching && this.renderLoader()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  textWrapper: {
    height: hp('90%'),
    width: wp('80%'),
    backgroundColor: 'yellow',
  },
  myText: {
    fontSize: hp('15%'),
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.customOrderReducer.isFetching,
    error: state.customOrderReducer.error,
    errorMsg: state.customOrderReducer.errorMsg,
    successCustomOrderVersion:state.customOrderReducer.successCustomOrderVersion,
    errorCustomOrderVersion: state.customOrderReducer.errorCustomOrderVersion,
    customOrderData: state.customOrderReducer.customOrderData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

  };
}

export default connect(mapStateToProps, {submitCustomOrder})(Customizable);
