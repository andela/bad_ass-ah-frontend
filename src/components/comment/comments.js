/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComments } from '../../actions/comment/comment';
import CommentForm from './commentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/spinner/Spinner';
import './CreateComment.scss';

export class Comments extends Component {
  // componentDidMount() {
  //   // eslint-disable-next-line react/prop-types
  //   const { getComments, articleId } = this.props;
  //   getComments(articleId);
  // }

  render() {
    // eslint-disable-next-line react/prop-types
    const { comment } = this.props;
    const { comments, loading } = comment;
    // eslint-disable-next-line react/prop-types
    const { articleId } = this.props;
    // eslint-disable-next-line react/prop-types
    const { isAuthenticated } = this.props.login;

    let commentsContent;
    let commentLable;

    if (comments == null || loading) {
      commentsContent = <Spinner />;
    } else {
      commentsContent = <CommentFeed comments={comments} />;
      commentLable = <h4>Comments</h4>;
    }

    return (
      <Fragment>
        <div className="comment_form">
          {isAuthenticated ? <CommentForm articleId={articleId} /> : ''}
        </div>
        {!isAuthenticated ? commentLable : ''}
        {commentsContent}
      </Fragment>
    );
  }
}
Comment.propTypes = {
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  login: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  comment: state.comment,
  login: state.login
});

export default connect(
  mapStateToProps,
  { getComments }
)(Comments);
