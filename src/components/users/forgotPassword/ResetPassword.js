/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { resetPassword } from '../../../actions/resetPassword';
import { setAlert } from '../../../actions/alert';
import Alert from '../../layouts/Alert';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';

export class ResetPassword extends Component {
  state = {
    password: '',
    password2: ''
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    const { password, password2 } = this.state;
    const { setAlert, resetPassword, match } = this.props;
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      const { token } = match.params;
      resetPassword(token, password);
    }
  };

  render() {
    const { isChanged } = this.props;
    const { password, password2 } = this.state;

    if (isChanged) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Navbar />
        <div className="password-container">
          <div className="password-content">
            <Alert />
            <form onSubmit={this.onSubmit} id="reset-password-form">
              <h2 className="password-title">New Password</h2>
              <Input
                type="password"
                name="password"
                value={password}
                className="password-input"
                onChange={this.onChange}
                placeholder="Password"
                required
              />
              <Input
                type="password"
                name="password2"
                value={password2}
                className="password-input"
                onChange={this.onChange}
                placeholder="Confirm Password"
                required
              />
              <Button id="reset-password-btn" value="Change Password" className="password-btn" />
            </form>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  isChanged: PropTypes.bool
};

const mapStateToProps = state => ({
  isChanged: state.resetPassword.isChanged
});

export default connect(
  mapStateToProps,
  { setAlert, resetPassword }
)(ResetPassword);
