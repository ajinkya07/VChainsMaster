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

import { strings } from '@values/strings'
import axios from 'axios'
import { urls } from '@api/urls'

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
}

export function showLoadingIndicator(type) {
  return {
    type: type
  };
}


export function onSuccess(data, type) {
  return {
    data,
    type: type,
  };
}

export function onFailure(error, type) {
  return {
    type: type,
    error
  };
}

export function getProductSubCategoryData(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(PRODUCT_GRID_DATA));

    axios.post(urls.ProductGrid.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, PRODUCT_GRID_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, PRODUCT_GRID_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, PRODUCT_GRID_DATA_ERROR)
        );
      });
  }
}

export function getSortByParameters(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(SORT_BY_PARAMS_DATA));

    axios.post(urls.sortByParams.url, data, header).then(response => {
      console.log("getSortByParameters", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, SORT_BY_PARAMS_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, SORT_BY_PARAMS_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, SORT_BY_PARAMS_DATA_ERROR)
        );
      });
  }
}



export function getfilterParameters(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(FILTER_PARAMS_DATA));

    axios.post(urls.FilterParams.url, data, header).then(response => {
      console.log("getfilterParameters", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, FILTER_PARAMS_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, FILTER_PARAMS_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, FILTER_PARAMS_DATA_ERROR)
        );
      });
  }
}


export function applyFilterProducts(data) {
console.log("applyFilterProducts formdata",data);
  return dispatch => {
    dispatch(showLoadingIndicator(FILTER_PRODUCT_DATA));

    axios.post(urls.ProductGrid.url, data, header).then(response => {
      console.log("applyFilterProducts", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, FILTER_PRODUCT_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, FILTER_PRODUCT_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, FILTER_PRODUCT_DATA_ERROR)
        );
      });
  }
}


export function addProductToWishlist(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(ADD_PRODUCT_TO_WISHLIST_DATA));

    axios.post(urls.addToCartWishlist.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, ADD_PRODUCT_TO_WISHLIST_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, ADD_PRODUCT_TO_WISHLIST_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, ADD_PRODUCT_TO_WISHLIST_DATA_ERROR)
        );
      });
  }
}
  
export function addProductToCart(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(ADD_PRODUCT_TO_CART_DATA));
  
      axios.post(urls.addToCartWishlist.url, data, header).then(response => {
        console.warn("response",response.data);
        if (response.data.ack === '1') {
          dispatch(
            onSuccess(response.data, ADD_PRODUCT_TO_CART_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, ADD_PRODUCT_TO_CART_DATA_ERROR)
          )
        }
      })
        .catch(function (error) {
          console.log("getHomePageData ERROR", error);
  
          dispatch(
            onFailure(strings.serverFailedMsg, ADD_PRODUCT_TO_CART_DATA_ERROR)
          );
        });
    }
  }


  export function addRemoveProductFromCartByOne(data) {
    console.log("addRemoveProductFromCartByOne formdata",data);
      return dispatch => {
        dispatch(showLoadingIndicator(ADD_PRODUCT_TO_CART_PLUS_ONE_DATA));
    
        axios.post(urls.addToCartGridAdd.url, data, header).then(response => {
          console.log("addRemoveProductFromCartByOne success", response.data);
          if (response.data.ack === '1') {
            dispatch(
              onSuccess(response.data, ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_ERROR)
            )
          }
        })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, ADD_PRODUCT_TO_CART_PLUS_ONE_DATA_ERROR)
            );
          });
      }
    }
  