import * as actionType from './actionTypes';
import uuid from 'uuid'

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();

    dispatch({
        type: actionType.SET_ALERT,
        payload: { msg, alertType, id }
    })
} 