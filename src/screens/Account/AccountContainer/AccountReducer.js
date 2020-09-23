import {
    CALL_EMAIL_DATA,
    CALL_EMAIL_DATA_SUCCESS,
    CALL_EMAIL_DATA_ERROR,
    CALL_EMAIL_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successCallEmailVersion: 0,
    errorCallEmailVersion: 0,
    callEmailData:[]

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case CALL_EMAIL_DATA:
            return {
                ...state,
                isFetching: true
            };

        case CALL_EMAIL_DATA_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isFetching: false,
                callEmailData: action.data,
                successCallEmailVersion: ++state.successCallEmailVersion,
                error: false
            };

        case CALL_EMAIL_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsg: action.error,
                callEmailData:[],
                errorCallEmailVersion: ++state.errorCallEmailVersion
            };

        case CALL_EMAIL_DATA_RESET_REDUCER:
            return initialState;

        
        default:
            return state;
    }
}
