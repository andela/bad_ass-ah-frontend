/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
/** this is return bookmarks */

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Hashid from 'hashids';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import StringParser from 'react-to-string';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import avatar from '../../../assets/Images/avatar.svg';
import Loading from '../../layouts/Loading';
import Layout from '../../layouts/Layout';
import {
  getCurrentProfile,
  getUserFollowers,
  getUserFollowing,
  getUserArticles
} from '../../../actions/profile';
import { getReadingStats } from '../../../actions';
import { deleteArticle } from '../../../actions/article';
import { fetchBookmarks, unBookmark } from '../../../actions/bookmarkArticle';
import spinner from '../../../assets/Images/spinner.gif';
import Alert from '../../layouts/Alert';

const hashids = new Hashid('', 10);
export class ViewBookmark extends Component {
  state = {
    startLoading: false
  };

  componentDidMount() {
    const {
      getCurrentProfile,
      getUserFollowers,
      getUserFollowing,
      getUserArticles,
      getReadingStats,
      fetchBookmarks
    } = this.props;
    getCurrentProfile();
    getUserFollowers();
    getUserFollowing();
    getUserArticles();
    getReadingStats();
    fetchBookmarks();
  }

  onUnbookmark = (id, bookmarkId) => {
    const { unBookmark } = this.props;
    unBookmark(id, bookmarkId);
  };

  render() {
    let successMessage;
    const { message, getBookmarks, loading } = this.props;
    const { startLoading } = this.state;
    if (message !== '') {
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }
    return (
      <Layout>
        {loading === true ? (
          <section className="profile-section">
            <div className="loadingSpinner">
              <img src={spinner} alt="spinner" />
            </div>
          </section>
        ) : (
          <Fragment>
            <Loading loading={startLoading} message={successMessage} />
            <section className="profile-section">
              <Alert />
              <div className="user-profile">
                <div className="user-articles">
                  <div className="pro-article-title">My bookmarks</div>
                  {getBookmarks === null || getBookmarks.length === 0 ? (
                    <div className="user-blogs no-bookmarks">
                      <h3>No Bookmarked article found.</h3>
                    </div>
                  ) : (
                    <div className="user-blogs">
                      {getBookmarks !== undefined
                        && getBookmarks !== null
                        && getBookmarks.length > 0
                        && getBookmarks.map((article, index) => (
                          <div key={index} className="blogs-article">
                            <div className="blogs-avatar-info">
                              <div className="blog-avatar">
                                <img
                                  src={
                                    article.article.authorfkey.image === null
                                      ? avatar
                                      : article.article.authorfkey.image
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="blog-info">
                                <span>{article.article.authorfkey.username}</span>
                                <span>
                                  created on{' '}
                                  <Moment date={article.article.createdAt} format="D MMM YYYY" />
                                </span>
                              </div>
                              <div className="drop-article">
                                <button
                                  type="button"
                                  onClick={this.onUnbookmark.bind(
                                    this,
                                    hashids.encode(article.article.article_id),
                                    article.id
                                  )}
                                >
                                  {' '}
                                  <span>Unbookmark</span>
                                  <i class="icofont-book-mark" />
                                </button>
                              </div>
                            </div>
                            <div className="blogs-descriptive">
                              {article.article.image === null ? (
                                ''
                              ) : (
                                <div className="desc-image">
                                  <img src={article.article.image} alt="article1" />
                                </div>
                              )}
                              <div className="desc-articles">
                                <div className="desc-articles-titles">
                                  <Link
                                    to={{
                                      pathname: `/story/${hashids.encode(
                                        article.article.article_id
                                      )}`,
                                      state: { prevPath: window.location.pathname }
                                    }}
                                  >
                                    <h1>
                                      {StringParser(Parser(article.article.title)).substring(0, 70)}
                                    </h1>
                                    <div>
                                      <p>
                                        {StringParser(Parser(article.article.body)).substring(
                                          0,
                                          90
                                        )}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Fragment>
        )}
      </Layout>
    );
  }
}

ViewBookmark.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserFollowers: PropTypes.func.isRequired,
  getUserFollowing: PropTypes.func.isRequired,
  getUserArticles: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool,
  followers: PropTypes.object,
  following: PropTypes.object,
  articles: PropTypes.array,
  deleteArticle: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  getReadingStats: PropTypes.func.isRequired,
  readingStats: PropTypes.number,
  errorGetReadingStats: PropTypes.string,
  fetchBookmarks: PropTypes.func,
  unBookmark: PropTypes.func,
  getBookmarks: PropTypes.func
};

export const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.getBookmarks.loading,
  followers: state.profile.followers,
  following: state.profile.following,
  articles: state.profile.articles.articles,
  message: state.articles.message,
  errorGetReadingStats: state.readingStats.errorGetReadingStats,
  readingStats: state.readingStats.readingStats,
  getBookmarks: state.getBookmarks.bookmark
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getUserFollowers,
    getUserFollowing,
    getUserArticles,
    deleteArticle,
    getReadingStats,
    fetchBookmarks,
    unBookmark
  }
)(ViewBookmark);
