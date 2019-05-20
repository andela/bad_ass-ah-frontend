/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import instagram from '../../assets/Images/icons/instagram.svg';
import twitter from '../../assets/Images/icons/twitter.svg';
import facebook from '../../assets/Images/icons/facebook.svg';
import logo from '../../assets/Images/icons/world.svg';
import notification from '../../assets/Images/icons/notification.svg';
import user from '../../assets/Images/icons/user.svg';
import search from '../../assets/Images/icons/search.svg';

const Navbar = () => (
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
            <li className="auth-link">
              <Link to="/" title="notification">
                <img src={notification} alt="" className="headerIcon" />
              </Link>
              <Link to="/">
                <img src={user} alt="" className="headerIcon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
