import * as actionType from '../actions/actionTypes';

const initialState = [
    {
        id: 1,
        msg: 'Please log in',
        alertType: 'success'
    }
];

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case actionType.SET_ALERT:
            return [...state, payload];
        case actionType.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}