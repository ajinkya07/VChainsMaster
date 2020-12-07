import {
  CUSTOMIZE_ORDER_DATA,
  CUSTOMIZE_ORDER_DATA_SUCCESS,
  CUSTOMIZE_ORDER_DATA_ERROR,
  CUSTOMIZE_ORDER_DATA_RESET_REDUCER,
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

export function submitCustomOrder(data) {
  console.warn("submitCustomOrder", data);
  return dispatch => {
    dispatch(showLoadingIndicator(CUSTOMIZE_ORDER_DATA));

    axios.post(urls.CustomizeOrder.url, data, header).then(response => {
      console.warn("response submitCustomOrder", response);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, CUSTOMIZE_ORDER_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, CUSTOMIZE_ORDER_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("AFTER submitCustomOrder ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, CUSTOMIZE_ORDER_DATA_ERROR)
        );
      });
  }
}

