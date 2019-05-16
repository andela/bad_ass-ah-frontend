import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

import Routers from './routes/routes';

const App = () => (
  <Provider store={Store}>
    <div className="App">
      <Routers />
    </div>
  </Provider>
);

export default App;
