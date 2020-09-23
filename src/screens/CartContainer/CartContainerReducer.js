import {
  CART_DATA,
  CART_DATA_SUCCESS,
  CART_DATA_ERROR,
  CART_DATA_RESET_REDUCER,

  WISHLIST_DATA,
  WISHLIST_DATA_SUCCESS,
  WISHLIST_DATA_ERROR,
  WISHLIST_DATA_RESET_REDUCER,

  DELETE_FROM_CART_WISHLIST_DATA,
  DELETE_FROM_CART_WISHLIST_DATA_SUCCESS,
  DELETE_FROM_CART_WISHLIST_DATA_ERROR,
  DELETE_FROM_CART_WISHLIST_DATA_RESET_REDUCER,

  TOTAL_CART_COUNT_DATA,
  TOTAL_CART_COUNT_DATA_SUCCESS,
  TOTAL_CART_COUNT_DATA_ERROR,
  TOTAL_CART_COUNT_DATA_RESET_REDUCER,

  MOVE_PRODUCT_DATA,
  MOVE_PRODUCT_DATA_SUCCESS,
  MOVE_PRODUCT_DATA_ERROR,
  MOVE_PRODUCT_DATA_RESET_REDUCER,

  CLEAR_ALL_CART_DATA,
  CLEAR_ALL_CART_DATA_SUCCESS,
  CLEAR_ALL_CART_DATA_ERROR,
  CLEAR_ALL_CART_DATA_RESET_REDUCER,


  CLEAR_ALL_WISHLIST_DATA,
  CLEAR_ALL_WISHLIST_DATA_SUCCESS,
  CLEAR_ALL_WISHLIST_DATA_ERROR,
  CLEAR_ALL_WISHLIST_DATA_RESET_REDUCER,


  EDIT_CART_PRODUCT_DATA,
  EDIT_CART_PRODUCT_DATA_SUCCESS,
  EDIT_CART_PRODUCT_DATA_ERROR,
  EDIT_CART_PRODUCT_DATA_RESET_REDUCER,

  PLACE_ORDER_DATA,
  PLACE_ORDER_DATA_SUCCESS,
  PLACE_ORDER_DATA_ERROR,
  PLACE_ORDER_DATA_RESET_REDUCER,

  CART_SUMMARY_DATA,
  CART_SUMMARY_DATA_SUCCESS,
  CART_SUMMARY_DATA_ERROR,
  CART_SUMMARY_DATA_RESET_REDUCER,

  CART_WEIGHT_DATA,
  CART_WEIGHT_DATA_SUCCESS,
  CART_WEIGHT_DATA_ERROR,
  CART_WEIGHT_DATA_RESET_REDUCER


} from "@redux/types";
import { act } from "react-test-renderer";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: '',
  errorMsgCart: "",
  errorMsgWishlist: "",
  successCartVersion: 0,
  errorCartVersion: 0,
  cartData: [],

  successWishlistVersion: 0,
  errorWishlistVersion: 0,
  wishlistData: [],

  successDeleteProductVersion: 0,
  errorDeleteProductVersion: 0,
  deleteProductData: [],

  successTotalCartCountVersion: 0,
  errorTotalCartCountVersion: 0,
  totalCartCountData: [],

  successMoveProductVersion: 0,
  errorMoveProductVersion: 0,

  successClearAllCartVersion: 0,
  errorClearAllCartVersion: 0,

  successClearAllWislistVersion: 0,
  errorClearAllWislistVersion: 0,

  successEditCartProductVersion: 0,
  errorEditCartProductVersion: 0,

  successPlaceOrderVersion:0,
  errorPlaceOrderVersion:0,
  placeOrderData:[],

  errorCartSummaryVersion:0,
  successCartSummaryVersion:0,
  cartSummaryData:[],

  
  errorCartWeightVersion:0,
  successCartWeightVersion:0,
  cartWeightData:[]

};



export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case CART_DATA:
      return {
        ...state,
        isFetching: true
      };

    case CART_DATA_SUCCESS:
      return {
        ...state,
        errorMsgCart: "",
        isFetching: false,
        cartData: action.data.data,
        successCartVersion: ++state.successCartVersion,
        error: false
      };

    case CART_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsgCart: action.error,
        cartData: [],
        errorCartVersion: ++state.errorCartVersion
      };

    case CART_DATA_RESET_REDUCER:
      return initialState;

    case WISHLIST_DATA:
      return {
        ...state,
        isFetching: true
      };

    case WISHLIST_DATA_SUCCESS:
      return {
        ...state,
        errorMsgWishlist: "",
        isFetching: false,
        wishlistData: action.data.data,
        successWishlistVersion: ++state.successWishlistVersion,
        error: false
      };

    case WISHLIST_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        wishlistData: [],
        errorMsgWishlist: action.error,
        errorWishlistVersion: ++state.errorWishlistVersion
      };

    case WISHLIST_DATA_RESET_REDUCER:
      return initialState;


    case DELETE_FROM_CART_WISHLIST_DATA:
      return {
        ...state,
        isFetching: true
      };

    case DELETE_FROM_CART_WISHLIST_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        deleteProductData: action.data.data,
        successDeleteProductVersion: ++state.successDeleteProductVersion,
        error: false
      };

    case DELETE_FROM_CART_WISHLIST_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorDeleteProductVersion: ++state.errorDeleteProductVersion
      };

    case DELETE_FROM_CART_WISHLIST_DATA_RESET_REDUCER:
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
        totalCartCountData: { count: 0 },
        errorTotalCartCountVersion: ++state.errorTotalCartCountVersion
      };

    case TOTAL_CART_COUNT_DATA_RESET_REDUCER:
      return initialState;


    case MOVE_PRODUCT_DATA:
      return {
        ...state,
        isFetching: true
      };

    case MOVE_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        successMoveProductVersion: ++state.successMoveProductVersion,
        error: false
      };

    case MOVE_PRODUCT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorMoveProductVersion: ++state.errorMoveProductVersion
      };

    case MOVE_PRODUCT_DATA_RESET_REDUCER:
      return initialState;

    case CLEAR_ALL_CART_DATA:
      return {
        ...state,
        isFetching: true
      };

    case CLEAR_ALL_CART_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        //   cartData:[],
        successClearAllCartVersion: ++state.successClearAllCartVersion,
        error: false
      };

    case CLEAR_ALL_CART_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorClearAllCartVersion: ++state.errorClearAllCartVersion
      };

    case CLEAR_ALL_CART_DATA_RESET_REDUCER:
      return initialState;


    case CLEAR_ALL_WISHLIST_DATA:
      return {
        ...state,
        isFetching: true
      };

    case CLEAR_ALL_WISHLIST_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        //   wishlistData:[],
        successClearAllWislistVersion: ++state.successClearAllWislistVersion,
        error: false
      };

    case CLEAR_ALL_WISHLIST_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorClearAllWislistVersion: ++state.errorClearAllWislistVersion
      };

    case CLEAR_ALL_WISHLIST_DATA_RESET_REDUCER:
      return initialState;



      
    case EDIT_CART_PRODUCT_DATA:
      return {
        ...state,
        isFetching: true
      };

    case EDIT_CART_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        successEditCartProductVersion: ++state.successEditCartProductVersion,
        error: false
      };

    case EDIT_CART_PRODUCT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorEditCartProductVersion: ++state.errorEditCartProductVersion
      };

    case EDIT_CART_PRODUCT_DATA_RESET_REDUCER:
      return initialState;


      
    case PLACE_ORDER_DATA:
      return {
        ...state,
        isFetching: true
      };

    case PLACE_ORDER_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: action.data.msg,
        isFetching: false,
        successPlaceOrderVersion: ++state.successPlaceOrderVersion,
        error: false
      };

    case PLACE_ORDER_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorPlaceOrderVersion: ++state.errorPlaceOrderVersion
      };

    case PLACE_ORDER_DATA_RESET_REDUCER:
      return initialState;



      case CART_SUMMARY_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case CART_SUMMARY_DATA_SUCCESS:
        return {
          ...state,
          errorMsg: action.data.msg,
          isFetching: false,
          successCartSummaryVersion: ++state.successCartSummaryVersion,
          cartSummaryData:action.data,
          error: false
        };
  
      case CART_SUMMARY_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorCartSummaryVersion: ++state.errorCartSummaryVersion
        };
  
      case CART_SUMMARY_DATA_RESET_REDUCER:
        return initialState;
  

        case CART_WEIGHT_DATA:
          return {
            ...state,
            isFetching: true
          };
    
        case CART_WEIGHT_DATA_SUCCESS:
          return {
            ...state,
            errorMsg: '',
            isFetching: false,
            successCartWeightVersion: ++state.successCartWeightVersion,
            cartWeightData:action.data,
            error: false
          };
    
        case CART_WEIGHT_DATA_ERROR:
          return {
            ...state,
            isFetching: false,
            error: true,
            errorMsg: action.error,
            errorCartWeightVersion: ++state.errorCartWeightVersion
          };
    
        case CART_WEIGHT_DATA_RESET_REDUCER:
          return initialState;
  

    default:
      return state;
  }
}
