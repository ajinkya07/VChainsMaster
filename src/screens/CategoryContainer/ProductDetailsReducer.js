import {
  PRODUCT_DETAILS_DATA,
  PRODUCT_DETAILS_DATA_SUCCESS,
  PRODUCT_DETAILS_DATA_ERROR,
  PRODUCT_DETAILS_DATA_RESET_REDUCER,

  ADD_TO_CART_FROM_DETAILS_DATA,
  ADD_TO_CART_FROM_DETAILS_DATA_SUCCESS,
  ADD_TO_CART_FROM_DETAILS_DATA_ERROR,
  ADD_TO_CART_FROM_DETAILS_DATA_RESET_REDUCER,


} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successProductDetailsVersion: 0,
  errorProductDetailsVersion: 0,
  productDetailsData: [],

  successAddCartDetailsVersion: 0,
  errorAddCartDetailsVersion: 0,
  addCartDetailsData: [],

};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case PRODUCT_DETAILS_DATA:
      return {
        ...state,
        isFetching: true
      };

    case PRODUCT_DETAILS_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        productDetailsData: action.data,
        successProductDetailsVersion: ++state.successProductDetailsVersion,
        error: false
      };

    case PRODUCT_DETAILS_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorProductDetailsVersion: ++state.errorProductDetailsVersion
      };

    case PRODUCT_DETAILS_DATA_RESET_REDUCER:
      return initialState;




      case ADD_TO_CART_FROM_DETAILS_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case ADD_TO_CART_FROM_DETAILS_DATA_SUCCESS:
        return {
          ...state,
          errorMsg: action.data.msg,
          isFetching: false,
          addCartDetailsData: action.data,
          successAddCartDetailsVersion: ++state.successAddCartDetailsVersion,
          error: false
        };
  
      case ADD_TO_CART_FROM_DETAILS_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorAddCartDetailsVersion: ++state.errorAddCartDetailsVersion
        };
  
      case ADD_TO_CART_FROM_DETAILS_DATA_RESET_REDUCER:
        return initialState;
  



      default:
      return state;
  }
}
