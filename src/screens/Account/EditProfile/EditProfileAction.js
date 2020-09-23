import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    GET_PROFILE_RESET_REDUCER,

    GET_STATE_LIST,
    GET_STATE_LIST_SUCCESS,
    GET_STATE_LIST_ERROR,
    GET_STATE_LIST_RESET_REDUCER,
    
    GET_CITY_LIST,
    GET_CITY_LIST_SUCCESS,
    GET_CITY_LIST_ERROR,
    GET_CITY_LIST_RESET_REDUCER,
    
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_RESET_REDUCER,

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
  
  export function getProfile(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(GET_PROFILE));
  
      axios.post(urls.GetProfile.url, data, header).then(response => {  
        if (response.data.ack === '1') {
          dispatch(
            onSuccess(response.data, GET_PROFILE_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, GET_PROFILE_ERROR)
          )
        }
      })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, GET_PROFILE_ERROR)
          );
        });
    }
  }
  
  
  
  export function getStateList(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(GET_STATE_LIST));
  
      axios.post(urls.GetStateList.url, data, header).then(response => {  
        if (response.data.ack === '1') {
          dispatch(
            onSuccess(response.data, GET_STATE_LIST_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, GET_STATE_LIST_ERROR)
          )
        }
      })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, GET_STATE_LIST_ERROR)
          );
        });
    }
  }
  
  
  export function getCityList(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(GET_CITY_LIST));
  
      axios.post(urls.GetCityList.url, data, header).then(response => {  
        if (response.data.ack === '1') {
          dispatch(
            onSuccess(response.data, GET_CITY_LIST_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, GET_CITY_LIST_ERROR)
          )
        }
      })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, GET_CITY_LIST_ERROR)
          );
        });
    }
  }
  
  
  
  export function updateUserProfile(data) {
    return dispatch => {
      dispatch(showLoadingIndicator(UPDATE_PROFILE));
  
      axios.post(urls.UpdateProfile.url, data, header).then(response => { 
        if (response.data.ack === '1') {
          dispatch(onSuccess(response.data, UPDATE_PROFILE_SUCCESS))
        }
        else {
          dispatch(
            onFailure(response.data.msg, UPDATE_PROFILE_ERROR)
          )
        }
      })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, UPDATE_PROFILE_ERROR)
          );
        });
    }
  }
  