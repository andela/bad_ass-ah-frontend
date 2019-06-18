import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Close } from '../../../assets/Images/icons/close.svg';

const backdrop = props => (
  props.show ? <div className='backdrop' onClick={props.onClick}>
    <Close className='backdrop__icon-close' onClick={props.onClick} />
  </div> : null
);

backdrop.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func
};

export default backdrop;
