import * as actionType from './actionTypes';
import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: actionType.USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionType.AUTH_ERROR
        });
    }
}

// Register user
export const register = ({name, email, password}) => async dispatch => {
    const newUser = {
        name,
        email,
        password
    };

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
       
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach( err => dispatch(setAlert(err.msg, 'danger')) )
        }

        dispatch({
            type: actionType.REGISTER_FAIL
        });
    }
}

// Login user
export const login = (email, password) => async dispatch => {
  
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({email, password});
        const res = await axios.post('/api/auth', body, config);
       
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach( err => dispatch(setAlert(err.msg, 'danger')) )
        }

        dispatch({
            type: actionType.LOGIN_FAIL
        });
    }
}