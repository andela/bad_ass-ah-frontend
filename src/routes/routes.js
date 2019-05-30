/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/css/main.css';

// @load component
import Home from '../components/home/Home';

// @load component
import SendEmail from '../components/users/forgotPassword/SendEmail';
import ResetPassword from '../components/users/forgotPassword/ResetPassword';
import Authenticate from '../components/users/authenticate/Authenticate';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Authenticate} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default Routes;
