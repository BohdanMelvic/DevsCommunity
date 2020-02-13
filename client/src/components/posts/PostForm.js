import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/postActions';

const PostForm = ({ addPost, isAuthenticated }) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addPost({text});
        setText('');
    }

    return (
       <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={e => onSubmit(e)} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
