import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
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

    if ( this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion ) {
      global.totalCartCount = totalCartCountData.count;
    }
    if ( this.state.errorTotalCartCountVersion >  prevState.errorTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count;
    }

    if ( this.state.successAddToWishlistVersion > prevState.successAddToWishlistVersion ) {
      if (addToWishlistData.ack === '1') {
        Toast.show({
          text: addToWishlistData && addToWishlistData.msg,
          duration: 2500,
        });
      }
    }
    if ( this.state.errorAddToWishlistVersion > prevState.errorAddToWishlistVersion ) {
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

    if ( this.state.successAddToCartPlusOneVersion > prevState.successAddToCartPlusOneVersion ) {

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
              : undefined;

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


  getHomePage= async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    const dt = new FormData();
    dt.append('user_id', userId);
    dt.append('image_type', type);

    await this.props.getHomePageData(dt);

  }

  getTotalCart = async () =>{
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
          {/* <FastImage
            style={{ height: hp(26.5), width: wp(100) }}
            source={{
              uri: baseUrl + data.brand_image,
            }}
            resizeMode={FastImage.resizeMode.cover}
          /> */}
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
            style={{ ...Theme.ffLatoRegular13, color: '#000000' ,textAlign:'center'}}>
            {item.col_name}
          </_Text>
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
        onPress={() => this.props.navigation.navigate('ProductDetails', { productItemDetails: item, fromHome:true })}>
        <View style={{ height: hp('35') }}>
          <View style={horizontalLatestDesign}>
            <View style={latestDesign}>
              <TouchableOpacity
              style={{width:'100%',overflow:'hidden',borderTopLeftRadius:10,borderTopRightRadius:10}}
                onPress={() => this.props.navigation.navigate('ProductDetails', { productItemDetails: item, fromHome:true })}
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
                                    {item.quantity >=1 ? item.quantity : item.in_cart}
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

  removeFromCartByOne = async item => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart1 = new FormData();

    cart1.append('product_id', item.product_id);
    cart1.append('user_id', userId);
    cart1.append('cart_wish_table', 'cart');
    cart1.append('no_quantity', 1);
    cart1.append('product_inventory_table', 'product_master');
    cart1.append('plus', 0);

    await this.props.addRemoveFromCartByOne(cart1);

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

    const { homePageData, isFetching,allParameterData } = this.props;
    const { imageToBeDisplayed, finalCollection, collection } = this.state;

    var bannerData =
      homePageData && homePageData.brand_banner
        ? homePageData.brand_banner
        : [];

    let imageUrl = urls.imageUrl + 'public/backend/product_images/zoom_image/'

    let userStatus = allParameterData && allParameterData.splash_popup &&  allParameterData.splash_popup[0]


    return (
      <View style={mainContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.onRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}>

          

          {this.carausalView(bannerData)}

          {/* CATEGORY DESIGNS */}
          {!this.props.isFetching && collection && collection.length > 0 && (
            <View style={topHeading}>
              <View style={heading}>
                <_Text
                  fsExtraLarge
                  fwPrimary
                  numberOfLines={1}
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular18, letterSpacing: 0.7 }}>
                  {strings.categoryDesigns}
                </_Text>
              </View>

              <View style={watchAllView}>
                <TouchableOpacity
                  style={watchTouchableView}
                  onPress={() =>
                    this.props.navigation.navigate('CategoryContainer', {
                      collection: collection,
                      fromSeeMore: true,
                    })
                  }>
                  <_Text
                    fsHeading
                    numberOfLines={1}
                    fwSmall
                    textColor={'#000000'}
                    style={{ ...Theme.ffLatoRegular14 }}>
                    {strings.seeMore}
                  </_Text>
                  <Image
                    resizeMode={'cover'}
                    style={watchAllImage}
                    source={require('../../assets/image/watchAll.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!this.props.isFetching &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingLeft: Platform.OS === 'ios' ? hp(2.2) : hp(1), flexDirection: 'row',
                }}>
                {collection &&
                  collection.map((item, i) => this.getCategoryDesigns(item, i))}
              </View>
            </ScrollView>
          }


          {/* BANNER */}
          {!isFetching && userStatus.status == 'Active' &&  
            <View>
              <View style={{ marginTop: hp(2), marginBottom: -10, borderColor:'#DDDDDD',
                  height: hp(27), width: '100%', }}>
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
          

              <View style={{ backgroundColor: '#DDDDDD', height: hp(5),alignItems:'center',justifyContent:'center' }}>
                <_Text fsHeading fwHeading numberOfLines={1}
                  style={{ textAlign: 'center', marginTop: hp(1), marginBottom:hp(1),
                    marginHorizontal: hp(2) }}>
                  {userStatus.description}
                </_Text>
              </View>

            </View>
          }

          {/* PRODUCT DESIGNS */}

          {finalCollection && !isFetching &&
            finalCollection.map((data, index) => (
              <View>
                <View style={topHeading1}>
                  <View style={heading}>
                    <_Text
                      fsExtraLarge
                      fwPrimary
                      numberOfLines={1}
                      textColor={'#000000'}
                      style={{ ...Theme.ffLatoRegular18, letterSpacing: 0.7}}>
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

          {/* FOLLOW US ON SOCIAL  */}

          {/* {!this.props.isFetching && finalCollection && finalCollection.length > 0 &&
                        <View style={folloUs}>
                            <View style={socialIconView}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../../assets/image/instaIcon.png')}
                                        style={{ height: hp(5), width: hp(5) }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../../assets/image/facebook.png')}
                                        style={{ height: hp(4.8), width: hp(4.8) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={socialTextView}>
                                <_Text
                                    textColor={color.brandColor}
                                    style={{ textAlign: 'center',...Theme.ffLatoRegular20, }} 
                                    fsExtraLarge fwSmall>
                                    Follow us on social media
                            </_Text>
                            </View>

                        </View>
                    } */}

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