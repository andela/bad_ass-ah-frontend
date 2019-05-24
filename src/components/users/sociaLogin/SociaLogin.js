/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
import { loadUser } from '../../../actions/socialAuth';

dotenv.config();
const { REACT_APP_BACKEND_URL } = process.env;

export class SociaLogin extends Component {
  state = {};

  callGemailSocialLogin = () => {
    window.location.replace(`${REACT_APP_BACKEND_URL}/api/users/login/google`);
  };

  callFacebookSocialLogin = () => {
    window.location.replace(`${REACT_APP_BACKEND_URL}/api/users/login/facebook`);
  };

  callTwitterSocialLogin = () => {
    window.location.replace(`${REACT_APP_BACKEND_URL}/api/users/login/twitter`);
  };

  render() {
    const { props } = this;
    if (props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <div className="socialMediaButtons ">
          <button
            className="socialMedia mr-20 facebook "
            type="button"
            onClick={this.callFacebookSocialLogin}
          />
          <button
            type="button"
            onClick={this.callTwitterSocialLogin}
            className="socialMedia  mr-20 twitter"
          >
            {' '}
          </button>
          <button
            type="button"
            onClick={this.callGemailSocialLogin}
            className="socialMedia  mr-20 gmail"
          >
            {' '}
          </button>
        </div>
      </Fragment>
    );
  }
}

SociaLogin.propTypes = {};

const mapStateToProps = state => ({
  isAuthenticated: state.socialAuth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    loadUser
  }
)(SociaLogin);
