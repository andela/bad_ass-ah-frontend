import React from 'react';
import PropTypes from 'prop-types';

const input = (props) => {
  let { inputClass } = props;

  if (props.invalid && props.touched && props.shouldValidate) {
    // Add "invalid" css class for invalidity
    inputClass += ' form__input-login--invalid';
  }

  const inputElement = <input
    className={inputClass}
    placeholder={props.placeholder}
    type={props.type}
    value={props.value}
    onChange={props.onChange} />;

  return inputElement;
};

input.propTypes = {
  inputClasses: PropTypes.array,
  elementType: PropTypes.string,
  elementConfig: PropTypes.object,
  shouldValidate: PropTypes.bool,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  onChange: PropTypes.func,
  classForInputLabelDiv: PropTypes.string
};

export default input;
