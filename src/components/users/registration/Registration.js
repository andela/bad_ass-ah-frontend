import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, closeSucessPopUp } from '../../../actions/registration';
import Loading from '../../layouts/Loading';
import SuccessPopUp from './Popup';
import Button from '../../common/button/Button';

export class Signup extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

 validate = () => {
   let isError = false;
   const {
     username,
     email,
     password
   } = this.state;
   if (username.length === 0) {
     isError = true;
     const { state } = this;
     state.usernameError = 'Input username is required';
     this.setState(prevState => ({
       state: prevState.state
     }));
   }
   if (email.indexOf('@') === -1) {
     isError = true;
     const { state } = this;
     state.emailError = 'Email input is required';
     this.setState(prevState => ({
       state: prevState.state
     }));
   }
   if (password.length === 0) {
     isError = true;
     const { state } = this;
     state.passwordError = 'Password input is required';
     this.setState(prevState => ({
       state: prevState.state
     }));
   }
   return isError;
 }

  handleSubmit=(e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      const { username, email, password } = this.state;
      const data = {
        username,
        email,
        password
      };
      const { registerUser } = this.props;
      registerUser(data);
    }
  }

  handleInput= (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, email, password } = this.state;
    const {
      errors,
      loading,
      successRegisterPopUp,
    } = this.props;
    const {
      usernameError,
      passwordError,
      emailError,
    } = this.state;
    return (
      <Fragment>
        <Loading loading={loading} message="" />
        {successRegisterPopUp ? <SuccessPopUp /> : ''}
        { errors !== undefined && <span className="form__error">{errors.error}</span>}
        <div className="clear" />
        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields" autoComplete="off">
            <div className="form__group">
              <label className="form__label" htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                className="form__input form__input-login"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={this.handleInput}
              />
              <div className="form__error form__error--input">{usernameError}</div>

            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">E-Mail Address</label>
              <input
                type="email"
                id="email"
                className="form__input form__input-login"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              <div className="form__error form__error--input">{emailError}</div>

            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form__input form__input-login"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={this.handleInput}
              />
              <div className="form__error form__error--input">{passwordError}</div>
            </div>
            <Button
            disabled={false}
            btnClass={'btn btn--blue'}
          >Register</Button>
          </form>
        </div>
      </Fragment>
    );
  }
}

Signup.propTypes = {
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  registerUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  successRegisterPopUp: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errors: state.register.errors,
  signupForm: state.register.signupForm,
  loading: state.register.loading,
  successRegisterPopUp: state.register.successRegisterPopUp
});

export default connect(mapStateToProps, { registerUser, closeSucessPopUp })(Signup);
