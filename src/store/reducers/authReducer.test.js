//test for redux reducer code 
import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer ', () => {
    it('It should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authenticatedUserRedirectPath: '/'
        });
    })
    it('It should store the user token upon  user login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authenticatedUserRedirectPath: '/'
        }, {type: actionTypes.USER_AUTH_SUCCESSFUL,
            idToken: 'check-some-token',
            userId: 'check-some-userId'
         })).toEqual({
            token: 'check-some-token',
            userId: 'check-some-userId',
            error: null,
            loading: false,
            authenticatedUserRedirectPath: '/'
        });
    })
});