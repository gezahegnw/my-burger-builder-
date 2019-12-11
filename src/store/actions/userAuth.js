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
            })
            .catch(err => {
                console.log(err);
                dispatch(userAuthFail(err.response.data.error));
            });
    };
};

