const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

JWT_SECRET = 'asdfghrtewqwadfgrer45reds'

// Middlewares
app.use(express.json());

// Database
let users = [];

// Controllers

function signInHandler(req, res){
    const { username, password } = req.body;

    users.push({
        username,
        password
    })

    res.json({
        message: 'User has been registered.'
    })
}

function logInHandler(req, res){
    const { username, password } = req.body;

    const user = users.filter((i) => i.username == username && i.password == password);

    if (user.length != 0){
        const token = jwt.sign({username}, JWT_SECRET);
        // user[0].token = token; // No need to store it now.

        res.json({
            message: token
        })
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }
}

function meHandler(req, res){
    const { token } = req.headers;

    // const user = users.find((i) => i.token == token); // This was used when using session stored in DB

    //jwt verification
    const encodedInfo = jwt.verify(token, JWT_SECRET);
    const username = encodedInfo.username; 

    const user = users.find((i) => i.username == username);

    if(user){
        res.status(200).json({
            username:  username,
        })
    } else {
        res.status(403).json({
            message: 'Unauthorized'
        })
    }
}

// Routes
app.post('/signup', signInHandler);
app.post('/login', logInHandler);
app.get('/me', meHandler)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})