import React from 'react';
import logo from "./logo.svg";
import About from "./components/About";
import UserList from "./components/UserList";
import Info from "./components/Info";
import {BrowserRouter as Router, Route,Link} from "react-router-dom";
import Clock from "./components/Clock";

class AppHeader extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Clock/>
                <Route path="/about" component={About}/>
                <Route path="/user-list" component={UserList}/>
                <Route path="/info" component={Info}/>


            </header>
        )
    }

}

export default AppHeader;