const express = require('express')
const cors = require('cors')
const taskRouter = require('./routes/tasksRouter')
const server = express()
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

server.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(chalk.blue('DB IS CONNECTED'))
    })
    .catch(() => {
        console.log(chalk.red('CONNECTION IS FAILED'))
    })
console.log(process.env.n)
server.use(express.json())


server.use('/api/tasks', taskRouter)

server.use((req, res, next) => {
   const error = {message: 'Not found'}
    res.status(404).json(error)
    next()
})

server.listen( 8000, () => {
    console.log('Server is running')
})





