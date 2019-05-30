import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

import Routers from './routes/routes';
import './assets/css/main.css';

const App = () => (
  <Provider store={Store}>
    <div className="App">
      <Routers />
    </div>
  </Provider>
);

export default App;
