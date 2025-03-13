import React, { useState } from 'react'

const InputTodo = ({ todos, setTodos, filter, setFilter }) => {
    // States
    const [description, setDescription] = useState('')

    // Triggered when add-task button is pressed
    const addTask = async (e) => {
        // Prevents page reload
        e.preventDefault()

        // Checks if any description was added
        if(description == '') return

        try {
            // Creates a new to-do
            const finished = false
            const body = {description, finished}
            const response = await fetch("http://localhost:5001/todos", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })
            const newTodo = await response.json()
            
            // If the query was successful
            if(response.ok) {
                // Updates description and to-do list
                setDescription('')
                setTodos([...todos, newTodo])  
            } 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <form onSubmit={addTask} className='btnsContainer'>
            <button className="add-task-btn">Add Task</button>
            <input type='text' className="add-task-text" placeholder="Type task here..." value={description} onChange={(e) => setDescription(e.target.value)}/>
            <select className="dropdown" defaultValue={filter} onChange={e => {setFilter(e.target.value)}}>
                <option value="0">All</option>
                <option value="1">Finished</option>
                <option value="2">Unfinished</option>
            </select>
        </form>
    )
}

export default InputTodo