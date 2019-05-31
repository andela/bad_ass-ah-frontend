import React, { Fragment } from 'react';
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
          </div>
        </div>
      </div>
    </footer>
  </Fragment>
);

export default Footer;
