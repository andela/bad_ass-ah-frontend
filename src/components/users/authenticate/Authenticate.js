import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { loadUser } from '../../../actions/socialAuth';
import SocialLogin from '../sociaLogin/SociaLogin';
import Login from '../login/Login';
import logo from '../../../assets/Images/icons/world.svg';
import Button from '../../common/button/Button';

export class Authenticate extends Component {
  state = {
    currentForm: 'login'
  }

  switchForm = (currentForm) => {
    this.setState({
      currentForm,
    });
  }

  render() {
    const { props } = this;
    const url = props.location.search;
    const userData = queryString.parse(url);
    const { username, token } = userData;
    const { currentForm } = this.state;

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
      <div className='auth'>
        <div className='auth__left-side'>
          <div className='auth__logo-box'>
            <img src={logo} className="auth__logo" alt="logo" />
          </div>
        </div>
        <div className='auth__right-side'>
          <div className='auth__switcher'>
            <Button
              disabled={false}
              btnClass={`btn auth__switcher-btn${currentForm === 'login' ? ' auth__switcher-btn--active' : ''}`}
              onClick={() => this.switchForm('login')}
              btnType='button'>Sign In</Button>
            <Button
              disabled={false}
              btnClass={`btn auth__switcher-btn${currentForm === 'register' ? ' auth__switcher-btn--active' : ''}`}
              onClick={() => this.switchForm('register')}
              btnType='button'>Sign Up</Button>
          </div>
          <div className='auth__form-wrapper'>
            <div className='auth__form-error'>
              {errorMessage}
            </div>
            {currentForm === 'login' ? <Login /> : 'Sign UP'}
            <SocialLogin />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.socialAuth.isAuthenticated,
  error: state.login.error
});

Authenticate.propTypes = {
  error: PropTypes.string,
};

export default connect(
  mapStateToProps,
  { loadUser }
)(Authenticate);
