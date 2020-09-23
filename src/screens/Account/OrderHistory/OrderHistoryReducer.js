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


const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successOrderHistoryVersion: 0,
    errorOrderHistoryVersion: 0,
    orderHistoryData: [],

    successOrderHistoryDetailsVersion: 0,
    errorOrderHistoryDetailsVersion: 0,
    orderHistoryDetailsData:[],

    successReOrderVersion:0,
    errorReOrderVersion:0,
    reOrderData:[]

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case ORDER_HISTORY_DATA:
            return {
                ...state,
                isFetching: true
            };

        case ORDER_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isFetching: false,
                orderHistoryData: action.data.data,
                successOrderHistoryVersion: ++state.successOrderHistoryVersion,
                error: false
            };

        case ORDER_HISTORY_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsg: action.error,
                orderHistoryData:[],
                errorOrderHistoryVersion: ++state.errorOrderHistoryVersion
            };

        case ORDER_HISTORY_DATA_RESET_REDUCER:
            return initialState;

            case ORDER_HISTORY_DETAILS_DATA:
                return {
                    ...state,
                    isFetching: true
                };
    
            case ORDER_HISTORY_DETAILS_DATA_SUCCESS:
                return {
                    ...state,
                    errorMsg: "",
                    isFetching: false,
                    orderHistoryDetailsData: action.data.data,
                    successOrderHistoryDetailsVersion: ++state.successOrderHistoryDetailsVersion,
                    error: false
                };
    
            case ORDER_HISTORY_DETAILS_DATA_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    errorMsg: action.error,
                    orderHistoryDetailsData:[],
                    errorOrderHistoryDetailsVersion: ++state.errorOrderHistoryDetailsVersion
                };
    
            case ORDER_HISTORY_DETAILS_DATA_RESET_REDUCER:
                return initialState;
    

                case REORDER_DATA:
                    return {
                        ...state,
                        isFetching: true
                    };
        
                case REORDER_DATA_SUCCESS:
                    return {
                        ...state,
                        errorMsg: action.data.msg,
                        isFetching: false,
                        reOrderData: action.data.data,
                        successReOrderVersion: ++state.successReOrderVersion,
                        error: false
                    };
        
                case REORDER_DATA_ERROR:
                    return {
                        ...state,
                        isFetching: false,
                        error: true,
                        errorMsg: action.error,
                        reOrderData:[],
                        errorReOrderVersion: ++state.errorReOrderVersion
                    };
        
                case REORDER_DATA_RESET_REDUCER:
                    return initialState;
        
        default:
            return state;
    }
}
