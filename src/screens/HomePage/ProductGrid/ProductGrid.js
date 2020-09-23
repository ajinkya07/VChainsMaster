import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { color } from '@values/colors';
import { urls } from '@api/urls'
import { withNavigationFocus } from '@react-navigation/compat';

import ProductGridStyle from '@productGrid/ProductGridStyle';
import {
  getProductSubCategoryData,
  getSortByParameters,
  getfilterParameters,
  applyFilterProducts,
  addProductToWishlist,
  addProductToCart,
  addRemoveProductFromCartByOne,
} from '@productGrid/ProductGridAction';

import { getTotalCartCount } from '@homepage/HomePageAction';

import { Toast, CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import { strings } from '@values/strings';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FastImage from 'react-native-fast-image';
import _, { fromPairs } from 'lodash';
import Theme from '../../../values/Theme';
import IconPack from '@login/IconPack';

var userId = '';
var selectedProductIds = []

class ProductGrid extends Component {
  constructor(props) {
    super(props);

    const categoryData = this.props.route.params.gridData;
    const from = this.props.route.params.fromExclusive;
    const name = this.props.route.params.collectionName;
  

    
        this.state = {
      categoryData: categoryData,
      fromExclusive: from,
      collectionName:name,

      successProductGridVersion: 0,
      errorProductGridVersion: 0,
      isSortByModal: false,
      isFilterModalVisible: false,
      sliderValue: '15',
      toValue: 0.0,
      fromValue: 0.0,

      selectedSortById: '2',

      gridData: [],
      loadingExtraData: false,
      page: 0,
      isProductImageModalVisibel: false,
      productImageToBeDisplayed: '',

      successSortByParamsVersion: 0,
      errorSortByParamsVersion: 0,
      sortList: [],

      successFilterParamsVersion: 0,
      errorFilterParamsVersion: 0,

      successFilteredProductVersion: 0,
      errorFilteredProductVersion: 0,
      successAddProductToWishlistVersion: 0,
      errorAddProductToWishlistVersion: 0,
      clickedLoadMore: false,

      successAddProductToCartVersion: 0,
      errorAddProductToCartVersion: 0,

      successProductAddToCartPlusOneVersion: 0,
      errorProductAddToCartPlusOneVersion: 0,
      productInventoryId: '',
      productInventoryId2:'',
      isGrossWtSelected: true,
      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,
      filterData: [],

      isSelectPressed:false,
      selectedItem:'',
      selectedProducts:[]
    };
    userId = global.userId;
  }

  componentDidMount = () => {
    const { categoryData, page, fromExclusive } = this.state;

    if (categoryData && !fromExclusive && categoryData.subcategory.length === 0) {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'normal');
      data.append('collection_id', categoryData.id);
      data.append('user_id', userId);
      data.append('record', 10);
      data.append('page_no', page);
      data.append('sort_by', '2');

      this.props.getProductSubCategoryData(data);
    }
    let data2 = new FormData();
    data2.append('collection_id', categoryData.id);
    data2.append('table', 'product_master');
    data2.append('user_id', userId);
    data2.append('mode_type', 'all_filter');

    this.props.getSortByParameters();
    this.props.getfilterParameters(data2);


    if (categoryData && fromExclusive) {
      const excl = new FormData();
      excl.append('table', 'product_master');
      excl.append('mode_type', 'my_collection');
      excl.append('collection_id', 0);
      excl.append('user_id', userId);
      excl.append('record', 10);
      excl.append('page_no', page);
      excl.append('sort_by', '2');
      excl.append('my_collection_id', categoryData.id);

      this.props.getProductSubCategoryData(excl);
    }

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successProductGridVersion,
      errorProductGridVersion,
      successSortByParamsVersion,
      errorSortByParamsVersion,
      successFilterParamsVersion,
      errorFilterParamsVersion,
      successFilteredProductVersion,
      errorFilteredProductVersion,
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
        ...newState,
        successProductGridVersion: nextProps.successProductGridVersion,
      };
    }
    if (errorProductGridVersion > prevState.errorProductGridVersion) {
      newState = {
        ...newState,
        errorProductGridVersion: nextProps.errorProductGridVersion,
      };
    }
    if (successSortByParamsVersion > prevState.successSortByParamsVersion) {
      newState = {
        ...newState,
        successSortByParamsVersion: nextProps.successSortByParamsVersion,
      };
    }
    if (errorSortByParamsVersion > prevState.errorSortByParamsVersion) {
      newState = {
        ...newState,
        errorSortByParamsVersion: nextProps.errorSortByParamsVersion,
      };
    }
    if (successFilterParamsVersion > prevState.successFilterParamsVersion) {
      newState = {
        ...newState,
        successFilterParamsVersion: nextProps.successFilterParamsVersion,
      };
    }
    if (errorFilterParamsVersion > prevState.errorFilterParamsVersion) {
      newState = {
        ...newState,
        errorFilterParamsVersion: nextProps.errorFilterParamsVersion,
      };
    }
    if (
      successFilteredProductVersion > prevState.successFilteredProductVersion
    ) {
      newState = {
        ...newState,
        successFilteredProductVersion: nextProps.successFilteredProductVersion,
      };
    }
    if (errorFilteredProductVersion > prevState.errorFilteredProductVersion) {
      newState = {
        ...newState,
        errorFilteredProductVersion: nextProps.errorFilteredProductVersion,
      };
    }

    if (
      successAddProductToWishlistVersion >
      prevState.successAddProductToWishlistVersion
    ) {
      newState = {
        ...newState,
        successAddProductToWishlistVersion:
          nextProps.successAddProductToWishlistVersion,
      };
    }
    if (
      errorAddProductToWishlistVersion >
      prevState.errorAddProductToWishlistVersion
    ) {
      newState = {
        ...newState,
        errorAddProductToWishlistVersion:
          nextProps.errorAddProductToWishlistVersion,
      };
    }

    if (
      successAddProductToCartVersion > prevState.successAddProductToCartVersion
    ) {
      newState = {
        ...newState,
        successAddProductToCartVersion:
          nextProps.successAddProductToCartVersion,
      };
    }
    if (errorAddProductToCartVersion > prevState.errorAddProductToCartVersion) {
      newState = {
        ...newState,
        errorAddProductToCartVersion: nextProps.errorAddProductToCartVersion,
      };
    }

    if (
      successProductAddToCartPlusOneVersion >
      prevState.successProductAddToCartPlusOneVersion
    ) {
      newState = {
        ...newState,
        successProductAddToCartPlusOneVersion:
          nextProps.successProductAddToCartPlusOneVersion,
      };
    }
    if (
      errorProductAddToCartPlusOneVersion >
      prevState.errorProductAddToCartPlusOneVersion
    ) {
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
      sortByParamsData,
      filterParamsData,
      filteredProductData,
      addProductToWishlistData,
      addProductToCartData,
      productAddToCartPlusOneData,
      totalCartCountData,
    } = this.props;

    const { categoryData, page, selectedSortById, gridData ,fromExclusive} = this.state;

    // if (prevProps.isFocused !== this.props.isFocused) {
    //   console.warn("isFocused");
    //   await this.getData()
    // }

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

    if (this.state.successFilteredProductVersion > prevState.successFilteredProductVersion) {
      if (filteredProductData.products && filteredProductData.products.length > 0) {
        let array = [];
        let array2 = [];
        array =
          this.state.page === 0
            ? filteredProductData.products
            : [...this.state.gridData, ...filteredProductData.products];
        array2.push(...array);

        this.setState({
          gridData: array2,
          // gridData: this.state.page === 0 ? filteredProductData.products : [...this.state.gridData, ...filteredProductData.products]
        });
      } else {
        this.showToast(strings.serverFailedMsg, 'danger');
      }
    }
    if (this.state.errorFilteredProductVersion > prevState.errorFilteredProductVersion ) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        color: 'warning',
        duration: 2500,
      });
    }

    if (this.state.successFilterParamsVersion > prevState.successFilterParamsVersion) {
      if (filterParamsData && filterParamsData.length === undefined) {
        if (filterParamsData.gross_weight) {
          this.setState({
            fromValue: filterParamsData.gross_weight[0].min_gross_weight,
            toValue: filterParamsData.gross_weight[0].max_gross_weight,
          });
        }
        if (filterParamsData.net_weight) {
          this.setState({
            fromValue1: filterParamsData.net_weight[0].min_net_weight,
            toValue1: filterParamsData.net_weight[0].max_net_weight,
          });
        }
      }
    }

    if (this.state.successAddProductToWishlistVersion > prevState.successAddProductToWishlistVersion ) {
      if (addProductToWishlistData.ack === '1') {
        Toast.show({
          text: addProductToWishlistData && addProductToWishlistData.msg,
          duration: 2500,
        });

        this.setState({selectedProducts:[], isSelectPressed:false})
        selectedProductIds = []
      }
    }
    if (this.state.errorAddProductToWishlistVersion > prevState.errorAddProductToWishlistVersion ) {
      Toast.show({
        text: addProductToWishlistData && addProductToWishlistData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if ( this.state.successAddProductToCartVersion > prevState.successAddProductToCartVersion ) {
      if (addProductToCartData.ack === '1') {
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
        }

      //await this.getData()

        Toast.show({
          text: addProductToCartData && addProductToCartData.msg,
          duration: 2500,
        });
          this.setState({ isSelectPressed: false, selectedProducts: [] })
          selectedProductIds = []

      }
    }
    
    if (this.state.errorAddProductToCartVersion > prevState.errorAddProductToCartVersion ) {
      Toast.show({
        text: addProductToCartData && addProductToCartData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if ( this.state.successProductAddToCartPlusOneVersion > prevState.successProductAddToCartPlusOneVersion ) {
      if (productAddToCartPlusOneData.ack === '1') {
        // var Index = _.findIndex(this.state.gridData, {
        //     product_inventory_id: parseInt(this.state.productInventoryId),
        // });
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
            this.setState({quantity: '0'},
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
    if ( this.state.errorProductAddToCartPlusOneVersion > prevState.errorProductAddToCartPlusOneVersion  ) {
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

  getData = async() =>{
    const { categoryData, page, selectedSortById, gridData ,fromExclusive} = this.state;

    if (categoryData && !fromExclusive && categoryData.subcategory.length === 0) {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'normal');
      data.append('collection_id', categoryData.id);
      data.append('user_id', userId);
      data.append('record', 10);
      data.append('page_no', page);
      data.append('sort_by', '2');

    await  this.props.getProductSubCategoryData(data);
    }
    if (categoryData && fromExclusive) {
      const excl = new FormData();
      excl.append('table', 'product_master');
      excl.append('mode_type', 'my_collection');
      excl.append('collection_id', 0);
      excl.append('user_id', userId);
      excl.append('record', 10);
      excl.append('page_no', page);
      excl.append('sort_by', '2');
      excl.append('my_collection_id', categoryData.id);

      await this.props.getProductSubCategoryData(excl);
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

    const { isSelectPressed, selectedItem,selectedProducts} = this.state

    
    return (
      <TouchableOpacity
        onPress={() => isSelectPressed ? item.quantity > 0 ? this.showAlreadyToast() :  this.selectProduct(item, item.product_inventory_id) : 
          this.props.navigation.navigate('ProductDetails', {productItemDetails: item,})}
          >
        <View
          style={{
            backgroundColor: color.white,
            height: Platform.OS === 'android' ? hp(34) : hp(31),
            width: wp(46),
            marginHorizontal: hp(1),
            borderRadius: 15,shadowColor: '#000',
            shadowOffset: {width: 0.5,height: 0.5},
            shadowOpacity: 0.25,shadowRadius: 2, elevation: 2.2,
          }}
          activeOpacity={1}>

         
          <View style={gridItemDesign}>
            <TouchableOpacity
              onPress={() => isSelectPressed ? item.quantity > 0 ? this.showAlreadyToast() : this.selectProduct(item, item.product_inventory_id): 
                this.props.navigation.navigate('ProductDetails', {productItemDetails: item,})}
               onLongPress={() => this.showProductImageModal(item)}>
              <Image
                resizeMode={'stretch'}
                style={gridImage}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: url + item.image_name }}
              />

              {/* <FastImage
                style={gridImage}
                source={{
                  uri: url + item.image_name,
                  // cache: FastImage.cacheControl.cacheOnly,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
               */}
            </TouchableOpacity>
            <View style={latestTextView}>
              <View style={{ width: wp(15), marginLeft: 5 }}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular13 }}>
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
                  //textColor={color.brandColor}
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular12 }}>
                  {item.value[0]}
                </_Text>
              </View>
            </View>

            <View style={latestTextView2}>
              <View style={{ marginLeft: 5 }}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular13 }}>
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
                  //textColor={color.brandColor}
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular12 }}>
                  {parseInt(item.value[1]).toFixed(2)}
                </_Text>
              </View>
            </View>
            {/* <View style={border}></View> */}

            <View style={latestTextView2}>
              <View style={{ marginLeft: 5 }}>
                <_Text
                  numberOfLines={1}
                  fsSmall
                  textColor={'#000000'}
                  style={{ ...Theme.ffLatoRegular13 }}>
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
                  style={{ ...Theme.ffLatoRegular12 }}>
                  {item.value[2]}
                </_Text>
              </View>
            </View>
            <View style={border}></View>

            {item.quantity == 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() =>  isSelectPressed ? this.selectProduct(item, item.product_inventory_id) : this.addProductToWishlist(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Green-Heart.png')}
                    style={{ height: hp(3.1), width: hp(3), marginTop: 2 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => isSelectPressed ? this.selectProduct(item, item.product_inventory_id) : this.addProductToCart(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Green-Cart.png')}
                    style={{ height: hp(3.1), width: hp(3), marginTop: 2 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            {item.quantity > 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() => isSelectPressed ? this.showAlreadyToast() :  this.removeProductFromCartByOne(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Minus.png')}
                    style={{ height: hp(3), width: hp(3) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <_Text
                  numberOfLines={1}
                  textColor={color.brandColor}
                  fsMedium
                  fwHeading>
                  {item.quantity >=1 ? item.quantity : item.in_cart}
                </_Text>

                <TouchableOpacity
                  onPress={() => isSelectPressed ? this.showAlreadyToast() : this.addProductToCartPlusOne(item)}>
                  <Image
                    source={require('../../../assets/image/BlueIcons/Plus.png')}
                    style={{ height: hp(3), width: hp(3) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {isSelectPressed && !item.isSelect &&
            <View style={{
              height: 30, width: 30, borderRadius: 30 / 2,
              borderWidth: 2,
              borderColor: '#19af81',
              backgroundColor: '#FFFFFF',
              position: 'absolute'
            }}>
              <TouchableOpacity onPress={() => this.selectProduct(item, item.product_inventory_id)}>
              </TouchableOpacity>
            </View>
          }


          {isSelectPressed && item.isSelect &&
            <View style={{
              height: 30, width: 30, borderRadius: 30 / 2,
              backgroundColor: '#FFFFFF',position: 'absolute'
            }}>
              <TouchableOpacity onPress={() => this.selectProduct(item, item.product_inventory_id)}>
                <Image
                  source={require('../../../assets/image/tick.png')}
                  style={{ height: 30, width: 30, borderRadius: 30 / 2 }}
                />
              </TouchableOpacity>
            </View>
          }

        </View>
      </TouchableOpacity>
    );
  };


  selectProduct = (data, id) => {
    const { selectedItem, selectedProducts, gridData } = this.state

    const index = this.state.gridData.findIndex(
      item => data.product_inventory_id == item.product_inventory_id
    );

    if (index != -1 && !gridData[index].isSelect) {

      let array = [];
      let array2 = []
      array = [{ id }]

      array2.push(...selectedProducts, ...array);


      this.setState({ selectedProducts: array2 });

      this.state.gridData[index].isSelect = true;

      selectedProductIds = array2.map(x => { return x.id})


    }
    else if (index != -1 && gridData[index].isSelect) {

      this.state.gridData[index].isSelect = false;

     var ind = selectedProducts.map(x => { return x.id }).indexOf(id);
      selectedProducts.splice(ind, 1);
      this.setState({selectedProducts:selectedProducts})

      selectedProductIds = selectedProducts.map(i => { return i.id})

    }
  }


showAlreadyToast = () =>{
    Toast.show({
      text:'Product already added to cart',
      duration:2500
    })
  }


  addProductToWishlist = async item => {
    const { categoryData, page, selectedSortById } = this.state;
    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_inventory_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    await this.props.addProductToWishlist(wishlistData);

  };


  addSelectedProductWishList = async () => {
    const { categoryData, page, selectedSortById,gridData } = this.state;
  
    let wishData = new FormData();

    if (selectedProductIds.length > 0) {
      for (let i = 0; i < selectedProductIds.length; i++) {

        wishData.append('product_id', selectedProductIds[i]);
        wishData.append('user_id', userId);
        wishData.append('cart_wish_table', 'wishlist');
        wishData.append('no_quantity', 1);
        wishData.append('product_inventory_table', 'product_master');

        await this.props.addProductToWishlist(wishData);
       
        const dd = this.state.gridData.findIndex(
          item => selectedProductIds[i] == item.product_inventory_id
        );
    
        console.warn("dd",dd);
        this.state.gridData[dd].isSelect = false;

      }
    }
    else if (selectedProductIds.length <= 0) {
      Toast.show({
        text: 'Please select product',
        duration:2000
      })
    }

  }


  addProductToCart = async item => {
    const { categoryData, page, selectedSortById } = this.state;

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

  addSelectedProductCart = async() =>{

    const { categoryData, page, selectedSortById,gridData } = this.state;

    let ctData = new FormData();

    if(selectedProductIds.length > 0){
    for (let j = 0; j < selectedProductIds.length; j++) {
      ctData.append('product_id', selectedProductIds[j]);
      ctData.append('user_id', userId);
      ctData.append('cart_wish_table', 'cart');
      ctData.append('no_quantity', 1);
      ctData.append('product_inventory_table', 'product_master');

      await this.props.addProductToCart(ctData);

      const cc = this.state.gridData.findIndex(
        i => selectedProductIds[j] == i.product_inventory_id
      );
  
      console.warn("cc",cc);
      this.state.gridData[cc].isSelect = false;

    }

      const cd = new FormData();
      cd.append('user_id', userId);
      cd.append('table', 'cart');

      await this.props.getTotalCartCount(cd);

      // this.setState({
      //   productInventoryId2: item.product_inventory_id,
      // });

    }
    else if (selectedProductIds.length <= 0) {
      Toast.show({
        text: 'Please select product',
        duration: 2000
      })
    }

  }


  addProductToCartPlusOne = async item => {
    const { categoryData, page, selectedSortById } = this.state;

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
    const { categoryData, page, selectedSortById } = this.state;

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
          style={{ height: hp(20), width: hp(20) }}
          resizeMode="cover"
        />
        <_Text style={{ paddingTop: 5 }}>{message}</_Text>
      </View>
    );
  };

  openSortByModal = () => {
    this.setState({
      isSortByModal: true,
    });
  };

  closeSortByModal = () => {
    this.setState({
      isSortByModal: false,
    });
  };

  setSortBy = item => {
    const { categoryData, page } = this.state;

    const data = new FormData();
    data.append('table', 'product_master');
    data.append('mode_type', 'normal');
    data.append('collection_id', categoryData.id);
    data.append('user_id', userId);
    data.append('record', 10);
    data.append('page_no', 0);
    data.append('sort_by', item.value);

    this.props.getProductSubCategoryData(data);

    this.setState({
      isSortByModal: false,
      selectedSortById: item.value,
      page: 0,
    });
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
    this.setState({
        page: this.state.page + 1,
        clickedLoadMore: true,
      },
      () => this.LoadRandomData(),
    );
  };

  LoadRandomData = () => {
    const { categoryData, page, fromExclusive } = this.state;
    const { allParameterData } = this.props;


    let accessCheck = allParameterData && allParameterData.access_check
    
    if (accessCheck == '1') {
      if (categoryData && !fromExclusive) {
        const data = new FormData();
        data.append('table', 'product_master');
        data.append('mode_type', 'normal');
        data.append('collection_id', categoryData.id);
        data.append('user_id', userId);
        data.append('record', 10);
        data.append('page_no', page);
        data.append('sort_by', '2');

        this.props.getProductSubCategoryData(data);
      }
      if (categoryData && fromExclusive) {
        const excl3 = new FormData();
        excl3.append('table', 'product_master');
        excl3.append('mode_type', 'my_collection');
        excl3.append('collection_id', 0);
        excl3.append('user_id', userId);
        excl3.append('record', 10);
        excl3.append('page_no', page);
        excl3.append('sort_by', '2');
        excl3.append('my_collection_id', categoryData.id);

        this.props.getProductSubCategoryData(excl3);

      }
    }
    else{
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
                style={{ color: '#0d185c', fontSize: 18, fontWeight: 'bold' }}>
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

  toggleFilterModal = () => {
    const { filterParamsData } = this.props;

    if (filterParamsData && filterParamsData.length === undefined) {
      this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible });
    } else if (filterParamsData.length === 0) {
      Toast.show({
        text: 'No data found',
        duration: 2500,
      });
    }
  };

  onTextChanged = (inputKey, value) => {
    this.setState({
      [inputKey]: value,
    });
  };

  setFromToSliderValues = values => {
    if (values && values.length > 0) {
      this.setState({
        fromValue: values[0],
        toValue: values[1],
      });
    }
  };

  setFromToSliderValuesNet = values => {
    if (values && values.length > 0) {
      this.setState({
        fromValue1: values[0],
        toValue1: values[1],
      });
    }
  };

  applyFilter = () => {
    const {
      categoryData,
      page,
      fromValue,
      fromValue1,
      toValue1,
      toValue,
      isGrossWtSelected,
    } = this.state;

    const { filterParamsData } = this.props;


    const filterData = new FormData();
    filterData.append('table', 'product_master');
    filterData.append('mode_type', 'filter_data');
    filterData.append('collection_id', categoryData.id);
    filterData.append('user_id', userId);
    filterData.append('record', 10);
    filterData.append('page_no', 0);
    filterData.append('sort_by', '2');
    filterData.append(
      isGrossWtSelected ? 'min_gross_weight' : 'min_net_weight',
      isGrossWtSelected ? fromValue : fromValue1,
    );
    filterData.append(
      isGrossWtSelected ? 'max_gross_weight' : 'max_net_weight',
      isGrossWtSelected ? toValue : toValue1,
    );

    this.props.applyFilterProducts(filterData);

    this.setState({ isFilterModalVisible: false, page: 0 });

    if (filterParamsData && filterParamsData.length === undefined) {
      if (filterParamsData.gross_weight) {
        this.setState({
          fromValue: filterParamsData.gross_weight[0].min_gross_weight,
          toValue: filterParamsData.gross_weight[0].max_gross_weight,
        });
      }
      if (filterParamsData.net_weight) {
        this.setState({
          fromValue1: filterParamsData.net_weight[0].min_net_weight,
          toValue1: filterParamsData.net_weight[0].max_net_weight,
        });
      }
    }
  };

  showNetWeightOrNot = () => {
    const { sortByParamsData, filterParamsData } = this.props;
    if (filterParamsData && filterParamsData.length === undefined) {
      if (filterParamsData.net_weight) {
        this.setState({ isGrossWtSelected: false });
      } else {
        Toast.show({
          text: 'No Data found to show',
          duration: 2500,
        });
      }
    }
  };


  toggleSelect = () =>{
    this.setState({
      isSelectPressed:!this.state.isSelectPressed
    })
  }


  render() {
    const {
      categoryData,
      gridData,
      isSortByModal,
      isFilterModalVisible,
      selectedSortById,
      toValue,
      fromValue,
      toValue1,
      fromValue1,
      productImageToBeDisplayed,
      sortList,
      isGrossWtSelected,
      isProductImageModalVisibel,
      collectionName,
      isSelectPressed, selectedProducts, selectedItem
    } = this.state;

    const { sortByParamsData, filterParamsData , allParameterData} = this.props;

    let imageUrl = urls.imageUrl + 'public/backend/product_images/zoom_image/'
  
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcf9' }}>
        <_CustomHeader
          Title={
            `(${gridData.length.toString()})` + ' ' + `${categoryData.col_name !=undefined ? categoryData.col_name : collectionName}`
          }
          
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

        <View
          style={{
            height: hp(6),
            width: wp(100),
            flexDirection: 'row',
            borderBottomWidth: hp(0.2),
            borderBottomColor: color.primaryGray,
            backgroundColor: color.white,
          }}>

          {!isSelectPressed &&
            <TouchableOpacity
              disabled={!this.state.gridData || this.state.gridData.length === 0}
              onPress={() => this.openSortByModal()}>
              <View
                style={{
                  width: wp(33),
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ height: hp(2.8), width: hp(2.8), marginRight: hp(1.5) }}
                  source={require('../../../assets/image/BlueIcons/Sort-Green.png')}
                />
                <_Text
                  fsHeading
                  bold
                  textColor={'#19af81'}
                  style={{ ...Theme.ffLatoRegular14 }}>
                  SORT
              </_Text>
              </View>
            </TouchableOpacity>
          }

          {!isSelectPressed &&
          <TouchableOpacity
            disabled={!this.state.gridData || this.state.gridData.length === 0}
            onPress={() => this.toggleFilterModal()}>
            <View
              style={{
                width: wp(33),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ height: hp(2.8), width: hp(2.8), marginRight: hp(1.5) }}
                source={require('../../../assets/image/BlueIcons/Green-Filter.png')}
              />
              <_Text
                fsHeading
                bold
                textColor={'#19af81'}
                style={{ ...Theme.ffLatoRegular14 }}>
                FILTER
              </_Text>
            </View>
          </TouchableOpacity>
          }

          {isSelectPressed &&
            <TouchableOpacity
              disabled={!this.state.gridData || this.state.gridData.length === 0}
              onPress={() => this.addSelectedProductCart()}>
              <View
                style={{
                  width: wp(33),
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ height: hp(2.8), width: hp(2.8), marginRight: hp(1.5) }}
                  source={require('../../../assets/image/BlueIcons/Green-Cart.png')}
                  />
                <_Text
                  fsHeading
                  bold
                  textColor={'#19af81'}
                  style={{ ...Theme.ffLatoRegular14 }}>
                  CART
              </_Text>
              </View>
            </TouchableOpacity>
          }

          {isSelectPressed &&
            <TouchableOpacity
              disabled={!this.state.gridData || this.state.gridData.length === 0}
              onPress={() => this.addSelectedProductWishList()}>
              <View
                style={{
                  width: wp(33),
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ height: hp(2.8), width: hp(2.8), marginRight: hp(1.5) }}
                  source={require('../../../assets/image/BlueIcons/Green-Heart.png')}
                  />
                <_Text
                  fsHeading
                  bold
                  textColor={'#19af81'}
                  style={{ ...Theme.ffLatoRegular14 }}>
                  WISHLIST
              </_Text>
              </View>
            </TouchableOpacity>
          }


          <TouchableOpacity
            onPress={() => this.toggleSelect()}
            disabled={!this.state.gridData || this.state.gridData.length === 0}>
            <View
              style={{
                width: wp(33),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:isSelectPressed ? 'gold' : '#FFFFFF'
              }}>
              <Image
                style={{ height: hp(2.8), width: hp(2.8), marginRight: hp(2) }}
                source={require('../../../assets/image/BlueIcons/Green-Select.png')}
              />
              <_Text
                fsHeading
                bold
                textColor={'#19af81'}
                style={{ ...Theme.ffLatoRegular14 }}>
                SELECT
              </_Text>
            </View>
          </TouchableOpacity>
    
        </View>

        {gridData && (
          <FlatList
            data={gridData}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginBottom: hp(1), marginTop: hp(1) }}>
                {this.gridView(item)}
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => item.product_inventory_id.toString()}
            style={{ marginTop: hp(1) }}
            //onEndReachedThreshold={0.3}
            //onEndReached={()=> this.LoadMoreData()}
            ListFooterComponent={this.footer()}
          // ListEmptyComponent={() => this.showNoDataFound(this.props.errorMsg)}
          />
        )}

        {this.props.isFetching && this.renderLoader()}

        {/* SORT BY MODAL */}
        <View>
          <Modal
            style={{
              justifyContent: 'flex-end',
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            isVisible={this.state.isSortByModal}
            onRequestClose={this.closeSortByModal}
            onBackdropPress={() => this.closeSortByModal()}>
            <SafeAreaView>
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  paddingHorizontal: hp(1),
                  borderColor: color.gray,
                  borderWidth: 0.5,
                }}>
                <View
                  style={{
                    marginTop: 13,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 20, fontWeight: '400' }}>Sort By</Text>

                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={() => this.closeSortByModal()}>
                    <Image
                      style={{
                        alignSelf: 'flex-end',
                        height: hp(2.3),
                        width: hp(2.3),
                        marginTop: 3,
                      }}
                      source={require('../../../assets/image/BlueIcons/Cross.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1.2,
                    width: wp(100),
                  }}
                />

                <FlatList
                  data={sortByParamsData ? sortByParamsData : []}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.seperator}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                      onPress={() => this.setSortBy(item)}>
                      <View style={{ width: wp(100), flexDirection: 'row' }}>
                        <View
                          style={{
                            paddingVertical: 12,
                            width: wp(80),
                            flexDirection: 'row',
                          }}>
                          <_Text fsHeading fwSmall>
                            {item.label}
                          </_Text>
                          {item.type === 'desc' ? (
                            <Image
                              source={require('../../../assets/image/down-arrow.png')}
                              style={{
                                top: 2,
                                marginLeft: hp(2),
                                height: hp(2.2),
                                width: hp(2),
                              }}
                            />
                          ) : item.type === 'asc' ? (
                            <Image
                              source={require('../../../assets/image/uparrow.png')}
                              style={{
                                top: 2,
                                marginLeft: hp(2),
                                height: hp(2.2),
                                width: hp(2),
                              }}
                            />
                          ) : null}
                        </View>
                        <View
                          style={{
                            paddingVertical: 12,
                            width: wp(20),
                            flexDirection: 'row',
                          }}>
                          {item.value === selectedSortById && (
                            <Image
                              source={require('../../../assets/image/BlueIcons/Tick.png')}
                              style={{
                                alignItems: 'flex-end',
                                marginLeft: hp(1),
                                height: hp(2.5),
                                width: hp(3),
                              }}
                            />
                          )
                            // <CheckBox
                            //     color={color.brandColor}
                            //     checked={item.value === selectedSortById ? true : false} />
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </View>

        {/* FILTER MODAL */}

        <View>
          <Modal
            isVisible={this.state.isFilterModalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ isFilterModalVisible: false })}
            onBackdropPress={() => this.setState({ isFilterModalVisible: false })}
            style={{ margin: 0 }}>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => this.setState({ isFilterModalVisible: false })}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 100}
                behavior="height"
                style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                  <TouchableWithoutFeedback
                    style={{ flex: 1 }}
                    onPress={() => null}>
                    <View style={styles.content}>
                      <View style={styles.filterContainer}>
                        <View style={styles.filter}>
                          <Image
                            style={styles.filterImg}
                            source={require('../../../assets/image/BlueIcons/Filter.png')}
                          />
                          <Text style={{ fontSize: 20 }}>Filter</Text>
                        </View>
                        <View>
                          <TouchableOpacity onPress={() => this.applyFilter()}>
                            <Text style={{ fontSize: 20 }}>Apply</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* <View style={styles.filterTabContainer}>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            this.setState({ isGrossWtSelected: true })
                                                        }>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                color: this.state.isGrossWtSelected
                                                                    ? '#fbcb84'
                                                                    : '#000',
                                                            }}>
                                                            Gross weight
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.grosswt}></View>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({ isGrossWtSelected: false })}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: this.state.isGrossWtSelected ? '#000' : '#fbcb84',
                                                    }}>
                                                        Net weight
                                                    </Text>
                                                </TouchableOpacity>

                                            </View> */}
                      <View style={styles.border} />
                      <View style={styles.grossWeightContainer}>
                        <View style={styles.leftGrossWeight}>
                          <View
                            style={{
                              backgroundColor: this.state.isGrossWtSelected
                                ? '#D3D3D3'
                                : '#ffffff',
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({ isGrossWtSelected: true })
                              }>
                              <Text style={styles.toText}>Net weight</Text>
                            </TouchableOpacity>
                          </View>
                          {filterParamsData &&
                            filterParamsData.length === undefined &&
                            filterParamsData.net_weight && (
                              <View
                                style={{
                                  backgroundColor: this.state.isGrossWtSelected
                                    ? '#ffffff'
                                    : '#D3D3D3',
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '100%',
                                }}>
                                <TouchableOpacity
                                  onPress={() => this.showNetWeightOrNot()}>
                                  <Text style={styles.toText}>Net weight</Text>
                                </TouchableOpacity>
                              </View>
                            )}
                        </View>
                        <View style={styles.rightGrossWeight}>
                          <View>
                            <Text style={styles.toText}>
                              {' '}
                              {this.state.isGrossWtSelected
                                ? 'Net weight'
                                : 'Net weight'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {this.state.isGrossWtSelected ? (
                        <>
                          {/* <View style={styles.grossWeightContainer}>
                                                        <View style={styles.leftGrossWeight}>
                                                        <View style={{backgroundColor:'red',flex:1,alignItems:'center',justifyContent:'center',width:'100%'}}>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ isGrossWtSelected: true })
                                                        }>
                                                                <Text style={styles.toText}>Gross weight</Text>
                                                            </TouchableOpacity>  
                                                        </View>
                                                            
                                                            <View style={{backgroundColor:'yellow',flex:1,alignItems:'center',justifyContent:'center',width:'100%'}}>
                                                            <TouchableOpacity onPress={() =>
                                                        this.setState({ isGrossWtSelected: false })} >
                                                                <Text style={styles.toText}>net weight</Text>
                                                            </TouchableOpacity>
                                                            </View>          
                                                        </View>
                                                        <View style={styles.rightGrossWeight}>
                                                            <View>
                                                                <Text style={styles.toText}>Gross weight</Text>
                                                            </View>
                                                        </View>
                                                    </View> */}

                          <View style={styles.sliderContainer}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 2 }}>
                              {filterParamsData && (
                                <View>
                                  <RangeSlider
                                    data={filterParamsData}
                                    setsliderValues={this.setFromToSliderValues}
                                  />
                                </View>
                              )}

                              <View style={{ marginTop: 25 }}>
                                <Text style={styles.toText}>From</Text>
                                <TextInput
                                  editable={false}
                                  style={styles.textInputStyle}
                                  value={String(fromValue)}
                                  placeholder="0.000"
                                  placeholderTextColor="#000"
                                />
                              </View>
                              <View style={{ marginTop: 25, marginBottom: 15 }}>
                                <Text style={styles.toText}>To</Text>
                                <TextInput
                                  editable={false}
                                  style={styles.textInputStyle}
                                  value={String(toValue)}
                                  placeholder="0.000"
                                  placeholderTextColor="#000"
                                />
                              </View>
                            </View>
                          </View>
                        </>
                      ) : (
                          <>
                            {/* <View style={styles.grossWeightContainer}>
                                                            <View style={styles.leftGrossWeight}>
                                                                <TouchableOpacity>
                                                                    <Text style={styles.toText}>Net weight</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.rightGrossWeight}>
                                                                <View>
                                                                    <Text style={styles.toText}>Net weight</Text>
                                                                </View>
                                                            </View>
                                                        </View> */}
                            <View style={styles.sliderContainer}>
                              <View style={{ flex: 1 }}></View>
                              <View style={{ flex: 2 }}>
                                {filterParamsData && (
                                  <View>
                                    <NetWeightRangeSlider
                                      data={filterParamsData}
                                      setsliderValuesNet={
                                        this.setFromToSliderValuesNet
                                      }
                                    />
                                  </View>
                                )}
                                <View style={{ marginTop: 25 }}>
                                  <Text style={styles.toText}>From</Text>
                                  <TextInput
                                    editable={false}
                                    style={styles.textInputStyle}
                                    //value={fromValue1}
                                    value={String(fromValue1)}
                                    placeholder="0.000"
                                    placeholderTextColor="#000"
                                  />
                                </View>
                                <View style={{ marginTop: 25, marginBottom: 15 }}>
                                  <Text style={styles.toText}>To</Text>
                                  <TextInput
                                    editable={false}
                                    style={styles.textInputStyle}
                                    // value={toValue1}
                                    value={String(toValue1)}
                                    placeholder="0.000"
                                    placeholderTextColor="#000"
                                  />
                                </View>
                              </View>
                            </View>
                          </>
                        )}

                      <SafeAreaView />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        {/* LONG PRESS IMAGE MODAL */}

        {this.state.isProductImageModalVisibel && (
          <View>
            <Modal
              style={{ justifyContent: 'center' }}
              isVisible={this.state.isProductImageModalVisibel}
              onRequestClose={() =>
                this.setState({ isProductImageModalVisibel: false })
              }
              onBackdropPress={() =>
                this.setState({ isProductImageModalVisibel: false })
              }
              onBackButtonPress={() =>
                this.setState({ isProductImageModalVisibel: false })
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
                    source={{  uri: imageUrl + productImageToBeDisplayed.image_name }}
                    defaultSource={IconPack.APP_LOGO}
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5)}}
                    resizeMode='stretch'
                  />
                  {/* <FastImage
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5),
                    }}
                    source={{
                      uri: imageUrl + productImageToBeDisplayed.image_name,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                   */}
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
    isFetching: state.productGridReducer.isFetching,
    error: state.productGridReducer.error,
    errorMsg: state.productGridReducer.errorMsg,
    successProductGridVersion:
      state.productGridReducer.successProductGridVersion,
    errorProductGridVersion: state.productGridReducer.errorProductGridVersion,
    productGridData: state.productGridReducer.productGridData,

    successSortByParamsVersion: state.productGridReducer.successSortByParamsVersion,
    errorSortByParamsVersion: state.productGridReducer.errorSortByParamsVersion,
    sortByParamsData: state.productGridReducer.sortByParamsData,

    successFilterParamsVersion: state.productGridReducer.successFilterParamsVersion,
    errorFilterParamsVersion: state.productGridReducer.errorFilterParamsVersion,
    filterParamsData: state.productGridReducer.filterParamsData,

    successFilteredProductVersion: state.productGridReducer.successFilteredProductVersion,
    errorFilteredProductVersion: state.productGridReducer.errorFilteredProductVersion,
    filteredProductData: state.productGridReducer.filteredProductData,

    successAddProductToWishlistVersion: state.productGridReducer.successAddProductToWishlistVersion,
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

  };
}

export default connect(
  mapStateToProps,
  {
    getProductSubCategoryData,
    getSortByParameters,
    getfilterParameters,
    applyFilterProducts,
    addProductToWishlist,
    addProductToCart,
    addRemoveProductFromCartByOne,
    getTotalCartCount,
  },
)(withNavigationFocus(ProductGrid));

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    let filter = this.props.data ? this.props.data : undefined;
    this.state = {
      values: [
        filter.gross_weight[0].min_gross_weight,
        filter.gross_weight[0].max_gross_weight,
      ],
    };
  }

  multiSliderValuesChange = values => {
    this.setState({
      values,
    });
    this.props.setsliderValues(values);
  };

  render() {
    const { data } = this.props;
    const { values } = this.state;
    if (data) {
      var min = data.gross_weight[0].min_gross_weight;
      var max = data.gross_weight[0].max_gross_weight;
    }

    return (
      <View>
        {data ? (
          <View style={{ marginLeft: 10 }}>
            <MultiSlider
              values={[values[0], values[1]]}
              sliderLength={wp(60)}
              onValuesChange={this.multiSliderValuesChange}
              min={parseFloat(min)}
              max={parseFloat(max)}
              step={1}
              selectedStyle={{
                backgroundColor: '#11255a',
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
              trackStyle={{
                height: 4,
              }}
              markerStyle={{
                backgroundColor: '#11255a',
                width: 26,
                height: 26,
                borderRadius: 13,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              {values && (
                <Text style={{ fontSize: 16 }}>{this.state.values[0]}</Text>
              )}
              {values && (
                <Text style={{ fontSize: 16 }}>{this.state.values[1]}</Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

class NetWeightRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    let filter = this.props.data ? this.props.data : undefined;
    this.state = {
      values: [
        filter.net_weight[0].min_net_weight,
        filter.net_weight[0].max_net_weight,
      ],
    };
  }

  multiSliderValuesChange = values => {
    this.setState({
      values,
    });
    this.props.setsliderValuesNet(values);
  };

  render() {
    const { data } = this.props;
    const { values } = this.state;
    if (data) {
      var min = data.net_weight[0].min_net_weight;
      var max = data.net_weight[0].max_net_weight;
    }

    return (
      <View>
        {data ? (
          <View style={{ marginLeft: 10 }}>
            <MultiSlider
              values={[values[0], values[1]]}
              sliderLength={wp(60)}
              onValuesChange={this.multiSliderValuesChange}
              min={parseFloat(min)}
              max={parseFloat(max)}
              step={1}
              selectedStyle={{
                backgroundColor: '#11255a',
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
              trackStyle={{
                height: 4,
              }}
              markerStyle={{
                backgroundColor: '#11255a',
                width: 26,
                height: 26,
                borderRadius: 13,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              {values && (
                <Text style={{ fontSize: 16 }}>
                  {parseFloat(this.state.values[0])}
                </Text>
              )}
              {values && (
                <Text style={{ fontSize: 16 }}>
                  {parseFloat(this.state.values[1])}
                </Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
