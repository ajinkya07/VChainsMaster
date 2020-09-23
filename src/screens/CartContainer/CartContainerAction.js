import {
    CART_DATA,
    CART_DATA_SUCCESS,
    CART_DATA_ERROR,
    CART_DATA_RESET_REDUCER,
   
    WISHLIST_DATA,
    WISHLIST_DATA_SUCCESS,
    WISHLIST_DATA_ERROR,
    WISHLIST_DATA_RESET_REDUCER,
   
    DELETE_FROM_CART_WISHLIST_DATA,
    DELETE_FROM_CART_WISHLIST_DATA_SUCCESS,
    DELETE_FROM_CART_WISHLIST_DATA_ERROR,
    DELETE_FROM_CART_WISHLIST_DATA_RESET_REDUCER,
   
    TOTAL_CART_COUNT_DATA,
    TOTAL_CART_COUNT_DATA_SUCCESS,
    TOTAL_CART_COUNT_DATA_ERROR,
    TOTAL_CART_COUNT_DATA_RESET_REDUCER,

    MOVE_PRODUCT_DATA,
    MOVE_PRODUCT_DATA_SUCCESS,
    MOVE_PRODUCT_DATA_ERROR,
    MOVE_PRODUCT_DATA_RESET_REDUCER,

    CLEAR_ALL_CART_DATA,
    CLEAR_ALL_CART_DATA_SUCCESS,
    CLEAR_ALL_CART_DATA_ERROR,
    CLEAR_ALL_CART_DATA_RESET_REDUCER,

    CLEAR_ALL_WISHLIST_DATA,
    CLEAR_ALL_WISHLIST_DATA_SUCCESS,
    CLEAR_ALL_WISHLIST_DATA_ERROR,
    CLEAR_ALL_WISHLIST_DATA_RESET_REDUCER,

    EDIT_CART_PRODUCT_DATA,
    EDIT_CART_PRODUCT_DATA_SUCCESS,
    EDIT_CART_PRODUCT_DATA_ERROR,
    EDIT_CART_PRODUCT_DATA_RESET_REDUCER,

    PLACE_ORDER_DATA,
    PLACE_ORDER_DATA_SUCCESS,
    PLACE_ORDER_DATA_ERROR,
    PLACE_ORDER_DATA_RESET_REDUCER,

    
    CART_SUMMARY_DATA,
    CART_SUMMARY_DATA_SUCCESS,
    CART_SUMMARY_DATA_ERROR,
    CART_SUMMARY_DATA_RESET_REDUCER,

    CART_WEIGHT_DATA,
    CART_WEIGHT_DATA_SUCCESS,
    CART_WEIGHT_DATA_ERROR,
    CART_WEIGHT_DATA_RESET_REDUCER
 
  } from "@redux/types";
  
  import { strings } from '@values/strings'
  import axios from 'axios'
  import { urls } from '@api/urls'
  import { Container, Tab, Tabs, TabHeading, Icon, Toast, Fab, Picker } from 'native-base';

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
  
  export function getCartData(data) {  
    return dispatch => {
      dispatch(showLoadingIndicator(CART_DATA));
  
      axios.post(urls.CartData.url, data, header).then(response => {
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, CART_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, CART_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, CART_DATA_ERROR)
          );
        });
    }
  }
  
  export function getWishlistData(data) {
      return dispatch => {
        dispatch(showLoadingIndicator(WISHLIST_DATA));
    
        axios.post(urls.CartData.url, data, header).then(response => {
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, WISHLIST_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, WISHLIST_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {    
            dispatch(
              onFailure(strings.serverFailedMsg, WISHLIST_DATA_ERROR)
            );
          });
      }
    }
      
  
    export function deleteCartWishListProduct(data) {
    
      return dispatch => {
        dispatch(showLoadingIndicator(DELETE_FROM_CART_WISHLIST_DATA));
    
        axios.post(urls.DeleteFromCartWishList.url, data, header).then(response => {
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, DELETE_FROM_CART_WISHLIST_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, DELETE_FROM_CART_WISHLIST_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {    
            dispatch(
              onFailure(strings.serverFailedMsg, DELETE_FROM_CART_WISHLIST_DATA_ERROR)
            );
          });
      }
    }
    
    
export function getTotalCartCount(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(TOTAL_CART_COUNT_DATA));

    axios.post(urls.TotalCartCount.url, data, header).then(response => {
      console.log("getTotalCartCount", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, TOTAL_CART_COUNT_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, TOTAL_CART_COUNT_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, TOTAL_CART_COUNT_DATA_ERROR)
        );
      });
  }
}


   
export function moveProduct(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(MOVE_PRODUCT_DATA));

    axios.post(urls.MoveProduct.url, data, header).then(response => {
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, MOVE_PRODUCT_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, MOVE_PRODUCT_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, MOVE_PRODUCT_DATA_ERROR)
        );
      });
  }
}



export function clearAllCart(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(CLEAR_ALL_CART_DATA));

    axios.post(urls.ClearCartWishlistData.url, data, header).then(response => {
      console.warn("response cart clear",response.data);

      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, CLEAR_ALL_CART_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, CLEAR_ALL_CART_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, CLEAR_ALL_CART_DATA_ERROR)
        );
      });
  }
}


export function clearAllWishList(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(CLEAR_ALL_WISHLIST_DATA));

    axios.post(urls.ClearCartWishlistData.url, data, header).then(response => {
      console.warn("response wishlist clear",response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, CLEAR_ALL_WISHLIST_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, CLEAR_ALL_WISHLIST_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, CLEAR_ALL_WISHLIST_DATA_ERROR)
        );
      });
  }
}


export function updateEditedCartProduct(data) {
  console.warn(" updateEditedCartProduct",data);
  return dispatch => {
    dispatch(showLoadingIndicator(EDIT_CART_PRODUCT_DATA));

    axios.post(urls.EditCartProduct.url, data, header).then(response => {
      console.warn("response updateEditedCartProduct",response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, EDIT_CART_PRODUCT_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, EDIT_CART_PRODUCT_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, EDIT_CART_PRODUCT_DATA_ERROR)
        );
      });
  }
}



export function placeOrderFromCart(data) {
  console.warn(" placeOrderFromCart",data);
  return dispatch => {
    dispatch(showLoadingIndicator(PLACE_ORDER_DATA));

    axios.post(urls.PlaceOrderFromCart.url, data, header).then(response => {
      console.warn("response placeOrderFromCart",response.data);
      if (response.data.ack == '1') {
        dispatch(
          onSuccess(response.data, PLACE_ORDER_DATA_SUCCESS)
        )
        
      Toast.show({
        text: response.data.msg ? response.data.msg : 'Order placed successfully',
        duration: 2500,
        type:'success'
      })
      }

      else {
        dispatch(
          onFailure(response.data.msg, PLACE_ORDER_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, PLACE_ORDER_DATA_ERROR)
        );
      });
  }
}



export function getCartSummary(data) {
  return dispatch => {
    dispatch(showLoadingIndicator(CART_SUMMARY_DATA));

    axios.post(urls.CartSummery.url, data, header).then(response => {
      if (response.data.ack == '1') {
        dispatch(onSuccess(response.data, CART_SUMMARY_DATA_SUCCESS))
      }

      else {
        dispatch(onFailure(response.data.msg, CART_SUMMARY_DATA_ERROR))
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, CART_SUMMARY_DATA_ERROR)
        );
      });
  }
}

export function getCartWeight(data) {

  return dispatch => {
    dispatch(showLoadingIndicator(CART_WEIGHT_DATA));

    axios.post(urls.CartWeight.url, data, header).then(response => {
   
      if (response.data.ack == '1') {
        dispatch(onSuccess(response.data, CART_WEIGHT_DATA_SUCCESS))
      }

      else {
        dispatch(onFailure(response.data.msg, CART_WEIGHT_DATA_ERROR))
      }
    })
      .catch(function (error) {
        dispatch(
          onFailure(strings.serverFailedMsg, CART_WEIGHT_DATA_ERROR)
        );
      });
  }
}
