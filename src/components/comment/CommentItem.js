/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import userCommentAvatar from '../../assets/Images/icons/boy.svg';
import postedCommentOption from '../../assets/Images/icons/comment_option.svg';
import { isAuthenticated } from '../../helpers/jsonConfig';
import { deleteComment, getSingleComment, updateComment } from '../../actions/comment/comment';
import VoteComment from './VoteComment';

export class CommentItem extends Component {
  state = {
    userId: null,
    displayEditBox: false,
    text: '',
    errors: {},
    idArticle: null,
    commentId: null,
    body: ''
  };

  async componentWillMount() {
    const user = await isAuthenticated();
    await this.setState({ userId: user.payload.id });
  }

  componentWillReceiveProps(nextProps) {
    const { singleComment, updatedComment } = nextProps;
    const { commentId } = this.state;

    if (singleComment.id === commentId) {
      this.setState({ text: singleComment.body });
    }
    if (Object.keys(updatedComment).length !== 0) {
      if (updatedComment[0].id === commentId) {
        this.setState({ body: updatedComment[0].body });
      }
    }
  }

  onDelete = (commentId, articleId) => {
    const { deleteComment } = this.props;
    deleteComment(commentId, articleId);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchSingleArticle = (articleId, commentId) => {
    this.setState({ commentId, displayEditBox: true });

    const { getSingleComment } = this.props;
    getSingleComment(articleId, commentId);
    this.setState({ text: '' });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const newComment = {
      text
    };
    const { comment, updateComment } = this.props;
    const { id, articleId } = comment;

    updateComment(newComment, articleId, id);
    this.setState({ text: '', displayEditBox: false });
  };

  render() {
    const {
      userId, displayEditBox, errors, text, commentId, body
    } = this.state;
    const { login, comment, profile } = this.props;

    const editeCommentBox = (
      <div className="comment_form">
        <div className="comment_user_avatar">
          <img
            src={profile !== null && profile.image !== null ? profile.image : userCommentAvatar}
            alt=""
          />{' '}
        </div>
        <div className="comment_input">
          <form onSubmit={this.onSubmit} id="submit_edited_comment">
            <textarea
              className="comment_content"
              name="text"
              value={text}
              onChange={this.onChange}
              error={errors.text}
              id=""
              cols="30"
              rows="10"
            />
            <button type="submit" className="comment_button">
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    );

    let postedCommentOptionalButton;
    if (login.isAuthenticated) {
      postedCommentOptionalButton = (
        <div className="posted_comment_option">
          {' '}
          <img src={postedCommentOption} alt="" />{' '}
          <div className="posted_comment_option_dropdown-content">
            <button
              className="edit_comment"
              type="button"
              onClick={this.fetchSingleArticle.bind(this, comment.articleId, comment.id)}
            >
              <i className="icofont-ui-edit editIcon" /> Update
            </button>
            <button
              type="button"
              className="delete_comment"
              onClick={this.onDelete.bind(this, comment.id, comment.articleId)}
            >
              {' '}
              <i className="icofont-ui-delete deleteIcon" /> Delete
            </button>
          </div>
        </div>
      );
    } else {
      postedCommentOptionalButton = '';
    }

    return (
      <Fragment>
        {!displayEditBox ? (
          <div className="posted_comment">
            <div className="user_posted_avatar">
              <img
                src={!comment.userfkey.image ? userCommentAvatar : comment.userfkey.image}
                alt=""
              />
            </div>

            <div className="posted_comment_body">
              <div className="posted_comment_title">
                {' '}
                {comment.userfkey.username}
                <i className="posted_comment_time">
                  {' '}
                  <Moment fromNow>{comment.createdAt}</Moment>
                </i>{' '}
                {comment.author === userId ? postedCommentOptionalButton : ''}
              </div>
              {commentId !== comment.id ? comment.body : body}
              <div className="posted_comment_content" />
              <div className="posted_comment_footer">
                <VoteComment allVotes={comment.votecomments} userId={userId}
                commentId={comment.id} articleID= {comment.articleId} />
                <div className="reply_to_comment" />
              </div>
            </div>
          </div>
        ) : comment.author === userId ? (
          editeCommentBox
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getSingleComment: PropTypes.func.isRequired,
  singleComment: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateComment: PropTypes.func.isRequired,
  updatedComment: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
  errors: state.errors,
  profile: state.profile,
  singleComment: state.comment.singleComment,
  updatedComment: state.comment.updatedComment
});

export default connect(
  mapStateToProps,
  {
    deleteComment,
    getSingleComment,
    updateComment
  }
)(CommentItem);
