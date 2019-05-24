import React from 'react';
import PropTypes from 'prop-types';
import NofoundIcon from '../assets/Images/icons/noFound.svg';

const NotFound = ({ error }) => (
  <div className="G-notFound">
    <img src={NofoundIcon} alt="not found" />
    <h5>{error}</h5>
  </div>
);
NotFound.propTypes = {
  error: PropTypes.string.isRequired
};
export default NotFound;
