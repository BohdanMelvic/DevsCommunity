import axios from 'axios';
import * as actionType from './actionTypes';
import { setAlert } from './alertActions';

// Get current users profiles
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        
        dispatch({
            type: actionType.PROFILE_GET,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: error.response.statusText, 
                        status: error.response.status}
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: actionType.PROFILE_GET,
            payload: res.data
        });

        dispatch(setAlert( edit ? 'Profile Update' : 'Profile Created', 'success' ));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach( err => dispatch(setAlert(err.msg, 'danger')) )
        }

        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: error.response.statusText, 
                        status: error.response.status}
        });
    }
}