const mongoose = require('mongoose')

const TaskScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide task name'],
        max: [20, 'Your task name is too long'],
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', TaskScheme)

module.exports = Task