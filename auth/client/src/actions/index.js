import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER ,
    UNAUTH_USER, 
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';
import { 
    ROOT_URL 
} from '../helpers/constants';

export function signInUser({ email, password }) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request state to inicate user is authenticated
                // - Update state to indicate user
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token)
                // - redirect to route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                // if request is bad 
                // - show error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { 
        type: UNAUTH_USER
    }
}

export function signupUser ({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response => dispatch(authError(response.data.error)))
    }
}

export function authError (error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage () {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authirization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
            });
        });
    }
}
