require('dotenv').config()
const connectDB = require('./database/connect')
const express = require('express')
const app = express()
const router = require('./routes/tasks')
const bodyParser = require('body-parser')
const errorHandlerMiddleWare = require('./error-handling/error-handler-middleware')

const port = process.env.PORT || 3000
let connectionString = process.env.connectionString.replace('<password>', process.env.password)

app.use(bodyParser.json())
app.use('/api/v1/tasks', router)
app.use(errorHandlerMiddleWare)

const start = async () => {
    try {
        await connectDB(connectionString)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()