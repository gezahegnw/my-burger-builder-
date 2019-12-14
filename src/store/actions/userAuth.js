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
                dispatch(userAuthSuccessful(response.data.idToken, response.data.localId));
                dispatch(checkUserAuthTimeout(response.data.expiresIn));//expiresIn come from firebase Auth data
            })
            .catch(err => {
                console.log(err);
                dispatch(userAuthFail(err.response.data.error));
            });
    };
};

