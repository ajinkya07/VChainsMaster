import {
  FORGOT_DATA,
  FORGOT_DATA_SUCCESS,
  FORGOT_DATA_ERROR,
  FORGOT_DATA_RESET_REDUCER,

  OTP_DATA,
  OTP_DATA_SUCCESS,
  OTP_DATA_ERROR,
  OTP_DATA_RESET_REDUCER,

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

export function sendOtpRequest(data) {
console.log("SendOtp data",data);

  return dispatch => {
    dispatch(showLoadingIndicator(FORGOT_DATA));

    axios.post(urls.SendOtp.url, data, header).then(response => {
        console.log("sendOtpRequest", response.data);
        if (response.data.ack ==='1') {
          dispatch(
            onSuccess(response.data, FORGOT_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, FORGOT_DATA_ERROR)
          )
        }
      })
      .catch(function (error) {
        console.log("AFTER OTP ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, FORGOT_DATA_ERROR)
        );
      });
  }
}


export function afterOtpRequest(data) {
  console.log("SendOtp data",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(OTP_DATA));
      axios.post(urls.ChangePassword.url, data, header).then(response => {
          console.log("afterOtpRequest", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, OTP_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, OTP_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log("AFTER OTP WITH MOB AND PASS ERROR ", error);
          dispatch(
            onFailure(strings.serverFailedMsg, OTP_DATA_ERROR)
          );
        });
    }
  }
  