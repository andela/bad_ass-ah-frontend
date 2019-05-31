import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

import Routers from './routes/routes';

// @store our css file
import './assets/css/main.css';
import './assets/icofont/icofont.css';

const App = () => (
  <Provider store={Store}>
    <div className="App">
      <Routers />
    </div>
  </Provider>
);

export default App;
