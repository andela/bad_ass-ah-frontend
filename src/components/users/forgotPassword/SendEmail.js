/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { sendEmail } from '../../../actions/resetPassword';
import Alert from '../../layouts/Alert';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';

export class SendEmail extends Component {
  state = {
    email: ''
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { sendEmail } = this.props;
    await sendEmail(email);
    this.setState({ email: '' });
  };

  render() {
    const { email } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className="password-container">
          <div className="password-content">
            <Alert />
            <form onSubmit={this.onSubmit} id="send-email-form">
              <h2 className="password-title">Reset Your Password</h2>
              <Input
                type="text"
                name="email"
                value={email}
                className="password-input"
                onChange={this.onChange}
                placeholder="E-mail Address"
                required
              />
              <Button value="Send Password Reset Email" className="password-btn" />
            </form>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

SendEmail.propTypes = {
  sendEmail: PropTypes.func.isRequired
};

export default connect(
  null,
  { sendEmail }
)(SendEmail);
