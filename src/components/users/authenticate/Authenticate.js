import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { loadUser } from '../../../actions/socialAuth';
import SocialLogin from '../sociaLogin/SociaLogin';
import Login from '../login/Login';
import Button from '../../common/button/Button';
import Registration from '../registration/Registration';

export class Authenticate extends Component {
  state = {
    currentForm: this.props.location.pathname.substring(1)
  };

  switchForm = (currentForm) => {
    this.setState({
      currentForm
    });
  };

  render() {
    const { props } = this;
    const url = props.location.search;
    const userData = queryString.parse(url);
    const { username, token } = userData;
    const { currentForm } = this.state;
    const logos = 'https://res.cloudinary.com/badass/image/upload/v1561644494/world_1.png';

    if (username && token) {
      props.loadUser(token, username);
    }
    if (props.isAuthenticated && props.token) {
      return <Redirect to="/" />;
    }

    let errorMessage = null;

    // eslint-disable-next-line react/prop-types
    if (this.props.error) errorMessage = <p className={'form__error'}>{this.props.error}</p>;

    return (
      <div className="auth">
        <div className="auth__left-side">
          <div className="welcome-auth">
          <div className="welcome-logo">
            <img src={logos} className="auth__logo" alt="logo" />
          </div>
            <h1>Welcome to Authors Haven</h1>
            <h5><i>A place for those that are creative at heart.</i></h5>
          </div>
        </div>
        <div className="auth__right-side">
          <div className="auth__switcher">
            <Button
              disabled={false}
              btnClass={`btn auth__switcher-btn${
                currentForm === 'login' ? ' auth__switcher-btn--active' : ''
              }`}
              onClick={() => this.switchForm('login')}
              btnType="button"
            >
              Sign In
            </Button>
            <Button
              disabled={false}
              btnClass={`btn auth__switcher-btn${
                currentForm === 'register' ? ' auth__switcher-btn--active' : ''
              }`}
              onClick={() => this.switchForm('register')}
              btnType="button"
            >
              Sign Up
            </Button>
          </div>
          <div className="auth__form-wrapper">
            <div className="auth__form-error">{errorMessage}</div>
            {currentForm === 'login' ? <Login /> : <Registration />}
            <SocialLogin />
          </div>
        </div>
      </div>
    );
  }
}

Authenticate.propTypes = {
  error: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.socialAuth.isAuthenticated,
  error: state.login.error
});

Authenticate.propTypes = {
  error: PropTypes.string
};

export default connect(
  mapStateToProps,
  { loadUser }
)(Authenticate);
