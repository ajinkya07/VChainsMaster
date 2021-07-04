import React, { Component, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView, Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Container, Header, Toast, Picker, Icon } from 'native-base';
import IconPack from '@login/IconPack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { color } from '@values/colors';
import {
  getProductDetails,
  addToCartFromDetails,
} from '@category/ProductDetailsAction';
import { urls } from '@api/urls';
import { strings } from '@values/strings';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import _CustomHeader from '@customHeader/_CustomHeader';
import { parseInt } from 'lodash';
import { getTotalCartCount } from '@homepage/HomePageAction';
import Theme from '../../values/Theme';
import Carousel, { Pagination, ParallaxImage, SliderEntry } from 'react-native-snap-carousel';

var userId = '';

const AnimatedContent = Animated.createAnimatedComponent(ScrollView);


class ProductDetails extends React.Component {
  fullHeight = EStyleSheet.value('375rem');
  fixHeader = EStyleSheet.value('0rem');
  topContentHeight = 550;

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);

    const productItem = this.props.route.params.productItemDetails;

    const fromHome = this.props.route.params.fromHome;


    this.state = {
      count: 1,
      remark: '',
      isHideDetail: true,
      length: '',
      lengthArray: [],
      weight: '',
      weightArray: [],
      productItem: productItem,
      fromHome: fromHome,
      successProductDetailsVersion: 0,
      errorProductDetailsVersion: 0,
      currentPage: 0,

      successAddCartDetailsVersion: 0,
      errorAddCartDetailsVersion: 0,
      karatValue: '',

      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,
      karatData: [],
      slider1ActiveSlide: 0

    };
    userId = global.userId;
  }

  componentDidMount = () => {
    const { productItem, fromHome } = this.state;

    if (fromHome) {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'home_products');
      data.append('collection_id', 0);
      data.append('user_id', userId);
      data.append('product_id', productItem.product_id);

      this.props.getProductDetails(data);
    }

    else if (!fromHome) {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'normal');
      data.append('collection_id', productItem.collection_id);
      data.append('user_id', userId);
      data.append('product_id', productItem.product_inventory_id);

      this.props.getProductDetails(data);
    }
  };


  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successProductDetailsVersion,
      errorProductDetailsVersion,
      successAddCartDetailsVersion,
      errorAddCartDetailsVersion,
      successAllParameterVersion, errorAllParamaterVersion

    } = nextProps;
    let newState = null;

    if (successProductDetailsVersion > prevState.successProductDetailsVersion) {
      newState = {
        ...newState,
        successProductDetailsVersion: nextProps.successProductDetailsVersion,
      };
    }
    if (errorProductDetailsVersion > prevState.errorProductDetailsVersion) {
      newState = {
        ...newState,
        errorProductDetailsVersion: nextProps.errorProductDetailsVersion,
      };
    }

    if (successAddCartDetailsVersion > prevState.successAddCartDetailsVersion) {
      newState = {
        ...newState,
        successAddCartDetailsVersion: nextProps.successAddCartDetailsVersion,
      };
    }
    if (errorAddCartDetailsVersion > prevState.errorAddCartDetailsVersion) {
      newState = {
        ...newState,
        errorAddCartDetailsVersion: nextProps.errorAddCartDetailsVersion,
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
    const { productDetailsData, addCartDetailsData } = this.props;


    if (this.state.successProductDetailsVersion > prevState.successProductDetailsVersion) {
      if (productDetailsData.ack == '1') {
        this.setState({
          karatValue: productDetailsData.data[0].default_melting_id,

          productDetailsStateData: productDetailsData.data[0],

          length: productDetailsData !== undefined && productDetailsData.data[0].length ?
            productDetailsData.data[0].length : '',

          lengthArray: productDetailsData !== undefined ? productDetailsData.data[0].mul_length &&
            productDetailsData.data[0].mul_length.length !== 0
            ? productDetailsData.data[0].mul_length
            : ''
            : '',

          weightArray: productDetailsData !== undefined ? productDetailsData.data[0].weight &&
            productDetailsData.data[0].weight.length !== 0
            ? productDetailsData.data[0].weight
            : ''
            : '',

          weight: productDetailsData !== undefined ? productDetailsData.data[0].weight &&
            productDetailsData.data[0].weight.length !== 0
            ? productDetailsData.data[0].weight[0]
            : ''
            : '',
        });
      } else {
        this.showToast(strings.serverFailedMsg, 'danger');
      }
    }
    if (this.state.errorProductDetailsVersion > prevState.errorProductDetailsVersion) {
      this.showToast(this.props.errorMsg, 'danger');

      const countData = new FormData();
      countData.append('user_id', userId);
      countData.append('table', 'cart');

      await this.props.getTotalCartCount(countData);
    }

    if (this.state.successAddCartDetailsVersion > prevState.successAddCartDetailsVersion) {
      if (addCartDetailsData.ack == '1') {
        Toast.show({
          text: this.props.errorMsg,
          duration: 2500,
        });
      }
    }
    if (this.state.errorAddCartDetailsVersion > prevState.errorAddCartDetailsVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  _incrementCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  _decrementCount() {
    if (this.state.count >= 2) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }

  toggleDescriptionDetails() {
    this.setState({
      isHideDetail: !this.state.isHideDetail,
    });
  }

  setCurrentPage = position => {
    this.setState({ currentPage: position });
  };

  renderScreen = (data, k) => {
    const { productDetailsStateData } = this.state;
    const { allParameterData } = this.props
    let url2 =
      urls.imageUrl +
      (productDetailsStateData !== undefined &&
        productDetailsStateData.zoom_image);

    let headerTheme = allParameterData.theme_color ? allParameterData.theme_color : ''

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('BannerImage', {
            bannerDataImagePath: productDetailsStateData,
            baseUrl: url2,
          })
        }>
        <View key={k}>
          <FastImage
            style={{ height: hp(33), width: wp(100), backgroundColor: '#d7d7d7' }}
            source={{ uri: url2 + data }}
            resizeMode={FastImage.resizeMode.stretch}
          />

          {/* <Image
            source={{ uri: url2 + data }}
            resizeMode='stretch'
            style={{ height: hp(33), width: wp(100) }}
            defaultSource={IconPack.APP_LOGO}
          /> */}

        </View>
      </TouchableOpacity>
    );
  };

  carausalView = item => {
    return (
      <View
        style={{
          height: hp(33),
          width: wp(100),
        }}>
        {item ? (
          <Swiper
            removeClippedSubviews={false}
            style={{ flexGrow: 1 }}
            autoplayTimeout={10}
            ref={swiper => {
              this.swiper = swiper;
            }}
            index={this.state.currentPage}
            autoplay={false}
            showsPagination={true}
            loadMinimal={true}
            loadMinimalLoader={<ActivityIndicator size="small" color="gray" />}
            dot={
              <View
                style={{
                  backgroundColor: 'gray',
                  width: 7,
                  height: 7,
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
                  backgroundColor: '#303030',
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
            {item.image_name.map((page, index) =>
              this.renderScreen(page, index),
            )}
          </Swiper>
        ) : (
            this.renderLoader()
          )}
      </View>
    );
  };


  _renderItem = (data, k) => {
    const { productDetailsStateData } = this.state;
    const { allParameterData } = this.props

    let url2 =
      urls.imageUrl +
      (productDetailsStateData !== undefined &&
        productDetailsStateData.zoom_image);

    let headerTheme = allParameterData.theme_color ? allParameterData.theme_color : ''

    let item = data.item
    let index = data.index

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('BannerImage', {
            bannerDataImagePath: productDetailsStateData,
            baseUrl: url2,
            colorCode: headerTheme
          })
        }>
        <View key={index}>
          <FastImage
            style={{ height: hp(38), width: wp(100), backgroundColor: '#d7d7d7' }}
            source={{ uri: url2 + item }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View >
      </TouchableOpacity>
    );
  }

  carausalView2 = (bannerData) => {
    let { width, height } = Dimensions.get('window')
    let sliderWidth = width;
    let itemHeight = hp(33);

    return (
      <View style={{ marginBottom: -10 }}>
        <Carousel
          ref={c => this._slider1Ref = c}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={1400}
          autoplayInterval={8000}
          sliderWidth={sliderWidth}
          sliderHeight={itemHeight}
          itemWidth={sliderWidth}
          itemHeight={itemHeight}
          data={bannerData}
          renderItem={(item, index) => this._renderItem(item, index)}
          hasParallaxImages={true}
          enableMomentum={true}
          activeSlideOffset={2}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}

        />
        <Pagination
          dotsLength={bannerData.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={{ marginTop: -50 }}
          dotColor={color.black}
          dotStyle={{
            width: 10,
            height: 10, marginRight: -10,
            borderRadius: 5,
          }}
          inactiveDotColor={'gray'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={this._slider1Ref}

        />

      </View>

    )
  }


  noDataFound = () => {
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

  setSelectedValue = w => {
    this.setState({
      weight: w,
    });
  };


  setSelectedLength = l => {
    this.setState({
      length: l,
    });
  };


  PickerDropDown = () => {
    const { karatValue } = this.state;
    const { allParameterData } = this.props

    let list = allParameterData && allParameterData.melting

    return (
      <View>
        <Picker
          iosIcon={<Icon type='Ionicons' name="caret-down" style={{ marginRight: hp(3), fontSize: 22 }} />}
          mode="dropdown"
          style={{ height: 50, width: wp(55) }}
          selectedValue={karatValue}
          onValueChange={(itemValue, itemIndex) => this.setSelectedValueKarat(itemValue)
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


  setSelectedValueKarat = karat => {
    this.setState({
      karatValue: karat,
    });
  };


  PickerWeightDropDown = weightList => {

    return (
      <View>
        <Picker
          iosIcon={<Icon type='Ionicons' name="caret-down" style={{ marginRight: hp(3), fontSize: 22 }} />}
          mode="dropdown"
          style={{ height: 50, width: wp(55) }}
          selectedValue={this.state.weight}
          onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}>
          {/* <Picker.Item label={weight.toString()} value={parseInt(weight)} /> */}
          {weightList && weightList.length > 0 ? (
            weightList.map((wt) => (
              <Picker.Item label={(wt).toString()} value={parseInt(`${wt}`)} />
            )))
            : null
          }

        </Picker>
      </View>
    );
  };


  PickerLengthDropDown = lengthList => {

    return (
      <View>
        <Picker
          iosIcon={<Icon type='Ionicons' name="caret-down" style={{ marginRight: hp(3), fontSize: 22 }} />}
          mode="dropdown"
          style={{ height: 50, width: wp(55) }}
          selectedValue={this.state.length}
          onValueChange={(itemValue, itemIndex) => this.setSelectedLength(itemValue)}>
          {lengthList && lengthList.length > 0 ? (
            lengthList.map((lt) => (
              <Picker.Item label={(lt).toString()} value={parseInt(`${lt}`)} />
            )))
            : null
          }

        </Picker>
      </View>
    );
  };


  addtoCart = d => {
    const { length, count, remark, weight, karatValue } = this.state;

    let addCartData = new FormData();

    let adData = JSON.stringify([
      {
        user_id: userId.toString(),
        table: 'cart',
        product_id: d.product_master_id,
        product_inventory_table: 'product_master',
        gross_wt: d.key_value[0],
        net_wt: d.key_value[1],
        melting_id: karatValue,
        no_quantity: count,
        device_type: Platform.OS === 'ios' ? 'ios' : 'android',
        remarks: remark,
        size: d.key_value[2],
        weight: weight ? parseInt(weight) : '',
        length: length ? parseInt(length) : '',
      },
    ]);

    addCartData.append('Add_To_Cart', adData);
    this.props.addToCartFromDetails(addCartData);
  };

  addToWishList = d => {
    const { length, count, remark, weight, karatValue } = this.state;

    const addWishData = new FormData();

    let wshData = JSON.stringify([
      {
        user_id: userId,
        table: 'wishlist',
        product_id: d.product_master_id,
        product_inventory_table: 'product_master',
        gross_wt: d.key_value[0],
        net_wt: d.key_value[1],
        melting_id: karatValue,
        no_quantity: count,
        device_type: Platform.OS === 'ios' ? 'ios' : 'android',
        remarks: remark,
        size: d.key_value[2],
        weight: parseInt(weight),
        length: parseInt(length),
      },
    ]);
    addWishData.append('Add_To_Cart', wshData);
    this.props.addToCartFromDetails(addWishData);
  };


  render() {
    const headerOpacity = this.scrollY.interpolate({
      inputRange: [0, 222, 223],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const { productDetailsStateData, weight, weightArray, lengthArray } = this.state;
    const { allParameterData } = this.props

    let url =
      urls.imageUrl +
      (productDetailsStateData !== undefined &&
        productDetailsStateData.zoom_image);

    let headerTheme = allParameterData.theme_color ? allParameterData.theme_color : ''

    return (
      <SafeAreaView style={styles.flex}>
        {productDetailsStateData ? (
          <Container style={styles.flex}>
            <Header
              style={styles.headerStyle}
              iosBarStyle="default"
              androidStatusBarColor="default">
              <View style={styles.textViewStyle}>
                <TouchableOpacity
                  hitSlop={{ top: 15, left: 15, right: 20, bottom: 15 }}
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    source={require('../../assets/image/Account/back_button.png')}
                    style={{
                      marginLeft: 10,
                      height: hp(3),
                      width: hp(2.2),
                    }}
                  />
                </TouchableOpacity>
                <Animated.Text
                  style={[styles.headerTextStyle, { color: '#303030', opacity: headerOpacity }]}>
                  {productDetailsStateData.product_name}
                </Animated.Text>
              </View>
            </Header>

            <AnimatedContent
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                {
                  useNativeDriver: true,
                },
              )}
              scrollEventThrottle={16}
            >
              <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={{ flex: 1 }}>
                  <View>
                    {this.carausalView2(productDetailsStateData.image_name)}
                  </View>

                  <View style={{
                    backgroundColor: headerTheme ? '#' + headerTheme : '#D7D7D7',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                  }}>
                    <View style={styles.topTitleContainer}>
                      <View style={{ width: wp(73) }}>
                        <Text
                          style={{
                            color: 'white',
                            ...Theme.ffLatoRegular18,
                            letterSpacing: 0.8,
                          }}>
                          {productDetailsStateData.product_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        {productDetailsStateData.in_wishlist > 0 && (
                          <Image
                            source={require('../../assets/like.png')}
                            style={styles.ImageStyle}
                          />
                        )}
                        {productDetailsStateData.in_cart > 0 && (
                          <Image
                            source={require('../../assets/shopping-cart.png')}
                            style={[styles.ImageStyle, { top: 2, width: hp(3.2) }]}
                          />
                        )}
                      </View>
                    </View>

                    <View style={styles.topBorderStyle} />

                    <View style={styles.quantityContainer}>
                      <View>
                        <Text
                          style={{ ...Theme.ffLatoRegular16, color: '#000000' }}>
                          Quantity
                        </Text>
                      </View>
                      <View style={styles.quantitySubcontainer}>
                        <TouchableOpacity
                          onPress={() => this._decrementCount()}>
                          <Image
                            source={IconPack.BLUE_MINUS}
                            style={styles.decrementCount}
                          />
                        </TouchableOpacity>
                        <TextInput
                          editable={false}
                          style={styles.countTextInput}
                          keyboardType={'numeric'}
                          onChangeText={count => this.setState({ count })}
                          value={String(this.state.count)}
                        />
                        <TouchableOpacity
                          onPress={() => this._incrementCount()}>
                          <Image
                            source={IconPack.BLUE_PLUS}
                            style={styles.incrementCountIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.remarkContainer}>
                      <Image
                        source={IconPack.REMARK}
                        style={styles.remarkIcon}
                      />
                      <TextInput
                        style={styles.remarksInput}
                        onChangeText={remark => this.setState({ remark })}
                        value={String(this.state.remark)}
                        placeholder="Write any specifications here"
                        placeholderTextColor="#000000"
                      />
                    </View>

                    <View style={styles.descriptionContainer}>
                      <TouchableOpacity
                      //onPress={() => this.toggleDescriptionDetails()}
                      >
                        <View style={styles.descriptionRowContainer}>
                          <Text
                            style={{
                              color: '#000000',
                              ...Theme.ffLatoBold15,
                              letterSpacing: 0.6,
                            }}>
                            Description
                          </Text>
                          {Platform.OS === 'android' ?
                            <Image
                              source={IconPack.GRAY_DOWN_ARROW}
                              style={styles.downArrow}
                            /> :
                            <Icon type='Ionicons' name="caret-down" style={{ marginRight: hp(2), fontSize: 22 }} />
                          }
                        </View>
                      </TouchableOpacity>
                      {this.state.isHideDetail ? (
                        <>
                          <View >
                            <View style={styles.descriptionSubContainer}>
                              <View style={{ flexDirection: 'column' }}>
                                {productDetailsStateData.key_label.map(
                                  (key, i) => {
                                    return (
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          ...Theme.ffLatoRegular15,
                                          color: '#000000',
                                        }}>
                                        {key.replace('_', ' ')}
                                      </Text>
                                    );
                                  },
                                )}
                              </View>

                              <View style={{ flexDirection: 'column' }}>
                                {productDetailsStateData.key_value.map(
                                  (value, j) => {
                                    return (
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          ...Theme.ffLatoRegular15,
                                          color: '#000000',
                                          textAlign: 'right',
                                        }}>
                                        {value ? value : '-'}
                                      </Text>
                                    );
                                  },
                                )}
                              </View>
                            </View>
                          </View>
                        </>
                      ) : null}

                      <View style={styles.customerDetailTopborder}></View>
                      <Text
                        style={{
                          color: '#000000',
                          ...Theme.ffLatoBold15,
                          letterSpacing: 0.6,
                          marginBottom: 10,
                          marginHorizontal: 10,
                        }}>
                        Customizable Detail
                      </Text>

                      {/* Melting */}
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: hp(3),
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.customizableContainer}>
                          <Text
                            style={{
                              ...Theme.ffLatoRegular15,
                              color: '#000000',
                            }}>
                            Melting
                          </Text>
                        </View>
                        {this.PickerDropDown()}

                        {/* <PickerDropDown /> */}
                      </View>

                      {/* WEIGHT */}

                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: hp(3),
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.customizableContainer}>
                          <Text
                            style={{
                              ...Theme.ffLatoRegular15,
                              color: '#000000',
                            }}>
                            Weight
                          </Text>
                        </View>
                        <View>
                          {this.PickerWeightDropDown(weightArray)}
                        </View>
                      </View>

                      {/* LENGTH */}

                      {this.state.length !== '' &&
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: hp(3),
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.customizableContainer}>
                            <Text
                              style={{
                                ...Theme.ffLatoRegular15,
                                color: '#000000',
                              }}>
                              Length
                          </Text>
                          </View>
                          <View>
                            {this.PickerLengthDropDown(lengthArray)}
                          </View>
                        </View>
                      }


                      <View style={styles.bottomTextContainer}>
                        <Text
                          style={{
                            ...Theme.ffLatoRegular15,
                            color: '#000000',
                            textAlign: 'left',
                          }}>
                          Note: * There may be 10% variation (+/-) in the actual
                          weight.{' '}
                        </Text>
                      </View>
                      {/* Footer buttons */}

                      <View
                        style={{
                          backgroundColor: headerTheme ? '#' + headerTheme : '#303030',
                          height: hp(6),
                          borderTopLeftRadius: 18,
                          borderTopRightRadius: 18,
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            borderRightWidth: 2,
                            borderRightColor: 'white',
                            margin: 3,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                            onPress={() =>
                              this.addtoCart(productDetailsStateData)
                            }>
                            ADD TO CART
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                            onPress={() =>
                              this.addToWishList(productDetailsStateData)
                            }>
                            WISHLIST
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </AnimatedContent>
          </Container>
        ) : (
            this.renderLoader()
          )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    backgroundColor: color.white,
    elevation: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  textViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    fontSize: hp(2.6),
    fontFamily: 'Lato-Bold',
    letterSpacing: 1,
    marginLeft: 12,
  },
  mainContainerStyle: {
    backgroundColor: '#19af81',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topTitleContainer: {
    marginLeft: 10,
    marginTop: hp(1),
    flexDirection: 'row',
    width: wp(90),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  ImageStyle: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
    marginRight: 20,
  },
  topBorderStyle: {
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 0.8,
    marginHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  quantitySubcontainer: {
    flexDirection: 'row',
    marginLeft: hp(5),
    height: 50,
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  decrementCount: {
    width: hp(4),
    height: hp(4),
    resizeMode: 'contain',
  },
  countTextInput: {
    borderBottomWidth: 0.5,
    height: 50,
    marginHorizontal: 10,
    width: wp(30),
    textAlign: 'center',
    fontSize: 22,
    color: color.brandColor,
  },
  incrementCountIcon: {
    width: hp(4),
    height: hp(4),
    resizeMode: 'contain',
  },
  remarkContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    height: hp(9),
  },
  remarkIcon: {
    marginTop: hp(1.2),
    width: hp(3.5),
    height: hp(3.5),
    resizeMode: 'contain',
    top: -2
  },
  remarksInput: {
    borderBottomWidth: 0.8,
    height: 50,
    marginHorizontal: 15,
    width: wp(78),
    ...Theme.ffLatoRegular16,
    color: '#000000',
    borderBottomColor: '#d7d7d7',
    fontSize: 18
  },
  descriptionContainer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: hp(1),
  },
  descriptionRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  downArrow: {
    width: hp(1.5),
    height: hp(1.5),
    top: 5,
    resizeMode: 'contain',
    marginRight: 5,
  },
  descriptionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    //marginVertical: hp(1),
  },
  border: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  customerDetailTopborder: {
    borderBottomColor: '#D3D3D3',
    marginVertical: hp(2.5),
    borderBottomWidth: 1.5,
  },
  customizableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lenghtContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginLeft: hp(3),
  },
  lengthTextInput: {
    borderBottomWidth: 1,
    height: 40,
    marginHorizontal: 10,
    width: '65%',
    fontSize: 18,
  },
  bottomTextContainer: {
    marginHorizontal: 10,
    marginTop: hp(3),
    marginBottom: hp(3),
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.productDetailsReducer.isFetching,
    error: state.productDetailsReducer.error,
    errorMsg: state.productDetailsReducer.errorMsg,
    successProductDetailsVersion: state.productDetailsReducer.successProductDetailsVersion,
    errorProductDetailsVersion: state.productDetailsReducer.errorProductDetailsVersion,
    productDetailsData: state.productDetailsReducer.productDetailsData,

    successAddCartDetailsVersion: state.productDetailsReducer.successAddCartDetailsVersion,
    errorAddCartDetailsVersion: state.productDetailsReducer.errorAddCartDetailsVersion,
    addCartDetailsData: state.productDetailsReducer.addCartDetailsData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

  };
}

export default connect(
  mapStateToProps,
  {
    getProductDetails,
    addToCartFromDetails,
    getTotalCartCount,
  },
)(ProductDetails);
