import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import '../assets/css/main.css';
//@load component
import Login from "../components/users/login";
import Article from "../components/articles/AllArticles";
import Navbar from "../components/layouts/navbar";
const Routes = () =>(
    <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/articles" component={Article} />
        </Switch>
    </Router>
)

export default Routes

