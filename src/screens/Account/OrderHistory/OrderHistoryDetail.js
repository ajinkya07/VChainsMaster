import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import _CustomHeader from '@customHeader/_CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {urls} from '@api/urls';
import {
  getOrderHistoryDetails,
  reOrderProduct,
} from '@orderHistory/OrderHistoryAction';
import {Toast} from 'native-base';
import Modal from 'react-native-modal';
import _Text from '@text/_Text';
import {color} from '@values/colors';
import CartContainer from '@cartContainer/CartContainer';
import {getTotalCartCount} from '@homepage/HomePageAction';
import IconPack from '@login/IconPack';
import Theme from '../../../values/Theme';

var userId = '';

class OrderHistoryDetail extends Component {
  constructor(props) {
    super(props);

    const data = this.props.route.params.data;

    this.state = {
      orderItemdata: data,
      successOrderHistoryDetailsVersion: 0,
      errorOrderHistoryDetailsVersion: 0,
      orderHistoryDetailsState: [],

      isImageModalVisibel: false,
      imageToBeDisplayed: '',

      successReOrderVersion: 0,
      errorReOrderVersion: 0,
      reOrderDataState: [],

      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,
      detailModal: false,
    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const {orderItemdata} = this.state;

    const data = new FormData();
    data.append('order_id', orderItemdata.order_id);
    await this.props.getOrderHistoryDetails(data);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successOrderHistoryDetailsVersion,
      errorOrderHistoryDetailsVersion,
      successReOrderVersion,
      errorReOrderVersion,
      successTotalCartCountVersion,
      errorTotalCartCountVersion,
    } = nextProps;

    let newState = null;

    if (
      successOrderHistoryDetailsVersion >
      prevState.successOrderHistoryDetailsVersion
    ) {
      newState = {
        ...newState,
        successOrderHistoryDetailsVersion:
          nextProps.successOrderHistoryDetailsVersion,
      };
    }
    if (
      errorOrderHistoryDetailsVersion >
      prevState.errorOrderHistoryDetailsVersion
    ) {
      newState = {
        ...newState,
        errorOrderHistoryDetailsVersion:
          nextProps.errorOrderHistoryDetailsVersion,
      };
    }

    if (successReOrderVersion > prevState.successReOrderVersion) {
      newState = {
        ...newState,
        successReOrderVersion: nextProps.successReOrderVersion,
      };
    }
    if (errorReOrderVersion > prevState.errorReOrderVersion) {
      newState = {
        ...newState,
        errorReOrderVersion: nextProps.errorReOrderVersion,
      };
    }

    if (successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      newState = {
        ...newState,
        successTotalCartCountVersion: nextProps.successTotalCartCountVersion,
      };
    }
    if (errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      newState = {
        ...newState,
        errorTotalCartCountVersion: nextProps.errorTotalCartCountVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const {
      orderHistoryDetailsData,
      reOrderData,
      totalCartCountData,
    } = this.props;

    if (
      this.state.successOrderHistoryDetailsVersion >
      prevState.successOrderHistoryDetailsVersion
    ) {
      this.setState({
        orderHistoryDetailsState: orderHistoryDetailsData,
      });
    }
    if (
      this.state.errorOrderHistoryDetailsVersion >
      prevState.errorOrderHistoryDetailsVersion
    ) {
      Toast.show({
        text: this.props.errorMsg,
        duration: 2500,
      });
    }

    if (this.state.successReOrderVersion > prevState.successReOrderVersion) {
      this.setState({
        reOrderDataState: reOrderData,
      });

      Toast.show({
        text: this.props.errorMsg,
        duration: 2500,
      });

      const data2 = new FormData();
      data2.append('user_id', userId);
      data2.append('table', 'cart');

      await this.props.getTotalCartCount(data2);

      this.props.navigation.navigate('CartContainer', {
        navigation: this.props.navigation,
      });

      // return (
      //     <CartContainer navigation={this.props.navigation} />
      // )
    }

    if (this.state.errorReOrderVersion > prevState.errorReOrderVersion) {
      Toast.show({
        text: this.props.errorMsg,
        duration: 2500,
      });
    }

    if (
      this.state.successTotalCartCountVersion >
      prevState.successTotalCartCountVersion
    ) {
      global.totalCartCount = totalCartCountData.count;
    }
    if (
      this.state.errorTotalCartCountVersion >
      prevState.errorTotalCartCountVersion
    ) {
      global.totalCartCount = totalCartCountData.count;
    }
  }

  noDataFound = msg => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: hp(80),
        }}>
        <Image
          source={require('../../../assets/gif/noData.gif')}
          style={{height: hp(20), width: hp(20)}}
        />
        <Text style={{fontSize: 18, fontWeight: '400', textAlign: 'center'}}>
          {msg}
        </Text>
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

  showImageModal = item => {
    this.setState({
      imageToBeDisplayed: item,
      isImageModalVisibel: true,
    });
  };

  OrderHistoryDetailComponent = data => {
    return (
      <View style={styles.container}>
        <Text style={styles.productIdText}>Product Id: {data.product_id}</Text>
        <View style={styles.subcontainerView}>
          <View style={styles.imgView}>
            <TouchableOpacity onLongPress={() => this.showImageModal(data)}>
              <Image
                style={styles.imageStyle}
                source={{uri: data.image_zoom}}
                defaultSource={IconPack.APP_LOGO}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentView}>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order date:</Text>
              <Text style={styles.contentText}>{data.value[0]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>delivery date:</Text>
              <Text style={styles.contentText}>{data.value[1]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>quantity:</Text>
              <Text style={styles.contentText}>{data.value[2]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>gross wt:</Text>
              <Text style={styles.contentText}>{parseInt(data.value[3]).toFixed(2)}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>net wt:</Text>
              <Text style={styles.contentText}>{parseInt(data.value[4]).toFixed(2)}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order id:</Text>
              <Text style={styles.contentText}>{data.value[5]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order stage</Text>
              <Text style={styles.contentText}>{data.value[6]}</Text>
            </View>
            <View style={styles.bottomLine}></View>
          </View>
        </View>
      </View>
    );
  };

  reOrderProduct = async () => {
    const {orderItemdata} = this.state;

    const data = new FormData();
    data.append('order_id', orderItemdata.order_id);
    data.append('user_id', userId);

    await this.props.reOrderProduct(data);

    //this.props.navigation.navigate('CartContainer',{navigation:this.props.navigation})

    // return <CartContainer navigation={this.props.navigation} />
  };

  openDetailModal = () => {
    this.setState({
      detailModal: true,
    });
  };

  OrderDetailBottomTab = d => {
    return (
      <View style={styles.cardContainer}>
        <View
          style={{
            flex: 1.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => this.openDetailModal()}>
            <Text style={styles.detailText}>DETAIL</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#fbcb84',
            marginVertical: 5,
          }}
        />
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.reOrderProduct()}>
            <Text style={styles.detailText}>RE-ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {orderHistoryDetailsData} = this.props;
    const {imageToBeDisplayed} = this.state;


    const summaryData = orderHistoryDetailsData && orderHistoryDetailsData.order_summary

    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#f3fcf9'}}>
          <_CustomHeader
            Title="Order History Details"
          //  RightBtnIcon1={require('../../../assets/image/BlueIcons/Search-White.png')}
            RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
            LeftBtnPress={() => this.props.navigation.goBack()}
           // RightBtnPressOne={() =>this.props.navigation.navigate('SearchScreen')}
            RightBtnPressTwo={() =>
              this.props.navigation.navigate('Notification')
            }
            rightIconHeight2={hp(3.5)}
            backgroundColor="#19af81"
          />

          {orderHistoryDetailsData && (
            <FlatList
              data={orderHistoryDetailsData.order_details}
              refreshing={this.props.isFetching}
              // onRefresh={() => this.scrollDownToRefreshWishList()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={{}}>{this.OrderHistoryDetailComponent(item)}</View>
              )}
              keyExtractor={(item, index) => index}
            />
          )}

          {orderHistoryDetailsData &&
            this.OrderDetailBottomTab(orderHistoryDetailsData.order_details)}

          {this.state.isImageModalVisibel && (
            <View>
              <Modal
                style={{justifyContent: 'center'}}
                isVisible={this.state.isImageModalVisibel}
                onRequestClose={() =>
                  this.setState({isImageModalVisibel: false})
                }
                onBackdropPress={() =>
                  this.setState({isImageModalVisibel: false})
                }
                onBackButtonPress={() =>
                  this.setState({isImageModalVisibel: false})
                }>
                <SafeAreaView>
                  <View
                    style={{
                      height: hp(42),
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <_Text fsMedium style={{marginTop: hp(0.5)}}>
                      Code: {imageToBeDisplayed.product_id}
                    </_Text>
                    <View
                      style={{
                        marginTop: 5,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        width: wp(90),
                      }}
                    />
                    <Image
                      source={{uri: imageToBeDisplayed.image_zoom}}
                      defaultSource={require('../../../assets/image/default.png')}
                      style={{
                        height: hp(35),
                        width: wp(90),
                        marginTop: hp(1),
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                </SafeAreaView>
              </Modal>
            </View>
          )}

          {this.state.detailModal && (
            <Modal
              isVisible={this.state.detailModal}
              transparent={true}
              onRequestClose={() => this.setState({detailModal: false})}
              onBackdropPress={() => this.setState({detailModal: false})}
              onBackButtonPress={() => this.setState({detailModal: false})}
              style={{
                justifyContent: 'flex-end',
                marginBottom: hp(8),
                marginLeft: 10,
                marginRight: 10,

                alignItems: 'center',
              }}>
              <SafeAreaView>
                <View
                  style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    paddingHorizontal: hp(1),
                    borderColor: color.gray,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      marginHorizontal: 4,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: color.brandColor,
                      }}>
                      Order History Summary
                    </Text>

                    <TouchableOpacity
                      hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                      onPress={() => this.setState({detailModal: false})}>
                      <Image
                        style={{
                          alignSelf: 'flex-end',
                          height: hp(2),
                          width: hp(2),
                          marginTop: 3,
                        }}
                        source={require('../../../assets/image/BlueIcons/Cross.png')}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginVertical: 8,
                      borderBottomColor: 'gray',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      width: wp(88),
                    }}
                  />

                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <_Text fsPrimary fwSmall>Order No.</_Text>
                    <_Text fsPrimary fwSmall>{summaryData.order_no}</_Text>
                 
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <_Text fsPrimary fwSmall>Total Items</_Text>
                  <_Text fsPrimary fwSmall>{summaryData.total_items}</_Text>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <_Text fsPrimary fwSmall>Total weight</_Text>
                  <_Text fsPrimary fwSmall>{summaryData.total_weight}</_Text>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: 10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <_Text fsPrimary fwSmall>Order Date</_Text>
                  <_Text fsPrimary fwSmall>{summaryData.order_date}</_Text>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          )}

          {this.props.isFetching ? this.renderLoader() : null}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#a3a3a3',
    fontSize: 13,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    height: 36,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#11255a',
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  border: {
    borderBottomColor: '#a3a3a3',
    borderBottomWidth: 0.3,
    marginHorizontal: 5,
  },
  bottomContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 5,
    marginTop: 5,
  },
  imageStyle: {
    width: hp(9),
    height: hp(17),
    resizeMode: 'contain',
    borderRadius: 5,
    marginLeft: -10,
  },
  cardContainer: {
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    justifyContent: 'space-between',
    backgroundColor: '#11255a',
    height: 48,
    flexDirection: 'row',
  },
  detailText: {
    color: '#fbcb84',
  },
  container: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: Platform.OS === 'ios' ? 10 : 15,
    backgroundColor: '#f3fcf9',
  },
  productIdText: {
    textAlign: 'center',
    marginBottom: 20,
    ...Theme.ffLatoBold13,
    color: '#000',
  },
  subcontainerView: {
    flexDirection: 'row',
  },
  imgView: {
    flex: 1.1,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    flex: 3,
  },
  rowTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  contentText: {
    color: '#808080',
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.orderHistoryReducer.isFetching,
    error: state.orderHistoryReducer.error,
    errorMsg: state.orderHistoryReducer.errorMsg,
    successOrderHistoryDetailsVersion:
      state.orderHistoryReducer.successOrderHistoryDetailsVersion,
    errorOrderHistoryDetailsVersion:
      state.orderHistoryReducer.errorOrderHistoryDetailsVersion,
    orderHistoryDetailsData: state.orderHistoryReducer.orderHistoryDetailsData,

    successReOrderVersion: state.orderHistoryReducer.successReOrderVersion,
    errorReOrderVersion: state.orderHistoryReducer.errorReOrderVersion,
    reOrderData: state.orderHistoryReducer.reOrderData,

    successTotalCartCountVersion:
      state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion:
      state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,
  };
}

export default connect(
  mapStateToProps,
  {getOrderHistoryDetails, reOrderProduct, getTotalCartCount},
)(OrderHistoryDetail);
