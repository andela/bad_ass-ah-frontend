import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, closeSucessPopUp } from '../../actions/userActions';
import Loading from '../layouts/Loading';
import SuccessPopUp from './SuccessPopUP';

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
   //  const signupErrors = {};
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
        { errors !== undefined && <span className="C-validationError">{errors.error}</span>}
        <div className="clear" />
        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields" autoComplete="off">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                className="FormField__Input"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={this.handleInput}
              />
              <div className="C-errors">{usernameError}</div>

            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              <div className="C-errors">{emailError}</div>

            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={this.handleInput}
              />
              <div className="C-errors">{passwordError}</div>
            </div>
            <div className="FormField">
              <button className="FormField__Button mr-20" type="submit">Sign Up</button>
              <a href="/login" className="FormField__Link">I already have an account</a>
              <div className="hide" id="message" />
            </div>
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

const mapStateToProps = ({
  signup: {
    errors,
    signupForm,
    loading,
    successRegisterPopUp
  }
}) => ({
  errors,
  signupForm,
  loading,
  successRegisterPopUp
});

export default connect(mapStateToProps, { registerUser, closeSucessPopUp })(Signup);
