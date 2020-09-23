import {
  FORGOT_DATA,
  FORGOT_DATA_SUCCESS,
  FORGOT_DATA_ERROR,
  FORGOT_DATA_RESET_REDUCER,

  OTP_DATA,
  OTP_DATA_SUCCESS,
  OTP_DATA_ERROR,
  OTP_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successForgotVersion: 0,
  errorForgotVersion: 0,
  forgotData: [],
  successOTPVersion: 0,
  errorOTPVersion: 0,
  otpData: []
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case FORGOT_DATA:
      return {
        ...state,
        isFetching: true
      };

    case FORGOT_DATA_SUCCESS:
      console.log("action.data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        forgotData: action.data.data,
        successForgotVersion: ++state.successForgotVersion,
        error: false
      };

    case FORGOT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorForgotVersion: ++state.errorForgotVersion
      };

    case FORGOT_DATA_RESET_REDUCER:
      return initialState;

    //AFTER OTP ENTERED FOR VERIFICATION

    case OTP_DATA:
      return {
        ...state,
        isFetching: true
      };

    case OTP_DATA_SUCCESS:
      console.log("action.data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        otpData: action.data,
        successOTPVersion: ++state.successOTPVersion,
        error: false
      };

    case OTP_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorOTPVersion: ++state.errorOTPVersion
      };

    case OTP_DATA_RESET_REDUCER:
      return initialState;


    default:
      return state;
  }
}
