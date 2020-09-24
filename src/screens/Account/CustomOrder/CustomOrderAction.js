import {
    CUSTOM_ORDER_DATA,
    CUSTOM_ORDER_DATA_SUCCESS,
    CUSTOM_ORDER_DATA_ERROR,
    CUSTOM_ORDER_DATA_RESET_REDUCER,

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
  
  export function getCustomOrderList(data) {
  
    return dispatch => {
      dispatch(showLoadingIndicator(CUSTOM_ORDER_DATA));
  
      axios.post(urls.CustomOrder.url, data, header).then(response => {
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, CUSTOM_ORDER_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, CUSTOM_ORDER_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, CUSTOM_ORDER_DATA_ERROR)
          );
        });
    }
  }
  