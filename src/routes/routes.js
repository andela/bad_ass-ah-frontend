import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// @load component
import Login from '../components/users/login';
import Article from '../components/articles/AllArticles';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/articles" component={Article} />
    </Switch>
  </Router>
);

export default Routes;
