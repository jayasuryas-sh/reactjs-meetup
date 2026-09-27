import { useState } from 'react'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  function addTodo(event) {
    event.preventDefault()
    const title = text.trim()
    if (!title) return

    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    setText('')
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main className="app">
      <h1>Todos</h1>
      <form className="add-form" onSubmit={addTodo}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs doing?"
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'done' : undefined}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete ${todo.title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="count">
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </p>
    </main>
  )
}
