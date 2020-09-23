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
const qs = require('query-string');

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

export function getProductDetails(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(PRODUCT_DETAILS_DATA));

    axios.post(urls.ProductDetails.url, data, header).then(response => {
        if (response.data.ack ==='1') {
          dispatch(
            onSuccess(response.data, PRODUCT_DETAILS_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, PRODUCT_DETAILS_DATA_ERROR)
          )
        }
      })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, PRODUCT_DETAILS_DATA_ERROR)
        );
      });
  }
}


  

export function addToCartFromDetails(data) {
  console.warn("addToCartFromDetails--",data);

  return dispatch => {
    dispatch(showLoadingIndicator(ADD_TO_CART_FROM_DETAILS_DATA));

    axios.post(urls.AddToCartFromDetails.url, data, header).then(response => {
      console.warn("response--",response);
        if (response.data.ack ==='1') {
          dispatch(
            onSuccess(response.data, ADD_TO_CART_FROM_DETAILS_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, ADD_TO_CART_FROM_DETAILS_DATA_ERROR)
          )
        }
      })
      .catch(function (error) {
        console.warn("error00--",error);
        dispatch(
          onFailure(strings.serverFailedMsg, ADD_TO_CART_FROM_DETAILS_DATA_ERROR)
        );
      });
  }
}
