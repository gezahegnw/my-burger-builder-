import axios from 'axios';

import * as actionTypes from './actionTypes';

export const userAuthStart = () => {
    return {
        type: actionTypes.USER_AUTH_START
    };
};

export const userAuthSuccessful = (token, userId) => {
    return {
        type: actionTypes.USER_AUTH_SUCCESSFUL,
        idToken: token,
        userId: userId
    };
};

export const userAuthFail = (error) => {
    return {
        type: actionTypes.USER_AUTH_FAIL,
        error: error
    };
};
//function that logout the user after  1 hour
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.USER_AUTH_LOGOUT 
    };
};
//function for check firebase authetcation token exiperation time 
export const checkUserAuthTimeout = (tokenExpirationTime) => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        }, tokenExpirationTime * 1000);//this will make the token expired after one
    };
};

//redirect authenticated user to this path
export const setAuthenticatedUserRedirectPath = (redirectPath) => {
    return {
        type: actionTypes.SET_AUTHENTICATED_USER_REDIRECT_PATH ,
        Path: redirectPath
    };
};
export const userAuthentication = (email, password, isSignup) => {
    return dispatch => {
        dispatch(userAuthStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        //use the fellowing link for sign up API call
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbA0wIFVHHvHQxsKHbC9wLWKHn6u8gNbA";
            if (!isSignup) {
                 //use the fellowing link for sign in API call
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbA0wIFVHHvHQxsKHbC9wLWKHn6u8gNbA';
            }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn  * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate );
                localStorage.setItem('userId', response.data.localId);
                dispatch(userAuthSuccessful(response.data.idToken, response.data.localId));
                dispatch(checkUserAuthTimeout(response.data.expiresIn));//expiresIn come from firebase Auth data
            })
            .catch(err => {
                console.log(err);
                dispatch(userAuthFail(err.response.data.error));
            });
    };
};

export const authCheckUserState = () => {
    return  dispatch => {
        const token =localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }else {
            const expirationDate = localStorage.getItem('expirationDate');
                if (expirationDate > new Date()) {
                    dispatch(logout());
                } else {
                    const userId = localStorage.getItem('userId');
                    dispatch(userAuthSuccessful(token, userId));
                    //dispatch(checkUserAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                }
        }
    };
};

