import {
  HOMEPAGE_DATA,
  HOMEPAGE_DATA_SUCCESS,
  HOMEPAGE_DATA_ERROR,
  HOMEPAGE_DATA_RESET_REDUCER,

  TOTAL_CART_COUNT_DATA,
  TOTAL_CART_COUNT_DATA_SUCCESS,
  TOTAL_CART_COUNT_DATA_ERROR,
  TOTAL_CART_COUNT_DATA_RESET_REDUCER,

  ADD_TO_WISHLIST_DATA,
  ADD_TO_WISHLIST_DATA_SUCCESS,
  ADD_TO_WISHLIST_DATA_ERROR,
  ADD_TO_WISHLIST_DATA_RESET_REDUCER,

  ADD_TO_CART_DATA,
  ADD_TO_CART_DATA_SUCCESS,
  ADD_TO_CART_DATA_ERROR,
  ADD_TO_CART_DATA_RESET_REDUCER,

  ADD_TO_CART_PLUS_ONE_DATA,
  ADD_TO_CART_PLUS_ONE_DATA_SUCCESS,
  ADD_TO_CART_PLUS_ONE_DATA_ERROR,
  ADD_TO_CART_PLUS_ONE_DATA_RESET_REDUCER,

  ALL_PARAMETER_DATA,
  ALL_PARAMETER_DATA_SUCCESS,
  ALL_PARAMETER_DATA_ERROR,
  ALL_PARAMETER_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successHomePageVersion: 0,
  errorHomePageVersion: 0,
  homePageData: [],

  successTotalCartCountVersion: 0,
  errorTotalCartCountVersion: 0,
  totalCartCountData: [],

  successAddToWishlistVersion: 0,
  errorAddToWishlistVersion: 0,
  addToWishlistData: [],

  successAddToCartVersion: 0,
  errorAddToCartVersion: 0,
  addToCartData: [],

  successAddToCartPlusOneVersion: 0,
  errorAddToCartPlusOneVersion: 0,
  addToCartPlusOneData: [],

  allParameterData:'',
  successAllParameterVersion:0,
  errorAllParamaterVersion:0,


};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case HOMEPAGE_DATA:
      return {
        ...state,
        isFetching: true
      };

    case HOMEPAGE_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        homePageData: action.data.data,
        successHomePageVersion: ++state.successHomePageVersion,
        error: false
      };

    case HOMEPAGE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorHomePageVersion: ++state.errorHomePageVersion
      };

    case HOMEPAGE_DATA_RESET_REDUCER:
      return initialState;

    case TOTAL_CART_COUNT_DATA:
      return {
        ...state,
        isFetching: true
      };

    case TOTAL_CART_COUNT_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        totalCartCountData: action.data.data,
        successTotalCartCountVersion: ++state.successTotalCartCountVersion,
        error: false
      };

    case TOTAL_CART_COUNT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        totalCartCountData:{count:0},
        errorTotalCartCountVersion: ++state.errorTotalCartCountVersion
      };

    case TOTAL_CART_COUNT_DATA_RESET_REDUCER:
      return initialState;


    case ADD_TO_WISHLIST_DATA:
      return {
        ...state,
        isFetching: true
      };

    case ADD_TO_WISHLIST_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        addToWishlistData: action.data,
        successAddToWishlistVersion: ++state.successAddToWishlistVersion,
        error: false
      };

    case ADD_TO_WISHLIST_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorAddToWishlistVersion: ++state.errorAddToWishlistVersion
      };

    case ADD_TO_WISHLIST_DATA_RESET_REDUCER:
      return initialState;

    case ADD_TO_CART_DATA:
      return {
        ...state,
        isFetching: true
      };

    case ADD_TO_CART_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        addToCartData: action.data,
        successAddToCartVersion: ++state.successAddToCartVersion,
        error: false
      };

    case ADD_TO_CART_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorAddToCartVersion: ++state.errorAddToCartVersion
      };

    case ADD_TO_CART_DATA_RESET_REDUCER:
      return initialState;


    case ADD_TO_CART_PLUS_ONE_DATA:
      return {
        ...state,
        isFetching: true
      };

    case ADD_TO_CART_PLUS_ONE_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        addToCartPlusOneData: action.data,
        successAddToCartPlusOneVersion: ++state.successAddToCartPlusOneVersion,
        error: false
      };

    case ADD_TO_CART_PLUS_ONE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorAddToCartPlusOneVersion: ++state.errorAddToCartPlusOneVersion
      };

    case ADD_TO_CART_PLUS_ONE_DATA_RESET_REDUCER:
      return initialState;



      case ALL_PARAMETER_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case ALL_PARAMETER_DATA_SUCCESS:
        return {
          ...state,
          errorMsg: "",
          isFetching: false,
          allParameterData: action.data,
          successAllParameterVersion: ++state.successAllParameterVersion,
          error: false
        };
  
      case ALL_PARAMETER_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorAllParamaterVersion: ++state.errorAllParamaterVersion
        };
  
      case ALL_PARAMETER_DATA_RESET_REDUCER:
        return initialState;
  
  

    default:
      return state;
  }
}
