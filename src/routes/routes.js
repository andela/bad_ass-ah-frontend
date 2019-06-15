/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// @load component
import SendEmail from '../components/users/forgotPassword/SendEmail';
import ActivateUser from '../components/users/registration/ActivateUser';
import ResetPassword from '../components/users/forgotPassword/ResetPassword';
import Authenticate from '../components/users/authenticate/Authenticate';
import Index from '../components/Index';
// eslint-disable-next-line import/no-named-as-default
import CreateArticle from '../components/articles/CreateArticle';
// eslint-disable-next-line import/no-named-as-default
import SingleArticle from '../components/articles/SingleArticle';
import ViewProfile from '../components/users/profile/ViewProfile';
import ViewBookmark from '../components/users/profile/ViewBookmarks';
import EditProfile from '../components/users/profile/EditProfile';
import EditArticle from '../components/articles/EditArticle';
import ReportedArticles from '../components/articles/reporting/ReportedArticles';
import Search from '../components/search/AllSearch';
import ViewSingleUser from '../components/search/ViewSingleUser';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/auth" component={Authenticate} />
      <Route exact path="/login" component={Authenticate} />
      <Route exact path="/" component={Index} />
      <Route exact path="/forgot-password" component={SendEmail} />
      <Route exact path="/activate-user/:token" component={ActivateUser} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/story/new-story" component={CreateArticle} />
      <Route exact path="/story/:handle" component={SingleArticle} />
      <Route exact path="/view-profile" component={ViewProfile} />
      <Route exact path="/bookmark" component={ViewBookmark} />
      <Route exact path="/edit-profile" component={EditProfile} />
      <Route exact path="/story/edit/:handle" component={EditArticle} />
      <Route exact path="/reported/stories" component={ReportedArticles} />
      <Route exact path="/story/edit/:handle" component={EditArticle}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/:handle/:handleId" component = {ViewSingleUser} />
    </Switch>
  </Router>
);

export default Routes;
