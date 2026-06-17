const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Todo } = require('./db.js');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://e25b070778:e25b070778@cluster0.4ljt3nt.mongodb.net/todo")

app.post('/signup', async (req, res) => {
    // Input validation
    const requireBody = z.object({
        email: z.string().email(),
        name: z.string().min(3).max(50),
        password: z.string().min(3).max(50)
    })

    // const parsedData = requireBody.parse(req.body)
    const parsedDataWithSucess = requireBody.safeParse(req.body)

    if (!parsedDataWithSucess.success) return res.json({
        message: 'Invalid Input',
        error: parsedDataWithSucess.error
    })
    
    const { name, email, password } = req.body;

    const hashedPass =  await bcrypt.hash(password, 10);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPass
    })

    res.json({
        message: "User Registered"
    })
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email
    })

    if (!user) return res.json({
        message: "Invalid Credentials"
    })

    const passMatch = await bcrypt.compare(password, user.password)

    if (passMatch) {
        const token = jwt.sign({
            id: user._id
        }, 'asdfghjkl');
    
        res.json({
            token
        })
    } else {
        res.json({
            message: 'Invalid Credentials'
        })
    }
})

async function auth(req, res, next) {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded._id;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

app.post('/todo', async (req, res) => {
    const { title } = req.body;

    const todo = await Todo.create({
        title,
        status: false,
        userId: req.userId
    });

    res.json({
        message: "Todo Created",
        todo
    });
})

app.get('/todo', async (req, res) => {
    const todos = await Todo.findById(req.userId)

    res.json({
        todo
    })
})

app.listen(3000);