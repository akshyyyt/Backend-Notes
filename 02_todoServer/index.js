const express = require("express");
const fs = require("fs/promises");

const app = express();

app.use(express.json());

const getTodos = async () => {
    const data = await fs.readFile('./data.json', "utf8");
    return JSON.parse(data);
};

// Save todos
const saveTodos = async (todos) => {
    await fs.writeFile(
        './data.json',
        JSON.stringify(todos)
    );
};

app.get("/todos", async (req, res) => {
    try {
        const todos = await getTodos();

        res.status(200).json(
            Object.values(todos)
        );
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
});

app.post("/todos", async (req, res) => {
    try {
        const { todo } = req.body;

        if (!todo) {
            return res.status(400).json({
                message: "Todo is required"
            });
        }

        const todos = await getTodos();

        const id = Date.now().toString();

        const newTodo = {
            id,
            todo,
            completed: false
        };

        todos[id] = newTodo;

        await saveTodos(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create todo"
        });
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { todo } = req.body;

        const todos = await getTodos();

        if (!todos[id]) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        if (!todo) {
            return res.status(400).json({
                message: "Todo is required"
            });
        }

        todos[id].todo = todo;

        await saveTodos(todos);

        res.status(200).json(todos[id]);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

app.patch("/todos/:id/toggle", async (req, res) => {
    try {
        const { id } = req.params;

        const todos = await getTodos();

        if (!todos[id]) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        todos[id].completed = !todos[id].completed;

        await saveTodos(todos);

        res.status(200).json(todos[id]);
    } catch (error) {
        res.status(500).json({
            message: "Failed to toggle todo"
        });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todos = await getTodos();

        if (!todos[id]) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        delete todos[id];

        await saveTodos(todos);

        res.status(200).json({
            message: "Todo deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});