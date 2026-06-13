const express = require('express');

const app = express();

let numberOfRequest = {};
setInterval(() => {
    numberOfRequest = {};
},1000)

app.use((req, res, next) => {
    const userId = req.headers['user-id'];

    if (numberOfRequest[userId]){
        numberOfRequest[userId]++;

        if (numberOfRequest[userId] > 5){
            
            return res.status(429).json({
                message: "Too many requests!"
            });
        } else {
            next();
        }
    } else {
        numberOfRequest[userId] = 1;
        next();
    }
})

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

app.listen(3000, () => {
    console.log(`Server is listening on PORT 3000`)
}) 