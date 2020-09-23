import {
  NOTIFICATION_LIST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_ERROR,
  NOTIFICATION_LIST_RESET_REDUCER,
} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successNotificationVersion: 0,
  errorNotificationVersion: 0,
  notificationData: []
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case NOTIFICATION_LIST:
      return {
        ...state,
        isFetching: true
      };

    case NOTIFICATION_LIST_SUCCESS:
      console.log("notifi.data",action.data);
     return {
        ...state,
        errorMsg: "",
        isFetching: false,
        notificationData: action.data,
        successNotificationVersion: ++state.successNotificationVersion,
        error: false
      };

    case NOTIFICATION_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        notificationData: [],
        errorNotificationVersion: ++state.errorNotificationVersion
      };
      
    case NOTIFICATION_LIST_RESET_REDUCER:
      return initialState;

    default:
      return state;
  }
}
