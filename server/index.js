const cors = require("cors")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5001
const pool = require("./db")
const fs = require('fs/promises')

// Read table creation query from ./database.sql file
async function createTable() {
    try {
        const data = await fs.readFile('./database.sql', { encoding: 'utf8' })
        await pool.query(data)
    } catch (err) {
        console.log(err);
    }
}
createTable();

// Midlewares
app.use(cors())
app.use(express.json())

// Routes

// Get all to-dos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// Create a to-do
app.post("/todos", async (req, res) => {
    try {
        const { description, finished } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description, finished) VALUES($1, $2) RETURNING *", 
            [description, finished]
        )
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// Get a to-do
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// Update a to-do
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description, finished } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1, finished = $2 WHERE todo_id = $3", 
            [description, finished, id]
        )
        res.json({todo_id: id, description: description, finished: finished})
    } catch (error) {
        console.error(error.message)
    }
})

// Delete a to-do
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            "DELETE from todo WHERE todo_id = $1", 
            [id]
        )
        res.json("Todo was deleted")
    } catch (error) {
        console.error(error.message)
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server has started listening on port ${PORT}`)
})

