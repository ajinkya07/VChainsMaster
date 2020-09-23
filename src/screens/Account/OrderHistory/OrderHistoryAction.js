import {
    ORDER_HISTORY_DATA,
    ORDER_HISTORY_DATA_SUCCESS,
    ORDER_HISTORY_DATA_ERROR,
    ORDER_HISTORY_DATA_RESET_REDUCER,

    ORDER_HISTORY_DETAILS_DATA,
    ORDER_HISTORY_DETAILS_DATA_SUCCESS,
    ORDER_HISTORY_DETAILS_DATA_ERROR,
    ORDER_HISTORY_DETAILS_DATA_RESET_REDUCER,

    
    REORDER_DATA,
    REORDER_DATA_SUCCESS,
    REORDER_DATA_ERROR,
    REORDER_DATA_RESET_REDUCER,
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
  
  export function getOrderHistoryList(data) {
  console.log("getOrderHistoryList",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(ORDER_HISTORY_DATA));
  
      axios.post(urls.OrderHistory.url, data, header).then(response => {
          console.log("getOrderHistoryList", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, ORDER_HISTORY_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, ORDER_HISTORY_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log("getHomePageData ERROR", error);
  
          dispatch(
            onFailure(strings.serverFailedMsg, ORDER_HISTORY_DATA_ERROR)
          );
        });
    }
  }
  

  
  export function getOrderHistoryDetails(data) {
    
      return dispatch => {
        dispatch(showLoadingIndicator(ORDER_HISTORY_DETAILS_DATA));
    
        axios.post(urls.OrderHistoryDetail.url, data, header).then(response => {
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, ORDER_HISTORY_DETAILS_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, ORDER_HISTORY_DETAILS_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, ORDER_HISTORY_DETAILS_DATA_ERROR)
            );
          });
      }
    }

    
    
  export function reOrderProduct(data) {
    
      return dispatch => {
        dispatch(showLoadingIndicator(REORDER_DATA));
    
        axios.post(urls.ReOrder.url, data, header).then(response => {
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, REORDER_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, REORDER_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, REORDER_DATA_ERROR)
            );
          });
      }
    }
