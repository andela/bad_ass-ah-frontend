/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Layout from '../../layouts/Layout';
import defaultAvatar from '../../../assets/Images/avatar.svg';
import PageNotFound from '../../NotFound';
import './Followers.scss';
import Spinner from '../../layouts/Spinner';

class Followers extends Component {
  render() {
    const {
      profile: { profile, followers, following }
    } = this.props;
    let followersArray = null;
    let followersContent = (
      <div className="displayspinner">
        <Spinner />;
      </div>
    );
    if (followers !== {}) {
      followersArray = followers.followers;
      followersContent = followersArray !== undefined ? (
        followersArray.length > 0 ? (
          followersArray.map(myfollowers => (
              <div class="people-follower">
                <div class="follower-img">
                  <img
                    src={
                      myfollowers.followedFkey.image
                        ? myfollowers.followedFkey.image
                        : defaultAvatar
                    }
                    alt=""
                  />
                </div>
                <div class="follow-info">
                  <h3>{myfollowers.followedFkey.username}</h3>
                  <span>{myfollowers.followedFkey.email}</span>
                </div>
              </div>
          ))
        ) : (
            <center>
              <PageNotFound error="Sorry, currently you are not following any one" />
            </center>
        )
      ) : (
        followersContent
      );
    } else {
      followersContent = <Spinner />;
    }
    return (
      <Layout>
        <section class="profile-section">
          <div class="user-profile">
            <div class="user-infos">
              <div class="avatar">
                <img
                  src={profile !== null && profile.image !== null ? profile.image : defaultAvatar}
                  alt=""
                />
              </div>
              <div class="information">
                <h5> {profile !== null && profile.username}</h5>
                <h5>{profile !== null && profile.email}</h5>
                <div class="stars">
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                </div>
              </div>
              <div class="bio">{profile !== null && profile.bio}</div>
              <div class="usernumber-followers">
                <div>
                  <Link to="/profile/followers">
                    {followers !== null && followers.numberOfFollowers} Followers
                  </Link>
                </div>
                <div>
                  <Link to="/profile/following">
                    {following !== null && following.numberOfFollowing} Following
                  </Link>
                </div>
              </div>
            </div>
            <div class="user-articles">
              <div class="pro-article-title">Followers</div>
              <div class="user-blog">{followersContent}</div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

Followers.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Followers);
