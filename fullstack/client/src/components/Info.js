import React from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';


function jsonLoader(){
    console.log('FIND THIS LOG');
}

const options = {
    handleConfirmDeleteRow: customConfirm,
    afterInsertRow: onAfterInsertRow,
    insertText: 'Add New Result',
    /*onDeleteRow: 'DeleteRowHandler',*/
    saveText: 'Save',
};

function customConfirm(next, dropRowKeys) {
    console.log(dropRowKeys);
    const dropRowKeysStr = dropRowKeys.join(',');
    console.log(dropRowKeysStr);
    if (window.confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`)) {
        // If the confirmation is true, call the function that
        // continues the deletion of the record.
        axios.post('/delete_row',{
            ids:dropRowKeys
        });

        next();
    }
}
//add new record to node
function onAfterInsertRow(row) {
    let newRowStr = '';
    let addRow = "";
    for (const prop in row) {
        newRowStr += " \" "+prop + "\": \"" +row[prop]+"\",";
        addRow += '"'+prop+'":"'+row[prop]+'",';
    }
    addRow ='{'+ addRow.substring(0,addRow.length-1)+'}';
    addRow=JSON.parse(addRow);
    axios.post('/post_new_row',{
        row:addRow
    });
    /*function addNewRow()
    {
        const response = fetch('/post_new_row', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.parse( addRow),
        });
    }*/
    return newRowStr;
}

const selectRowProp = {
    mode: 'checkbox'
};
const cellEditProp = {
    mode: 'click'
};

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result:[],
            request:[]
        };
    }


    /**
     * Get data from DB on mount
     */
    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.GamesData()
            .then(res => res.json)
            .catch(err => console.log(err));
    }
    GamesData = async ()  => {
        const response = await fetch('/games-data-json');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        this.setState({result: JSON.parse(JSON.stringify(body))});
        return this.state.result;
    };
    render() {

        return (
            <div>
                <h1>Some information</h1>

                <BootstrapTable data={this.state.result}
                                deleteRow={ true }
                                selectRow={ selectRowProp }
                                cellEdit={ cellEditProp }
                                search={ true }
                                options={ options }
                                insertRow
                >
                    <TableHeaderColumn dataField='_id' autoValue={ true } isKey searchable={ false } hidden export>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='player1'  >Player1</TableHeaderColumn>
                    <TableHeaderColumn dataField='player2' >Player2</TableHeaderColumn>
                    <TableHeaderColumn dataField='result' >Result</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default Info;