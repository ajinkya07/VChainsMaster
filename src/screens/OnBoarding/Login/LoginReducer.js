import {
  LOGIN_DATA,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_ERROR,
  LOGIN_DATA_RESET_REDUCER,
} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successLoginVersion: 0,
  errorLoginVersion: 0,
  successLoginVersioMobile:0,
  errorLoginVersionMobile:0,
  loginData: []
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN_DATA:
      return {
        ...state,
        isFetching: true
      };

    case LOGIN_DATA_SUCCESS:
      console.log("action.data",action.data);
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

    default:
      return state;
  }
}
