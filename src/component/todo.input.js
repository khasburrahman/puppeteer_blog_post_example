import React, { Component } from 'react';

class TodoInput extends Component {
    handleChange = (event) => {
        let value = event.target.value
        this.props.todoSetInput(value)
    }

    submit = () =>{
        this.props.todoSubmit()
    }

    render() {
        let {todoInputValue} = this.props
        return (
            <div>
                <h2>Input Todo:</h2>
                <input 
                    style={{width:"40%"}} 
                    name="todo" 
                    data-testid="todo-form-input" 
                    onChange={this.handleChange} 
                    value={todoInputValue}/>
                <button name="todo-button-submit" data-testid="todo-button-submit" onClick={this.submit}>Submit</button>
            </div>
        );
    }
}

export default TodoInput;