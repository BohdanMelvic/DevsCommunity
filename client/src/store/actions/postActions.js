import * as actionType from './actionTypes';
import axios from 'axios';
import { setAlert } from './alertActions';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');

        dispatch({
            type: actionType.GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${postId}`);

        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: { postId, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlike/${postId}`);

        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: { postId, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Delete post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/post/${postId}`);

        dispatch({
            type: actionType.DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};