import React from 'react';
import PropTypes from 'prop-types';

const button = props => (
  <button
    disabled={props.disabled}
    className={props.btnClass}
    onClick={props.onClick}
    type={props.buttonType}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.string
};

export default button;
