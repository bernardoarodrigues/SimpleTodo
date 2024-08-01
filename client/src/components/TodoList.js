import React from "react"
import TodoItem from "./TodoItem"

const TodoList = ({ filteredTodos, todos, setTodos }) => {
    return (
        <div className="task-list">
            {filteredTodos.map((filteredTodo) => <TodoItem todo={filteredTodo} todos={todos} setTodos={setTodos} key={filteredTodo.todo_id}/>)}
        </div>
    )
}

export default TodoList