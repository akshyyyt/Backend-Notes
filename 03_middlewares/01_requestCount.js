const express = require('express');

const app = express();

let requestCount = 0;

app.use((req, res, next) => {
    requestCount++;
    next();
}) // Middleware

app.get('/user', (req, res) => {
    res.json({
        name: 'John'
    });
})

app.post('/user', (req, res) => {
    res.json({
        message: "Created Dummy User "
    })
})

app.get('/requestCount', (req, res) => {
    res.json({
        requestCount
    })
})

app.listen(3000, () => {
    console.log(`Server is listening on PORT 3000`)
})