import {
    CALL_EMAIL_DATA,
    CALL_EMAIL_DATA_SUCCESS,
    CALL_EMAIL_DATA_ERROR,
    CALL_EMAIL_DATA_RESET_REDUCER,

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
  
  export function getCallEmailData() {
    return dispatch => {
      dispatch(showLoadingIndicator(CALL_EMAIL_DATA));
  
      axios.post(urls.CallEmail.url, header).then(response => {
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, CALL_EMAIL_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, CALL_EMAIL_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, CALL_EMAIL_DATA_ERROR)
          );
        });
    }
  }
  

    
    
