/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  value, className, id, onClick
}) => <input type="submit" id={id} value={value} onClick={onClick} className={className} />;

Button.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Button;
