
import React from 'react';
import {BrowserRouter as Router, Route,Link} from "react-router-dom";


class Nav extends React.Component {

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">rmn.klim</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="registration">Registration</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="info">Info</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="user-list">User List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">About?</Link>
                        </li>
                    </ul>

                </div>

            </nav>


        )
    }
}

export default Nav;
