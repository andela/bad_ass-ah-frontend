import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';
import 'moment-timezone';

import Store from './Store';
import Routers from './routes/routes';
import { loginCheckState } from './actions/login';
import { getCurrentProfile, getUserFollowers, getUserFollowing } from './actions/profile';

// @store our css file
import './assets/css/main.css';
import './assets/icofont/icofont.css';

dotenv.config();

// const { REACT_APP_BACKEND_URL } = process.env;
const REACT_APP_BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
const App = () => {
  axios.defaults.baseURL = REACT_APP_BACKEND_URL;
  useEffect(() => {
    Store.dispatch(
      getCurrentProfile(),
      Store.dispatch(loginCheckState()),
      Store.dispatch(getUserFollowers()),
      Store.dispatch(getUserFollowing())
    );
  }, []);

  return (
    <Provider store={Store}>
      <div className="App">
        <Routers />
      </div>
    </Provider>
  );
};

export default App;
