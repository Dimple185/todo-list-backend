const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    key: {
        type: String
    },
    text: {
        type: String
    },
    userId: {
        type: String
    } 
});

module.exports = mongoose.model('Todo', todoSchema);