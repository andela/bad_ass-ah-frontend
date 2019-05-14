import React from 'react';
import {Provider} from "react-redux";
import Store from "./Store";
import './App.css';
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
