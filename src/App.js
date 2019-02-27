import React, { Component } from 'react'
import TodoInput from './component/todo.input'
import TodoContent from './component/todo.content'

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

  render() {
    let { todoInput, todos } = this.state
    return (
      <div className="App">
        <TodoInput todoInputValue={todoInput} todoSubmit={this.todoSubmit} todoSetInput={this.todoSetInput} />
        <div>
          {
            todos.map((content, index) =>  <TodoContent key={index+content} content={content}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
