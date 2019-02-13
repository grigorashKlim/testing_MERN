import React from 'react';
import Registration from "./components/auth/Registration";
import {BrowserRouter as Router, Route,Link} from "react-router-dom";

class AppBody extends React.Component {
    render() {
        return (

                <Route path="/registration" component={Registration}/>

        )
    }

}

export default AppBody;