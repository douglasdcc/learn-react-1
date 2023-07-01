import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
  return (
        todos.map(todo => {
            return <>
              <article style={{backgroundColor: todo.complete ? "var(--color-blue)" : "lightgray", color: todo.complete ? "white" : "black" }}>
                <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
              </article>
            </>
        })
  )
}
