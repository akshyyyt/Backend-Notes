const express = require('express');

const app = express();

let errorCount = 0;

app.get('/user', (req, res) => {
    throw new Error('Some error');

    res.json({
        name: 'John'
    });
})

app.post('/user', (req, res) => {
    res.json({
        message: "Created Dummy User "
    })
})

app.use((err, req, res, next) => {
    res.status(404).send({})
    errorCount++;
}) // Error Handling

app.listen(3000, () => {
    console.log(`Server is listening on PORT 3000`)
}) 