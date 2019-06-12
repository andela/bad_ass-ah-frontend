/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LikeComment, { DisLikeComment } from '../../actions/comment/voteComment';
import { singleArticle } from '../../actions/article';
import { getTotalNumber } from '../../helpers/Article';


const propType = {
  LikeComment: PropTypes.func.isRequired,
  DisLikeComment: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

class VoteComment extends Component {
  state = {
    changeDisLikeColor: null,
    changeLikeColor: null,
    loggedInUser: null,
    allLike: null,
    allDisLike: null
  }

  componentWillReceiveProps(props) {
    const {
      // eslint-disable-next-line react/prop-types
      userId, allVotes,
    } = props;
    if (userId && allVotes.length !== 0) {
      allVotes.map((data) => {
        if (data.userId === userId && data.like === true) {
          this.setState({ changeLikeColor: 'turnToRed', changeDisLikeColor: 'turnToBlack' });
        }
        if (data.userId === userId && data.dislike === true) {
          this.setState({ changeLikeColor: 'turnToBlack', changeDisLikeColor: 'turnToRed' });
        }
      });
    }
  }

  likeSingleComment = (commentId, articleId) => {
    const { LikeComment } = this.props;

    this.setState({ commentId });
    LikeComment(commentId, articleId);
  }

  dislikeSingleComment = (commentId, articleId) => {
    const { DisLikeComment } = this.props;
    this.setState({ commentId });
    DisLikeComment(commentId, articleId);
  }

  render() {
    const { changeDisLikeColor, changeLikeColor } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      allVotes, commentId, articleID, Like, DisLike, votes, commentID
    } = this.props;
    const total = getTotalNumber(allVotes);
    let allLike = total.totalLike;
    let allDisLike = total.totalDisLike;
    if (votes !== null && commentId !== null) {
      if (commentID === commentId) {
        allLike = Like; allDisLike = DisLike;
      }
    }
    return (
    <div className="favorite_posted_comment">
    <div className="g-favorite-comment" onClick={this.likeSingleComment.bind(this, commentId, articleID)}>
    <i className={`icofont-heart ${changeLikeColor}`}></i>
    <span className="G-com-number">{allLike}</span>
    </div>
    <div className="g-favorite-comment"
    onClick={this.dislikeSingleComment.bind(this, commentId, articleID)}>
    <i className={`icofont-ui-love-broken ${changeDisLikeColor}`}></i>
    <span className="G-com-number">{allDisLike}</span>
    </div>
    </div>
    );
  }
}

VoteComment.propTypes = propType;

const mapStateToProps = state => ({
  Like: state.comment.likeComment,
  DisLike: state.comment.dislikeComment,
  commentID: state.comment.commentID,
  votes: state.comment.votes,
  single: state.articles.article
});

export default connect(mapStateToProps,
  { LikeComment, DisLikeComment, singleArticle })(VoteComment);

/**
 *    const total = getTotalNumber(comment.votecomments);
    let allLike = total.totalLike;
    let allDisLike = total.totalDisLike;
    if (votes !== null && commentId !== null) {
      if (commentID === commentId) {
        if (Like || DisLike) allLike = Like; allDisLike = DisLike;
      }
    }
 */
/*
    const {
      Like, DisLike, commentID, comment, votes
    } = this.props;
 */
/*
  static async getDerivedStateFromProps(nextProps, prevState) {
    const { comment, votes } = nextProps;
    const user = await isAuthenticated();
    if (user) {
      console.log(comment);
      if (votes) {
        comment.votecomments.map((data) => {
          if (votes.hasDisLiked && user.payload.id === data.userId) {
            prevState.changeLikeColor = 'turnToBlack';
            prevState.changeDisLikeColor = 'turnToRed';
          }
          if (votes.hasLiked && user.payload.id === data.userId) {
            prevState.changeLikeColor = 'turnToRed';
            prevState.changeDisLikeColor = 'turnToBlack';
          }
        });
      }
    }
  }
*/
