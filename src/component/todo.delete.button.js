import React, { Component } from 'react';

class TodoDelete extends Component {
    deleteItem = () => {
        let { deleteHandler, index } = this.props
        deleteHandler(index)
    } 

    render() {
        return <button style={{color:"red"}} onClick={this.deleteItem}>Delete</button>
    }
}

export default TodoDelete;