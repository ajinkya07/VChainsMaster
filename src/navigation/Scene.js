import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Container from '@homepage/Container';
import SignIn from '@login/SignIn';
import Register from '@register/Register';
import ForgotPassword from '@forgotPassword/ForgotPassword';
import VerifyOtp from '@forgotPassword/VerifyOtp';
import VerifyOtpForRegister from '@register/VerifyOtpForRegister';
import CustomWebview from '@aboutUs/CustomWebview';


import OrderHistory from '@orderHistory/OrderHistory';
import OrderHistoryDetail from '@orderHistory/OrderHistoryDetail';
import CustomOrder from '@accountCustomOrder/CustomOrder';

import ProductGrid from '@productGrid/ProductGrid';
import SubCategoryList from '@subCategoryList/SubCategoryList';
import CategoryContainer from '@category/CategoryContainer';
import ProductDetails from '@category/ProductDetails';
import SearchScreen from '@search/SearchScreen';
import Notification from '@notification/Notification';
import Banner from '@homepage/Banner';
import BannerImage from '@category/BannerImage'
import CartContainer from '@cartContainer/CartContainer'
import EditProfile from '@editProfile/EditProfile'
import SearchProductGrid from '@search/SearchProductGrid'
import Exclusive from '@exclusive/Exclusive'

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import {allParameters} from '@navigation/SceneAction';

import {Toast} from 'native-base'

const Stack = createStackNavigator();

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginValue: false,
      isInside:true,
      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,
    };
  }

  componentDidMount() {
    this.getItem();
  }

  async getItem() {
    let value = await AsyncStorage.getItem('userId');

    if (value) {
      let parsed = JSON.parse(value);
      if (parsed) {
        global.userId = parsed;
        this.setState({ isLoginValue: true });

        const data = new FormData();
        data.append('user_id', parsed);
    
        await this.props.allParameters(data)
    
      } else {
        this.setState({ isLoginValue: false , isInside:false});
      }
    } else {
      this.setState({ isLoginValue: false , isInside:false});
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const { successAllParameterVersion, errorAllParamaterVersion } = nextProps;

    let newState = null;

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
    const { allParameterData } = this.props;
    const { isLoginValue } = this.state;


  if (this.state.successAllParameterVersion > prevState.successAllParameterVersion) {
   
    const stat = allParameterData && allParameterData.user_status
   
    if(stat != 'active'){
      this.setState({
        isLoginValue:false,
        isInside:false
      })
    }
  }

  if (this.state.errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
    Toast.show({
      text: this.props.errorMsg,
      duration: 2500,
    });
  }
}


  getLoginScene() {
    return (
      <Stack.Navigator initialRouteName={SignIn}>
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtpForRegister"
          component={VerifyOtpForRegister} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistory"
          component={OrderHistory} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistoryDetail"
          component={OrderHistoryDetail} options={{ headerShown: false }}
        />
        <Stack.Screen name="CustomOrder"
          component={CustomOrder} options={{ headerShown: false }}
        />

        <Stack.Screen name="CustomWebview"
          component={CustomWebview} options={{ headerShown: false }}
        />

        <Stack.Screen name="ProductGrid"
          component={ProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="SubCategoryList"
          component={SubCategoryList} options={{ headerShown: false }}
        />
        <Stack.Screen name="CategoryContainer"
          component={CategoryContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetails"
          component={ProductDetails} options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchScreen"
          component={SearchScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Banner"
          component={Banner} options={{ headerShown: false }}
        />

        <Stack.Screen name="Notification"
          component={Notification} options={{ headerShown: false }}
        />
        <Stack.Screen name="BannerImage"
          component={BannerImage} options={{ headerShown: false }}
        />
        <Stack.Screen name="CartContainer"
          component={CartContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="EditProfile"
          component={EditProfile} options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchProductGrid"
          component={SearchProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="Exclusive"
          component={Exclusive} options={{ headerShown: false }}
        />



      </Stack.Navigator>

    );
  }

  getHomeScene() {
    return (
      <Stack.Navigator initialRouteName={Container}>
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />

        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtpForRegister"
          component={VerifyOtpForRegister} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistory"
          component={OrderHistory} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistoryDetail"
          component={OrderHistoryDetail} options={{ headerShown: false }}
        />
        <Stack.Screen name="CustomOrder"
          component={CustomOrder} options={{ headerShown: false }}
        />
        <Stack.Screen name="CustomWebview"
          component={CustomWebview} options={{ headerShown: false }}
        />

        <Stack.Screen name="ProductGrid"
          component={ProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="SubCategoryList"
          component={SubCategoryList} options={{ headerShown: false }}
        />

        <Stack.Screen name="CategoryContainer"
          component={CategoryContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetails"
          component={ProductDetails} options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchScreen"
          component={SearchScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Banner"
          component={Banner} options={{ headerShown: false }}
        />
        <Stack.Screen name="Notification"
          component={Notification} options={{ headerShown: false }}
        />
        <Stack.Screen name="BannerImage"
          component={BannerImage} options={{ headerShown: false }}
        />

        <Stack.Screen name="CartContainer"
          component={CartContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="EditProfile"
          component={EditProfile} options={{ headerShown: false }}
        />

        <Stack.Screen name="SearchProductGrid"
          component={SearchProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="Exclusive"
          component={Exclusive} options={{ headerShown: false }}
        />

      </Stack.Navigator>

    );
  }


  goToWhere = () => {
    const { isLoginValue,isInside } = this.state;
    const { allParameterData } = this.props;

    const s = allParameterData && allParameterData.user_status

    if(s == 'active' && isLoginValue == true){
     return  this.getHomeScene()
    }
    else if(isLoginValue == false && s !='active'){
    return  this.getLoginScene()
    }
    else if(isLoginValue == false && !isInside){
      return  this.getLoginScene()
    }
  }

  
  showToast = () =>{
    Toast.show({
      text:'your status is inactive. Kindly contact admin to activate',
      duration:2500
    })
  }


  render() {
    const { isLoginValue , status} = this.state;
    const { allParameterData } = this.props;
    
    return (
      <NavigationContainer>

     {/* {isLoginValue !== '' && status == 'active' ? isLoginValue === true  ? this.getHomeScene() : this.getLoginScene() : this.getLoginScene()} */}
      {this.goToWhere()}
      </NavigationContainer>
    );
  }
}


function mapStateToProps(state) {
  return {
      isFetching: state.sceneReducer.isFetching,
      error: state.sceneReducer.error,
      errorMsg: state.sceneReducer.errorMsg,
      successAllParameterVersion: state.sceneReducer.successAllParameterVersion,
      errorAllParamaterVersion: state.sceneReducer.errorAllParamaterVersion,
      allParameterData: state.sceneReducer.allParameterData,
  };
}

export default connect(mapStateToProps, { allParameters })(Scene);
