const express = require('express')
const cors = require('cors')
const taskRouter = require('./routes/tasksRouter')
const server = express()
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

server.use(cors())
//Подключение к MONGO DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(chalk.blue('DB IS CONNECTED'))
    })
    .catch(() => {
        console.log(chalk.red('CONNECTION IS FAILED'))
    })
server.use(express.json())

//Роутеры
server.use('/api/tasks', taskRouter)
//Ошибка
server.use((req, res, next) => {
   const error = {message: 'Not found'}
    res.status(404).json(error)
    next()
})
//Загрузка проекта
server.listen( 8000, () => {
    console.log('Server is running')
})





