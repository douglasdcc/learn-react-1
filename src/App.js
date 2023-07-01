import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 } from 'uuid';
import $ from 'jquery';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     if(storedTodos) setTodos(storedTodos)
  }, [])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: v4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleScroll() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= 270) {
        $(".header-div").addClass("fixed-title");
      } else {
        $(".header-div").removeClass("fixed-title");
      }
  });
  }

  return (
    <>
      <header class="header" onLoad={handleScroll()}>
        <div class="header-div">
          <h1 class="header-title">Todo list!</h1>
        </div>
      </header>
      <main class="container">
        <input placeholder="Task name" ref={todoNameRef} type="text" />
        <div class="btn-container">
          <a href="#" role="button" onClick={handleAddTodo}>Add Task</a>
          <a href="#" role="button" onClick={handleClearTodos}>Clear Completed Tasks</a>
        </div>
        <div>{todos.filter(todo => !todo.complete).length} tasks left to do</div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </main>
    </>
  )
}

export default App;
