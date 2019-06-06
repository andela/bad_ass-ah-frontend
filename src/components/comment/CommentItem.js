import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import userCommentAvatar from '../../assets/Images/icons/boy.svg';

export const CommentItem = ({ comment }) => (
  <div className="posted_comment">
    <div className="user_posted_avatar">
      <img src={!comment.userfkey.image ? userCommentAvatar : comment.userfkey.image} alt="" />
    </div>
    <div className="posted_comment_body">
      <div className="posted_comment_title">
        {' '}
        {comment.userfkey.username}
        <i className="posted_comment_time">
          {' '}
          <Moment fromNow>{comment.createdAt}</Moment>
        </i>{' '}
      </div>
      {comment.body}
      <div className="posted_comment_content" />
      <div className="posted_comment_footer">
        <div className="favorite_posted_comment" />
        <div className="reply_to_comment" />
      </div>
    </div>
  </div>
);
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentItem;
