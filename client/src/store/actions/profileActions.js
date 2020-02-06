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