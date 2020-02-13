import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../store/actions/postActions';

const CommentItem = ({
    postId,
    deleteComment,
    auth,
    comment: { _id, text, name, avatar, user, date }
}) => {
    return (
         <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
              className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button 
                    onClick={() => deleteComment(postId, _id)}
                    type="button"
                    className='btn btn-danger'
                >
                    <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
