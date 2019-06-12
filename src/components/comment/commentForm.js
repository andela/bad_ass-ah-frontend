/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addComment from '../../actions/comment/comment';
import userCommentAvatar from '../../assets/Images/icons/boy.svg';

export class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const newComment = {
      text
    };
    const { articleId, addComment } = this.props;
    addComment(newComment, articleId);
    this.setState({ text: '' });
  };

  render() {
    const { errors, text } = this.state;
    const { profile } = this.props.profile;

    return (
      <Fragment>
        <div className="comment_user_avatar">
          <img src={profile !== null && profile.image !== null ? profile.image : userCommentAvatar} alt="" />{' '}
        </div>
        <div className="comment_input">
          <form onSubmit={this.onSubmit} id="submit_comment">
            <textarea
              className={classnames('comment_content', {
                isInvalid: errors.error
              })}
              placeholder={errors.error ? errors.error : 'Leave your comment here'}
              name="text"
              value={text}
              onChange={this.onChange}
              error={errors.text}
              id=""
              cols="30"
              rows="10"
            />
            <button type="submit" className="comment_button">
              COMMENT
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
