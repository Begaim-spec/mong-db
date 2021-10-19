const express = require('express')
const router = express.Router()
const {getAllUsers, getByTime, updateTask, deleteTask, addTask} = require('../controllers/tasks')


router.get('/', getAllUsers)
router.get('/:timespan', getByTime)
router.post("/", addTask)
router.patch("/:id", updateTask)
router.delete('/:id', deleteTask)

module.exports = router