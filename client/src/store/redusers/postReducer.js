import * as actionType from '../actions/actionTypes';

const initialState = {
    posts: [],
    post: true,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionType.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
            
        case actionType.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        case actionType.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes} 
                    : post),
                loading: false
            };
        default:
            return state;
    }
};