import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/postActions';
import Spinner from '../Spinner/Spinner';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: {post, loading}, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return (
        loading || post === null ? <Spinner /> : <Fragment>
            <Link to='/posts' className='btn'>
                Back To Posts
            </Link>
            <PostItem showActions={false} post={post} />
        </Fragment>
    )
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.postReducer
});

export default connect(mapStateToProps, { getPost })(Post);
