import {
  LOGIN_DATA,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_ERROR,
  LOGIN_DATA_RESET_REDUCER,

  FCM_DATA,
  FCM_DATA_SUCCESS,
  FCM_DATA_ERROR,
  FCM_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successLoginVersion: 0,
  errorLoginVersion: 0,
  successLoginVersioMobile: 0,
  errorLoginVersionMobile: 0,
  loginData: [],

  successFcmVersion: 0,
  errorFcmVersion: 0,
  fcmData: []

};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN_DATA:
      return {
        ...state,
        isFetching: true
      };

    case LOGIN_DATA_SUCCESS:
      console.log("action.data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        loginData: action.data.data,
        successLoginVersion: ++state.successLoginVersion,
        error: false
      };

    case LOGIN_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorLoginVersion: ++state.errorLoginVersion
      };

    case LOGIN_DATA_RESET_REDUCER:
      return initialState;


    case FCM_DATA:
      return {
        ...state,
        isFetching: true
      };

    case FCM_DATA_SUCCESS:
      console.warn("FCM_DATA_SUCCESS .data", action.data);
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        fcmData: action.data,
        successFcmVersion: ++state.successFcmVersion,
        error: false
      };

    case FCM_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorFcmVersion: ++state.errorFcmVersion
      };

    case FCM_DATA_RESET_REDUCER:
      return initialState;


    default:
      return state;
  }
}
