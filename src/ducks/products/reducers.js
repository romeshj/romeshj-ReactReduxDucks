import { combineReducers } from "redux";
import * as types from "./types";

const initialState = {
	productLists : []
}

const productsReducer = ( state = initialState, action ) => {
		switch( action.type ) {
        case types.FETCH_LIST: 
		return {
                    ...state , productLists : action.payload
            };
		case types.FETCH_DETAILS:
            return {
                    ...state , product : action.payload
            }
        default: return state;
    }
	
}

const reducer = combineReducers({
    products: productsReducer
});

export default reducer;