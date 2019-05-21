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
import Login from '../components/users/login';
import Article from '../components/articles/AllArticles';
// eslint-disable-next-line import/no-named-as-default
import CreateArticle from '../components/articles/CreateArticle';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Authenticate} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Login} />
      <Route exact path="/stories" component={Article} />
      <Route exact path="/story/new-story" component={CreateArticle} />
    </Switch>
  </Router>
);

export default Routes;
