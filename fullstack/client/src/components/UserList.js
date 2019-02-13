import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result:[],
        };
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.UserList()
            .then(res => res.json)
            .catch(err => console.log(err));
    }

    UserList = async ()  => {

        const response = await fetch('/user-list');

        const body = await response.json();


        if (response.status !== 200) {
            throw Error(body.message)
        }

        this.setState({result: JSON.parse(JSON.stringify(body))});

        console.log(JSON.stringify(body));
        return this.state.result;
    };

    render() {
        return (
            <div>
                <h1>A list of Users:</h1>
                <BootstrapTable data={this.state.result}>
                    <TableHeaderColumn dataField='_id'  isKey dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' >Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='role' >Role</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default UserList;