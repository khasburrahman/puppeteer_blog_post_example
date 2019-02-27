import React, { Component } from 'react';

class TodoContent extends Component {
    render() {
        let { todo } = this.props
        return (
            <div data-testid={`todo-content-${todo.id}`} style={{backgroundColor:"#ddd", width:"40%"}}>
                <p style={{padding:"4px"}}>{todo.content}</p>
            </div>
        );
    }
}

export default TodoContent;