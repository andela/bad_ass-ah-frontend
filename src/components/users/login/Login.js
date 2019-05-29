import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../../actions/socialAuth';
import SocialLogin from '../sociaLogin/SociaLogin';

export class Login extends Component {
  state = {};

  render() {
    const { props } = this;
    const url = props.location.search;
    const userData = queryString.parse(url);
    const { username, token } = userData;

    if (username && token) {
      props.loadUser(token, username);
    }
    if (props.isAuthenticated && props.token) {
      return <Redirect to="/" />;
    }
    return <SocialLogin />;
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.socialAuth.isAuthenticated,
  user: state.socialAuth.user,
  token: state.socialAuth.token
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Login);
