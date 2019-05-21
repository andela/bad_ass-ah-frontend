import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

import Routers from './routes/routes';
import './assets/css/main.css';
// @store our css file
import './assets/scss/_style.scss';
import './assets/icofont/icofont.css';

const App = () => (
  <Provider store={Store}>
    <div className="App">
      <Routers />
    </div>
  </Provider>
);

export default App;
