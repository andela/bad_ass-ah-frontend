/* eslint-disable react/require-default-props */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, name, id, placeholder, className, value, onChange
}) => (
  <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    className={className}
    value={value}
    onChange={onChange}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
