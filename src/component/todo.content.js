import React, { Component } from 'react';

class TodoContent extends Component {
    render() {
        return (
            <div style={{backgroundColor:"#ddd"}}>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default TodoContent;