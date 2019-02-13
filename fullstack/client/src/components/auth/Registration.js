import React from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';



class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "default button value",
            name: '',
            role: '',
            responseToPost: '',
        };
    }

    pressTheButton() {
        this.setState({value: 'NOICE'})
        if (this.state.value === "NOICE") {
            this.setState({value: 'default'})
        }
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));
    }

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.name ==="" || this.state.role==="")
        {
            alert("so space!");
            return false;
        }
        const response = await fetch('/post_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: this.state.name, role: this.state.role}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
    };
    render() {
        return (
            <div class="container">
                <p style={{backgroundColor: "red"}}>one. two?? three!!!{this.state.data}</p>
                <Form onSubmit={this.handleSubmit}>
                    Name:
                    <input ref={"name"} type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/> <br/>
                    Role:
                    <input id={"role"} type="text" value={this.state.role} onChange={e => this.setState({ role: e.target.value })}/> <br/>
                    <Button variant="primary" onClick={() => this.pressTheButton()}> {this.state.value} </Button>
                    <p>Name:{this.state.name} Role:{this.state.role}</p>
                    <Button variant="warning" type={"submit"}> Add new user </Button>
                </Form>
                <p style={{backgroundColor: "green"}}>{this.state.responseToPost}</p>
            <Form>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}
export default Registration;