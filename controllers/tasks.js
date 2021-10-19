const {nanoid} = require('nanoid')
const fs = require('fs')
const readData = () => JSON.parse(fs.readFileSync(`./tasks/shop.json`, 'utf8'))

const getAllUsers = (req, res) => {
    const data = readData()
    console.log(data)
    const findWork = data
        .filter(item => !item._isDeleted)
        .map(item => {
            delete item._isDeleted
            delete item._createdAt
            delete item._deletedAt
            return item
        })

    res.json(findWork)
}

const getByTime = (req, res) => {
    const data = readData()
    const duration = {
        "day": 1000 * 60 * 60 * 24,
        "week": 1000 * 60 * 60 * 24 * 7,
        "month": 1000 * 60 * 60 * 24 * 30,
        "year": 1000 * 60 * 60 * 24 * 365,
    }
    const filteredData = data.filter(item => +new Date() - item._createdAt < duration[req.params.timespan])
    res.json(filteredData)
}
const addTask = (req, res) => {
    const newTask = {
        "taskId": nanoid(5),
        "status": 'new',
        "title": req.body.title,
        "_isDeleted": false,
        "_createdAt": +new Date(),
        "_deletedAt": null
    }
    const data = readData()
    const updatedTask = [...data, newTask]
    fs.writeFileSync(`./tasks/shop.json`, JSON.stringify(updatedTask, null, 2))
    res.json(newTask)
}
const updateTask = (req, res) => {
    const statuses = ['done', 'new', 'in progress', 'blocked']
    const data = readData()
    const updatedData = data.find(el => el.taskId === req.params.id)
    if (statuses.includes(req.body.status)) {
        const updatedTasks = data.map(item => item.taskId === req.params.id ? {
            ...item,
            status: req.body.status,
            _createdAt: +new Date()
        } : item)
        fs.writeFileSync(`./tasks/shop.json`, JSON.stringify(updatedTasks, null, 2))
    }
    res.json(updatedData)
}
const deleteTask = (req, res) => {
    const data = readData()
    const deletedData = data.find(el => el.taskId === req.params.id)
    const updatedTask = data.map(item => item.taskId === req.params.id ? {...item, _isDeleted: true} : item)
    fs.writeFileSync(`./tasks/shop.json`, JSON.stringify(updatedTask, null, 2))
    res.json(deletedData)
    console.log(req.params)
}

module.exports = {getAllUsers, getByTime, addTask, updateTask, deleteTask}
