const Tasks = require('../models/taskModel')


Tasks.find( {}).exec((error, list) => {
    const finalData =  () =>   list
        .filter(item => !item._isDeleted)
        .map(item => {
            return {
                id: item._id,
                title: item.title,
                status: item.status
            }
        })
    console.log(finalData())
})

const getAllTasks = async (req, res) => {
    const data = await Tasks.find({status: 'new'})
    const filteredData = data
        .filter(item => !item._isDeleted)
        .map(item => {
           return {
               id: item._id,
             title: item.title,
             status: item.status
            }
        })
    res.json(data)
}

const getByTime = async (req, res) => {
    const data = await Tasks.find({})
    const duration = {
        "day": 1000 * 60 * 60 * 24,
        "week": 1000 * 60 * 60 * 24 * 7,
        "month": 1000 * 60 * 60 * 24 * 30,
        "year": 1000 * 60 * 60 * 24 * 365,
    }
    const filteredData = data.filter(item => +new Date() - item._createdAt < duration[req.params.timespan])
    res.json(filteredData)
}

const addTask = async (req, res) => {
    try{
        const newTask = new Tasks({
            title: req.body.title
        })
        const savedTask = newTask.save()
        res.json(savedTask)
    } catch(e){
        res.json({message: 'Произошла ошибка'})
    }
}
const deleteTask = async (req, res) => {
    const deleteOne = await Tasks.findOneAndUpdate(
        {_id: req.params.id},
        {_isDeleted: true,
            _deletedAt: + new Date ()},
        {new: true}
    )
    res.json(deleteOne)
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const status = req.body.status
    const statuses = ['done', 'new', 'in progress', 'blocked']
    console.log(req.body)
    if (statuses.includes(status)) {
       const updatedStatus = await Tasks.findOneAndUpdate({_id: id}, {status}, {new: true} )
        res.json(updatedStatus)
    }
    else{
        res.json({"message": 'Incorrect status'})
    }
}

module.exports = {getAllTasks, getByTime, addTask, updateTask, deleteTask}
