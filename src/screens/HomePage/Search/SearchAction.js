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

export function searchProducts(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(SEARCH_BY_CATEGORY));

    axios.post(urls.SearchGrid.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, SEARCH_BY_CATEGORY_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, SEARCH_BY_CATEGORY_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("error--", error.toString());

        dispatch(
          onFailure(strings.serverFailedMsg, SEARCH_BY_CATEGORY_ERROR)
        );
      });
  }
}

export function searchByCode(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(SEARCH_BY_CODE));

    axios.post(urls.SearchByCodeGrid.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, SEARCH_BY_CODE_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, SEARCH_BY_CODE_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.warn("error--", error.toString());

        dispatch(
          onFailure(strings.serverFailedMsg, SEARCH_BY_CODE_ERROR)
        );
      });
  }
}


export function searchProductsCount(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(SEARCH_COUNT));

    axios.post(urls.SearchGrid.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, SEARCH_COUNT_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, SEARCH_COUNT_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("error--", error.toString());
        dispatch(
          onFailure(strings.serverFailedMsg, SEARCH_COUNT_ERROR)
        );
      });
  }
}

export function saveSearchPayload(data) {
  return dispatch => {
    dispatch(onSuccess(data, SEARCH_PAYLOAD));
  }
}



