const { createError } = require('../error-handler/custom-error-handler')
const asyncWrapper = require('../error-handling/async-wrapper')
const Task = require('../model/task')

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({
        status: "success",
        tasks,
        result: tasks.length
    })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

const getTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id })
    if (!task) {
        return next(createError(`No such tasks with the corresponding ID`, 404))
    }
    res.status(200).json(task)
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createError(`No such tasks with the corresponding ID`, 404))
    }
    res.status(200).json({ status: "success", task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
        return next(createError(`No such tasks with the corresponding ID`, 404))
    }
    res.status(200).json({ status: 'success', tast: null })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}