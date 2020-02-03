import * as actionType from './actionTypes';
import uuid from 'uuid'

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
    const id = uuid.v4();

    dispatch({
        type: actionType.SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({
        type: actionType.REMOVE_ALERT,
        payload: id
    }), timeout);
} 