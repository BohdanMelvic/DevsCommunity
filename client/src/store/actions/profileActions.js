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

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: actionType.PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success' ));
        
        history.push('/dashboard');
        
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

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: actionType.PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success' ));
        
        history.push('/dashboard');
        
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

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: actionType.PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: error.response.statusText, 
                        status: error.response.status}
        });
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: actionType.PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: error.response.statusText, 
                        status: error.response.status}
        });
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const res = axios.delete(`/api/profile`);
    
            dispatch({ type: actionType.PROFILE_CLEAR });
            dispatch({ type: actionType.ACCOUNT_DELETED });
    
            dispatch(setAlert('Your account has been permanantly deleted'));
        } catch (error) {
            dispatch({
                type: actionType.PROFILE_ERROR,
                payload: {msg: error.response.statusText, 
                            status: error.response.status}
            });
        }
    }
}