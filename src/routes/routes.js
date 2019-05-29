/* eslint-disable import/no-named-as-default */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import '../assets/css/main.css';

// @load component
import Login from '../components/users/login/Login';
import Home from '../components/home/Home';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
