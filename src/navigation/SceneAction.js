import {
    ALL_PARAMETER,
    ALL_PARAMETER_SUCCESS,
    ALL_PARAMETER_ERROR,
    ALL_PARAMETER_RESET_REDUCER,

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
  
  export function allParameters(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(ALL_PARAMETER));
  
      axios.post(urls.AllParameter.url, data, header).then(response => {
          if (response.data) {
            dispatch(
              onSuccess(response.data, ALL_PARAMETER_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, ALL_PARAMETER_ERROR)
            )
          }
        })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, ALL_PARAMETER_ERROR)
          );
        });
    }
  }
  