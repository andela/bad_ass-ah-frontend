/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/css/main.css';

// @load component
import Login from '../components/users/login/Login';
import Home from '../components/home/Home';

// @load component
import SendEmail from '../components/users/forgotPassword/SendEmail';
import ResetPassword from '../components/users/forgotPassword/ResetPassword';
import Auth from '../components/auth/Auth';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/register" component={Auth} />
      <Route exact path="/verify/:token" component={Auth} />
      <Route exact path="/signup" component={Auth} />
    </Switch>
  </Router>
);

export default Routes;
