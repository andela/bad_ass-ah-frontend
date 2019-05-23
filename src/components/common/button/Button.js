import React from 'react';
import PropTypes from 'prop-types';

const button = props => (
  <button
    disabled={props.disabled}
    className={props.btnClass}
    onClick={props.clicked}
    type={props.buttonType}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.string
};

export default button;
