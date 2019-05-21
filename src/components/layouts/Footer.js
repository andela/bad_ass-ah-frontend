<<<<<<< HEAD
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
=======
import React, { Fragment } from 'react';
>>>>>>> feature(articles):create read articles
import logo from '../../assets/Images/icons/world.svg';
import instagram from '../../assets/Images/icons/instagram.svg';
import twitter from '../../assets/Images/icons/twitter.svg';
import facebook from '../../assets/Images/icons/facebook.svg';

const Footer = () => (
  <Fragment>
    <footer>
      <div className="footer-menus">
        <img src={logo} alt="" className="footer-logo" />
        <div className="title">
          <h1>Authors Heaven</h1>
        </div>
        <div className="top-icon">
          <div className="img-icon">
<<<<<<< HEAD
            <Link to="https://www.instagram.com">
              <img src={instagram} alt="Instagram" />
            </Link>
          </div>
          <div className="img-icon">
            <Link to="https://www.twitter.com">
              <img src={twitter} alt="Twitter" />
            </Link>
          </div>
          <div className="img-icon">
            <Link to="https://www.facebook.com">
              <img src={facebook} alt="Facebook" />
            </Link>
=======
            <a href="#D" target="_blank">
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
          <div className="img-icon">
            <a href="#D" target="_blank">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
          <div className="img-icon">
            <a href="#D" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
>>>>>>> feature(articles):create read articles
          </div>
        </div>
      </div>
    </footer>
  </Fragment>
);

export default Footer;
