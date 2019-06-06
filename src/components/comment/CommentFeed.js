/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export class CommentFeed extends Component {
  render() {
    const { comments } = this.props;
    return comments.map(comment => <CommentItem key={comment.id} comment={comment} />);
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired
};
export default CommentFeed;
