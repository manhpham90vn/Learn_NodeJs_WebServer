const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('connect success')
}).catch(() => {
  console.log('connect error')
})

const app = express()
const userRoute = require('./routers/user')

// Middlewares
app.use(logger('dev'))

// Routers
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res, next) => {
  return res.status(200).json({
    message: 'Server is OK'
  })
})

app.use('/users', userRoute)

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handle function
const errorHandler = (err, req, res, next) => {
  const error = process.env.NODE_ENV === 'development' ? err : {}
  const status = err.status || 500

  return res.status(status).json({
    error: {
      message: error.message || 'Error'
    }
  })
}

app.use(errorHandler)

// Start server
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
