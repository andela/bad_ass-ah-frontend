/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// @load component
import SendEmail from '../components/users/forgotPassword/SendEmail';
import ResetPassword from '../components/users/forgotPassword/ResetPassword';
import Authenticate from '../components/users/authenticate/Authenticate';
import Index from '../components/Index';
// eslint-disable-next-line import/no-named-as-default
import CreateArticle from '../components/articles/CreateArticle';
// eslint-disable-next-line import/no-named-as-default
import SingleArticle from '../components/articles/SingleArticle';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Authenticate} />
      <Route exact path="/" component={Index} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/story/new-story" component={CreateArticle} />
      <Route exact path="/story/:handle" component={SingleArticle} />
    </Switch>
  </Router>
);

export default Routes;
