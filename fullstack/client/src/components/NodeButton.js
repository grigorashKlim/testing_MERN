import React from 'react';

class NodeButton extends React.Component {
    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Enter your name: </label>
                <input
                    id="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            <p>{this.state.greeting}</p>
            </div>
        )
    }
}
export default NodeButton;