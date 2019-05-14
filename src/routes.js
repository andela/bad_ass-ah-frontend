import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import App from './App';
import login from './views/login';

const Routes = () =>(
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/login" component={login}/>
        </Switch>
    </Router>
)

export default Routes
