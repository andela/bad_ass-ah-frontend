/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import instagram from '../../assets/Images/icons/instagram.svg';
import twitter from '../../assets/Images/icons/twitter.svg';
import facebook from '../../assets/Images/icons/facebook.svg';
import logo from '../../assets/Images/icons/world.svg';
import user from '../../assets/Images/icons/boy.svg';
import search from '../../assets/Images/icons/search.svg';
import { getNotifications, readNotification } from '../../actions/notification';
import { loginCheckState } from '../../actions/login';

export class Navbar extends Component {
  state = {
    openProfile: false,
    openNotifications: false
  };

  componentDidMount() {
    const { getNotifications } = this.props;
    this.props.loginCheckState();
    getNotifications();
  }

  onProfileOpen = () => {
    this.setState(prevState => ({
      openProfile: !prevState.openProfile
    }));
  };

  onNotificationsOpen = () => {
    this.setState(prevState => ({
      openNotifications: !prevState.openNotifications
    }));
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hasRight');
    // eslint-disable-next-line react/prop-types
    window.history.pushState({ title: 'Authors Haven' }, 'Authors Haven', '/');
    window.location.reload(true);
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { openProfile, openNotifications } = this.state;
    const {
      notifications, readNotification, isAdmin, isAuthenticated
    } = this.props;
    const dropdownHeight = notifications !== undefined
      && notifications !== null && notifications.length > 5
      ? 'dropdownHeight'
      : '';
    // @check if user if authenticatedd

    let displayRepotedArticlesLink = null;
    if (isAdmin === 'true' && isAuthenticated) {
      displayRepotedArticlesLink = <li>
        <Link to="/reported/stories">Reported&nbsp;stories</Link>
      </li>;
    }

    return (
      <header>
        <div className="top-header">
          <div className="top-icon">
            <div className="img-icon">
              <img src={instagram} alt="instagram" />
            </div>
            <div className="img-icon">
              <img src={twitter} alt="Twitter" />
            </div>
            <div className="img-icon">
              <img src={facebook} alt="Facebook" />
            </div>
          </div>
          <div className="top-search">
            <div className="top-search-grid">
              <input type="text" name="search" placeholder="search" className="search-input" />
              <img src={search} alt="" className="search-icon" />
            </div>
          </div>
        </div>
        <div className="top-menu-section">
          <div className="logo">
            <img src={logo} alt="Authors' Heaven" />
          </div>
          <div className="top-menus">
            <div className="title">
              <h1>Authors Haven</h1>
            </div>
            <div className="navigation">
              <ul>
                <li>
                  {' '}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Tech</Link>
                </li>
                <li>
                  <Link to="/">Entertainment</Link>
                </li>
                <li>
                  <Link to="/">Design</Link>
                </li>
                <li>
                  <Link to="/">Health</Link>
                </li>
                <li>
                  <Link to="/">Business</Link>
                </li>
                {displayRepotedArticlesLink}
              </ul>
              <div className="auth-link">
                <div
                  className="auth-path notification-badge"
                  onClick={this.onNotificationsOpen}
                  data-test="openNotificationToggle"
                >
                  <i className="fas fa-bell" />
                  {notifications !== undefined
                    && notifications !== null
                    && notifications.length > 0 && <span>{notifications.length}</span>}
                </div>
                <div className="auth-path" title="profile">
                  <img
                    src={user}
                    alt=""
                    className="headerIcon headerAvatar"
                    onClick={this.onProfileOpen}
                    data-test="openToggle"
                  />
                </div>
              </div>
            </div>
            {openProfile && (
              <div className="toggleNavBar">
                {localStorage.getItem('token') ? (
                  <ul>
                    <li>
                      <Link to="/story/new-story">
                        <i className="icofont-artichoke" />
                        New Article
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="icofont-brand-appstore" />
                        Articles
                      </Link>
                    </li>
                    <li>
                      <Link to="/view-profile">
                        <i className="icofont-ui-user" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="icofont-settings" />
                        Settings
                      </Link>
                    </li>
                    <li onClick={this.logout} data-test="logout" className="logout">
                      <Link to="/">
                        <i className="icofont-logout" />
                        Logout
                      </Link>
                    </li>
                  </ul>
                ) : (
                    <ul>
                      <li>
                        <Link to="/auth">
                          <i className="icofont-sign-in" />
                          SignIn
                      </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          <i className="icofont-sign-out" />
                          SignUp
                      </Link>
                      </li>
                      <li>
                        <Link to="/forgot-password">
                          <i className="icofont-ui-password" />
                          Forgot password
                      </Link>
                      </li>
                    </ul>
                )}
              </div>
            )}
            {openNotifications && (
              <div className={`toggleNavBar toggleNotification ${dropdownHeight}`}>
                <ul>
                  {notifications !== undefined
                    && notifications !== null
                    && notifications.length > 0
                    && notifications.map(notification => (
                      <li
                        id="one-not"
                        key={notification.id}
                        onClick={() => readNotification(notification.id)}
                      >
                        <i className="fas fa-comments" />
                        <span>{notification.message}</span>
                      </li>
                    ))}
                  {notifications !== undefined
                    && notifications !== null
                    && notifications.length === 0 && (
                      <li className="no-notification">No notification</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  readNotification: PropTypes.func,
  loginCheckState: PropTypes.func,
  isAdmin: PropTypes.string,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
  isAuthenticated: state.login.isAuthenticated,
  isAdmin: state.login.isAdmin
});

export default connect(
  mapStateToProps,
  { getNotifications, readNotification, loginCheckState }
)(Navbar);
