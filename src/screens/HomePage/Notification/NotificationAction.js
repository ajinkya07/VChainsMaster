import {
  NOTIFICATION_LIST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_ERROR,
  NOTIFICATION_LIST_RESET_REDUCER,

} from "@redux/types";

import { strings } from '@values/strings'
import axios from 'axios'
import { urls } from '@api/urls'

// const config = {
//   headers: {
//     //Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
// }

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
}



export function showLoadingIndicator(type) {
  return {
    type: NOTIFICATION_LIST,

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


export function getNotificationList(data) {
console.warn("data--",data);
  return dispatch => {
    
    dispatch(showLoadingIndicator());
    
    axios.post(urls.Notification.url, data, header).then(response => {
        
      if (response.data.ack === '1') {
        dispatch(onSuccess(response.data, NOTIFICATION_LIST_SUCCESS))
      }
      else {
        dispatch(
          onFailure(response.data.msg, NOTIFICATION_LIST_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, NOTIFICATION_LIST_ERROR)
        );
      });
  }
}
