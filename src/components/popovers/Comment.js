import React from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';

const Comment = ({ comment, onChange, onSubmit }) => (
  <div id="comment-popover" className="comment-popover hide">
    <div className="title">
      <div className="title-text">Add comment</div>
    </div>
    <form onSubmit={onSubmit} id="comment-form">
      <textarea
        id="comment-input"
        name="comment"
        value={comment}
        rows="3"
        onChange={onChange}
        placeholder="Type your comment..."
        className="comment-input"
      />
      <Button value="Send" className="comment-btn" />
    </form>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Comment;
