const express = require('express')
const cors = require('cors')
const taskRouter = require('./routes/tasksRouter')
const path = require('path')
const Tasks = require('./models/taskModel')
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

Tasks.find( {}).exec((error, list) => {
    // console.log(list)
})

server.use(express.json())

//Роутеры
server.use('/api/tasks', taskRouter)
console.log(path.resolve('client/build'))
server.use(express.static(path.resolve('client/build')))
server.get('/*', (req, res) => {
    res.sendFile(path.resolve('client/build/index.html'))
})

//Ошибка
server.use((req, res, next) => {
   const error = {message: 'Page not found'}
    res.status(404).json(error)
    next()
})
//Загрузка проекта
server.listen(process.env.PORT || 8000, () => {
    console.log('Server is running')
})





