import * as actionType from './actionTypes';
import axios from 'axios';
import { setAlert } from './alertActions';

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