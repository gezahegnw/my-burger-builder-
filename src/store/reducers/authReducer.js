import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const userAuthStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const userAuthSuccessful = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const userAuthFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.USER_AUTH_START: return userAuthStart(state, action);
        case actionTypes.USER_AUTH_SUCCESSFUL: return userAuthSuccessful(state, action);
        case actionTypes.USER_AUTH_FAIL: return userAuthFail(state, action);
        default:
            return state;
    }
};

export default reducer;