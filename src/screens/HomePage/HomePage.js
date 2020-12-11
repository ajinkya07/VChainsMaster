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
import Carousel, { Pagination, ParallaxImage, SliderEntry } from 'react-native-snap-carousel';
import styles from './Styles';


var userId = '';
const SLIDER_1_FIRST_ITEM = 0

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
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM

    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';
    console.log("userId", userId);
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


    if (prevProps.isFocused !== this.props.isFocused) {
      const allData = new FormData();
      allData.append('user_id', userId);

      await this.props.allParameters(allData)

    }

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

    if (this.state.successAllParameterVersion > prevState.successAllParameterVersion) {
      const stat = allParameterData && allParameterData.user_status

      if (stat !== 'active') {
        this.props.navigation.navigate('SignIn')
        global.userId = '';
        AsyncStorage.setItem('userId', '');
        this.showToast("User is not Active. Please contact System Admin", 'danger');

      }
    }

    if (this.state.errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
      Toast.show({
        text: this.props.errorMsg,
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


  _renderItem = ({ item, index }, parallaxProps) => {
    const { homePageData } = this.props;
    let baseUrl = homePageData && homePageData.base_path;
    let { width, height } = Dimensions.get('window')

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Banner', {
            bannerData: item,
            baseUrl: baseUrl,
          })
        }>
        <View key={index}>
          <Image style={{ height: height / 3 - 15, width: wp(100), }}
            source={{ uri: baseUrl + item.brand_image }}
            defaultSource={IconPack.APP_LOGO}
            resizeMode='cover'
          />
        </View >
      </TouchableOpacity>
    );
  }


  carausalView2 = (bannerData) => {
    let { width, height } = Dimensions.get('window')
    let sliderWidth = width;
    let itemHeight = height / 3;

    return (
      <View style={{ marginBottom: -10 }}>
        <Carousel
          ref={c => this._slider1Ref = c}
          hasParallaxImages={true}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={1400}
          autoplayInterval={8000}
          sliderWidth={sliderWidth}
          sliderHeight={itemHeight}
          itemWidth={sliderWidth}
          itemHeight={itemHeight}
          data={bannerData}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          enableMomentum={true}
          activeSlideOffset={2}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}

        />
        <Pagination
          dotsLength={bannerData.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={color.white}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'gray'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={this._slider1Ref}

        />

      </View>

    )
  }

  getProductGridOrNot = data => {
    if (data.subcategory.length === 0) {
      this.props.navigation.navigate('ProductGrid', { gridData: data });
    } else if (data.subcategory.length > 0) {
      this.props.navigation.navigate('SubCategoryList', { subcategory: data });
    }
  };




  categoryViewDesignNew = (item, index) => {
    let baseUrl = urls.imageUrl + 'public/backend/collection/';

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {index % 4 == 1 && (
          <View
            style={{
              backgroundColor: 'white',
              height: hp(18),
              marginVertical: hp(1),
              marginRight: hp(1),
            }}>
            <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(35) }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              {/* <_Text
                numberOfLines={2}
                style={{
                  ...Theme.ffLatoMedium18,
                  position: 'absolute',
                  color: '#000000',
                  top: 10,
                  left: 10,
                }}>
                {item.col_name}
              </_Text> */}
            </TouchableOpacity>
          </View>
        )}

        {index % 4 == 2 && (
          <View
            style={{
              backgroundColor: 'white',
              marginTop: -hp(19),
              marginLeft: wp(36),
              height: hp(18),
              width: wp(63),
            }}>
            <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(63) }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              {/* <_Text
                numberOfLines={2}
                style={{
                  ...Theme.ffLatoMedium18,
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: '#000000',
                  textAlign: 'center',
                }}>
                {item.col_name}
              </_Text> */}
            </TouchableOpacity>
          </View>
        )}

        {index % 4 == 3 && (
          <View
            style={{
              backgroundColor: 'white',
              height: hp(18),
              width: wp(63),
              marginRight: hp(1),
            }}>
            <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(63) }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              {/* <_Text
                numberOfLines={2}
                style={{
                  ...Theme.ffLatoMedium18,
                  position: 'absolute',
                  color: '#000000',
                  top: 10,
                  left: 10,
                }}>
                {item.col_name}
              </_Text> */}
            </TouchableOpacity>
          </View>
        )}

        {index % 4 == 0 && (
          <View
            style={{
              backgroundColor: 'white',
              marginTop: -hp(18),
              marginLeft: wp(64),
              height: hp(18),
              width: wp(35),
            }}>
            <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(18), width: wp(35) }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: baseUrl + item.image_name }}
              />
              {/* <_Text
                numberOfLines={2}
                style={{
                  ...Theme.ffLatoMedium18,
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: '#000000',
                  textAlign: 'center',
                }}>
                {item.col_name}
              </_Text> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
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
        <View style={{ height: hp(35) }}>
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
                    Length
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
                      source={require('../../assets/Hertfill.png')}
                      style={{ height: hp(3), width: hp(3) }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.addToCart(item)}>
                    <Image
                      source={require('../../assets/Cart1.png')}
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
                      source={require('../../assets/Minus1.png')}
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
                      source={require('../../assets/Plus1.png')}
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
              refreshing={isFetching}
              onRefresh={() => this.onRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}>


          {this.carausalView2(bannerData)}

          {/* CATEGORY DESIGNS */}
          {categoryData &&
            categoryData.map(item => (
              <View style={{ top: -10 }}>
                {this.categoryViewDesignNew(item, item.position)}
              </View>
            ))}


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
