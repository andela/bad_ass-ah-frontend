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
import getEditedComments from '../../actions/comment/editedComments';

export class CommentItem extends Component {
  state = {
    userId: null,
    displayEditBox: false,
    text: '',
    errors: {},
    idArticle: null,
    commentId: null,
    body: '',
    toggle: false,
    display: 'none',
    closeModal: ' ',
    idEditedComment: null,
    dipslayEditedButton: false
  };

  async componentWillMount() {
    const user = await isAuthenticated();
    await this.setState({ userId: user.payload.id });
  }

  componentDidMount() {
    const { comment } = this.props;
    if (comment.createdAt !== comment.updatedAt) {
      this.setState({ dipslayEditedButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { singleComment, updatedComment, editedComments } = nextProps;
    const { commentId } = this.state;

    if (singleComment.id === commentId) {
      this.setState({ text: singleComment.body });
    }
    if (Object.keys(updatedComment).length !== 0) {
      if (updatedComment[0].id === commentId) {
        this.setState({ body: updatedComment[0].body });
      }
    }
    if (editedComments.EditedComments.length > 0) {
      this.setState({ toggle: !this.state.toggle, display: 'flex' });
    }
  }

  onDelete = (commentId, articleId) => {
    const { deleteComment } = this.props;
    deleteComment(commentId, articleId);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchSingleComment = (articleId, commentId) => {
    this.setState({ commentId, displayEditBox: true, dipslayEditedButton: true });

    const { getSingleComment } = this.props;
    getSingleComment(articleId, commentId);
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

  fetchEditedComments = (commentId) => {
    const { getEditedComments, comment } = this.props;
    this.setState({ idEditedComment: commentId });
    getEditedComments(comment.articleId, commentId);
  };

  onClose = (e) => {
    e.preventDefault();
    this.setState({ idEditedComment: null, display: 'none' });
  };

  render() {
    const {
      userId,
      displayEditBox,
      errors,
      text,
      commentId,
      body,
      display,
      idEditedComment,
      dipslayEditedButton
    } = this.state;
    const {
      login, comment, editedComments, profile
    } = this.props;
    const { EditedComments } = editedComments;

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
    let editedCommentButton;

    if (login.isAuthenticated) {
      postedCommentOptionalButton = (
        <div className="posted_comment_option">
          {' '}
          <img src={postedCommentOption} alt="" />{' '}
          <div className="posted_comment_option_dropdown-content">
            <button
              className="edit_comment"
              type="button"
              onClick={this.fetchSingleComment.bind(this, comment.articleId, comment.id)}
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
      editedCommentButton = (
        <a
          id={comment.id}
          className="edited_comment_button"
          onClick={this.fetchEditedComments.bind(this, comment.id)}
        >
          Edited
        </a>
      );
    } else {
      postedCommentOptionalButton = '';
      editedCommentButton = '';
    }

    return (
      <Fragment>
        <div id="overlay" className="overlay" />
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
                {' . '} {dipslayEditedButton === true ? editedCommentButton : ' '}
                {comment.author === userId ? postedCommentOptionalButton : ''}
              </div>
              {commentId !== comment.id ? comment.body : body}
              <div className="posted_comment_content" />
              <div className="posted_comment_footer">
                <VoteComment
                  allVotes={comment.votecomments}
                  userId={userId}
                  commentId={comment.id}
                  articleID={comment.articleId}
                />
                <div className="reply_to_comment" />
              </div>
            </div>
          </div>
        ) : comment.author === userId ? (
          editeCommentBox
        ) : (
          ''
        )}
        {idEditedComment === comment.id && (
          <Fragment>
            {EditedComments.length > 0 && (
              <Fragment>
                <div
                  id="edited_comment_history_modal"
                  className="edited_comment_history_modal"
                  style={{ display }}
                >
                  <div className="edited_comment_history_modal_content">
                    <div className="edited_comment_modal_header">
                      <div className="modal_title">Edited comment history</div>
                      <div className="close_modal">
                        <span onClick={this.onClose.bind(this)} className="close_modal_btnx">
                          &times;
                        </span>
                      </div>
                    </div>
                    {EditedComments.map(
                      commentEdited => commentEdited.commentId === comment.id && (
                          <div className="edited_comment_modal_body">
                            <div className="content-header">
                              <div className="user_posted_avatar">
                                <img
                                  src={
                                    comment.author === commentEdited.userId
                                      ? comment.userfkey.image
                                        ? comment.userfkey.image
                                        : userCommentAvatar
                                      : userCommentAvatar
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="posted_comment_title">
                                {' '}
                                {comment.userfkey.username}
                                <i className="posted_comment_time">
                                  {' '}
                                  <Moment fromNow>{commentEdited.createdAt}</Moment>
                                </i>{' '}
                              </div>
                            </div>
                            <div className="editedcomment_body">{commentEdited.body}</div>
                          </div>
                      )
                    )}
                    <div className="edited_comment_modal_footer">
                      <button
                        id="close_modal_btn"
                        onClick={this.onClose.bind(this)}
                        className="close_modal_btnf"
                      >
                        close
                      </button>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
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
  getEditedComments: PropTypes.func.isRequired,
  editedComments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login,
  errors: state.errors,
  profile: state.profile.profile,
  singleComment: state.comment.singleComment,
  updatedComment: state.comment.updatedComment,
  editedComments: state.editedComments
});

export default connect(
  mapStateToProps,
  {
    deleteComment,
    getSingleComment,
    updateComment,
    getEditedComments
  }
)(CommentItem);
