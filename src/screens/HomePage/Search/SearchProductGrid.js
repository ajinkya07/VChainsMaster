import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import {connect} from 'react-redux';
import {color} from '@values/colors';
import { urls } from '@api/urls'
import IconPack from '@login/IconPack';

import ProductGridStyle from '@productGrid/ProductGridStyle';
// import {} from '@search/SearchAction';
import {
  getProductSubCategoryData,
  addProductToWishlist,
  addProductToCart,
  addRemoveProductFromCartByOne,
} from '@productGrid/ProductGridAction';

import {getTotalCartCount} from '@homepage/HomePageAction';

import {Toast, CheckBox} from 'native-base';
import Modal from 'react-native-modal';
import {strings} from '@values/strings';
import FastImage from 'react-native-fast-image';
import Theme from '../../../values/Theme';

var userId = '';

class SearchProductGrid extends Component {
  constructor(props) {
    super(props);

    const from = this.props.route.params.fromCodeSearch;

    this.state = {
        gridData: [],
        page: 0,
        productInventoryId: '',
        isProductImageModalVisibel: false,
        productImageToBeDisplayed: '',
        clickedLoadMore: false,
        selectedSortById: '2',
        fromCodeSearch:from,

      successProductGridVersion: 0,
      errorProductGridVersion: 0,
      successAddProductToWishlistVersion: 0,
      errorAddProductToWishlistVersion: 0,


      successAddProductToCartVersion: 0,
      errorAddProductToCartVersion: 0,

      successProductAddToCartPlusOneVersion: 0,
      errorProductAddToCartPlusOneVersion: 0,
      productInventoryId: '',
      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,

    };
    userId = global.userId;
  }

  componentDidMount = () => {
    const{searchByCategoryData} = this.props
    const{gridData} = this.state

    if(searchByCategoryData && searchByCategoryData.data.products && searchByCategoryData.data.products.length>0){
        this.setState({
            gridData:this.state.page === 0 ? searchByCategoryData.data.products
                    : [...this.state.gridData, ...searchByCategoryData.data.products],
          });
      }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successProductGridVersion,
      errorProductGridVersion,
      
      successAddProductToWishlistVersion,
      errorAddProductToWishlistVersion,
      successAddProductToCartVersion,
      errorAddProductToCartVersion,
      successProductAddToCartPlusOneVersion,
      errorProductAddToCartPlusOneVersion,
      successTotalCartCountVersion,
      errorTotalCartCountVersion,
     } = nextProps;
    let newState = null;

    
    if (successProductGridVersion > prevState.successProductGridVersion) {
      newState = {
        ...newState, successProductGridVersion: nextProps.successProductGridVersion,
      };
    }
    if (errorProductGridVersion > prevState.errorProductGridVersion) {
      newState = {
        ...newState, errorProductGridVersion: nextProps.errorProductGridVersion,
      };
    }
    
    if ( successAddProductToWishlistVersion > prevState.successAddProductToWishlistVersion ) {
      newState = {
        ...newState,
        successAddProductToWishlistVersion: nextProps.successAddProductToWishlistVersion,
      };
    }
    if ( errorAddProductToWishlistVersion > prevState.errorAddProductToWishlistVersion) {
      newState = {
        ...newState,
        errorAddProductToWishlistVersion: nextProps.errorAddProductToWishlistVersion,
      };
    }

    if (successAddProductToCartVersion > prevState.successAddProductToCartVersion) {
      newState = {
        ...newState,
        successAddProductToCartVersion: nextProps.successAddProductToCartVersion,
      };
    }
    if (errorAddProductToCartVersion > prevState.errorAddProductToCartVersion) {
      newState = {
        ...newState,
        errorAddProductToCartVersion: nextProps.errorAddProductToCartVersion,
      };
    }

    if ( successProductAddToCartPlusOneVersion > prevState.successProductAddToCartPlusOneVersion) {
      newState = {
        ...newState,
        successProductAddToCartPlusOneVersion:
          nextProps.successProductAddToCartPlusOneVersion,
      };
    }
    if ( errorProductAddToCartPlusOneVersion > prevState.errorProductAddToCartPlusOneVersion) {
      newState = {
        ...newState,
        errorProductAddToCartPlusOneVersion:
          nextProps.errorProductAddToCartPlusOneVersion,
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
      productGridData,
      addProductToWishlistData,
      addProductToCartData,
      productAddToCartPlusOneData,
      totalCartCountData,
    } = this.props;


    const { categoryData, page, selectedSortById, gridData } = this.state;

    if (this.state.successProductGridVersion > prevState.successProductGridVersion) {
      if (productGridData.products && productGridData.products.length > 0) {
        this.setState({
          gridData:
            this.state.page === 0
              ? productGridData.products
              : [...this.state.gridData, ...productGridData.products],
        });
      } else {
        this.showToast('Please contact admin', 'danger');
      }
    }

    if (this.state.errorProductGridVersion > prevState.errorProductGridVersion) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        color: 'warning',
        duration: 2500,
      });
      this.setState({ page: 0 });
    }

    
    if (this.state.successAddProductToWishlistVersion > prevState.successAddProductToWishlistVersion ) {
      if (addProductToWishlistData.ack === '1') {
        Toast.show({
          text: addProductToWishlistData && addProductToWishlistData.msg,
          duration: 2500,
        });
      }
    }

    if (this.state.errorAddProductToWishlistVersion > prevState.errorAddProductToWishlistVersion ) {
      Toast.show({
        text: addProductToWishlistData && addProductToWishlistData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successAddProductToCartVersion > prevState.successAddProductToCartVersion ) {
      if (addProductToCartData.ack === '1') {

       // let id = gridData && gridData[0].collection_id
          var dex = this.state.gridData.findIndex(
            item => item.product_inventory_id == this.state.productInventoryId2,
          );
  
          if (dex !== -1) {
            if (addProductToCartData.data && addProductToCartData.data.quantity !== null) {
              this.state.gridData[dex].quantity = parseInt(addProductToCartData.data.quantity);
  
              this.setState({quantity: addProductToCartData.data.quantity},
                () => {
                  console.log(JSON.stringify(this.state.gridData));
                },
              );
            } else if (addProductToCartData.data == null) {
              this.state.gridData[dex].quantity = parseInt(0);
              this.setState({quantity: '0'},
                () => {
                  console.log(JSON.stringify(this.state.gridData));
                },
              );
            }

        Toast.show({
          text: addProductToCartData && addProductToCartData.msg,
          duration: 2500,
        });

      }
      }
    }


    if ( this.state.errorAddProductToCartVersion > prevState.errorAddProductToCartVersion) {
      Toast.show({
        text: addProductToCartData && addProductToCartData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successProductAddToCartPlusOneVersion > prevState.successProductAddToCartPlusOneVersion) {
      if (productAddToCartPlusOneData.ack === '1') {
       
        var Index = this.state.gridData.findIndex(
          item => item.product_inventory_id == this.state.productInventoryId,
        );

        if (Index !== -1) {
          if (productAddToCartPlusOneData.data && productAddToCartPlusOneData.data.quantity !== null) {
            this.state.gridData[Index].quantity = parseInt(
              productAddToCartPlusOneData.data.quantity,
            );

            this.setState({quantity: productAddToCartPlusOneData.data.quantity},
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          } else if (productAddToCartPlusOneData.data == null) {
            this.state.gridData[Index].quantity = parseInt(0);
            this.setState(
              {
                quantity: '0',
              },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          }
        }

        Toast.show({
          text: productAddToCartPlusOneData && productAddToCartPlusOneData.msg,
          duration: 2500,
        });
      }
    }
    if (this.state.errorProductAddToCartPlusOneVersion > prevState.errorProductAddToCartPlusOneVersion) {
      Toast.show({
        text: productAddToCartPlusOneData && productAddToCartPlusOneData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count;
    }

  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.brandColor} />
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

  //GRID UI HERE------------

  gridView = item => {
    const {
      gridItemDesign,
      latestTextView,
      latestTextView2,
      gridImage,
      gridDesign,
      border,
      iconView,
    } = ProductGridStyle;

      let url = urls.imageUrl + 'public/backend/product_images/zoom_image/'

      const{gridData} = this.state

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ProductDetails', {productItemDetails: item,}) }>
        <View
          style={{
            backgroundColor: color.white,
            height: Platform.OS === 'android' ? hp(34) : hp(31),
            width: wp(46),
            marginHorizontal: hp(1),
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2.2,
          }}
          activeOpacity={1}>
          <View style={gridItemDesign}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProductDetails', {
                  productItemDetails: item,
                })
              }
              onLongPress={() => this.showProductImageModal(item)}>
              <Image
                resizeMode={'stretch'}
                style={gridImage}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: url + item.image_name,}}
              />
              {/* <FastImage
                style={gridImage}
                source={{
                  uri: url + item.image_name,
                }}
                resizeMode={FastImage.resizeMode.cover}
              /> */}
            </TouchableOpacity>
            <View style={latestTextView}>
              <View style={{width: wp(15), marginLeft: 5}}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular13}}>
                  Code :
                </_Text>
              </View>
              <View
                style={{
                  marginRight: 8,
                  width: wp(24),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <_Text
                  numberOfLines={1}
                  fsPrimary
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular12}}>
                  {item.value[0]}
                </_Text>
              </View>
            </View>

            <View style={latestTextView2}>
              <View style={{marginLeft: 5}}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular13}}>
                  Gross Wt :
                </_Text>
              </View>
              <View
                style={{
                  marginRight: 8,
                  width: wp(24),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <_Text
                  numberOfLines={1}
                  fsPrimary
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular12}}>
                  {parseInt(item.value[1]).toFixed(2)}
                </_Text>
              </View>
            </View>

            <View style={latestTextView2}>
              <View style={{marginLeft: 5}}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular13}}>
                  Name :{' '}
                </_Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  width: wp(28),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <_Text
                  numberOfLines={1}
                  fsPrimary
                  textColor={color.brandColor}
                  textColor={'#000000'}
                  style={{...Theme.ffLatoRegular12}}>
                  {item.value[2]}
                </_Text>
              </View>
            </View>
            <View style={border}></View>

            {item.quantity == 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() => this.addProductToWishlist(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Green-Heart.png')}
                    style={{height: hp(3.1), width: hp(3), marginTop: 2}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addProductToCart(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Green-Cart.png')}
                    style={{height: hp(3.1), width: hp(3), marginTop: 2}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            {item.quantity > 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() => this.removeProductFromCartByOne(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Minus.png')}
                    style={{height: hp(3), width: hp(3)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <_Text
                  numberOfLines={1}
                  textColor={color.brandColor}
                  fsMedium
                  fwHeading>
                  {item.quantity >= 1 ? item.quantity : item.in_cart}
                </_Text>

                <TouchableOpacity
                  onPress={() => this.addProductToCartPlusOne(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Plus.png')}
                    style={{height: hp(3), width: hp(3)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  addProductToWishlist = async item => {
    const {gridData, page, selectedSortById} = this.state;

    let id = gridData && gridData[0].collection_id

    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_inventory_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    await this.props.addProductToWishlist(wishlistData);

  //   const data1 = new FormData();
  //   data1.append('table', 'product_master');
  //   data1.append('mode_type', 'normal');
  //   data1.append('collection_id', id);
  //   data1.append('user_id', userId);
  //   data1.append('record', 10);
  //   data1.append('page_no', page);
  //   data1.append('sort_by', selectedSortById);

  //  await this.props.getProductSubCategoryData(data1);
  };

  addProductToCart = async item => {
    const { page, selectedSortById} = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cartData = new FormData();

    cartData.append('product_id', item.product_inventory_id);
    cartData.append('user_id', userId);
    cartData.append('cart_wish_table', 'cart');
    cartData.append('no_quantity', 1);
    cartData.append('product_inventory_table', 'product_master');

    await this.props.addProductToCart(cartData);

    const countData = new FormData();
    countData.append('user_id', userId);
    countData.append('table', 'cart');

    await this.props.getTotalCartCount(countData);

    this.setState({
      productInventoryId2: item.product_inventory_id,
    });
  };


  addProductToCartPlusOne = async item => {
    const { page, selectedSortById} = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart = new FormData();

    cart.append('product_id', item.product_inventory_id);
    cart.append('user_id', userId);
    cart.append('cart_wish_table', 'cart');
    cart.append('no_quantity', 1);
    cart.append('product_inventory_table', 'product_master');
    cart.append('plus', 1);

    await this.props.addRemoveProductFromCartByOne(cart);

    this.setState({
      productInventoryId: item.product_inventory_id,
    });
  };

  removeProductFromCartByOne = async item => {
    const { page, selectedSortById} = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart1 = new FormData();

    cart1.append('product_id', item.product_inventory_id);
    cart1.append('user_id', userId);
    cart1.append('cart_wish_table', 'cart');
    cart1.append('no_quantity', 1);
    cart1.append('product_inventory_table', 'product_master');
    cart1.append('plus', 0);

    await this.props.addRemoveProductFromCartByOne(cart1);

    if (item.quantity == 1) {
      const countData1 = new FormData();
      countData1.append('user_id', userId);
      countData1.append('table', 'cart');

      await this.props.getTotalCartCount(countData1);
    }

    this.setState({
      productInventoryId: item.product_inventory_id,
    });
  };

  showProductImageModal = item => {
    this.setState({
      productImageToBeDisplayed: item,
      isProductImageModalVisibel: true,
    });
  };

  showNoDataFound = message => {
    return (
      <View
        style={{
          height: hp(60),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../assets/gif/noData.gif')}
          style={{height: hp(20), width: hp(20)}}
          resizeMode="cover"
        />
        <_Text style={{paddingTop: 5}}>{message}</_Text>
      </View>
    );
  };

  seperator = () => {
    return (
      <View
        style={{
          borderBottomColor: color.primaryGray,
          borderBottomWidth: 0.5,
          width: wp(95),
        }}
      />
    );
  };

  LoadMoreData = () => {
    this.setState(
      {
        page: this.state.page + 1,
        clickedLoadMore: true,
      },
      () => this.LoadRandomData(),
    );
  };

  LoadRandomData = () => {
    const {gridData, page} = this.state;

    const { allParameterData } = this.props;


    let accessCheck = allParameterData && allParameterData.access_check

    let id = gridData && gridData[0].collection_id


    if (accessCheck == '1') {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'normal');
      data.append('collection_id', id);
      data.append('user_id', userId);
      data.append('record', 10);
      data.append('page_no', page);
      data.append('sort_by', '2');

      this.props.getProductSubCategoryData(data);
    }
    else {
      alert('Your access to full category has been expired. Please contact administrator to get access.')
    }
 };

  footer = () => {
    return (
      <View>
        {!this.props.isFetching && this.state.gridData.length >= 10 ? (
          <TouchableOpacity onPress={() => this.LoadMoreData()}>
            <View
              style={{
                flex: 1,
                height: hp(7),
                width: wp(100),
                backgroundColor: '#EEF8F7',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: '#0d185c', fontSize: 18, fontWeight: 'bold'}}>
                Load More
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {this.state.clickedLoadMore &&
        this.props.isFetching &&
        this.state.gridData.length >= 10 ? (
          <View
            style={{
              flex: 1,
              height: 40,
              width: wp(100),
              backgroundColor: '#EEF8F7',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="small" color={color.brandColor} />
          </View>
        ) : null}
      </View>
    );
  };

  
  onTextChanged = (inputKey, value) => {
    this.setState({
      [inputKey]: value,
    });
  };



  render() {
    const {gridData, productImageToBeDisplayed, isProductImageModalVisibel,fromCodeSearch} = this.state;

      let imageUrl = urls.imageUrl + 'public/backend/product_images/zoom_image/'

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f3fcf9'}}>
        <_CustomHeader
          Title={`(${gridData.length.toString()})` + ' ' + `${!fromCodeSearch ? 'Advanced Search' : ' Search By Code' }`}
          // Subtitle={ `(${(gridData.length).toString()})`}
          RightBtnIcon1={require('../../../assets/image/BlueIcons/Search-White.png')}
          RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
          RightBtnPressOne={() =>
            this.props.navigation.navigate('SearchScreen')
          }
          RightBtnPressTwo={() =>
            this.props.navigation.navigate('Notification')
          }
          rightIconHeight2={hp(3.5)}
          LeftBtnPress={() => this.props.navigation.goBack()}
          backgroundColor="#19af81"
        />


        {gridData && (
          <FlatList
            data={gridData}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{marginBottom: hp(1), marginTop: hp(1)}}>
                {this.gridView(item)}
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => item.product_inventory_id.toString()}
            style={{marginTop: hp(1)}}
            ListFooterComponent={this.footer()}
          />
        )}

        {this.props.isFetching && this.renderLoader()}



        {/* LONG PRESS IMAGE MODAL */}

        {this.state.isProductImageModalVisibel && (
          <View>
            <Modal
              style={{justifyContent: 'center'}}
              isVisible={this.state.isProductImageModalVisibel}
              onRequestClose={() =>
                this.setState({isProductImageModalVisibel: false})
              }
              onBackdropPress={() =>
                this.setState({isProductImageModalVisibel: false})
              }
              onBackButtonPress={() =>
                this.setState({isProductImageModalVisibel: false})
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
                    Code: {productImageToBeDisplayed.collection_sku_code}
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
                    source={{uri: imageUrl + productImageToBeDisplayed.image_name}}
                    defaultSource={IconPack.APP_LOGO}
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5),
                    }}
                    resizeMode='stretch'
                  />
                  {/* 
                   <FastImage
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5),
                    }}
                    source={{
                      uri: imageUrl + productImageToBeDisplayed.image_name,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  /> */}
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#808080',
  },
  toText: {
    fontSize: 16,
    color: '#808080',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterImg: {
    width: 20,
    height: 20,
    marginRight: 15,
    marginTop: 2,
  },
  grossWeightContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  leftGrossWeight: {
    backgroundColor: '#D3D3D3',
    flex: 1,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightGrossWeight: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  sliderContainer: {
    flexDirection: 'row',
  },
  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  filterTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 46,
    alignItems: 'center',
    backgroundColor: '#11255a',
  },
  grosswt: {
    borderWidth: 1,
    borderRightColor: '#fbcb84',
    height: '90%',
  },
});

function mapStateToProps(state) {
  return {
    isFetchingSearch: state.searchReducer.isFetchingSearch,
    errorSearch: state.searchReducer.errorSearch,
    errorMsgSearch: state.searchReducer.errorMsgSearch,
    successSearchbyCategoryVersion: state.searchReducer.successSearchbyCategoryVersion,
    errorSearchbyCategoryVersion: state.searchReducer.errorSearchbyCategoryVersion,
    searchByCategoryData: state.searchReducer.searchByCategoryData,

    isFetching: state.productGridReducer.isFetching,
    error: state.productGridReducer.error,
    errorMsg: state.productGridReducer.errorMsg,
    successProductGridVersion: state.productGridReducer.successProductGridVersion,
    errorProductGridVersion: state.productGridReducer.errorProductGridVersion,
    productGridData: state.productGridReducer.productGridData,
    
    successAddProductToWishlistVersion:state.productGridReducer.successAddProductToWishlistVersion,
    errorAddProductToWishlistVersion: state.productGridReducer.errorAddProductToWishlistVersion,
    addProductToWishlistData: state.productGridReducer.addProductToWishlistData,

    successAddProductToCartVersion: state.productGridReducer.successAddProductToCartVersion,
    errorAddProductToCartVersion: state.productGridReducer.errorAddProductToCartVersion,
    addProductToCartData: state.productGridReducer.addProductToCartData,

    successProductAddToCartPlusOneVersion: state.productGridReducer.successProductAddToCartPlusOneVersion,
    errorProductAddToCartPlusOneVersion: state.productGridReducer.errorProductAddToCartPlusOneVersion,
    productAddToCartPlusOneData: state.productGridReducer.productAddToCartPlusOneData,

    successTotalCartCountVersion: state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion: state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

  }
}

export default connect(
  mapStateToProps , {
      getProductSubCategoryData,
      addProductToWishlist,
      addProductToCart,
      addRemoveProductFromCartByOne,
      getTotalCartCount,
    }
)(SearchProductGrid);
