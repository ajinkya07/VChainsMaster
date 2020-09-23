import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Toast,
  Fab,
  Picker,
} from 'native-base';
import IconPack from '@login/IconPack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { color } from '@values/colors';
import {
  getCartData,
  getWishlistData,
  deleteCartWishListProduct,
  getTotalCartCount,
  moveProduct,
  clearAllCart,
  clearAllWishList,
  updateEditedCartProduct,
  placeOrderFromCart,

  getCartSummary,
  getCartWeight
} from '@cartContainer/CartContainerAction';
import { connect } from 'react-redux';
import { urls } from '@api/urls';
import Modal from 'react-native-modal';
import { withNavigationFocus } from '@react-navigation/compat';
import { strings } from '@values/strings';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Theme from '../../values/Theme';

var userId = '';

const { width } = Dimensions.get('window');

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
    backgroundColor: color.green,
    height: 42,
    width: width - 36,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});

const ActionButtonRounded2 = ({ title, onButonPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle2.mainContainerStyle2,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle2.innerContainer2}>
          <Text style={actionButtonRoundedStyle2.titleStyle2}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle2 = StyleSheet.create({
  mainContainerStyle2: {
    backgroundColor: '#11255a',
    height: 44,
    width: width - 60,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer2: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle2: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      isToggle: false,
      isToogleTwo: false,
      cartStateData: [],
      wishStateData: [],
      openMoreDetailsIdwish: '',
      openMoreDetailsIdCart: '',

      successCartVersion: 0,
      errorCartVersion: 0,

      successWishlistVersion: 0,
      errorWishlistVersion: 0,

      isCartImageModalVisibel: false,
      imageToBeDisplayed: '',

      successDeleteProductVersion: 0,
      errorDeleteProductVersion: 0,

      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,

      successMoveProductVersion: 0,
      errorMoveProductVersion: 0,

      successClearAllCartVersion: 0,
      errorClearAllCartVersion: 0,

      successClearAllWislistVersion: 0,
      errorClearAllWislistVersion: 0,

      shoPlaceOrderView: false,
      comments: '',
      productcode: '',
      productName: '',
      quantity: '',
      length: '',
      weightArr: [],
      weight:'',
      isModalVisible: false,
      date: '',
      isPlaceOrderModalVisible: false,
      isContinueModalVisible: false,
      isDeleteCartVisible: false,
      isCartWeightSummeryVisible: false,
      name: '',
      mobileNo: '',
      comments1: '',
      value: '',
      email: '',
      isDateTimePickerVisible: false,

      successEditCartProductVersion: 0,
      errorEditCartProductVersion: 0,
      editStateData: '',

      successPlaceOrderVersion: 0,
      errorPlaceOrderVersion: 0,

      errorCartSummaryVersion: 0,
      successCartSummaryVersion: 0,

      errorCartWeightVersion: 0,
      successCartWeightVersion: 0,


    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    const data = new FormData();
    data.append('user_id', userId);
    data.append('table', 'cart');

    await this.props.getCartData(data);

    const data2 = new FormData();
    data2.append('user_id', userId);
    data2.append('table', 'wishlist');

    await this.props.getWishlistData(data2);

    await this.props.getCartSummary(data)

    const data3 = new FormData()
    data3.append('user_id', userId)

    await this.props.getCartWeight(data3)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successCartVersion,
      errorCartVersion,
      successWishlistVersion,
      errorWishlistVersion,
      successDeleteProductVersion,
      errorDeleteProductVersion,
      successTotalCartCountVersion,
      errorTotalCartCountVersion,
      successMoveProductVersion,
      errorMoveProductVersion,
      successClearAllCartVersion,
      errorClearAllCartVersion,
      successClearAllWislistVersion,
      errorClearAllWislistVersion,
      successEditCartProductVersion,
      errorEditCartProductVersion,
      successPlaceOrderVersion,
      errorPlaceOrderVersion,
      errorCartSummaryVersion,
      successCartSummaryVersion,
      errorCartWeightVersion,
      successCartWeightVersion

    } = nextProps;

    let newState = null;

    if (successCartVersion > prevState.successCartVersion) {
      newState = {
        ...newState,
        successCartVersion: nextProps.successCartVersion,
      };
    }
    if (errorCartVersion > prevState.errorCartVersion) {
      newState = {
        ...newState,
        errorCartVersion: nextProps.errorCartVersion,
      };
    }
    if (successWishlistVersion > prevState.successWishlistVersion) {
      newState = {
        ...newState,
        successWishlistVersion: nextProps.successWishlistVersion,
      };
    }
    if (errorWishlistVersion > prevState.errorWishlistVersion) {
      newState = {
        ...newState,
        errorWishlistVersion: nextProps.errorWishlistVersion,
      };
    }

    if (successDeleteProductVersion > prevState.successDeleteProductVersion) {
      newState = {
        ...newState,
        successDeleteProductVersion: nextProps.successDeleteProductVersion,
      };
    }
    if (errorDeleteProductVersion > prevState.errorDeleteProductVersion) {
      newState = {
        ...newState,
        errorDeleteProductVersion: nextProps.errorDeleteProductVersion,
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

    if (successMoveProductVersion > prevState.successMoveProductVersion) {
      newState = {
        ...newState,
        successMoveProductVersion: nextProps.successMoveProductVersion,
      };
    }
    if (errorMoveProductVersion > prevState.errorMoveProductVersion) {
      newState = {
        ...newState,
        errorMoveProductVersion: nextProps.errorMoveProductVersion,
      };
    }

    if (successClearAllCartVersion > prevState.successClearAllCartVersion) {
      newState = {
        ...newState,
        successClearAllCartVersion: nextProps.successClearAllCartVersion,
      };
    }
    if (errorClearAllCartVersion > prevState.errorClearAllCartVersion) {
      newState = {
        ...newState,
        errorClearAllCartVersion: nextProps.errorClearAllCartVersion,
      };
    }

    if (
      successClearAllWislistVersion > prevState.successClearAllWislistVersion
    ) {
      newState = {
        ...newState,
        successClearAllWislistVersion: nextProps.successClearAllWislistVersion,
      };
    }
    if (errorClearAllWislistVersion > prevState.errorClearAllWislistVersion) {
      newState = {
        ...newState,
        errorClearAllWislistVersion: nextProps.errorClearAllWislistVersion,
      };
    }

    if (
      successEditCartProductVersion > prevState.successEditCartProductVersion
    ) {
      newState = {
        ...newState,
        successEditCartProductVersion: nextProps.successEditCartProductVersion,
      };
    }
    if (errorEditCartProductVersion > prevState.errorEditCartProductVersion) {
      newState = {
        ...newState,
        errorEditCartProductVersion: nextProps.errorEditCartProductVersion,
      };
    }

    if (successPlaceOrderVersion > prevState.successPlaceOrderVersion) {
      newState = {
        ...newState,
        successPlaceOrderVersion: nextProps.successPlaceOrderVersion,
      };
    }
    if (errorPlaceOrderVersion > prevState.errorPlaceOrderVersion) {
      newState = {
        ...newState,
        errorPlaceOrderVersion: nextProps.errorPlaceOrderVersion,
      };
    }

    if (successCartSummaryVersion > prevState.successCartSummaryVersion) {
      newState = {
        ...newState,
        successCartSummaryVersion: nextProps.successCartSummaryVersion,
      };
    }
    if (errorCartSummaryVersion > prevState.errorCartSummaryVersion) {
      newState = {
        ...newState,
        errorCartSummaryVersion: nextProps.errorCartSummaryVersion,
      };
    }

    if (successCartWeightVersion > prevState.successCartWeightVersion) {
      newState = {
        ...newState,
        successCartWeightVersion: nextProps.successCartWeightVersion,
      };
    }
    if (errorCartWeightVersion > prevState.errorCartWeightVersion) {
      newState = {
        ...newState,
        errorCartWeightVersion: nextProps.errorCartWeightVersion,
      };
    }
    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { cartData, wishlistData, totalCartCountData, cartWeightData } = this.props;


    if (prevProps.isFocused !== this.props.isFocused) {
      const data3 = new FormData();
      data3.append('user_id', userId);
      data3.append('table', 'cart');

      await this.props.getCartData(data3);

      const data4 = new FormData();
      data4.append('user_id', userId);
      data4.append('table', 'wishlist');

      await this.props.getWishlistData(data4);

      await this.props.getCartSummary(data3)

      const ss = new FormData()
      ss.append('user_id', userId)

      await this.props.getCartWeight(ss)

    }

    if (this.state.successCartVersion > prevState.successCartVersion) {
      this.setState({
        cartStateData: cartData,
      });
    }
    if (this.state.successWishlistVersion > prevState.successWishlistVersion) {
      this.setState({
        wishStateData: wishlistData,
      });
    }

    if (
      this.state.successDeleteProductVersion >
      prevState.successDeleteProductVersion
    ) {
      Toast.show({
        text: this.props.errorMsg ? this.props.errorMsg : '',
        duration: 2500,
      });
      const data5 = new FormData();
      data5.append('user_id', userId);
      data5.append('table', 'cart');

      await this.props.getCartData(data5);

      const data6 = new FormData();
      data6.append('user_id', userId);
      data6.append('table', 'wishlist');

      await this.props.getWishlistData(data6);

      if (this.state.currentPage == 0) {
        const data7 = new FormData();
        data7.append('user_id', userId);
        data7.append('table', 'cart');

        await this.props.getTotalCartCount(data7);

        await this.props.getCartSummary(data7)

        const d3 = new FormData()
        d3.append('user_id', userId)

        await this.props.getCartWeight(d3)
      }
    }

    if (
      this.state.errorDeleteProductVersion > prevState.errorDeleteProductVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
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

    if (this.state.successMoveProductVersion > prevState.successMoveProductVersion) {
      Toast.show({
        text: this.props.errorMsg ? this.props.errorMsg : '',
        duration: 2500,
      });
      const data9 = new FormData();
      data9.append('user_id', userId);
      data9.append('table', 'cart');

      await this.props.getCartData(data9);

      const data8 = new FormData();
      data8.append('user_id', userId);
      data8.append('table', 'wishlist');

      await this.props.getWishlistData(data8);

      await this.props.getCartSummary(data9)

      const d4 = new FormData()
      d4.append('user_id', userId)

      await this.props.getCartWeight(d4)
    }

    if (this.state.errorMoveProductVersion > prevState.errorMoveProductVersion) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
      });

      const wt = new FormData();
      wt.append('user_id', userId);
      wt.append('table', 'cart');

      await this.props.getCartSummary(wt)

      const d4 = new FormData()
      d4.append('user_id', userId)

      await this.props.getCartWeight(d4)
    }

    if (
      this.state.successClearAllCartVersion >
      prevState.successClearAllCartVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
      });

      const c = new FormData();
      c.append('user_id', userId);
      c.append('table', 'cart');

      await this.props.getCartData(c);
      const dd = new FormData();
      dd.append('user_id', userId);
      dd.append('table', 'cart');

      await this.props.getTotalCartCount(dd);
    }
    if (
      this.state.errorClearAllCartVersion > prevState.errorClearAllCartVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
      });
    }

    if (
      this.state.successClearAllWislistVersion >
      prevState.successClearAllWislistVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
      });

      const w = new FormData();
      w.append('user_id', userId);
      w.append('table', 'wishlist');

      await this.props.getWishlistData(w);
    }

    if (
      this.state.errorClearAllWislistVersion >
      prevState.errorClearAllWislistVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
      });
    }

    if (
      this.state.successEditCartProductVersion >
      prevState.successEditCartProductVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
      });

      const a = new FormData();
      a.append('user_id', userId);
      a.append('table', 'cart');

      await this.props.getCartData(a);

      await this.props.getCartSummary(a)

      const d5 = new FormData()
      d5.append('user_id', userId)

      await this.props.getCartWeight(d5)

      this.setState({ editStateData: '', isModalVisible: false });
    }

    if (
      this.state.errorEditCartProductVersion >
      prevState.errorEditCartProductVersion
    ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
      });
    }

    if (
      this.state.successPlaceOrderVersion > prevState.successPlaceOrderVersion
    ) {
      const da = new FormData();
      da.append('user_id', userId);
      da.append('table', 'cart');

      await this.props.getTotalCartCount(da);

      const c2 = new FormData();
      c2.append('user_id', userId);
      c2.append('table', 'cart');

      await this.props.getCartData(c2);

      this.setState({
        isPlaceOrderModalVisible: false,
      });
    }

    if (this.state.errorPlaceOrderVersion > prevState.errorPlaceOrderVersion) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        duration: 2500,
        type: 'danger',
      });
    }
  }

  renderLoader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: hp(80),
          width: wp(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  noDataFound = msg => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          bottom: hp(30),
        }}>
        <Image
          source={require('../../assets/gif/noData.gif')}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>
          {msg}
        </Text>
      </View>
    );
  };

  setToggleView = data => {
    this.setState({
      isToggle: !this.state.isToggle,
      openMoreDetailsIdwish: data.cart_wish_id,
    });
  };

  moveFromwishlist = async k => {
    const moveToData = new FormData();
    moveToData.append('user_id', userId);
    moveToData.append('to_table', 'cart');
    moveToData.append('from_table', 'wishlist');
    moveToData.append('id', k.cart_wish_id);

    await this.props.moveProduct(moveToData);

    const d = new FormData();
    d.append('user_id', userId);
    d.append('table', 'cart');

    await this.props.getTotalCartCount(d);
  };

  moveFromCart = async m => {
    const moveToData1 = new FormData();
    moveToData1.append('user_id', userId);
    moveToData1.append('to_table', 'wishlist');
    moveToData1.append('from_table', 'cart');
    moveToData1.append('id', m.cart_wish_id);

    await this.props.moveProduct(moveToData1);

    const d = new FormData();
    d.append('user_id', userId);
    d.append('table', 'cart');

    await this.props.getTotalCartCount(d);
  };

  wishListView = data => {
    const { isToggle, openMoreDetailsIdwish } = this.state;

    let baseurl = urls.imageUrl + data.zoom_image;

    return (
      <TouchableOpacity onPress={() => this.setToggleView(data)}>
        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <TouchableOpacity onLongPress={() => this.showImageModal(data)}>
              <Image
                style={styles.imgStyle}
                source={{ uri: baseurl + data.images }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>
              {data.collection_sku_code}
            </Text>
            <Text style={styles.textColor}>{data.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image
              source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToggle && openMoreDetailsIdwish === data.cart_wish_id ? (
          <>
            <View style={styles.tabCartMiddleContainer}>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>gross wt:</Text>
                <Text style={styles.text}>{parseInt(data.values[0]).toFixed(2)}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>net wt:</Text>
                <Text style={styles.text}>{parseInt(data.values[1]).toFixed(2)}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>quantity:</Text>
                <Text style={styles.text}>{data.values[2]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>remarks: </Text>
                <Text style={styles.text}> {data.values[3]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>length:</Text>
                <Text style={styles.text}>{data.values[4]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>weight:</Text>
                <Text style={styles.text}>{parseInt(data.values[5]).toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.tabCartBottomContainer}>
              <TouchableOpacity onPress={() => this.moveFromwishlist(data)}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.MOVE_TO}
                  />
                  <Text style={styles.btnText}>MOVE TO CART</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteFromWishlist(data)}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.DELETE}
                  />
                  <Text style={styles.btnText}>DELETE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };

  deleteFromCart = async i => {
    const deleteData = new FormData();
    deleteData.append('user_id', userId);
    deleteData.append('table', 'cart');
    deleteData.append('id', i.cart_wish_id);

    await this.props.deleteCartWishListProduct(deleteData);
  };

  deleteFromWishlist = async j => {
    const wishData = new FormData();
    wishData.append('user_id', userId);
    wishData.append('table', 'wishlist');
    wishData.append('id', j.cart_wish_id);

    await this.props.deleteCartWishListProduct(wishData);
  };

  favoriteDetail = k => {
    return (
      <FlatList
        data={k}
        refreshing={this.props.isFetching}
        onRefresh={() => this.scrollDownToRefreshWishList()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1) }}>
            {this.wishListView(item)}
          </View>
        )}
        keyExtractor={(item, index) => item.cart_wish_id.toString()}
        style={{ marginTop: hp(1) }}
      />
    );
  };

  scrollDownToRefreshWishList = () => {
    const wishDataRefresh = new FormData();
    wishDataRefresh.append('user_id', userId);
    wishDataRefresh.append('table', 'wishlist');

    this.props.getWishlistData(wishDataRefresh);
  };

  setCartToggleView = data => {
    this.setState({
      isToogleTwo: !this.state.isToogleTwo,
      openMoreDetailsIdCart: data.cart_wish_id,
    });
  };

  editCartProduct = editData => {
    console.warn("editData",editData);
    this.setState({
      isModalVisible: true,
      productcode: editData.collection_sku_code,
      productName: editData.collection_name,
      quantity: editData.values[2],
      comments: editData.values[3] !== null ? editData.values[3] : '',
      length: editData.values[4],
      weightArr: editData.weight,
      editStateData: editData,
    });
  };

  closeEditModal = () => {
    this.setState({ isModalVisible: false });
  };

  handleProductcodeChange = newText => {
    this.setState({
      productcode: newText,
    });
  };
  handleProductNameChange = newText => {
    this.setState({
      productName: newText,
    });
  };
  handleQuantityChange = newText => {
    this.setState({
      quantity: newText,
    });
  };
  handleLengthChange = newText => {
    this.setState({
      length: newText,
    });
  };
  handleCommentsChange = newText => {
    this.setState({
      comments: newText,
    });
  };
  resetFieldProductCode = () => {
    this.setState({
      productcode: '',
    });
  };
  resetFieldQuantity = () => {
    this.setState({
      quantity: '',
    });
  };
  resetFieldProductName = () => {
    this.setState({
      productName: '',
    });
  };
  resetFieldComment = () => {
    // this.setState({
    //   comments: '',
    // });
    this.handleCommentsChange('');
  };

  resetFieldLength = () => {
    this.setState({
      length: '',
    });
  };

  setSelectedValue = value => {
    this.setState({
      weight: value,
    });
  };

  // cart view

  cartView = item => {
    const { isToogleTwo, openMoreDetailsIdCart } = this.state;

    let baseurl2 = urls.imageUrl + item.zoom_image;

    return (
      <TouchableOpacity onPress={() => this.setCartToggleView(item)}>
        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <TouchableOpacity onLongPress={() => this.showImageModal(item)}>
              <Image
                style={styles.imgStyle}
                source={{ uri: baseurl2 + item.images }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>
              {item.collection_sku_code}
            </Text>
            <Text style={styles.textColor}>{item.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image
              source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToogleTwo && openMoreDetailsIdCart === item.cart_wish_id ? (
          <>
            <View style={styles.tabCartMiddleContainer}>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>gross wt:</Text>
                <Text style={styles.text}>{parseInt(item.values[0]).toFixed(2)}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>net wt:</Text>
                <Text style={styles.text}>{parseInt(item.values[1]).toFixed(2)}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>quantity:</Text>
                <Text style={styles.text}>{item.values[2]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>remarks: </Text>
                <Text style={styles.text}>{item.values[3]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>length:</Text>
                <Text style={styles.text}>{item.values[4]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>weight:</Text>
                <Text style={styles.text}>{parseInt(item.values[5]).toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.tabCartBottomContainer}>
              <TouchableOpacity onPress={() => this.editCartProduct(item)}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.EDIT}
                  />
                  <Text style={styles.btnText}>EDIT</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.moveFromCart(item)}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.MOVE_TO}
                  />
                  <Text style={styles.btnText}>MOVE TO WISHLIST</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteFromCart(item)}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.DELETE}
                  />
                  <Text style={styles.btnText}>DELETE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };

  //FOR PLACE ORDER MODAL

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
    let d1 = moment(new Date(date).toISOString().slice(0, 10)).format(
      'DD-MM-YYYY',
    );

    this.setState({
      date: d1,
      isDateTimePickerVisible: false,
    });
  }

  handleNameChange = newText =>
    this.setState({
      name: newText,
    });

  handleEmailChange = newText =>
    this.setState({
      email: newText,
    });
  handleMobileChange = newText =>
    this.setState({
      mobileNo: newText,
    });
  handleCommentsChange1 = newText =>
    this.setState({
      comments1: newText,
    });

  resetFieldEmail = () =>
    this.setState({
      email: '',
    });

  resetFieldEmail1 = () =>
    this.setState({
      email: '',
    });
  resetFieldName = () =>
    this.setState({
      name: '',
    });
  resetFieldMobileNo = () =>
    this.setState({
      mobileNo: '',
    });
  resetFieldComment1 = () =>
    this.setState({
      comments: '',
    });

  CartDetails = cartData => {
    return (
      <FlatList
        data={cartData}
        refreshing={this.props.isFetching}
        onRefresh={() => this.scrollDownToRefreshCart()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
            {this.cartView(item)}
          </View>
        )}
        keyExtractor={(item, index) => item.cart_wish_id.toString()}
        style={{ marginTop: hp(1) }}
      />
    );
  };

  scrollDownToRefreshCart = () => {
    const refreshData = new FormData();
    refreshData.append('user_id', userId);
    refreshData.append('table', 'cart');

    this.props.getCartData(refreshData);
  };

  showImageModal = item => {
    this.setState({
      imageToBeDisplayed: item,
      isCartImageModalVisibel: true,
    });
  };

  openDeleteAllCartModal = () => [this.setState({ isDeleteCartVisible: true })];

  deleteAllProduct = () => {
    const { currentPage } = this.state;

    const deleteData = new FormData();
    deleteData.append('user_id', userId);
    deleteData.append('table', currentPage == 0 ? 'cart' : 'wishlist');

    if (currentPage == 0) {
      this.props.clearAllCart(deleteData);
      this.setState({ isDeleteCartVisible: false });
    } else if (currentPage == 1) {
      this.props.clearAllWishList(deleteData);
      this.setState({ isDeleteCartVisible: false });
    }
  };

  placeOrderView = async () => {
    let n = await AsyncStorage.getItem('fullName');
    let e = await AsyncStorage.getItem('emailId');
    let m = await AsyncStorage.getItem('mobileNumber');

    this.setState({
      isPlaceOrderModalVisible: true,
      isContinueModalVisible: false,
      name: n,
      email: e,
      mobileNo: m,
    });
  };

  placeOrderContinue = () => {
    this.setState({
      isContinueModalVisible: true,
    });
  };

  closePlaceOrder = () => {
    this.setState({
      isPlaceOrderModalVisible: false,
    });
  };

  closeSummeryModal = () => {
    this.setState({
      isCartWeightSummeryVisible: false,
    });
  };

  updateCartProduct = async () => {
    const { editStateData, quantity, weight, comments, length } = this.state;

    const edit = new FormData();

    edit.append('table', 'cart');
    edit.append('user_id', userId);
    edit.append('cart_wish_id', editStateData.cart_wish_id);
    edit.append('weight', parseInt(weight));
    edit.append('quantity', quantity);
    edit.append('remarks', comments);
    edit.append('length', length);

    await this.props.updateEditedCartProduct(edit);
  };

  placeOrderFromCart = async () => {
    const { comments1, date } = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let name = await AsyncStorage.getItem('fullName');
    let emailId = await AsyncStorage.getItem('emailId');
    let mobileNumber = await AsyncStorage.getItem('mobileNumber');

    const orderData = new FormData();

    orderData.append('user_id', userId);
    orderData.append('full_name', name);
    orderData.append('email_id', emailId);
    orderData.append('mobile_number', mobileNumber);
    orderData.append('delivery_date', date);
    orderData.append('which_device', type);
    orderData.append('remarks', comments1);

    var timeStamp = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    var timeStampDate = moment(
      new Date(timeStamp).toISOString().slice(0, 10),
    ).format('DD-MM-YYYY');

    if (!date) {
      Toast.show({
        text: 'Please select a date',
        type: 'danger',
        duration: 2500,
      });
      alert('Please select a date');
    } else if (date != '' && timeStampDate < date) {
      this.props.placeOrderFromCart(orderData);
    } else {
      alert('Date must be 10 days greater');
    }
  };

  render() {
    const { cartData, wishlistData, isFetching, cartSummaryData,cartWeightData } = this.props;
    const {
      wishStateData,
      cartStateData,
      isCartImageModalVisibel,
      isDateTimePickerVisible,
      imageToBeDisplayed,
      weight,
      weightArr
    } = this.state;


    const cartSummary = cartSummaryData && cartSummaryData.cart_summary && cartSummaryData.cart_summary.product_master
    const cartWeight= cartWeightData && cartWeightData.data && cartWeightData.data.cart_data

    const totalWT = cartWeightData && cartWeightData.data && cartWeightData.data.total_weight;

    const totalQuantity = cartWeightData && cartWeightData.data && cartWeightData.data.total_quantity;

    let url = urls.imageUrl + 'public/backend/product_images/zoom_image/';

    return (
      <Container style={{ flex: 1 }}>
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: '#19af81' }}
          onChangeTab={({ i }) => this.setState({ currentPage: i })}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#f3fcf9' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage
                      ? require('../../assets/image/GreyCart.png')
                      : require('../../assets/image/BlueIcons/Green-Cart.png')
                  }
                />
              </TabHeading>
            }>
            {cartData.length > 0 && !isFetching && this.CartDetails(cartData)}
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#f3fcf9' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage
                      ? require('../../assets/image/BlueIcons/Green-Heart.png')
                      : require('../../assets/image/GreyHeart.png')
                  }
                />
              </TabHeading>
            }>
            {wishlistData.length > 0 &&
              !isFetching &&
              this.favoriteDetail(wishlistData)}
          </Tab>
        </Tabs>

        {cartData.length > 0 && this.state.currentPage === 0 ? (
          <View
            style={{
              height: 52,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <ActionButtonRounded
              title="CART WEIGHT"
              onButonPress={() =>
                this.setState({ isCartWeightSummeryVisible: true })
              }
              containerStyle={styles.buttonStyle}
            />
            <ActionButtonRounded
              title="PLACE ORDER"
              onButonPress={() => this.placeOrderContinue()}
              containerStyle={styles.buttonStyle}
            />
          </View>
        ) : null}

        {this.props.isFetching ? this.renderLoader() : null}

        {!this.props.isFetching &&
          this.props.cartData.length === 0 &&
          this.state.currentPage === 0
          ? this.noDataFound(this.props.errorMsgCart)
          : null}
        {!this.props.isFetching &&
          this.props.wishlistData.length === 0 &&
          this.state.currentPage === 1
          ? this.noDataFound(this.props.errorMsgWishlist)
          : null}

        {this.state.isCartImageModalVisibel && (
          <View>
            <Modal
              style={{ justifyContent: 'center' }}
              isVisible={this.state.isCartImageModalVisibel}
              onRequestClose={() =>
                this.setState({ isCartImageModalVisibel: false })
              }
              onBackdropPress={() =>
                this.setState({ isCartImageModalVisibel: false })
              }
              onBackButtonPress={() =>
                this.setState({ isCartImageModalVisibel: false })
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
                  <_Text fsMedium style={{ marginTop: hp(0.5) }}>
                    Code: {imageToBeDisplayed.collection_sku_code}
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
                    source={{ uri: url + imageToBeDisplayed.images }}
                    defaultSource={require('../../assets/image/default.png')}
                    style={{
                      height: hp(35),
                      width: wp(90),
                      marginTop: hp(1),
                    }}
                    resizeMode="cover"
                  />
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        )}

        {this.state.currentPage == 0 && cartData.length > 0 && (
          <TouchableOpacity
            hitSlop={{
              position: 'absolute',
              top: 5,
              bottom: 5,
              left: 5,
              right: 5,
            }}
            style={styles.bottomView}
            onPress={() => this.openDeleteAllCartModal()}>
            <Image
              source={require('../../assets/image/Delete.png')}
              style={{ height: hp(3), width: hp(3) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {this.state.currentPage == 1 && wishlistData.length > 0 && (
          <TouchableOpacity
            hitSlop={{
              position: 'absolute',
              top: 5,
              bottom: 5,
              left: 5,
              right: 5,
            }}
            style={styles.bottomView}
            onPress={() => this.openDeleteAllCartModal()}>
            <Image
              source={require('../../assets/image/Delete.png')}
              style={{ height: hp(3), width: hp(3) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* EDIT PRODUCT */}
        <Modal
          style={{
            justifyContent: 'flex-end',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          }}
          isVisible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ isModalVisible: false })}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => null}>
            <View
              style={[
                styles.bottomContainer,
                { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              ]}>
              <ScrollView>
                <View
                  style={{
                    height: 45,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: color.green
                  }}>
                  <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 15 }}>
                    Edit Product
                  </Text>
                  <TouchableOpacity onPress={() => this.closeEditModal()}>
                    <Image
                      source={IconPack.WHITE_CLOSE}
                      style={{ width: 18, height: 18, resizeMode: 'cover', marginRight: 15 }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    borderBottomColor: '#a3a3a3',
                    borderBottomWidth: 0.5,
                  }}></View>

                <View style={{ marginHorizontal: 20, marginTop: 5 }}>
                  <FloatingLabelTextInput
                    label="Code"
                    value={this.state.productcode}
                    onChangeText={this.handleProductcodeChange}
                    resetValue={this.resetFieldEmail}
                    imageIcon="email"
                    editable={false}
                    selectTextOnFocus={false}
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Product Name"
                    value={this.state.productName}
                    onChangeText={this.handleProductNameChange}
                    resetValue={this.resetFieldProductName}
                    imageIcon="email"
                    editable={false}
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Quantity"
                    value={this.state.quantity}
                    onChangeText={q => this.handleQuantityChange(q)}
                    resetValue={() => this.resetFieldQuantity()}
                    imageIcon="email"
                    keyboardType="numeric"
                    width="95%"
                    marginLeft={8}
                  />
                </View>
                <View style={{}}>
                  <Text
                    style={{ marginLeft: 58, fontSize: 16, color: '#a3a3a3' }}>
                    Select Weight
                  </Text>
                  <Picker
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ marginRight: hp(3), fontSize: 25 }}
                      />
                    }
                    mode="dropdown"
                    style={{ marginLeft: 52, height: 45, width: '70%' }}
                    selectedValue={this.state.weight}
                    onValueChange={(value) => this.setSelectedValue(value)
                    }>
                    {this.state.weightArr!=null && this.state.weightArr.map(w => (
                      <Picker.Item label={w.toString()} value={parseInt(w)} />
                    ))}
                  </Picker>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                  <FloatingLabelTextInput
                    label="Length (inches)"
                    value={this.state.length}
                    onChangeText={l => this.handleLengthChange(l)}
                    resetValue={this.resetFieldLength}
                    imageIcon="email"
                    keyboardType="numeric"
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Comments"
                    value={this.state.comments}
                    onChangeText={c => this.handleCommentsChange(c)}
                    resetValue={this.resetFieldComment}
                    imageIcon="comments"
                    width="95%"
                    marginLeft={8}
                  />
                </View>
                <View style={styles.btnView}>
                  {!this.props.isFetching && this.state.isModalVisible ? (
                    <ActionButtonRounded2
                      title="UPDATE"
                      onButonPress={() => this.updateCartProduct()}
                      containerStyle={styles.buttonStyle}
                    />
                  ) : (
                      <ActivityIndicator size="small" color={color.brandColor} />
                    )}
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
          {/* </View> */}
        </Modal>

        {/* PLACE ORDER */}
        <Modal
          style={{
            justifyContent: 'flex-end',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          }}
          isVisible={this.state.isPlaceOrderModalVisible}
          transparent={true}
          onRequestClose={() =>
            this.setState({ isPlaceOrderModalVisible: false })
          }
          onBackdropPress={() =>
            this.setState({ isPlaceOrderModalVisible: false })
          }
          onBackButtonPress={() =>
            this.setState({ isPlaceOrderModalVisible: false })
          }>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => null}>
            <View
              style={[
                styles.bottomContainer,
                { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              ]}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginLeft: wp(44),
                  borderColor: 'red',
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp(7),
                  width: hp(7),
                  borderRadius: hp(3.5),
                  bottom: hp(3.2),
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ isPlaceOrderModalVisible: false })
                  }
                  hitSlop={{
                    position: 'absolute',
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                  }}>
                  <Image
                    source={require('../../assets/image/remove.png')}
                    style={{ height: hp(5), width: hp(5) }}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 5 }}>
                  <FloatingLabelTextInput
                    label="Name"
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    resetValue={this.resetFieldName}
                    imageIcon="profile"
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    resetValue={this.resetFieldEmail1}
                    imageIcon="email"
                    editable={false}
                    selectTextOnFocus={false}
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Mobile"
                    value={this.state.mobileNo}
                    onChangeText={this.handleMobileChange}
                    resetValue={this.resetFieldMobileNo}
                    imageIcon="Mobile"
                    width="95%"
                    marginLeft={8}
                  />
                  <FloatingLabelTextInput
                    label="Comments"
                    value={this.state.comments1}
                    onChangeText={this.handleCommentsChange1}
                    resetValue={this.resetFieldComment1}
                    imageIcon="comments"
                    width="95%"
                    marginLeft={8}
                  />
                  <View
                    style={{
                      marginTop: 32,
                      flexDirection: 'row',
                    }}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={require('../../assets/image/BlueIcons/Date.png')}
                        style={{ width: 25, height: 25, resizeMode: 'cover' }}
                      />
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: '#a3a3a3',
                        width: '88%',
                        marginLeft: 6,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.showDateTimePicker();
                        }}>
                        <Text style={styles.textDatePickerStyle}>
                          {!this.state.date ? 'Date' : this.state.date}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {isDateTimePickerVisible && (
                    <DateTimePicker
                      isVisible={isDateTimePickerVisible}
                      onConfirm={date => this.handleDatePicked(date)}
                      onCancel={this.hideDateTimePicker()}
                    />
                  )}
                </View>

                <View style={[styles.btnView, { marginVertical: 15 }]}>
                  {this.state.isPlaceOrderModalVisible &&
                    !this.props.isFetching ? (
                      <ActionButtonRounded
                        title="PLACE ORDER"
                        onButonPress={() => this.placeOrderFromCart()}
                        containerStyle={styles.buttonStyle}
                      />
                    ) : (
                      <ActivityIndicator size="small" color={color.brandColor} />
                    )}
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* CONTINUE PLACE ORDER */}
        <Modal
          isVisible={this.state.isContinueModalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ isContinueModalVisible: false })}
          onBackdropPress={() => this.setState({ isContinueModalVisible: false })}
          onBackButtonPress={() =>
            this.setState({ isContinueModalVisible: false })
          }>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => this.setState({ isContinueModalVisible: false })}>
            <View style={styles.mainContainer}>
              <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => null}>
                <View>
                  <View style={styles.alertContainer}>
                    <Image source={IconPack.RATE} style={styles.alertIcon} />
                    <Text style={styles.alertText}>Alert !</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isContinueModalVisible: false })
                    }
                    style={styles.closeIconContainer}>
                    <Image source={IconPack.WHITE_CLOSE} style={styles.closeIcon} />
                  </TouchableOpacity>

                  <View style={styles.bottomContainer}>
                    <Text style={styles.cartSummaryText}>Cart Summary</Text>
                    <View style={styles.middleViewContainer}>
                      <Text style={styles.middleText}>Product Master :</Text>
                      <Text style={styles.middleText}>
                        Gross Weight : {cartSummary && cartSummary.gross_wt ? parseInt(cartSummary.gross_wt).toFixed(2) : ''}
                      </Text>
                      <Text style={styles.middleText}>Quantity : {cartSummary && cartSummary.quantity ? cartSummary.quantity : ''}</Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                      <Text style={styles.middleText}>
                        Are you sure ? You want to check out, Click continue to
                        proceed further
                      </Text>
                    </View>
                    <View style={styles.btnView}>
                      <ActionButtonRounded
                        title="CONTINUE"
                        onButonPress={() => this.placeOrderView()}
                        containerStyle={styles.buttonStyle}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* DELETE ALL CART MODAL */}
        <Modal
          isVisible={this.state.isDeleteCartVisible}
          transparent={true}
          onBackdropPress={() => this.setState({ isDeleteCartVisible: false })}
          onBackButtonPress={() => this.setState({ isDeleteCartVisible: false })}
          onRequestClose={() => this.setState({ isDeleteCartVisible: false })}>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() =>
              this.setState({
                isDeleteCartVisible: false,
              })
            }>
            <View style={styles.mainContainer}>
              <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => null}>
                <View>
                  <View style={styles.alertContainer}>
                    <Image source={IconPack.RATE} style={styles.alertIcon} />
                    <Text style={styles.alertText}>Alert !</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ isDeleteCartVisible: false })}
                    style={styles.closeIconContainer}>
                    <Image source={IconPack.WHITE_CLOSE} style={styles.closeIcon} />
                  </TouchableOpacity>
                  <View style={styles.bottomContainer}>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                      <Text style={styles.middleText}>
                        Are you sure ? You want to delete all item, Click
                        continue to proceed further
                      </Text>
                    </View>
                    <View style={styles.btnView}>
                      <ActionButtonRounded
                        title="CONTINUE"
                        onButonPress={() => this.deleteAllProduct()}
                        containerStyle={styles.buttonStyle}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* CART weight */}
        <Modal
          isVisible={this.state.isCartWeightSummeryVisible}
          transparent={true}
          onBackButtonPress={() =>
            this.setState({ isCartWeightSummeryVisible: false })
          }
          onRequestClose={() =>
            this.setState({ isCartWeightSummeryVisible: false })
          }
          onRequestClose={() =>
            this.setState({ isCartWeightSummeryVisible: false })
          }
          style={{
            marginLeft: 20,
            marginRight: 20,
            paddingTop: hp(11),
            paddingBottom: hp(11),
          }}>
          <>
            <View style={styles.flex}>
              <View style={styles.cartSummaryContainer}>
                <Text style={[styles.alertText, { marginLeft: 20 }]}>
                  Cart Summary
                </Text>

                <View style={styles.closeIconView}>
                  <TouchableOpacity onPress={() => this.closeSummeryModal()}>
                    <Image style={styles.closeIcon} source={IconPack.WHITE_CLOSE} />
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                style={{ backgroundColor: '#ffffff' }}
                showsVerticalScrollIndicator={false}
                data={cartWeight && cartWeight}
                renderItem={({ item }) => (
                  <View style={{ marginHorizontal: 16, marginTop: 20}}>
                    <View style={{marginBottom: 15}}>
                      <Text style={{fontWeight:'200',fontSize:16}}>{`Category: ${item.key}`}</Text>
                    </View>

                    <View style={{marginBottom: 20}}>
                      <Text>{'Description:'}</Text>
                      {item.cat_data.map(m => {
                        return (
                          <View>
                            <Text style={{marginBottom:2}}>
                             - Design No: {m.product_id} (Gross Wt:
                              {parseInt(m.gross_wt).toFixed(2)}, Net Wt:{parseInt(m.net_wt).toFixed(2)}, Quantity:
                              {m.quantity} )
                            </Text>
                          </View>
                        );
                      })}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text>{`Total Quantity: ${item.total_quantity}`}</Text>
                      <Text>{`Total WT: ${item.total_weight}`}</Text>
                    </View>

                    <View style={{borderBottomWidth: 1,borderColor: '#ddd',borderBottomWidth: 0.8}}/>
                  </View>
                )}
              />
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 25,marginBottom:5
                  }}>
                  <View>
                <Text style={{fontWeight:'200', fontSize: 16 }}>Total WT: { totalWT && parseInt(totalWT).toFixed(2)}</Text>
                  </View>
                  <View style={{ marginLeft: 30 }}>
                    <Text style={{ fontSize: 16,fontWeight:'200' }}>Total Quantity: {totalQuantity}</Text>
                  </View>
                </View>

                <View style={[styles.btnView, { bottom: 10, }]}>
                  <ActionButtonRounded
                    title="OK"
                    onButonPress={() => this.closeSummeryModal()}
                    containerStyle={styles.buttonStyle}
                  />
                </View>
              </View>
            </View>
          </>

        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cartSummaryContainer: {
    height: 50,
    backgroundColor: color.green,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  closeIconView: {
    position: 'absolute',
    top: 14,
    right: 15,
    bottom: 0,

  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 91,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartSummaryText: {
    fontSize: 21,
    fontFamily: 'Helvetica',
    color: 'gray',
    textAlign: 'center',
    marginTop:5
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
  alertContainer: {
    height: 80,
    backgroundColor: color.green,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  alertText: {
    fontSize: 21,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  alertIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  closeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    bottom: 0,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    // // borderRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  
  middleViewContainer: {
    marginVertical: 20,
  },
  middleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#A9A9A9',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  textDatePickerStyle: {
    color: '#a3a3a3',
    //textAlign: 'left',
    marginTop: 5,
    fontSize: 18,
  },
  bottomView: {
    width: hp(5.8),
    height: hp(5.8),
    borderRadius: hp(5.8) / 2,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute', //Here is the trick
    bottom: hp(8), //Here is the trick
    right: hp(2),
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  tabCartTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  imgView: {
    height: hp(7),
    width: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: color.gray,
    borderRadius: 5,
  },
  imgStyle: {
    width: hp(8),
    height: hp(6),
  },
  codeCollectionView: {
    justifyContent: 'center',
  },
  codeText: {
    textAlign: 'left',
    ...Theme.ffLatoRegular13,
    color: '#757575',
  },
  chainTitleView: {
    justifyContent: 'center',
  },
  chainTitleText: {
    textAlign: 'right',
    ...Theme.ffLatoRegular13,
    color: '#757575',
  },
  moreDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  moreDetailText: {
    ...Theme.ffLatoBold13,
    color: '#000',
  },
  tabCartMiddleContainer: {
    marginTop: 10,
    // marginHorizontal: 18,
  },
  cartDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight:10
    marginHorizontal: 20,
  },
  text: {
    marginBottom: 10,
    color: '#808080',
  },
  tabCartBottomContainer: {
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabCartBottomImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabCartBottomImg: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  btnText: {
    ...Theme.ffLatoRegular11,
    color: color.brandColor,
  },
  border: {
    marginHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    marginTop: 10,
    marginBottom: 10,
  },
  textColor: {
    ...Theme.ffLatoRegular13,
    color: '#757575',
  },
  buttonStyle: {
    backgroundColor: color.green,
    height: 42,
    width: 140,
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.cartContainerReducer.isFetching,
    error: state.cartContainerReducer.error,
    errorMsgCart: state.cartContainerReducer.errorMsgCart,
    successCartVersion: state.cartContainerReducer.successCartVersion,
    errorCartVersion: state.cartContainerReducer.errorCartVersion,
    cartData: state.cartContainerReducer.cartData,

    errorMsgWishlist: state.cartContainerReducer.errorMsgWishlist,
    successWishlistVersion: state.cartContainerReducer.successWishlistVersion,
    errorWishlistVersion: state.cartContainerReducer.errorWishlistVersion,
    wishlistData: state.cartContainerReducer.wishlistData,

    errorMsg: state.cartContainerReducer.errorMsg,
    successDeleteProductVersion:
      state.cartContainerReducer.successDeleteProductVersion,
    errorDeleteProductVersion:
      state.cartContainerReducer.errorDeleteProductVersion,
    deleteProductData: state.cartContainerReducer.deleteProductData,

    successTotalCartCountVersion:
      state.cartContainerReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion:
      state.cartContainerReducer.errorTotalCartCountVersion,
    totalCartCountData: state.cartContainerReducer.totalCartCountData,

    successMoveProductVersion:
      state.cartContainerReducer.successMoveProductVersion,
    errorMoveProductVersion: state.cartContainerReducer.errorMoveProductVersion,

    successClearAllCartVersion:
      state.cartContainerReducer.successClearAllCartVersion,
    errorClearAllCartVersion:
      state.cartContainerReducer.errorClearAllCartVersion,

    successClearAllWislistVersion:
      state.cartContainerReducer.successClearAllWislistVersion,
    errorClearAllWislistVersion:
      state.cartContainerReducer.errorClearAllWislistVersion,

    successEditCartProductVersion:
      state.cartContainerReducer.successEditCartProductVersion,
    errorEditCartProductVersion:
      state.cartContainerReducer.errorEditCartProductVersion,

    successPlaceOrderVersion: state.cartContainerReducer.successPlaceOrderVersion,
    errorPlaceOrderVersion: state.cartContainerReducer.errorPlaceOrderVersion,

    successCartSummaryVersion: state.cartContainerReducer.successCartSummaryVersion,
    errorCartSummaryVersion: state.cartContainerReducer.errorCartSummaryVersion,
    cartSummaryData: state.cartContainerReducer.cartSummaryData,

    successCartWeightVersion: state.cartContainerReducer.successCartWeightVersion,
    errorCartWeightVersion: state.cartContainerReducer.errorCartWeightVersion,
    cartWeightData: state.cartContainerReducer.cartWeightData,

  };
}

export default connect(
  mapStateToProps,
  {
    getCartData,
    getWishlistData,
    deleteCartWishListProduct,
    getTotalCartCount,
    moveProduct,
    clearAllCart,
    clearAllWishList,
    updateEditedCartProduct,
    placeOrderFromCart,
    getCartSummary,
    getCartWeight
  },
)(withNavigationFocus(CartContainer));
