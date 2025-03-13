import React, { useEffect, useState } from 'react'
import InputTodo from './components/InputTodo'
import TodoList from './components/TodoList'

function App() {
    // States
    const [todos, setTodos] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])
    const [filter, setFilter] = useState("0")

    // Gets to-do list
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5001/todos")
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    // Fetches to-do list when the page is loaded
    useEffect(() => {
        getTodos()
    }, [])

    // Filters the to-do list every time it or the filter option changes
    useEffect(() => {
        switch(filter) {
            case "0":
                setFilteredTodos(todos)
                break
            case "1":
                setFilteredTodos(todos.filter(todo => todo.finished))
                break
            case "2":
                setFilteredTodos(todos.filter(todo => !todo.finished))
                break
        }
    }, [filter, todos])

    return (
        <div className='container'>
            <h1>TODO LIST</h1>
            <InputTodo todos={todos} setTodos={setTodos} filter={filter} setFilter={setFilter} />
            <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
        </div>
    );
}

export default App;