/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-named-as-default
import Signup from './Signup';
import Login from './Login';
import logo from '../../assets/Images/world.svg';
import backImage from '../../assets/Images/jon-tyson-762619-unsplash.jpg';

import '../../assets/css/signup.css';

class displayForm extends Component {
  state = {
    auth: 'login'
  }

  switchForm = (auth) => {
    this.setState({
      auth,
    });
  }

  renderForm = () => {
    const { auth } = this.state;
    if (auth === 'signup') { return <Signup />; }

    return <Login />;
  }

  render() {
    const { auth } = this.state;

    return (
      <div className="App">
        <div className="App__Aside">
          <div className="App-back">
            <img src={backImage} alt="backg" />
          </div>
          <div className="App__Logo">
            <img src={logo} className="logo" width="80" height="100" alt="" />
          </div>
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <button
              onClick={() => this.switchForm('login')}
              type="button"
              className={`PageSwitcher__Item ${auth === 'login' ? 'PageSwitcher__Item--Active' : ''}`}
              data-test="signin-btn"
            >
            Sign In
            </button>
            <button
              onClick={() => this.switchForm('signup')}
              type="button"
              className={`PageSwitcher__Item ${auth === 'signup' ? 'PageSwitcher__Item--Active' : ''}`}
              data-test="signup-btn"
            >
            Sign Up
            </button>
          </div>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default displayForm;
