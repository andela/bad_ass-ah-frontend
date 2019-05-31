import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import Store from './Store';

import Routers from './routes/routes';

// @store our css file
import './assets/css/main.css';
import './assets/icofont/icofont.css';

const App = () => {
  axios.defaults.baseURL = 'https://badass-ah-backend-staging.herokuapp.com';
  return (
    <Provider store={Store}>
      <div className="App">
        <Routers />
      </div>
    </Provider>
  );
};

export default App;
