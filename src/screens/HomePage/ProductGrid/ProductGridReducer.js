import {
  PRODUCT_GRID_DATA,
  PRODUCT_GRID_DATA_SUCCESS,
  PRODUCT_GRID_DATA_ERROR,
  PRODUCT_GRID_DATA_RESET_REDUCER,

  SORT_BY_PARAMS_DATA,
  SORT_BY_PARAMS_DATA_SUCCESS,
  SORT_BY_PARAMS_DATA_ERROR,
  SORT_BY_PARAMS_DATA_RESET_REDUCER,

  FILTER_PARAMS_DATA,
  FILTER_PARAMS_DATA_SUCCESS,
  FILTER_PARAMS_DATA_ERROR,
  FILTER_PARAMS_DATA_RESET_REDUCER,

  FILTER_PRODUCT_DATA,
  FILTER_PRODUCT_DATA_SUCCESS,
  FILTER_PRODUCT_DATA_ERROR,
  FILTER_PRODUCT_DATA_RESET_REDUCER,

  ADD_PRODUCT_TO_WISHLIST_DATA,
  ADD_PRODUCT_TO_WISHLIST_DATA_SUCCESS,
  ADD_PRODUCT_TO_WISHLIST_DATA_ERROR,
  ADD_PRODUCT_TO_WISHLIST_DATA_RESET_REDUCER,


  ADD_PRODUCT_TO_CART_DATA,
  ADD_PRODUCT_TO_CART_DATA_SUCCESS,
  ADD_PRODUCT_TO_CART_DATA_ERROR,
  ADD_PRODUCT_TO_CART_DATA_RESET_REDUCER,

  ADD_PRODUCT_TO_CART_PLUS_ONE_DATA,
  ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_SUCCESS,
  ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_ERROR,
  ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successProductGridVersion: 0,
  errorProductGridVersion: 0,
  productGridData: [],

  successSortByParamsVersion: 0,
  errorSortByParamsVersion: 0,
  sortByParamsData: [],

  successFilterParamsVersion: 0,
  errorFilterParamsVersion: 0,
  filterParamsData: [],

  successFilteredProductVersion: 0,
  errorFilteredProductVersion: 0,
  filteredProductData: [],

  successAddProductToWishlistVersion: 0,
  errorAddProductToWishlistVersion: 0,
  addProductToWishlistData: [],

  successAddProductToCartVersion: 0,
  errorAddProductToCartVersion: 0,
  addProductToCartData: [],

  successProductAddToCartPlusOneVersion: 0,
  errorProductAddToCartPlusOneVersion: 0,
  productAddToCartPlusOneData: [],

};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case PRODUCT_GRID_DATA:
      return {
        ...state,
        isFetching: true
      };

    case PRODUCT_GRID_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        productGridData: action.data.data,
        successProductGridVersion: ++state.successProductGridVersion,
        error: false
      };

    case PRODUCT_GRID_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorProductGridVersion: ++state.errorProductGridVersion
      };

    case PRODUCT_GRID_DATA_RESET_REDUCER:
      return initialState;


    case SORT_BY_PARAMS_DATA:
      return {
        ...state,
        isFetching: true
      };

    case SORT_BY_PARAMS_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        sortByParamsData: action.data.data,
        successSortByParamsVersion: ++state.successSortByParamsVersion,
        error: false
      };

    case SORT_BY_PARAMS_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorSortByParamsVersion: ++state.errorSortByParamsVersion
      };

    case SORT_BY_PARAMS_DATA_RESET_REDUCER:
      return initialState;


    case FILTER_PARAMS_DATA:
      return {
        ...state,
        isFetching: true
      };

    case FILTER_PARAMS_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        filterParamsData: action.data.data,
        successFilterParamsVersion: ++state.successFilterParamsVersion,
        error: false
      };

    case FILTER_PARAMS_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        filterParamsData: [],
        errorFilterParamsVersion: ++state.errorFilterParamsVersion
      };

    case FILTER_PARAMS_DATA_RESET_REDUCER:
      return initialState;


    case FILTER_PRODUCT_DATA:
      return {
        ...state,
        isFetching: true
      };

    case FILTER_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        filteredProductData: action.data.data,
        successFilteredProductVersion: ++state.successFilteredProductVersion,
        error: false
      };

    case FILTER_PRODUCT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorFilteredProductVersion: ++state.errorFilteredProductVersion
      };

    case FILTER_PRODUCT_DATA_RESET_REDUCER:
      return initialState;


    case ADD_PRODUCT_TO_WISHLIST_DATA:
      return {
        ...state,
        isFetching: true
      };

    case ADD_PRODUCT_TO_WISHLIST_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        addProductToWishlistData: action.data,
        successAddProductToWishlistVersion: ++state.successAddProductToWishlistVersion,
        error: false
      };

    case ADD_PRODUCT_TO_WISHLIST_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorAddProductToWishlistVersion: ++state.errorAddProductToWishlistVersion
      };

    case ADD_PRODUCT_TO_WISHLIST_DATA_RESET_REDUCER:
      return initialState;



      case ADD_PRODUCT_TO_CART_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case ADD_PRODUCT_TO_CART_DATA_SUCCESS:
        return {
          ...state,
          errorMsg: "",
          isFetching: false,
          addProductToCartData: action.data,
          successAddProductToCartVersion: ++state.successAddProductToCartVersion,
          error: false
        };
  
      case ADD_PRODUCT_TO_CART_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorAddProductToCartVersion: ++state.errorAddProductToCartVersion
        };
  
      case ADD_PRODUCT_TO_CART_DATA_RESET_REDUCER:
        return initialState;


      case ADD_PRODUCT_TO_CART_PLUS_ONE_DATA:
        return {
          ...state,
          isFetching: true
        };
  
      case ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_SUCCESS:
        return {
          ...state,
          errorMsg: "",
          isFetching: false,
          productAddToCartPlusOneData: action.data,
          successProductAddToCartPlusOneVersion: ++state.successProductAddToCartPlusOneVersion,
          error: false
        };
  
      case ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_ERROR:
        return {
          ...state,
          isFetching: false,
          error: true,
          errorMsg: action.error,
          errorProductAddToCartPlusOneVersion: ++state.errorProductAddToCartPlusOneVersion
        };
  
      case ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_RESET_REDUCER:
        return initialState;




    default:
      return state;
  }
}
