// <Redirect to={this.props.loginRedirectPath} />
// Redirect,
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import * as actions from '../../../actions';
import * as validate from '../../../helpers/validate';

export class Login extends Component {
  state = {
    loginForm: {
      email: {
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        value: '',
        validation: {
          require: true,
          minimum: 3
        },
        valid: false,
        touched: false,
      }
    },
    isFormValid: false
  }

  checkValidity = (inputValue, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = !validate.isEmpty(inputValue) && isValid;
    }

    if (rules.minimum) {
      isValid = validate.hasMinimumLength(inputValue, rules.minimum) && isValid;
    }

    if (rules.isEmail) {
      isValid = validate.isEmail(inputValue) && isValid;
    }
    return isValid;
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value);
  }

  inputChangedHandler = (event, formInputName) => {
    const updatedLoginForm = { ...this.state.loginForm };
    const updatedElement = { ...updatedLoginForm[formInputName] };
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(
      event.target.value,
      this.state.loginForm[formInputName].validation
    );
    updatedElement.touched = true;
    updatedLoginForm[formInputName] = updatedElement;

    let isFormValid = true;
    const formInputNames = Object.keys(updatedLoginForm);
    for (let i = 0; i < formInputNames.length; i += 1) {
      const key = formInputNames[i];
      isFormValid = updatedLoginForm[key].valid && isFormValid;
    }
    this.setState({
      loginForm: updatedLoginForm,
      isFormValid
    });
  };

  render() {
    let loginRedirect = null;
    // eslint-disable-next-line max-len
    if (this.props.isAuthenticated) loginRedirect = window.location.replace(this.props.loginRedirectPath);

    return (
      <>
        {loginRedirect}
        <form onSubmit={this.submitHandler} id='login-form'>
          <div className={'form__group'}>
            <label className={'form__label'} htmlFor='email'>E-Mail Address</label>
            <Input
              inputClass={'form__input form__input-login'}
              placeholder={'Enter your email'}
              type='input'
              value={this.state.loginForm.email.value}
              shouldValidate={!!this.state.loginForm.email.validation}
              invalid={!this.state.loginForm.email.valid}
              touched={this.state.loginForm.email.touched}
              onChange={event => this.inputChangedHandler(event, 'email')}
            />
          </div>
          <div className={'form__group'}>
            <label className={'form__label'} htmlFor='password'>Enter your password</label>
            <Input
              inputClass={'form__input form__input-login'}
              placeholder={'Enter your password'}
              type='password'
              value={this.state.loginForm.password.value}
              shouldValidate={!!this.state.loginForm.password.validation}
              invalid={!this.state.loginForm.password.valid}
              touched={this.state.loginForm.password.touched}
              onChange={event => this.inputChangedHandler(event, 'password')}
            />
          </div>
          <div className='form__forget-password'>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <Button
            disabled={!this.state.isFormValid}
            btnClass={'btn btn--blue'}
          >Sign In</Button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.token !== null,
  loginRedirectPath: state.login.loginRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(actions.login(email, password))
});

Login.propTypes = {
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loginRedirectPath: PropTypes.string,
  onLogin: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
