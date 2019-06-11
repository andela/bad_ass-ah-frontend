/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import avatar from '../../../assets/Images/avatar.svg';
import {
  getCurrentProfile,
  getUserFollowers,
  getUserFollowing,
  getUserArticles
} from '../../../actions/profile';
import Spinner from '../../layouts/Spinner';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import Alert from '../../layouts/Alert';

export class ViewProfile extends Component {
  componentDidMount() {
    const {
      getCurrentProfile, getUserFollowers, getUserFollowing, getUserArticles
    } = this.props;
    getCurrentProfile();
    getUserFollowers();
    getUserFollowing();
    getUserArticles();
  }

  render() {
    const {
      loading, profile, followers, following, articles
    } = this.props;
    return (
      <Fragment>
        <Navbar />
        {loading === true || profile === null ? (
          <section className="profile-section">
            <Spinner />
          </section>
        ) : (
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
                              created on
                              {' '}
                              <Moment date={article.createdAt} format="D MMM YYYY" />
                            </span>
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
                              <Link to="/">
                                <h1>{article.title}</h1>
                                <div>
                                  <p>{article.body}</p>
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
                  <div className="stars">
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                  </div>
                </div>
                <div className="bio">{profile.bio}</div>
                <div className="usernumber-followers">
                  <div>
                    <Link to="/profile/followers">
                      {followers.numberOfFollowers}
                      {' '}
                      {followers.numberOfFollowers === 1 ? 'Follower' : 'Followers'}
                    </Link>
                  </div>
                  <div>
                    <Link to="/profile/following">
                      {following.numberOfFollowing}
                      {' '}
Following
                    </Link>
                  </div>
                </div>
                <Link to="/edit-profile" className="edit-profile-link">
                  <i className="far fa-edit" />
                  Edit profile
                </Link>
              </div>
            </div>
          </section>
        )}
        <Footer />
      </Fragment>
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
  articles: PropTypes.array
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  followers: state.profile.followers,
  following: state.profile.following,
  articles: state.profile.articles.articles
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getUserFollowers,
    getUserFollowing,
    getUserArticles
  }
)(ViewProfile);
