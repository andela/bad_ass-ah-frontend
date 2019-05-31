/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import instagram from '../../assets/Images/icons/instagram.svg';
import twitter from '../../assets/Images/icons/twitter.svg';
import facebook from '../../assets/Images/icons/facebook.svg';
import logo from '../../assets/Images/icons/world.svg';
import notification from '../../assets/Images/icons/notification.svg';
import user from '../../assets/Images/icons/boy.svg';
import search from '../../assets/Images/icons/search.svg';

class Navbar extends Component {
  state={
    open: false
  }

 OnOpen = () => {
   this.setState(prevState => ({
     open: !prevState.open
   }));
 }

 logout = () => {
   localStorage.removeItem('token');
 }

 // eslint-disable-next-line class-methods-use-this
 render() {
   const { open } = this.state;
   // @check if user if authenticated
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
              <h1>Authors Heaven</h1>
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
              </ul>
              <div className="auth-link">
                <div className="auth-path" title="notification">
                  <img
                    src={notification}
                    alt=""
                    className="headerIcon"
                  />
                </div>
                <div className="auth-path" title="profile">
                  <img
                    src={user}
                    alt=""
                    className="headerIcon headerAvatar"
                    onClick= {this.OnOpen}
                    data-test= "openToggle"
                  />
                </div>
              </div>
            </div>
            {open && <div className="toggleNavBar">

                {localStorage.getItem('token') ? <ul><li><Link to="/story/new-story"><i className="icofont-artichoke"></i>New Article</Link></li>
                <li><Link to="/"><i className="icofont-brand-appstore"></i>Articles</Link></li>
                <li><Link to="/"><i className="icofont-ui-user"></i>My Profile</Link></li>
                <li><Link to="/"><i className="icofont-settings"></i>Settings</Link></li>
                <li onClick={ this.logout } data-test="logout" className="logout"><Link to="/"><i className="icofont-logout"></i>Logout</Link></li></ul>
                  : <ul><li><Link to="/login"><i className="icofont-sign-in"></i>SignIn</Link></li>
                <li><Link to="/register"><i className="icofont-sign-out"></i>SignUp</Link></li>
                <li><Link to="/forgot-password"><i className="icofont-ui-password"></i>Forgot password</Link></li></ul> }
            </div>}
          </div>
        </div>
      </header>
   );
 }
}

export default Navbar;
