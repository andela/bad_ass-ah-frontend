/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Hashid from 'hashids';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import StringParser from 'react-to-string';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import avatar from '../../../assets/Images/avatar.svg';
import { ReactComponent as Study } from '../../../assets/Images/icons/study.svg';
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
import spinner from '../../../assets/Images/spinner.gif';
import Alert from '../../layouts/Alert';

const hashids = new Hashid('', 10);
export class ViewProfile extends Component {
  state = {
    startLoading: false
  };

  componentDidMount() {
    const {
      getCurrentProfile,
      getUserFollowers,
      getUserFollowing,
      getUserArticles,
      getReadingStats
    } = this.props;
    getCurrentProfile();
    getUserFollowers();
    getUserFollowing();
    getUserArticles();
    getReadingStats();
  }

  destroy = (id) => {
    const { deleteArticle } = this.props;
    this.setState({ startLoading: true });
    deleteArticle(id);
  };

  render() {
    let successMessage;
    const {
      loading,
      profile,
      followers,
      following,
      articles,
      message,
      readingStats,
      errorGetReadingStats
    } = this.props;
    const { startLoading } = this.state;
    if (message !== '') {
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }

    let displayReadingStats = null;

    if (errorGetReadingStats === null && readingStats > 0) {
      displayReadingStats = (
        <div className="reading-stats">
          <div className="reading-stats__icon">
            <Study className="reading-stats__icon-study" />
            <span className="reading-stats__icon-tooltip">Articles I read</span>
          </div>
          <span className="reading-stats__total-number">{readingStats}</span>
          <span className="reading-stats__description">
            {readingStats === 1 ? 'article' : 'articles'}
          </span>
        </div>
      );
    }

    return (
      <Layout>
        {loading === true || profile === null || articles === undefined || articles === null ? (
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
                  <div className="pro-article-title">My Articles</div>
                  <div className="user-blogs">
                    {articles !== undefined
                      && articles !== null
                      && articles.length > 0
                      && articles.map((article, index) => (
                        <div key={index} className="blogs-article">
                          <div className="blogs-avatar-info">
                            <div className="blog-avatar">
                              <img src={profile.image === null ? avatar : profile.image} alt="" />
                            </div>
                            <div className="blog-info">
                              <span>{profile.username}</span>
                              <span>
                                created on <Moment date={article.createdAt} format="D MMM YYYY" />
                              </span>
                            </div>
                            <div className="drop-article">
                              <Link
                                to={{
                                  pathname: `/story/edit/${hashids.encode(article.article_id)}`,
                                  state: { prevPath: window.location.pathname }
                                }}
                              >
                                <button type="button" data-test="Btn-remove">
                                  {' '}
                                  <span>Edit</span>
                                  <i class="icofont-ui-edit editIcon" />
                                </button>
                              </Link>
                              <button
                                type="button"
                                onClick={this.destroy.bind(
                                  this,
                                  hashids.encode(article.article_id)
                                )}
                              >
                                {' '}
                                <span>Delete</span>
                                <i class="icofont-ui-delete deleteIcon" />
                              </button>
                            </div>
                          </div>
                          <div className="blogs-descriptive">
                            {article.image === null ? (
                              ''
                            ) : (
                              <div className="desc-image">
                                <img src={article.image} alt="article1" />
                              </div>
                            )}
                            <div className="desc-articles">
                              <div className="desc-articles-titles">
                                <Link
                                  to={{
                                    pathname: `/story/${hashids.encode(article.article_id)}`,
                                    state: { prevPath: window.location.pathname }
                                  }}
                                >
                                  <h1>{StringParser(Parser(article.body)).substring(0, 70)}</h1>
                                  <div>
                                    <p>{StringParser(Parser(article.body)).substring(0, 90)}</p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="user-infos">
                  <div className="avatar">
                    <img src={profile.image === null ? avatar : profile.image} alt="" />
                  </div>
                  <div className="information">
                    <h5>{profile.username}</h5>
                    <h5>{profile.email}</h5>
                    {displayReadingStats}
                  </div>
                  <div className="bio">{profile.bio}</div>
                  <div className="usernumber-followers">
                    <div>
                      <Link to="/profile/followers">
                        {followers.numberOfFollowers}{' '}
                        {followers.numberOfFollowers === 1 ? 'Follower' : 'Followers'}
                      </Link>
                    </div>
                    <div>
                      <Link to="/profile/following">{following.numberOfFollowing} Following</Link>
                    </div>
                    <div>
                      <Link to="/bookmark">My bookmarks</Link>
                    </div>
                  </div>
                  <Link to="/edit-profile" className="edit-profile-link">
                    <i className="far fa-edit" />
                    Edit profile
                  </Link>
                </div>
                {/* <Link to="/edit-profile" className="edit-profile-link">
                    <i className="far fa-edit" />
                    Edit profile
                  </Link> */}
              </div>
            </section>
          </Fragment>
        )}
      </Layout>
    );
  }
}

ViewProfile.propTypes = {
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
  errorGetReadingStats: PropTypes.string
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  followers: state.profile.followers,
  following: state.profile.following,
  articles: state.profile.articles.articles,
  message: state.articles.message,
  errorGetReadingStats: state.readingStats.errorGetReadingStats,
  readingStats: state.readingStats.readingStats
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getUserFollowers,
    getUserFollowing,
    getUserArticles,
    deleteArticle,
    getReadingStats
  }
)(ViewProfile);
