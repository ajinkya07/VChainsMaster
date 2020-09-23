import {
  OTP_REGISTER_DATA,
  OTP_REGISTER_DATA_SUCCESS,
  OTP_REGISTER_DATA_ERROR,
  OTP_REGISTER_DATA_RESET_REDUCER,

  REGISTER_DATA,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_ERROR,
  REGISTER_DATA_RESET_REDUCER,

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

export function OTPregisterRequest(data) {
console.log("registerRequest data",data);

  return dispatch => {
    dispatch(showLoadingIndicator(OTP_REGISTER_DATA));

    axios.post(urls.SendOtp.url, data, header).then(response => {
        console.log("registerRequest", response.data);
        if (response.data.ack ==='1') {
          dispatch(
            onSuccess(response.data, OTP_REGISTER_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, OTP_REGISTER_DATA_ERROR)
          )
        }
      })
      .catch(function (error) {
        console.log(" OTP ERROR", error);
        dispatch(
          onFailure(strings.serverFailedMsg, OTP_REGISTER_DATA_ERROR)
        );
      });
  }
}


export function registerAfterOtpRequest(data) {
  console.log("registerAfterOtpRequest  data",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(REGISTER_DATA));
  
      axios.post(urls.Register.url, data, header).then(response => {
          console.log("registerAfterOtpRequest", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, REGISTER_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, REGISTER_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log(" after register OTP ERROR", error);
          dispatch(
            onFailure(strings.serverFailedMsg, REGISTER_DATA_ERROR)
          );
        });
    }
  }
