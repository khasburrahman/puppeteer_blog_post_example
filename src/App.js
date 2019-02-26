import React, { Component } from 'react'
import TodoInput from './component/todo.input'

class App extends Component {
  state = {
    todos: [],
    todoInput: "",
  }

  todoSetInput = (value) => {
    this.setState({todoInput:value})
  }

  todoSubmit = () => {
    this.setState((state, props) => {
      let {todos, todoInput} = state
      todos.push(todoInput)
      return {
        todos: [...todos],
        todoInput: ""
      }
    })
  }

  componentDidUpdate(){
    console.log(this.state.todos)
  }

  render() {
    let { todoInput } = this.state
    return (
      <div className="App">
        <TodoInput todoInputValue={todoInput} todoSubmit={this.todoSubmit} todoSetInput={this.todoSetInput} />
      </div>
    );
  }
}

export default App;
