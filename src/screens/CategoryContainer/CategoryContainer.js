import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ImageBackground, SafeAreaView,
  Image, TouchableOpacity, ActivityIndicator,Platform,
}
  from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import { color } from '@values/colors';
import { capitalizeFirstLetter } from "@values/validate";
import _Header from '@header/_Header'
import * as Animatable from 'react-native-animatable';
import _CustomHeader from '@customHeader/_CustomHeader'
import _Container from '@container/_Container';
import { connect } from 'react-redux';
import { urls } from '@api/urls'
import {
  getHomePageData
} from '@homepage/HomePageAction';
import IconPack from '../OnBoarding/Login/IconPack';



class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    const collection = this.props.route ? this.props.route.params.collection : [];
    const fromSeeMore = this.props.route ? this.props.route.params.fromSeeMore : false

    this.state = {
      categories: collection,
      fromSeeMore: fromSeeMore,
      successHomePageVersion: 0,
      errorHomePageVersion: 0,

    };
  }

  componentDidMount = () => {
    const { homePageData } = this.props
    const { fromSeeMore } = this.state

    if (!fromSeeMore && homePageData.collection && (homePageData.collection).length > 0) {
      this.setState({
        categories: homePageData.collection
      })
    }
  }

  
  static getDerivedStateFromProps(nextProps, prevState) {
    const { successHomePageVersion, errorHomePageVersion,
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
    

    

    return newState;
}


  async componentDidUpdate(prevProps, prevState) {
    const { totalCartCountData, addToWishlistData,errorMsg,
        addToCartData, homePageData, addToCartPlusOneData } = this.props;


    if (this.state.successHomePageVersion > prevState.successHomePageVersion) {
        if (homePageData && homePageData.collection) {
            this.setState({
              categories: homePageData && homePageData.collection ? homePageData.collection : []
            })
        }
    }
}

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };


  showNotification = () => {
    alert('showNotification from category')
  }

  onSearchPress = () => {
    alert('onSearch from category')
  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  getProductGridOrNot = (data) => {
    if (data.subcategory.length === 0) {
      this.props.navigation.navigate("ProductGrid", { gridData: data })
    } else if (data.subcategory.length > 0) {
      this.props.navigation.navigate("SubCategoryList", { subcategory: data })
    }
  }

  
  noDataFound = (msg) => {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', bottom: hp(5) }}>
        <Image
          source={require("../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400',textAlign:'center' }}>{msg}</Text>
      </View>
    )
  }

  onRefresh = async() =>{
    const type = Platform.OS === 'ios' ? 'ios' : 'android'

    const refreshData = new FormData();
    refreshData.append('user_id', userId);
    refreshData.append('image_type', type);

    await this.props.getHomePageData(refreshData)

}


  render() {
    const { categories, fromSeeMore } = this.state
    const { homePageData, isFetching } = this.props

    let baseUrl = urls.imageUrl + 'public/backend/collection/'


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcf9' }}>

        {fromSeeMore &&
          <_CustomHeader
            Title={'Category'}
          //  RightBtnIcon1={require('../../assets/image/BlueIcons/Search.png')}
            RightBtnIcon2={require('../../assets/image/BlueIcons/Notification-White.png')}
            LeftBtnPress={() => this.props.navigation.goBack()}
            //RightBtnPressOne={()=> this.props.navigation.navigate('SearchScreen')}
            RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
            rightIconHeight2={hp(3.5)}
            LeftBtnPress={() => this.props.navigation.goBack()}
            backgroundColor={color.green}
          />}

        <View style={{
          justifyContent: 'center', width: wp(100),
          marginBottom: !fromSeeMore ? 0 : hp(9)
        }}>
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={isFetching}
            data={categories && categories}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
                <Animatable.View animation="flipInX" style={{ paddingTop: hp(1), paddingBottom: hp(0.5) }}>
                  <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(2), marginRight: hp(2) }}>
                    <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                      <Image
                        style={{
                          height: hp(10), width: hp(10), borderRadius: 10,
                          borderWidth: 0.4, borderColor: color.gray
                        }}
                        source={{ uri: baseUrl + item.image_name }}
                        // defaultSource={require('../../assets/image/default.png')}
                        defaultSource={IconPack.APP_LOGO}

                      />
                    </View>

                    <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.70 }}>
                      <_Text numberOfLines={2} fwPrimary
                        //textColor={color.white}
                        fsMedium style={{ marginRight: hp(3), marginLeft: Platform.OS === 'ios' ? hp(1) : 0 }}>
                        {capitalizeFirstLetter(item.col_name)}
                      </_Text>
                    </View>
                  </View>
                  {index !== 9 &&
                    <View
                      style={{
                        paddingTop: hp(1), marginLeft: wp(22), marginRight: wp(3),
                        alignSelf: 'stretch',
                        borderBottomColor: '#D3D3D3',
                        borderBottomWidth: 1,
                      }}
                    />}
                </Animatable.View>
              </TouchableOpacity>
            )
            }
          />
        </View>

        {(!categories || categories.length === 0) ? this.noDataFound(this.props.errorMsg) : null}

      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  loaderView: {
    position: 'absolute',
    height: hp(80),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  }
});


function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,
    successHomePageVersion: state.homePageReducer.successHomePageVersion,
    errorHomePageVersion: state.homePageReducer.errorHomePageVersion,
    homePageData: state.homePageReducer.homePageData,
  };
}

export default connect(mapStateToProps, {getHomePageData})(CategoryContainer);
 