import * as actionType from '../actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case (actionType.PROFILE_GET):
            return {
                ...state,
                profile: payload
            };

        case (actionType.PROFILE_ERROR):
            return {
                ...state,
                error: payload,
                loading: false
            };

        case (actionType.PROFILE_CLEAR):
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };

        default:
            return state;
    
    }
} 