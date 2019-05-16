import React from 'react';
import { Provider } from "react-redux";
import Store from "./Store";
//load Routes
import Routers from "./routes/routes";
const App = () => {
  return (
  <Provider store={Store}>
      <div className="App">
      <Routers />
      </div>
  </Provider>
  );
}

export default App;
