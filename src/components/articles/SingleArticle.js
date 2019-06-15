/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpperCase from 'ucfirst';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import Hashids from 'hashids';
import { Link, Redirect } from 'react-router-dom';
import { likeArticle, dislikeArticle } from '../../actions/voteArticle';
import { singleArticle, deleteArticle } from '../../actions/article';
import Layout from '../layouts/Layout';
import NotFound from '../NotFound';
import Comment from '../comment/comments';
import Rating from './rating/Rating';
import { bookmarkArticle } from '../../actions/bookmarkArticle';
import { isAuthenticated } from '../../helpers/Config';
import { getComments } from '../../actions/comment/comment';
import { setReadingStats } from '../../actions';
import ShareArticle from './shareArticle/shareArticle';
import HighlightPopover from '../popovers/Highlight';
import CommentPopover from '../popovers/Comment';
import Alert from '../layouts/Alert';
import { highlightText, getUserHighlights } from '../../actions/highlight';
import { markHighlightedText } from '../../utils/markHighlightedText';
import { setLoginRedirectPath } from '../../actions/login';
import Spinner from '../layouts/Spinner';
import Report from './reporting/Report';
import followUser, { unfollowUser } from '../../actions/user/followUser';
import userDefaulAvatar from '../../assets/Images/icons/boy.svg';
import { getUserFollowing } from '../../actions/profile';

const hashids = new Hashids('', 10);

export class SingleArticle extends Component {
  state = {
    articleId: '',
    hasLikedClass: null,
    hasDilikedClass: null,
    hasbookmarkedClass: null,
    bookmarkArticle: null,
    articleId2: null,
    userId: '',
    prevPath: '',
    shareArticleUrl: '',
    indexStart: '',
    indexEnd: '',
    text: '',
    comment: '',
    handle: this.props.match.params.handle,
    redirectOnBookmark: false,
    displayFollowUserBox: false,
    redirectOnFollow: false
  };

  async componentWillMount() {
    // eslint-disable-next-line react/prop-types
    const {
      match: { params, url },
      getComments
    } = this.props;
    this.setState({ articleId2: params.handle });
    this.getArticle();
    const user = await isAuthenticated();
    this.setState({ userId: user.payload.id, shareArticleUrl: url }, () => {
      getComments(this.state.articleId2);
    });
    this.props.getUserFollowing();
  }

  getArticle = () => {
    const {
      match: { params },
      singleArticle,
      getUserHighlights
    } = this.props;
    this.setState({ articleId: params.handle });
    singleArticle(params.handle);
    getUserHighlights(params.handle);
  };

  async componentDidMount() {
    await this.getArticle();
    this.setReadingStats();

    // this.props.getComments(this.state.articleId2);
  }

  componentDidUpdate(prevProps) {
    const elements = document.getElementsByClassName('highlighted');
    const topScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (elements) {
      Array.from(elements).forEach((element) => {
        const rect = element.getBoundingClientRect();
        // eslint-disable-next-line no-param-reassign
        element.onclick = () => {
          const { highlights } = this.props;
          highlights.forEach((highlight) => {
            if (element.textContent === highlight.text) {
              const root = document.getElementsByClassName('App')[0];
              const div = document.createElement('div');
              div.className = 'highlight-comment';
              div.style.top = `${rect.top + topScroll}px`;
              div.style.left = `${rect.right}px`;
              div.innerHTML = ` <div class="title">
                                <div class="title-text">Comment</div>
                              </div>
                              <div class="comment">${highlight.comment}</div>`;
              root.appendChild(div);
              root.onmouseup = () => {
                div.classList.add('hide');
              };
            }
          });
        };
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { voteMessage } = nextProps.articles;
    // eslint-disable-next-line react/prop-types
    const { location } = nextProps;
    if (location !== undefined) {
      const path = location.state ? location.state.prevPath : '/';
      this.setState({ prevPath: path });
    }
    if (voteMessage === 'thanks for the support.') {
      this.setState({ hasLikedClass: 'changeColor', hasDilikedClass: null });
    }
    if (voteMessage === 'You have disliked this article.') {
      this.setState({ hasLikedClass: null, hasDilikedClass: 'changeColor' });
    }
  }

  setReadingStats = () => {
    if (this.props.isAuth) {
      this.props.setReadingStats(this.state.articleId2);
    }
  };

  likeArticle = async () => {
    const { articleId } = this.state;
    const { likeArticle } = this.props;
    await likeArticle(articleId);
    this.getArticle();
  };

  dislikeArticle = async () => {
    const { articleId } = this.state;
    const { dislikeArticle } = this.props;
    await dislikeArticle(articleId);
    this.getArticle();
  };

  bookmarks = async () => {
    if (this.props.isAuth) {
      const { articleId } = this.state;
      const { bookmarkArticle } = this.props;
      await bookmarkArticle(articleId);
      this.getArticle();
    } else {
      this.props.setLoginRedirectPath(window.location.pathname);
      this.setState({ redirectOnBookmark: true });
    }
  };

  onSelectedText = () => {
    const popup = document.getElementById('highlight-popup');
    document.onmouseup = () => {
      const selection = document.getSelection();
      const selectedText = selection.toString();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const topScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (selectedText.length) {
          popup.classList.remove('hide');
          popup.style.top = `${rect.top + topScroll - 80}px`;
          popup.style.left = `${rect.left}px`;

          this.setState({
            indexStart: selection.anchorOffset,
            indexEnd:
              selection.anchorOffset === 0
                ? selection.anchorOffset + selectedText.length - 1
                : selection.anchorOffset + selectedText.length,
            text: selectedText
          });
        } else {
          popup.classList.add('hide');
        }
      }
    };
  };

  onHighlight = () => {
    const popup = document.getElementById('highlight-popup');
    const comment = document.getElementById('comment-popover');
    const div = document.getElementsByClassName('G-showcase')[0];
    popup.classList.add('hide');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const topScroll = window.pageYOffset || document.documentElement.scrollTop;
    const newNode = document.createElement('span');
    newNode.style.background = 'aqua';
    range.surroundContents(newNode);
    comment.classList.remove('hide');
    comment.style.top = `${rect.top + topScroll}px`;
    comment.style.left = `${rect.right - 40}px`;

    div.onmouseup = () => {
      comment.classList.add('hide');
      newNode.style.background = '';
    };
  };

  onChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { highlightText } = this.props;

    highlightText(this.state);
    window.getSelection().removeAllRanges();
    this.setState({
      indexStart: '',
      indexEnd: '',
      text: '',
      comment: ''
    });
  };

  destroy = (id) => {
    const { deleteArticle } = this.props;
    this.setState({ startLoading: true });
    deleteArticle(id);
  };

  followAUser = (followee) => {
    const { userId } = this.state;
    userId === null && this.setState({ redirectOnFollow: true });
    const { followUser } = this.props;
    followUser(followee);
  };

  unfollowAUser = (unfollow) => {
    const { unfollowUser } = this.props;
    unfollowUser(unfollow);
  };

  render() {
    let single;
    let followees;
    let followDiv;
    const {
      prevPath,
      userId,
      articleId2,
      shareArticleUrl,
      redirectOnBookmark,
      displayFollowUserBox,
      redirectOnFollow
    } = this.state;
    const {
      articles: { article, error, message },
      highlights,
      profile,
      follow
    } = this.props;
    const { followers, following } = profile;
    const { followOneUser, unfollowOneUser } = follow;

    if (article !== null) if (article && article.article !== undefined) single = article.article;
    if (profile !== null) {
      if (following && following.following !== undefined) followees = following.following;
    }

    this.onSelectedText();

    let redirectOnBookmarkURL = null;
    if (redirectOnBookmark) {
      redirectOnBookmarkURL = <Redirect to="/auth" />;
    }
    let redirect = null;
    let followBox = null;
    if (redirectOnFollow) {
      redirect = <Redirect to="/auth" />;
    }

    if (single !== undefined) {
      followBox = (
        <div className="follow_box" onClick={this.followAUser.bind(this, single.author)}>
          follow
        </div>
      );
    }

    if (followOneUser !== null) {
      followBox = (
        <div className="unfollow_box" onClick={this.unfollowAUser.bind(this, single.author)}>
          unfollow
        </div>
      );
    }

    if (
      single !== undefined
      && followees !== undefined
      && followOneUser === null
      && unfollowOneUser === null
    ) {
      for (let i = 0; i < followees.length; i += 1) {
        if (followees[i].userId === single.author) {
          followBox = (
            <div className="unfollow_box" onClick={this.unfollowAUser.bind(this, single.author)}>
              unfollow
            </div>
          );
        }
      }
    }
    if (single !== undefined && single.author === userId) {
      followBox = null;
    }
    return (
      <Layout>
        {redirectOnBookmarkURL}
        {redirect}
        {message !== '' && window.location.replace(prevPath)}
        <HighlightPopover onHighlight={this.onHighlight} />
        <CommentPopover onChange={this.onChange} onSubmit={this.onSubmit} />
        <div className="G-showcase">
          <Fragment>
            {single !== undefined ? (
              <div className="G-create-article" data-test="G-create-article">
                <Alert />
                <div className="G-form-group">
                  <h1 className="G-storyTitle">{stringParser(htmlParser(UpperCase(single.title)))}</h1>
                   <div className="author_in_top">
                    <div className="author_avatar">
                      <img src={single.authorfkey.image || userDefaulAvatar} alt="" />
                    </div>
                    <div className="author_on_top_name">
                      <span>{single.authorfkey.username}</span>
                    </div>
                    {followBox}
                  </div>
                  <p className='reading-time'>reading time: {single.readingTime}</p>
                  {userId === single.authorfkey.id && (
                    <div className="drop-article singleDrop">
                      <Link to={`/story/edit/${hashids.encode(single.article_id)}`}>
                        <button type="button" data-test="Btn-remove">
                          {' '}
                          <span>Edit</span>
                          <i className="icofont-ui-edit editIcon" />
                        </button>
                      </Link>
                      <button
                        type="button"
                        data-test="G-deleteArticle"
                        onClick={this.destroy.bind(this, hashids.encode(single.article_id))}
                      >
                        <span>Delete</span>
                        <i className="icofont-ui-delete deleteIcon" />
                      </button>
                    </div>
                  )}
                </div>
                {single.image && (
                  <div className="G-form-group">
                    <div className="G-image-display">
                      <img src={single.image} alt="selected " />{' '}
                    </div>
                  </div>
                )}
                {single.taglist !== null && single.taglist.length !== 0 ? (
                  <div className="G-form-group">
                    {single.taglist
                      && single.taglist.map(tag => (
                        <div className="G-displayTag" key={Math.random()}>
                          <div className="G-tagName"> {tag} </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  ''
                )}
                <div className="G-form-group">
                  <div id="texteditor" name="body" className="G-singleEditor">
                    {highlights === null || highlights === undefined ? (
                      <Spinner />
                    ) : (
                      htmlParser(markHighlightedText(single.body, highlights))
                    )}
                  </div>
                </div>
                <div className="section__rating">
                  <Rating articleId={this.state.articleId2} />
                  <div className="C-like c-like-grid section__rating-like">
                    <div
                      id="like-btn"
                      className={`btn-heart ${this.state.hasLikedClass}`}
                      title="likes"
                      onClick={this.likeArticle}
                    >
                      {article.votes.hasLiked === true ? (
                        <i className="icofont-heart changeColor" />
                      ) : (
                        <i className="icofont-heart" />
                      )}
                      <div>{article.votes.likes}</div>
                    </div>
                    <div
                      id="dislike-btn"
                      className={`btn-heart ${this.state.hasDilikedClass}`}
                      title="dislikes"
                      onClick={this.dislikeArticle}
                    >
                      {article.votes.hasDisliked === true ? (
                        <i className="icofont-ui-love-broken changeColor" />
                      ) : (
                        <i className="icofont-ui-love-broken" />
                      )}
                      <div>{article.votes.dislikes}</div>
                    </div>
                    <div
                      id="bookmark-btn"
                      className={`btn-bookmark ${this.state.hasbookmarkedClass}`}
                      title="bookmark"
                      onClick={this.bookmarks}
                    >
                      {article.hasBookmarked === true ? (
                        <i class="icofont-book-mark changeColor" />
                      ) : (
                        <i class="icofont-book-mark" />
                      )}
                    </div>
                  </div>
                  <Report articleId={this.state.articleId2} />
                </div>
                <ShareArticle shareArticleUrl={shareArticleUrl} />
                <Comment articleId={articleId2} />
              </div>
            ) : (
              <center>
                {error && error.errors !== undefined && <NotFound error={error.errors.body[0]} />}
              </center>
            )}
          </Fragment>
        </div>
      </Layout>
    );
  }
}
export const mapStateToProps = state => ({
  articles: state.articles,
  isAuth: state.login.isAuthenticated,
  highlights: state.highlight.highlights,
  profile: state.profile,
  follow: state.follow
});
SingleArticle.propTypes = {
  singleArticle: PropTypes.func.isRequired,
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  getComments: PropTypes.func,
  setReadingStats: PropTypes.func.isRequired,
  highlightText: PropTypes.func,
  getUserHighlights: PropTypes.func,
  highlights: PropTypes.array,
  bookmarkArticle: PropTypes.func.isRequired,
  setLoginRedirectPath: PropTypes.func,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  profile: PropTypes.object.isRequired,
  follow: PropTypes.object.isRequired,
  getUserFollowing: PropTypes.func.isRequired
};
// eslint-disable-next-line max-len
export default connect(
  mapStateToProps,
  {
    singleArticle,
    likeArticle,
    dislikeArticle,
    deleteArticle,
    getComments,
    setReadingStats,
    highlightText,
    getUserHighlights,
    bookmarkArticle,
    setLoginRedirectPath,
    followUser,
    unfollowUser,
    getUserFollowing
  }
)(SingleArticle);
