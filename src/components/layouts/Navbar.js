/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClickOutside from 'react-simple-click-outside';
import instagram from '../../assets/Images/icons/instagram.svg';
import twitter from '../../assets/Images/icons/twitter.svg';
import facebook from '../../assets/Images/icons/facebook.svg';
import logo from '../../assets/Images/icons/world.svg';
import user from '../../assets/Images/icons/boy.svg';
import search from '../../assets/Images/icons/search.svg';
import { getCurrentProfile } from '../../actions/profile';
import { getNotifications, readNotification } from '../../actions/notification';
import { loginCheckState } from '../../actions/login';
import { subscribe } from '../../actions/subscribtion';
import searching from '../../actions/search';
import SingleSearch from '../search/Search';

export class Navbar extends Component {
  state = {
    open: false,
    searchInput: null,
    searchItem: null,
    loading: false,
    openProfile: false,
    openNotifications: false,
    allowNotifications: false,
  };

  componentWillReceiveProps(nextProps) {
    const { searchAll } = nextProps;
    if (searchAll.search) {
      this.setState({ searchItem: searchAll.search, loading: true });
    }
    if (nextProps.profile) {
      const { profile } = nextProps;

      this.setState({
        allowNotifications: profile.allowNotifications
      });
    }
  }

  componentDidMount() {
    const {
      getCurrentProfile, getNotifications, loginCheckState
    } = this.props;
    loginCheckState();
    getCurrentProfile();
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

  onChange = (e) => {
    this.setState({ allowNotifications: e.target.checked });
    const { subscribe } = this.props;
    subscribe();
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hasRight');
    // eslint-disable-next-line react/prop-types
    window.history.pushState({ title: 'Authors Haven' }, 'Authors Haven', '/');
    window.location.reload(true);
  };

  searchData = (e) => {
    const data = e.target.value;
    this.setState({ searchInput: data });
    const { searching } = this.props;
    searching(data);
  }

  _close = () => {
    this.setState({ openProfile: false, openNotifications: false });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const {
      openProfile, openNotifications, allowNotifications
    } = this.state;
    const {
      notifications, readNotification, isAdmin, isAuthenticated, profile
    } = this.props;
    const dropdownHeight = notifications !== undefined
     && notifications !== null && notifications.length > 5
      ? 'dropdownHeight'
      : '';

    const {
      searchItem, searchInput
    } = this.state;
    const { display } = this.props;
    // @check if user if authenticatedd
    let displayRepotedArticlesLink = null;
    if (isAdmin === 'true' && isAuthenticated) {
      displayRepotedArticlesLink = (
        <li>
          <Link to="/reported/stories">Reported&nbsp;stories</Link>
        </li>
      );
    }

    let avatar = user;
    if (profile !== undefined && profile !== null) {
      if (profile.image !== null) avatar = profile.image;
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
          <div className="top-search" style={{ display }}>
            <div className="top-search-grid">
              <input type="text" name="search" placeholder="search"
              className="search-input" value={searchInput} data-test="Gsearch-input"
              onChange={this.searchData}/>
              <img src={search} alt="" className="search-icon" />
            </div>
          {searchItem && <SingleSearch item={searchItem} searchInput={searchInput}/>}
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
              {isAuthenticated ? (
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
                      src={avatar}
                      alt=""
                      className="headerIcon headerAvatar"
                      onClick={this.onProfileOpen}
                      data-test="openToggle"
                    />
                  </div>
                </div>
              ) : (
                <div class="auth-link">
                  <ul>
                    <li className="login">
                      <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                      <Link to="/register">Get started</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {openProfile && (
              <div className="toggleNavBar">
                   <ClickOutside close={this._close}>
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
                   </ClickOutside>
              </div>
            )}
            {openNotifications && (
              <div className={`toggleNavBar toggleNotification ${dropdownHeight}`}>
              <ClickOutside close={this._close}>
              <div className="notifications-opt">
                  <span className="label">
                    <i className="far fa-bell" />
                    <span>Notifications</span>
                  </span>
                  <label className="switch">
                    <input type="checkbox" checked={allowNotifications} onChange={this.onChange} />
                    <span className="switcher round" />
                    <div class="text" />
                  </label>
                </div>
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
              </ClickOutside>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  loginCheckState: PropTypes.func,
  isAdmin: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  readNotification: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  subscribe: PropTypes.func.isRequired,
  searching: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
  isAuthenticated: state.login.isAuthenticated,
  isAdmin: state.login.isAdmin,
  profile: state.profile.profile,
  searchAll: state.search
});

export default connect(
  mapStateToProps,
  {
    loginCheckState,
    getCurrentProfile,
    getNotifications,
    readNotification,
    subscribe,
    searching
  }
)(Navbar);
