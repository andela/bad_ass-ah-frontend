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
import ViewProfile from '../components/users/profile/ViewProfile';
import EditProfile from '../components/users/profile/EditProfile';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Authenticate} />
      <Route exact path="/" component={Index} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/story/new-story" component={CreateArticle} />
      <Route exact path="/story/:handle" component={SingleArticle} />
      <Route exact path="/view-profile" component={ViewProfile} />
      <Route exact path="/edit-profile" component={EditProfile} />
    </Switch>
  </Router>
);

export default Routes;
