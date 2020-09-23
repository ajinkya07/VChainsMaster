import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    GET_PROFILE_RESET_REDUCER,

    GET_STATE_LIST,
    GET_STATE_LIST_SUCCESS,
    GET_STATE_LIST_ERROR,
    GET_STATE_LIST_RESET_REDUCER,

    GET_CITY_LIST,
    GET_CITY_LIST_SUCCESS,
    GET_CITY_LIST_ERROR,
    GET_CITY_LIST_RESET_REDUCER,

    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_RESET_REDUCER,


  } from "@redux/types";
  
  
  const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successGetProfileVersion: 0,
    errorGetProfileVersion: 0,
    getProfileData: [],

    successUpdateProfileVersion: 0,
    errorUpdateProfileVersion: 0,
    updateProfileData:'',

    successGetStateListVersion:0,
    errorGetStateListVersion:0,
    stateList:[],

    successGetCityListVersion:0,
    errorGetCityListVersion:0,
    cityList:[],

  };
  
  export default function dataReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_PROFILE:
        return {
          ...state,
          isFetching: true
        };
  
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          errorMsg: "",
          isFetching: false,
          getProfileData: action.data,
          successGetProfileVersion: ++state.successGetProfileVersion,
          error: false
        };
  
      case GET_PROFILE_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorGetProfileVersion: ++state.errorGetProfileVersion
        };
  
      case GET_PROFILE_RESET_REDUCER:
        return initialState;
  
  
        case GET_STATE_LIST:
          return {
            ...state,
            isFetching: true
          };
    
        case GET_STATE_LIST_SUCCESS:
          return {
            ...state,
            errorMsg: "",
            isFetching: false,
            stateList: action.data,
            successGetStateListVersion: ++state.successGetStateListVersion,
            error: false
          };
    
        case GET_STATE_LIST_ERROR:
          return {
            ...state,
            isFetching: false,
            error: true,
            errorMsg: action.error,
            errorGetStateListVersion: ++state.errorGetStateListVersion
          };
    
        case GET_STATE_LIST_RESET_REDUCER:
          return initialState;
    

          case GET_CITY_LIST:
          return {
            ...state,
            isFetching: true
          };
    
        case GET_CITY_LIST_SUCCESS:
          return {
            ...state,
            errorMsg: "",
            isFetching: false,
            cityList: action.data,
            successGetCityListVersion: ++state.successGetCityListVersion,
            error: false
          };
    
        case GET_CITY_LIST_ERROR:
          return {
            ...state,
            isFetching: false,
            error: true,
            errorMsg: action.error,
            errorGetCityListVersion: ++state.errorGetCityListVersion
          };
    
        case GET_CITY_LIST_RESET_REDUCER:
          return initialState;
    
    
  
          case UPDATE_PROFILE:
          return {
            ...state,
            isFetching: true
          };
    
        case UPDATE_PROFILE_SUCCESS:
          return {
            ...state,
            errorMsg: action.data.msg,
            isFetching: false,
            updateProfileData: action.data,
            successUpdateProfileVersion: ++state.successUpdateProfileVersion,
            error: false
          };
    
        case UPDATE_PROFILE_ERROR:
          return {
            ...state,
            isFetching: false,
            error: true,
            errorMsg: action.error,
            errorUpdateProfileVersion: ++state.errorUpdateProfileVersion
          };
    
        case UPDATE_PROFILE_RESET_REDUCER:
          return initialState;
    
        
      default:
        return state;
    }
  }
  