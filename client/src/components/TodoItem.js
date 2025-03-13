import React, { useState, useEffect } from "react"

const TodoItem = ({ todo, todos, setTodos }) => {
    const [finished, setFinished] = useState(todo.finished)
    const [description, setDescription] = useState(todo.description)

    // Triggered when edit button is pressed
    const editTodoDescription = async (e, id) => {
        // Prevents page reload
        e.preventDefault()

        // Checks if any description was added
        if(description == '') return

        try {
            // Edits to-do description
            const body = { description, finished }
            const response = await fetch(`http://localhost:5001/todos/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const newTodo = await response.json()

            // If the query was successful
            if(response.ok) {
                // Updates description and to-do list
                setDescription(newTodo.description)
                setTodos(todos.map(mapTodo => mapTodo.todo_id === id ? newTodo : mapTodo))
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    // Triggered when checkbox is pressed
    const setTodoFinished = async (id, finished) => {
        try {
            // Edits to-do finished state
            const { description } = todo
            const body = { description, finished }
            const response = await fetch(`http://localhost:5001/todos/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const newTodo = await response.json()

            // If the query was successful
            if(response.ok) {
                // Updates description and to-do list
                setDescription(newTodo.description)
                setTodos(todos.map(mapTodo => mapTodo.todo_id === id ? newTodo : mapTodo))
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    // Triggered when delete button is pressed
    const deleteTodo = async (id) => {
        try {
            // Deletes to-do
            const response = await fetch(`http://localhost:5001/todos/${id}`, {
                method: "DELETE"
            })
            // If the query was successful, updates to-do list
            if(response.ok) setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    // When modal is closed, resets the description
    useEffect(() => {
        document.getElementById(`id${todo.todo_id}`).addEventListener('hidden.bs.modal', (e) => {
            setDescription(todo.description)
        })
    }, [])

    return (
        <div className="task">
            <input type="checkbox" id={`task${todo.todo_id}`} checked={finished} onChange={e => {setFinished(e.target.checked); setTodoFinished(todo.todo_id, e.target.checked)}}/>
            <label htmlFor={`task${todo.todo_id}`}> {finished ? <del>{todo.description}</del> : todo.description}</label>
            <button type="button" className="edit-btn" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>✏️</button>
            <button className="delete-btn" onClick={() => deleteTodo(todo.todo_id)}>🗑️</button>

            <div className="modal fade" id={`id${todo.todo_id}`}> 
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit To-do</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="edit-task-text" defaultValue={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="edit-task-btn" data-bs-dismiss="modal" onClick={e => editTodoDescription(e, todo.todo_id)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoItem