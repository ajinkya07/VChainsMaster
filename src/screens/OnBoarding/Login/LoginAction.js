import {
  LOGIN_DATA,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_ERROR,
  LOGIN_DATA_RESET_REDUCER,

  FCM_DATA,
  FCM_DATA_SUCCESS,
  FCM_DATA_ERROR,
  FCM_DATA_RESET_REDUCER,

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

import AsyncStorage from '@react-native-community/async-storage';


export function showLoadingIndicator(type) {
  return {
    type: LOGIN_DATA
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

export function setLoginData(data) {

  global.userId = data.data.user_id;
  AsyncStorage.setItem('userId', data.data.user_id.toString())
  AsyncStorage.setItem('fullName', data.data.full_name.toString())
  AsyncStorage.setItem('userStatus', data.data.user_status.toString())
  AsyncStorage.setItem('mobileNumber', data.data.mobile_number.toString())
  AsyncStorage.setItem('emailId', data.data.email_id.toString())

}

export function signInRequest(data) {

  return dispatch => {
    dispatch(showLoadingIndicator());
    axios.post(urls.Login.url, data, header).then(response => {
      console.log("response.data.success", response.data);
      if (response.data.ack === '1') {
        setLoginData(response.data)
        dispatch(
          onSuccess(response.data, LOGIN_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, LOGIN_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, LOGIN_DATA_ERROR)
        );
      });
  }
}



export function sendFCM(data) {
  console.warn("sendFCM", data);

  return dispatch => {
    axios.post(urls.sendFCMToken.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(onSuccess(response.data, FCM_DATA_SUCCESS))
      }
      else {
        dispatch(
          onFailure(response.data.msg, FCM_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, FCM_DATA_ERROR)
        );
      });
  }
}