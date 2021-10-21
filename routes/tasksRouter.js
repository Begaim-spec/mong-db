const express = require('express')
const router = express.Router()
const {getAllTasks, getByTime, updateTask, deleteTask, addTask} = require('../controllers/tasks')


router.get('/', getAllTasks)
router.get('/:timespan', getByTime)
router.post("/", addTask)
router.patch("/:id", updateTask)
router.delete('/:id', deleteTask)

module.exports = router