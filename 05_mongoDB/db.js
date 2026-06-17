const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String 
})

const todoSchema = new mongoose.Schema({
    title: String,
    status: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports =  {
    User: User,
    Todo: Todo 
}