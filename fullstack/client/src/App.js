import React, {Component} from 'react';
import './App.css';
import AppBody from './AppBody';
import Nav from './components/Nav';
import {Button, Form} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import AppHeader from "./AppHeader";

class App extends Component {

    render() {
        return (

            <Router>
                <div className="App">
                    <Nav/>
                    <Route path="(/|/about|/user-list|/info)" component={AppHeader}/>
                    <Route path="/registration" component={AppBody}/>
                </div>
            </Router>
        );
    }
}

export default App;

