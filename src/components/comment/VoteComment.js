/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LikeComment, { DisLikeComment, singleComment } from '../../actions/comment/voteComment';
import { singleArticle } from '../../actions/article';
import { getTotalNumber } from '../../helpers/Article';
import { isAuthenticated } from '../../helpers/Config';


const propType = {
  LikeComment: PropTypes.func.isRequired,
  DisLikeComment: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  singleComment: PropTypes.func.isRequired
};

export class VoteComment extends Component {
  state = {
    changeDisLikeColor: null,
    changeLikeColor: null,
    loggedInUser: null,
    allLike: null,
    allDisLike: null
  }

  componentWillReceiveProps(nextProps) {
    const {
      // eslint-disable-next-line react/prop-types
      userId, votes, commentId
    } = nextProps;
    if (votes) {
      // console.log('props', commentId);
      if (votes.hasLiked && userId === votes.userId && commentId === votes.comment.commentId) {
        this.setState({ changeLikeColor: 'turnToRed', changeDisLikeColor: 'turnToBlack' });
      }
      // eslint-disable-next-line radix
      if (votes.hasDisLiked && userId === votes.userId && commentId === parseInt(votes.commentId)) {
        this.setState({ changeLikeColor: 'turnToBlack', changeDisLikeColor: 'turnToRed' });
      }
    }
  }

  async componentDidMount() {
    const user = await isAuthenticated();
    const {
      // eslint-disable-next-line react/prop-types
      allVotes
    } = this.props;

    if (user.payload.id && allVotes) {
      allVotes.map((data) => {
        // console.log(data);
        if (data.userId === user.payload.id && data.like) {
          this.setState({ changeLikeColor: 'turnToRed', changeDisLikeColor: 'turnToBlack' });
        }
        if (data.userId === user.payload.id && data.dislike) {
          this.setState({ changeLikeColor: 'turnToBlack', changeDisLikeColor: 'turnToRed' });
        }
      });
    }
  }

  likeSingleComment = (commentId, articleId) => {
    const { LikeComment } = this.props;

    this.setState({ commentId });
    LikeComment(commentId, articleId);
    singleComment(commentId, articleId);
  }

  dislikeSingleComment = (commentId, articleId) => {
    const { DisLikeComment } = this.props;
    this.setState({ commentId });
    DisLikeComment(commentId, articleId);
    singleComment(commentId, articleId);
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
    <div className="g-favorite-comment" data-test="like-comment"
    onClick={this.likeSingleComment.bind(this, commentId, articleID)}>
    <i className={`icofont-heart ${changeLikeColor}`}></i>
    <span className="G-com-number">{allLike}</span>
    </div>
    <div className="g-favorite-comment" data-test="dislike-comment"
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
  {
    LikeComment, DisLikeComment, singleArticle, singleComment
  })(VoteComment);
