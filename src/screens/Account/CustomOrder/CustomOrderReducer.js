import {
    CUSTOM_ORDER_DATA,
    CUSTOM_ORDER_DATA_SUCCESS,
    CUSTOM_ORDER_DATA_ERROR,
    CUSTOM_ORDER_DATA_RESET_REDUCER,
} from "@redux/types";


const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successCustomVersion: 0,
    errorCustomVersion: 0,
    customOrderData:[]

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case CUSTOM_ORDER_DATA:
            return {
                ...state,
                isFetching: true
            };

        case CUSTOM_ORDER_DATA_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isFetching: false,
                customOrderData: action.data,
                successCustomVersion: ++state.successCustomVersion,
                error: false
            };

        case CUSTOM_ORDER_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsg: action.error,
                customOrderData:[],
                errorCustomVersion: ++state.errorCustomVersion
            };

        case CUSTOM_ORDER_DATA_RESET_REDUCER:
            return initialState;

        
        default:
            return state;
    }
}
