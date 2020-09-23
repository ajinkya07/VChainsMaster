import {
  OTP_REGISTER_DATA,
  OTP_REGISTER_DATA_SUCCESS,
  OTP_REGISTER_DATA_ERROR,
  OTP_REGISTER_DATA_RESET_REDUCER,

  REGISTER_DATA,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_ERROR,
  REGISTER_DATA_RESET_REDUCER,

}
  from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successRegisterVersion: 0,
  errorRegisterVersion: 0,
  successOTPRegisterVersion: 0,
  errorOTPRegisterVersion: 0,

  OTPregisterData: [],
  registerData: [],

};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case OTP_REGISTER_DATA:
      return {
        ...state,
        isFetching: true
      };

    case OTP_REGISTER_DATA_SUCCESS:
      console.log("action.data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        OTPregisterData: action.data.data,
        successRegisterVersion: ++state.successRegisterVersion,
        error: false
      };

    case OTP_REGISTER_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorRegisterVersion: ++state.errorRegisterVersion
      };

    case OTP_REGISTER_DATA_RESET_REDUCER:
      return initialState;

    //AFTER OTP ENTERED FOR REGISTER

    case REGISTER_DATA:
      return {
        ...state,
        isFetching: true
      };

    case REGISTER_DATA_SUCCESS:
      console.log("action.data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        registerData: action.data,
        successOTPRegisterVersion: ++state.successOTPRegisterVersion,
        error: false
      };

    case REGISTER_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorOTPRegisterVersion: ++state.errorOTPRegisterVersion
      };

    case REGISTER_DATA_RESET_REDUCER:
      return initialState;




    default:
      return state;
  }
}
