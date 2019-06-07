/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import userCommentAvatar from '../../assets/Images/icons/boy.svg';
import LikeComment, { DisLikeComment } from '../../actions/comment/voteComment';
import { isAuthenticated } from '../../helpers/Config';
import { getTotalNumber } from '../../helpers/Article';

export class CommentItem extends Component {
  state= {
    commentId: null,
    loggedInUser: null,
    changeLikeColor: null,
    changeDisLikeColor: null,
    allLike: null,
    allDisLike: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { comment } = nextProps;
    if (typeof comment.votecomments !== 'undefined') {
      comment.votecomments.map((data) => {
        if (data.userId === prevState.loggedInUser && data.like === true) {
          prevState.changeLikeColor = 'turnToRed';
          prevState.changeDisLikeColor = 'turnToBlack';
        }
        if (data.userId === 46 && data.dislike === true) {
          prevState.changeLikeColor = 'turnToBlack ';
          prevState.changeDisLikeColor = 'turnToRed';
        }
      });
    }
  }

  async componentDidMount() {
    const { payload } = await isAuthenticated();
    this.setState({ loggedInUser: payload.id });
  }

  likeComment = (commentId, articleId) => {
    const { LikeComment } = this.props;

    this.setState({ commentId });
    LikeComment(commentId, articleId);
  }

  dislikeComment = (commentId, articleId) => {
    const { DisLikeComment } = this.props;
    this.setState({ commentId });
    DisLikeComment(commentId, articleId);
  }

  render() {
    const {
      /* eslint-disable react/prop-types */
      Like, DisLike, commentID, comment, votes
    } = this.props;
    const {
      commentId, changeDisLikeColor, changeLikeColor
    } = this.state;
    const total = getTotalNumber(comment.votecomments);
    let allLike = total.totalLike;
    let allDisLike = total.totalDisLike;
    if (votes !== null && commentId !== null) {
      if (commentID === commentId) {
        if (Like || DisLike) allLike = Like; allDisLike = DisLike;
      }
    }

    return (
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
      <div className="favorite_posted_comment">
      <div className="g-favorite-comment" onClick={this.likeComment.bind(this, comment.id, comment.articleId)}>
      <i className={`icofont-heart ${changeLikeColor}`}></i>
      <span className="G-com-number">{allLike}</span>
      </div>
        <div className="g-favorite-comment" onClick={this.dislikeComment.bind(this, comment.id, comment.articleId)}>
        <i className={`icofont-ui-love-broken ${changeDisLikeColor}`}></i>
        <span className="G-com-number">{allDisLike}</span>
       </div>
        </div>
        <div className="reply_to_comment" />
      </div>
    </div>
  </div>
    );
  }
}
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  LikeComment: PropTypes.func.isRequired,
  Like: PropTypes.number.isRequired,
  DisLike: PropTypes.number.isRequired,
  DisLikeComment: PropTypes.func.isRequired,
  commentID: PropTypes.number.isRequired
};
const mapStateToProps = state => ({
  Like: state.comment.likeComment,
  DisLike: state.comment.dislikeComment,
  commentID: state.comment.commentID,
  votes: state.comment.votes
});
export default connect(mapStateToProps, { LikeComment, DisLikeComment })(CommentItem);
