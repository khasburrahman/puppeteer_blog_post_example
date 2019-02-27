import React, { Component } from 'react'
import TodoInput from './component/todo.input'
import TodoContent from './component/todo.content'
import TodoDelete from './component/todo.delete.button'

class App extends Component {
  state = {
    todos: [],
    todoInput: "",
    currentId: 0,
  }

  todoSetInput = (value) => {
    this.setState({todoInput:value})
  }

  todoSubmit = () => {
    this.setState((state, props) => {
      let {todos, todoInput, currentId} = state
      
      if (todoInput === undefined || todoInput === "" || todoInput === null){
        alert("Really, don't you have anything to do?\nPen jalan jalan sama aku?")
        return
      }

      let todo = {
        id:currentId, 
        content:todoInput
      }
      currentId += 1
      todos.push(todo)
      return {
        todos: [...todos],
        todoInput: "",
        currentId
      }
    })
  }

  todoDeleteItem = (index) => {
    this.setState((state, props) => {
      let {todos} = state
      todos.splice(index, 1)
      return {todos:[...todos]}
    })
  }

  render() {
    let { todoInput, todos } = this.state
    return (
      <div id="app">
        <TodoInput todoInputValue={todoInput} todoSubmit={this.todoSubmit} todoSetInput={this.todoSetInput} />
        <div id="todos-container">
          {
            todos.map((data, index) => 
              <div key={data.id} style={{display:"flex", marginTop:"8px"}}>
                <TodoContent todo={data} />
                <TodoDelete index={index} deleteHandler={this.todoDeleteItem} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
