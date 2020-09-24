// import addLeadReducer from "@add/addLeadReducer";
import { combineReducers } from "redux";
import loginReducer from '@login/LoginReducer'
import forgotReducer from '@forgotPassword/ForgotReducer'
import registerReducer from '@register/RegisterReducer'
import homePageReducer from '@homepage/HomePageReducer'
import productGridReducer from '@productGrid/ProductGridReducer'
import cartContainerReducer from '@cartContainer/CartContainerReducer'
import productDetailsReducer from '@category/ProductDetailsReducer'

import orderHistoryReducer from '@orderHistory/OrderHistoryReducer'
import customOrderReducer from '@customOrder/CustomOrderReducer'
import editProfileReducer from '@editProfile/EditProfileReducer'
import searchReducer from '@search/SearchReducer'
import notificationReducer from '@notification/NotificationReducer'
import exclusiveReducer from '@exclusive/ExclusiveReducer'

import accountReducer from '@accountContainer/AccountReducer'

import sceneReducer from '@navigation/SceneReducer'
import accountCustomOrderReducer from '@accountCustomOrder/CustomOrderReducer'


const appReducer = combineReducers({
    loginReducer,
    forgotReducer,
    registerReducer,
    homePageReducer,
    productGridReducer,
    cartContainerReducer,
    productDetailsReducer,
    orderHistoryReducer,
    customOrderReducer,
    editProfileReducer,
    searchReducer,
    notificationReducer,
    exclusiveReducer,
    accountReducer,
    sceneReducer,
    accountCustomOrderReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
