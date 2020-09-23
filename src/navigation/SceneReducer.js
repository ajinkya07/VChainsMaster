import {
    ALL_PARAMETER,
    ALL_PARAMETER_SUCCESS,
    ALL_PARAMETER_ERROR,
    ALL_PARAMETER_RESET_REDUCER,

} from "@redux/types";


const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successAllParameterVersion: 0,
    errorAllParamaterVersion: 0,
    allParameterData:[]

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case ALL_PARAMETER:
            return {
                ...state,
                isFetching: true
            };

        case ALL_PARAMETER_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isFetching: false,
                allParameterData: action.data,
                successAllParameterVersion: ++state.successAllParameterVersion,
                error: false
            };

        case ALL_PARAMETER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsg: action.error,
                allParameterData:[],
                errorAllParamaterVersion: ++state.errorAllParamaterVersion
            };

        case ALL_PARAMETER_RESET_REDUCER:
            return initialState;

        
        default:
            return state;
    }
}
