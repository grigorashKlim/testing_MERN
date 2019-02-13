import React from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap';

class InputFileButton extends ReactComponent{
    render(){
        return{
        <Button type="file" variant="warning" onClick={() => jsonLoader()}> Add new JSON <input style={input_button_style} type="file"  /></Button>
        }
    }
}
export default InputFileButton;