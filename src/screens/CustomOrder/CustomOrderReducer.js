import {
    CUSTOMIZE_ORDER_DATA,
    CUSTOMIZE_ORDER_DATA_SUCCESS, 
    CUSTOMIZE_ORDER_DATA_ERROR ,
    CUSTOMIZE_ORDER_DATA_RESET_REDUCER ,      
  
  } from "@redux/types";
  
  
  const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successCustomOrderVersion: 0,
    errorCustomOrderVersion: 0,
    customOrderData: [],
  };
  
  export default function dataReducer(state = initialState, action) {
    switch (action.type) {
  
      case CUSTOMIZE_ORDER_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case CUSTOMIZE_ORDER_DATA_SUCCESS:
        console.warn("action.data",action.data);
        return {
          ...state,
          errorMsg: "",
          isFetching: false,
          customOrderData: action.data,
          successCustomOrderVersion: ++state.successCustomOrderVersion,
          error: false
        };
  
      case CUSTOMIZE_ORDER_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorCustomOrderVersion: ++state.errorCustomOrderVersion
        };
  
      case CUSTOMIZE_ORDER_DATA_RESET_REDUCER:
        return initialState;
  
  
  
      default:
        return state;
    }
  }
  