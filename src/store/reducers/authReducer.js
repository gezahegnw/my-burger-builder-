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
        loading: false,
        authenticatedUserRedirectPath: '/'
     } );
};

const userAuthFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const userAuthLogout = (state, action) => {
    return updateObject( state, { token: null, userId: null } );
};

const setAuthenticatedUserRedirectPath = (state, action) => {
    return updateObject( state, { authenticatedUserRedirectPat: action.path } );

    
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.USER_AUTH_START: return userAuthStart(state, action);
        case actionTypes.USER_AUTH_SUCCESSFUL: return userAuthSuccessful(state, action);
        case actionTypes.USER_AUTH_FAIL: return userAuthFail(state, action);
        case actionTypes.USER_AUTH_LOGOUT: return userAuthLogout(state, action);
        case actionTypes.SET_AUTHENTICATED_USER_REDIRECT_PATH: return setAuthenticatedUserRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;