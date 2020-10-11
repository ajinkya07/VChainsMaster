import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image, FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import HomePageStyle from '@homepage/HomePageStyle';
import { color } from '@values/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import _CustomButton from '@customButton/_CustomButton';
import * as Animatable from 'react-native-animatable';
import {
  getHomePageData,
  getTotalCartCount,
  addToWishlist,
  addToCart,
  addRemoveFromCartByOne,
  allParameters
} from '@homepage/HomePageAction';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import { urls } from '@api/urls';
import { withNavigationFocus } from '@react-navigation/compat';
import { ThemeProvider } from '@react-navigation/native';
import Theme from '../../values/Theme';
import IconPack from '../OnBoarding/Login/IconPack';
import MasonryList from "react-native-masonry-list";


var userId = '';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      isModalVisible: false,
      successHomePageVersion: 0,
      errorHomePageVersion: 0,
      isImageModalVisibel: false,
      imageToBeDisplayed: '',

      finalCollection: [],
      collection: [],
      // bannerData: [],

      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,

      successAddToWishlistVersion: 0,
      errorAddToWishlistVersion: 0,

      successAddToCartVersion: 0,
      errorAddToCartVersion: 0,

      successAddToCartPlusOneVersion: 0,
      errorAddToCartPlusOneVersion: 0,
      plusOnecartValue: '',

      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,

    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    await this.getHomePage()
    await this.getTotalCart()

    const data3 = new FormData();
    data3.append('user_id', userId);

    await this.props.allParameters(data3)

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successHomePageVersion,
      errorHomePageVersion,
      successTotalCartCountVersion,
      errorTotalCartCountVersion,
      successAddToWishlistVersion,
      errorAddToWishlistVersion,
      successAddToCartVersion,
      errorAddToCartVersion,
      successAddToCartPlusOneVersion,
      errorAddToCartPlusOneVersion,
      successAllParameterVersion,
      errorAllParamaterVersion
    } = nextProps;
    let newState = null;

    if (successHomePageVersion > prevState.successHomePageVersion) {
      newState = {
        ...newState,
        successHomePageVersion: nextProps.successHomePageVersion,
      };
    }
    if (errorHomePageVersion > prevState.errorHomePageVersion) {
      newState = {
        ...newState,
        errorHomePageVersion: nextProps.errorHomePageVersion,
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
    if (successAddToWishlistVersion > prevState.successAddToWishlistVersion) {
      newState = {
        ...newState,
        successAddToWishlistVersion: nextProps.successAddToWishlistVersion,
      };
    }
    if (errorAddToWishlistVersion > prevState.errorAddToWishlistVersion) {
      newState = {
        ...newState,
        errorAddToWishlistVersion: nextProps.errorAddToWishlistVersion,
      };
    }

    if (successAddToCartVersion > prevState.successAddToCartVersion) {
      newState = {
        ...newState,
        successAddToCartVersion: nextProps.successAddToCartVersion,
      };
    }
    if (errorAddToCartVersion > prevState.errorAddToCartVersion) {
      newState = {
        ...newState,
        errorAddToCartVersion: nextProps.errorAddToCartVersion,
      };
    }

    if (
      successAddToCartPlusOneVersion > prevState.successAddToCartPlusOneVersion
    ) {
      newState = {
        ...newState,
        successAddToCartPlusOneVersion:
          nextProps.successAddToCartPlusOneVersion,
      };
    }
    if (errorAddToCartPlusOneVersion > prevState.errorAddToCartPlusOneVersion) {
      newState = {
        ...newState,
        errorAddToCartPlusOneVersion: nextProps.errorAddToCartPlusOneVersion,
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
    const {
      totalCartCountData,
      addToWishlistData,
      errorMsg,
      addToCartData,
      homePageData,
      addToCartPlusOneData,
      allParameterData
    } = this.props;

    const { finalCollection, productId, productId2 } = this.state;

    // if (prevProps.isFocused !== this.props.isFocused) {
    //     await this.getHomePage()
    //     await this.getTotalCart()

    // }

    if (this.state.successHomePageVersion > prevState.successHomePageVersion) {
      if (homePageData && homePageData.final_collection) {
        this.setState({
          finalCollection:
            homePageData && homePageData.final_collection
              ? homePageData.final_collection
              : [],
        });
      }
      if (homePageData && homePageData.collection) {
        this.setState({
          collection:
            homePageData && homePageData.collection
              ? homePageData.collection
              : [],
        });
      }
    }

    if (this.state.errorHomePageVersion > prevState.errorHomePageVersion) {
      Toast.show({
        text:
          homePageData.length !== 0
            ? homePageData.msg
            : strings.serverFailedMsg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count;
    }
    if (this.state.errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count;
    }

    if (this.state.successAddToWishlistVersion > prevState.successAddToWishlistVersion) {
      if (addToWishlistData.ack === '1') {
        Toast.show({
          text: addToWishlistData && addToWishlistData.msg,
          duration: 2500,
        });
      }
    }
    if (this.state.errorAddToWishlistVersion > prevState.errorAddToWishlistVersion) {
      Toast.show({
        text: addToWishlistData && addToWishlistData.msg,
        type: 'danger',
        duration: 2500,
      });
    }
    if (this.state.successAddToCartVersion > prevState.successAddToCartVersion) {
      if (addToCartData.ack === '1') {
        var inx;
        var i;
        var dx;
        for (let m = 0; m < homePageData.final_collection.length; m++) {
          inx = homePageData.final_collection[m].product_assign.findIndex(
            item => item.product_id == productId2,
          );
          if (inx >= 0) {
            i = m;
            dx = inx;
          }
          // })
        }
        if (dx >= 0) {
          finalCollection[i].product_assign[dx].in_cart =
            this.props.addToCartData.data !== null
              ? parseInt(this.props.addToCartData.data.quantity)
              : undefined;

          this.setState(
            { in_cart: finalCollection[i].product_assign[dx].in_cart },
            () => {
              console.log(JSON.stringify(finalCollection));
            },
          );
        }


        Toast.show({
          text: addToCartData ? addToCartData.msg : strings.serverFailedMsg,
          duration: 2500,
        });
      }

      //  await this.getHomePage()
      await this.getTotalCart()

    }


    if (this.state.errorAddToCartVersion > prevState.errorAddToCartVersion) {
      Toast.show({
        text: addToCartData && addToCartData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successAddToCartPlusOneVersion > prevState.successAddToCartPlusOneVersion) {

      if (addToCartPlusOneData.ack === '1') {
        var Index;
        var i;
        var dex;
        for (let m = 0; m < homePageData.final_collection.length; m++) {
          Index = homePageData.final_collection[m].product_assign.findIndex(
            item => item.product_id == productId,
          );
          if (Index >= 0) {
            i = m;
            dex = Index;
          }
          // })
        }
        if (dex >= 0) {
          console.log("here");
          finalCollection[i].product_assign[dex].in_cart =
            this.props.addToCartPlusOneData.data !== null
              ? parseInt(this.props.addToCartPlusOneData.data.quantity)
              : '0';
          this.setState(
            { in_cart: finalCollection[i].product_assign[dex].in_cart },
            () => {
              console.log(JSON.stringify(finalCollection));
            },
          );
        }

        Toast.show({
          text: addToCartPlusOneData ? addToCartPlusOneData.msg : strings.serverFailedMsg,
          duration: 2500,
        });

        // await this.getHomePage()
        await this.getTotalCart()
      }
    }

    if (this.state.errorAddToCartPlusOneVersion > prevState.errorAddToCartPlusOneVersion) {
      Toast.show({
        text: errorMsg && errorMsg,
        type: 'danger',
        duration: 2500,
      });
    }

  }


  getHomePage = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    const dt = new FormData();
    dt.append('user_id', userId);
    dt.append('image_type', type);

    await this.props.getHomePageData(dt);

  }

  getTotalCart = async () => {
    const ct = new FormData();
    ct.append('user_id', userId);
    ct.append('table', 'cart');

    await this.props.getTotalCartCount(ct);

  }


  failedView = () => {
    return (
      <View
        style={{
          height: hp(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/gif/noData.gif')}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400' }}>
          {strings.serverFailedMsg}
        </Text>
      </View>
    );
  };

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  setCurrentPage = position => {
    this.setState({ currentPage: position });
  };

  renderScreen = (data, k) => {
    const { homePageData } = this.props;
    let baseUrl = homePageData && homePageData.base_path;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Banner', {
            bannerData: data,
            baseUrl: baseUrl,
          })
        }>
        <View key={k}>
          <Image style={{ height: hp(26.5), width: wp(100) }}
            source={{ uri: baseUrl + data.brand_image }}
            defaultSource={IconPack.APP_LOGO}
            resizeMode='cover'
          />

        </View>
      </TouchableOpacity>
    );
  };

  carausalView = bannerData => {
    return (
      <View
        style={{
          height: hp(26.5),
          width: wp(100),
        }}>
        {bannerData ? (
          <Swiper
            removeClippedSubviews={false}
            style={{ flexGrow: 1 }}
            autoplayTimeout={2}
            ref={swiper => {
              this.swiper = swiper;
            }}
            index={this.state.currentPage}
            autoplay={true}
            showsPagination={true}
            // loadMinimal={true}
            // loadMinimalLoader={<ActivityIndicator size="small" color='gray' />}
            dot={
              <View
                style={{
                  backgroundColor: 'gray',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  top: 10,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#19af81',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginLeft: 3,
                  marginRight: 3,
                  top: 10,
                }}
              />
            }
            onIndexChanged={page => this.setCurrentPage(page)}>
            {bannerData.map((page, index) => this.renderScreen(page, index))}
          </Swiper>
        ) : (
            this.renderLoader2()
          )}
      </View>
    );
  };


  getProductGridOrNot = data => {
    if (data.subcategory.length === 0) {
      this.props.navigation.navigate('ProductGrid', { gridData: data });
    } else if (data.subcategory.length > 0) {
      this.props.navigation.navigate('SubCategoryList', { subcategory: data });
    }
  };

  getCategoryDesigns = (item, index) => {
    const { homePageData } = this.props;
    const {
      categoryView,
      categoryImage,
      horizontalCategory,
      categoryImageViewStyle,
    } = HomePageStyle;
    let baseUrl = urls.imageUrl + 'public/backend/collection/'

    return (
      <TouchableOpacity
        onPress={() => this.getProductGridOrNot(item)}
        activeOpacity={0.7}>
        <View animation="zoomIn" style={categoryView}>
          <View style={categoryImageViewStyle}>
            <Animatable.Image
              animation="zoomIn"
              resizeMode={'cover'}
              style={categoryImage}
              defaultSource={IconPack.APP_LOGO}
              source={{ uri: baseUrl + item.image_name }}
            />
          </View>

          <_Text
            numberOfLines={2}
            fsPrimary
            style={{ ...Theme.ffLatoRegular13, color: '#000000', textAlign: 'center' }}>
            {item.col_name}
          </_Text>
        </View>
      </TouchableOpacity>
    );
  };

  categoryViewDesign = (item, index) => {
    const { homePageData } = this.props;

    let baseUrl = urls.imageUrl + 'public/backend/collection/'

    return (
      <TouchableOpacity
        onPress={() => this.getProductGridOrNot(item)}
        activeOpacity={0.7}>

        <View style={{ flexDirection: item.position % 2 === 1 ? 'row' : 'row-reverse', marginTop: hp(1) }}>
          {item.position % 2 === 1 ?
            <View style={{ height: hp(18), width: wp(35), marginRight: hp(1), }}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(35), }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              <_Text
                numberOfLines={2}
                style={{ ...Theme.ffLatoBold16, position: 'absolute', color: '#000000', top: 10, left: 10, }}>
                {item.col_name}
              </_Text>
            </View>
            :
            <View style={{ marginTop: -hp(19), height: hp(18), width: wp(63), }}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(63), }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              <_Text
                numberOfLines={2}
                style={{
                  ...Theme.ffLatoBold16, position: 'absolute',
                  top: 10, left: 10, color: '#000000', textAlign: 'center'
                }}>
                {item.col_name}
              </_Text>
            </View>

          }
        </View>
      </TouchableOpacity>
    );
  };


  categoryViewDesignTwo = (item, index) => {
    const { homePageData } = this.props;

    let baseUrl = urls.imageUrl + 'public/backend/collection/'

    return (
      <TouchableOpacity
        onPress={() => this.getProductGridOrNot(item)}
        activeOpacity={0.7}>
        <View style={{ flexDirection: 'row', marginBottom: hp(1), }}>

          <View style={{ height: hp(20), width: wp(65), marginRight: hp(1), backgroundColor: 'red' }}>

          </View>
          <View style={{ height: hp(20), width: wp(35), backgroundColor: 'blue' }}>

          </View>
        </View>

      </TouchableOpacity>
    );
  };



  getProductDesigns = (item, index) => {
    const {
      latestDesign,
      latestTextView,
      latestTextView2,
      latestImage,
      horizontalLatestDesign,
      border,
      iconView,
      categoryImageViewStyle,
    } = HomePageStyle;

    const { plusOnecartValue } = this.state;
    let url = urls.imageUrl + 'public/backend/product_images/zoom_image/';


    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ProductDetails', { productItemDetails: item, fromHome: true })}>
        <View style={{ height: hp('35') }}>
          <View style={horizontalLatestDesign}>
            <View style={latestDesign}>
              <TouchableOpacity
                style={{ width: '100%', overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                onPress={() => this.props.navigation.navigate('ProductDetails', { productItemDetails: item, fromHome: true })}
                onLongPress={() => this.showImageModal(item)}>
                <Image
                  style={latestImage}
                  defaultSource={IconPack.APP_LOGO}
                  source={{ uri: url + item.images[0].image_name }}
                />
              </TouchableOpacity>
              <View style={latestTextView}>
                <View style={{ width: wp(12), marginLeft: 10 }}>
                  <_Text
                    numberOfLines={1}
                    fsSmall
                    style={{ ...Theme.ffLatoRegular13, color: '#000000' }}>
                    Code :
                  </_Text>
                </View>
                <View
                  style={{
                    marginRight: 8,
                    width: wp(23),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <_Text
                    numberOfLines={1}
                    fsPrimary
                    textColor={'#000000'}
                    style={{ ...Theme.ffLatoRegular12 }}>
                    {item.collection_sku_code}
                  </_Text>
                </View>
              </View>

              <View style={latestTextView2}>
                <View style={{ width: wp(14), marginLeft: 10 }}>
                  <_Text
                    numberOfLines={1}
                    fsSmall
                    style={{ ...Theme.ffLatoRegular13, color: '#000000' }}>
                    Weight :
                  </_Text>
                </View>
                <View
                  style={{
                    marginRight: 8,
                    width: wp(21),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <_Text
                    numberOfLines={1}
                    fsPrimary
                    textColor={'#000000'}
                    style={{ ...Theme.ffLatoRegular12 }}>
                    {parseInt(item.gross_wt).toFixed(2)}
                  </_Text>
                </View>
              </View>

              <View style={latestTextView2}>
                <View style={{ width: wp(14), marginLeft: 10 }}>
                  <_Text
                    numberOfLines={1}
                    fsSmall
                    style={{ ...Theme.ffLatoRegular13, color: '#000000' }}>
                    Inches
                  </_Text>
                </View>
                <View
                  style={{
                    marginRight: 8,
                    width: wp(21),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <_Text
                    numberOfLines={1}
                    fsPrimary
                    textColor={'#000000'}
                    style={{ ...Theme.ffLatoRegular12 }}>
                    {item.length}
                  </_Text>
                </View>
              </View>
              <View style={border}></View>

              {item.in_cart == 0 &&
                <View style={iconView}>
                  <TouchableOpacity
                    onPress={() => this.addToWishlist(item)}>
                    <Image
                      source={require('../../assets/image/BlueIcons/Green-Heart.png')}
                      style={{ height: hp(3), width: hp(3) }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.addToCart(item)}>
                    <Image
                      source={require('../../assets/image/BlueIcons/Green-Cart.png')}
                      style={{ height: hp(3), width: hp(3) }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              }

              {item.in_cart > 0 &&
                <View style={iconView}>
                  <TouchableOpacity
                    onPress={() => alert('inProgress')}
                    onPress={() => this.removeFromCartByOne(item)}>
                    <Image
                      source={require('../../assets/image/BlueIcons/Minus.png')}
                      style={{ height: hp(3.1), width: hp(3.1) }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <_Text numberOfLines={1}
                    textColor={color.brandColor}
                    fsMedium fwHeading >
                    {item.quantity >= 1 ? item.quantity : item.in_cart}
                  </_Text>

                  <TouchableOpacity
                    onPress={() => alert('inProgress')}
                    onPress={() => this.addToCartPlusOne(item)}>
                    <Image
                      source={require('../../assets/image/BlueIcons/Plus.png')}
                      style={{ height: hp(3.1), width: hp(3.1) }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  addToWishlist = item => {
    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    this.props.addToWishlist(wishlistData);
  };

  addToCart = async item => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cartData = new FormData();

    cartData.append('product_id', item.product_id);
    cartData.append('user_id', userId);
    cartData.append('cart_wish_table', 'cart');
    cartData.append('no_quantity', 1);
    cartData.append('product_inventory_table', 'product_master');

    await this.props.addToCart(cartData);

    this.setState({
      productId2: item.product_id,
    });

  };

  addToCartPlusOne = async item => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart = new FormData();

    cart.append('product_id', item.product_id);
    cart.append('user_id', userId);
    cart.append('cart_wish_table', 'cart');
    cart.append('no_quantity', 1);
    cart.append('product_inventory_table', 'product_master');
    cart.append('plus', 1);

    await this.props.addRemoveFromCartByOne(cart);

    // await this.getHomePage()

    this.setState({
      productId: item.product_id,
    });
  };

  removeFromCartByOne = async (item) => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart1 = new FormData();

    cart1.append('product_id', item.product_id);
    cart1.append('user_id', userId);
    cart1.append('cart_wish_table', 'cart');
    cart1.append('no_quantity', 1);
    cart1.append('product_inventory_table', 'product_master');
    cart1.append('plus', 0);

    await this.props.addRemoveFromCartByOne(cart1);

    // if (item.in_cart == 1) {
    //   this.getHomePage()
    // }

    this.setState({
      productId: item.product_id,
    });
  };

  showImageModal = item => {
    this.setState({
      imageToBeDisplayed: item,
      isImageModalVisibel: true,
    });
  };

  onOkPressed = () => {
    this.setState({ isModalVisible: false });
  };

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

  renderLoader2 = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: hp(25),
          width: wp(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={color.gray} />
      </View>
    );
  };

  onRefresh = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    await this.getHomePage()
    await this.getTotalCart()

  };

  render() {
    const {
      mainContainer,
      topHeading,
      topHeading1,
      topHeading2,
      topHeading3,
      heading,
      watchAllView,
      watchTouchableView,
      watchAllImage,
      watchAllText,
      activityIndicatorView,
      folloUs,
      socialIconView,
      socialTextView,
    } = HomePageStyle;

    const { homePageData, isFetching, allParameterData } = this.props;
    const { imageToBeDisplayed, finalCollection, collection } = this.state;

    var bannerData =
      homePageData && homePageData.brand_banner
        ? homePageData.brand_banner
        : [];

    let imageUrl = urls.imageUrl + 'public/backend/product_images/zoom_image/'

    let userStatus = allParameterData && allParameterData.splash_popup && allParameterData.splash_popup[0]

    let link = urls.imageUrl + 'public/backend/collection/'

    const categoryData = homePageData && homePageData.collection ? homePageData.collection : []



    return (
      <View style={mainContainer}>
        <ScrollView
          // bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.onRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}>


          {/* {this.carausalView(bannerData)} */}

          {/* CATEGORY DESIGNS */}


          {categoryData &&
            <View style={{ marginTop: hp(1), backgroundColor: 'black' }}>
              <FlatList
                data={categoryData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.position.toString()}
                renderItem={({ item, index }) => (
                  this.categoryViewDesign(item, index)
                )}
              />
            </View>
          }



          {/* BANNER */}
          {userStatus.status == 'Active' &&
            <View>
              <View style={{
                marginTop: hp(2), marginBottom: -10, borderColor: '#DDDDDD',
                height: hp(27), width: '100%',
              }}>
                <Image
                  source={{ uri: userStatus.image }}
                  defaultSource={IconPack.APP_LOGO}
                  style={{
                    height: hp(27), width: '100%',
                    borderColor: '#DDDDDD', borderWidth: 0.5
                  }}
                  resizeMode='cover'
                />
              </View>


              <View style={{ backgroundColor: '#DDDDDD', height: hp(5), alignItems: 'center', justifyContent: 'center' }}>
                <_Text fsHeading fwHeading numberOfLines={1}
                  style={{
                    textAlign: 'center', marginTop: hp(1), marginBottom: hp(1),
                    marginHorizontal: hp(2)
                  }}>
                  {userStatus.description}
                </_Text>
              </View>

            </View>
          }

          {/* PRODUCT DESIGNS */}

          {finalCollection &&
            finalCollection.map((data, index) => (
              <View>
                <View style={topHeading1}>
                  <View style={heading}>
                    <_Text
                      fsExtraLarge
                      fwPrimary
                      numberOfLines={1}
                      textColor={'#000000'}
                      style={{ ...Theme.ffLatoRegular18, letterSpacing: 0.7 }}>
                      {data.key}
                    </_Text>
                  </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {data.product_assign &&
                    data.product_assign.map((product, index) => (
                      <View style={{ flexDirection: 'row' }}>
                        {this.getProductDesigns(product)}
                      </View>
                    ))}
                </ScrollView>
              </View>
            ))}



          {/*  IMAGE ON LONG PRESS */}

          {this.state.isImageModalVisibel && (
            <View>
              <Modal
                style={{ justifyContent: 'center' }}
                isVisible={this.state.isImageModalVisibel}
                onRequestClose={() =>
                  this.setState({ isImageModalVisibel: false })
                }
                onBackdropPress={() =>
                  this.setState({ isImageModalVisibel: false })
                }
                onBackButtonPress={() =>
                  this.setState({ isImageModalVisibel: false })
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
                      source={{
                        uri: imageUrl + imageToBeDisplayed.images[0].image_name,
                      }}
                      //defaultSource={require('../../assets/image/default.png')}
                      defaultSource={IconPack.APP_LOGO}
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
        </ScrollView>

        {this.props.isFetching ? this.renderLoader() : null}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,
    successHomePageVersion: state.homePageReducer.successHomePageVersion,
    errorHomePageVersion: state.homePageReducer.errorHomePageVersion,
    homePageData: state.homePageReducer.homePageData,

    successTotalCartCountVersion:
      state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion:
      state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,

    successAddToWishlistVersion:
      state.homePageReducer.successAddToWishlistVersion,
    errorAddToWishlistVersion: state.homePageReducer.errorAddToWishlistVersion,
    addToWishlistData: state.homePageReducer.addToWishlistData,

    successAddToCartVersion: state.homePageReducer.successAddToCartVersion,
    errorAddToCartVersion: state.homePageReducer.errorAddToCartVersion,
    addToCartData: state.homePageReducer.addToCartData,

    successAddToCartPlusOneVersion:
      state.homePageReducer.successAddToCartPlusOneVersion,
    errorAddToCartPlusOneVersion:
      state.homePageReducer.errorAddToCartPlusOneVersion,
    addToCartPlusOneData: state.homePageReducer.addToCartPlusOneData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,



  };
}

export default connect(
  mapStateToProps,
  {
    getHomePageData,
    getTotalCartCount,
    addToWishlist,
    addToCart,
    addRemoveFromCartByOne,
    allParameters
  },
)(withNavigationFocus(HomePage));




// {this.state.isModalVisible  && userStatus == 'Active' && (
//   <View>
//     <Modal
//       style={{ justifyContent: 'center' }}
//       isVisible={this.state.isModalVisible}
//       onRequestClose={() => this.setState({ isModalVisible: false })}
//       onBackdropPress={() => this.setState({ isModalVisible: false })}
//       onBackButtonPress={() => this.setState({ isModalVisible: false }) }>
//       <SafeAreaView>
//         <View
//           style={{
//             height: hp(68),
//             backgroundColor: 'white',
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: 15,
//           }}>
//           <View
//             style={{
//               bottom: hp(5),
//               backgroundColor: 'white',
//               borderColor: 'red',
//               borderWidth: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: hp(8),
//               width: hp(8),
//               borderRadius: hp(4),
//             }}>
//             <TouchableOpacity
//               hitSlop={{
//                 position: 'absolute',
//                 top: 5,
//                 bottom: 5,
//                 left: 5,
//                 right: 5,
//               }}
//               onPress={() => this.onOkPressed()}>
//               <Image
//                 source={require('../../assets/image/remove.png')}
//                 style={{ height: hp(5), width: hp(5) }}
//               />
//             </TouchableOpacity>
//           </View>
//           <Image
//             source={{uri : userStatus.image}}
//             defaultSource={IconPack.APP_LOGO}
//             style={{
//               height: hp(45),
//               width: wp(83),
//               borderColor: 'gray',
//               borderWidth: 1,
//               bottom: hp(2),
//             }}
//             resizeMode='contain'
//           />

//           <_Text fsHeading fwPrimary style={{textAlign:'center',marginBottom:hp(2)}}>{userStatus.description}</_Text>

//           <_CustomButton
//             onPress={() => this.onOkPressed()}
//             title="OK"
//             height={hp(7.1)}
//             width={wp(80)}
//             fontSize={hp(2.5)}
//             fontWeight={Platform.OS === 'ios' ? '400' : 'bold'}
//             backgroundColor={color.green}
//           />
//         </View>
//       </SafeAreaView>
//     </Modal>
//   </View>
// )}



// {collection && collection.length > 0 &&
//   <View style={{ marginTop: hp(1), }}>
//     <View style={{ flex: 1, backgroundColor: '#303030' }}>
//       <MasonryList
//         columns={1}
//         spacing={2.5}
//         renderIndividualHeader={() => {
//           return (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 flex: 1, paddingHorizontal: 6
//               }}>
//               <View style={{ flex: 0.3, marginRight: 8 }}>
//                 <Image
//                   source={{
//                     uri:
//                       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAPG3kMViVKAyW8-RCy6FWd7EpOTJG6u7ukg&usqp=CAU'
//                   }}
//                   style={{ width: null, height: hp(20) }}
//                 />
//               </View>
//               <View style={{ flex: 0.7 }}>
//                 <Image
//                   source={{
//                     uri:
//                       'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
//                   }}
//                   style={{ width: null, height: hp(20) }}
//                 />
//               </View>
//             </View>

//           );
//         }}

//         renderIndividualFooter={() => {
//           return (
//             <View
//               style={{
//                 paddingHorizontal: 6, marginBottom: 8,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 flex: 1,
//               }}>
//               <View style={{ flex: 0.7, marginRight: 8 }}>
//                 <Image
//                   source={{
//                     uri:
//                       'https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg'
//                   }}
//                   style={{ width: null, height: hp(20) }}
//                 />
//               </View>
//               <View style={{ flex: 0.3 }}>
//                 <Image
//                   source={{
//                     uri:
//                       'data:image/jpeg;base64,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'
//                   }}
//                   style={{ width: null, height: hp(20) }}
//                 />
//               </View>
//             </View>

//           );
//         }}

//         images={[
//           {
//             uri:
//               'https://images.unsplash.com/photo-1535332371349-a5d229f49cb5?ixlib=rb-1.2.1&w=1000&q=80',
//             dimensions: { width: wp(100), height: 1 },
//           },
//           {
//             uri:
//               'https://images.unsplash.com/photo-1535332371349-a5d229f49cb5?ixlib=rb-1.2.1&w=1000&q=80',
//             dimensions: { width: wp(100), height: 1 },
//           },
//         ]}

//       />
//     </View>
//   </View>
// }