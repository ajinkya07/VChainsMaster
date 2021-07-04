import {
  SEARCH_BY_CATEGORY,
  SEARCH_BY_CATEGORY_SUCCESS,
  SEARCH_BY_CATEGORY_ERROR,
  SEARCH_BY_CATEGORY_RESET_REDUCER,

  SEARCH_BY_CODE,
  SEARCH_BY_CODE_SUCCESS,
  SEARCH_BY_CODE_ERROR,
  SEARCH_BY_CODE_RESET_REDUCER,

  SEARCH_COUNT,
  SEARCH_COUNT_SUCCESS,
  SEARCH_COUNT_ERROR,

  SEARCH_PAYLOAD
} from "@redux/types";


const initialState = {
  isFetchingSearch: false,
  errorSearch: false,
  errorMsgSearch: "",
  successSearchbyCategoryVersion: 0,
  errorSearchbyCategoryVersion: 0,
  searchByCategoryData: [],

  successSearchbyCodeVersion: 0,
  errorSearchbyCodeVersion: 0,

  successSearchCountVersion: 0,
  errorSearchCountVersion: 0,
  searchCountData: []
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case SEARCH_BY_CATEGORY:
      return {
        ...state,
        isFetchingSearch: true
      };

    case SEARCH_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        errorMsgSearch: "",
        isFetchingSearch: false,
        searchByCategoryData: action.data,
        successSearchbyCategoryVersion: ++state.successSearchbyCategoryVersion,
        errorSearch: false
      };

    case SEARCH_BY_CATEGORY_ERROR:
      return {
        ...state,
        isFetchingSearch: false,
        errorSearch: true,
        errorMsgSearch: action.error,
        errorSearchbyCategoryVersion: ++state.errorSearchbyCategoryVersion
      };

    case SEARCH_BY_CATEGORY_RESET_REDUCER:
      return initialState;


    case SEARCH_BY_CODE:
      return {
        ...state,
        isFetchingSearch: true
      };

    case SEARCH_BY_CODE_SUCCESS:
      return {
        ...state,
        errorMsgSearch: "",
        isFetchingSearch: false,
        searchByCategoryData: action.data,
        successSearchbyCodeVersion: ++state.successSearchbyCodeVersion,
        errorSearch: false
      };

    case SEARCH_BY_CODE_ERROR:
      return {
        ...state,
        isFetchingSearch: false,
        errorSearch: true,
        errorMsgSearch: action.error,
        errorSearchbyCodeVersion: ++state.errorSearchbyCodeVersion
      };

    case SEARCH_BY_CODE_RESET_REDUCER:
      return initialState;


    case SEARCH_COUNT_SUCCESS:
      return {
        ...state,
        errorMsgSearch: "",
        isFetchingSearch: false,
        searchCountData: action.data,
        successSearchCountVersion: ++state.successSearchCountVersion,
        errorSearch: false
      };

    case SEARCH_COUNT_ERROR:
      return {
        ...state,
        isFetchingSearch: false,
        errorSearch: true,
        searchCountData: [],
        errorMsgSearch: action.error,
        errorSearchCountVersion: ++state.errorSearchCountVersion
      };

    case SEARCH_PAYLOAD:
      return {
        ...state,
        isFetchingSearch: false,
        errorSearch: false,
        searchPayload: action.data,
      };


    default:
      return state;
  }
}
