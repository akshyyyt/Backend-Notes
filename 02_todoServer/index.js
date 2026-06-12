import express from "express";
import fs from "fs";

const app = express();

const getTodos = async () => {
    const data = await fs.readFile("./data.json", "utf8");
    return JSON.parse(data);
};

const saveTodos = async (todos) => {
    await fs.writeFile(
        "./data.json",
        JSON.stringify(todos)
    );
};


app.get("/todos", (req, res) => {
    const todos = getTodos();

    res.json(
        Object.values(todos)
    );
});


app.post("/todos", (req, res) => {
    const { data } = req.body;

    const todos = getTodos();

    const id = Date.now().toString();

    const newTodo = {
        id,
        todo: data,
        completed: false,
    };

    todos[id] = newTodo;

    saveTodos(todos);

    res.json(newTodo);
});


app.patch("/todos/:id", (req, res) => {
    const todos = getTodos();

    const { data } = req.body;
    const todo = todos[req.params.id];

    todo.todo = data;

    saveTodos(todos);

    res.json(todo);
});


app.patch("/todos/:id/toggle", (req, res) => {
    const todos = getTodos();

    const todo = todos[req.params.id];

    todo.completed = !todo.completed;

    saveTodos(todos);

    res.json(todo);
});


app.delete("/todos/:id", (req, res) => {
    const todos = getTodos();

    delete todos[req.params.id];

    saveTodos(todos);

    res.json({
        message: "Todo deleted"
    });
});

app.listen(3000, () => {
    console.log(`Running on http://localhost:${PORT}`);
});