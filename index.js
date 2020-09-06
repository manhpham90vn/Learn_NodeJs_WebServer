const express = require('express')
const logger = require('morgan')

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
app.use(() => {
  const error = app.get('env') === 'development' ? err : {}
  const status = error.status || 500

  return res.status(status).json({
    error: {
      message: error.message || 'Error'
    }
  })
})

// Start server
const port = app.get('port') || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
