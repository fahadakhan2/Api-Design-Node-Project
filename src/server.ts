import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { handleInputErrors } from './modules/middleware'
import { body } from 'express-validator'

const app = express()

// third party middleware
app.use(cors()) // gives the client access to our api
app.use(morgan('dev')) // middleware that logs requests in the terminal
app.use(express.json()) // middleware that allows a client to send us json
app.use(express.urlencoded({ extended: true }))

// respond to a get request with a route of /
// app.[method]([route], [route handler]) is the syntax
app.get('/', (req, res, next) => {
  setTimeout(() => {
    next(new Error('hello'))
  }, 1)
})

// all routes from router will start with /api....
// before the user can access any route the protect middleware will authenticate the user
app.use('/api', protect, router)

app.post(
  '/user',
  body('username').isString(),
  body('password').isString(),
  handleInputErrors,
  createNewUser
)
app.post(
  '/signin',
  body('username').isString(),
  body('password').isString(),
  handleInputErrors,
  signin
)

// synchronous error handler
app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' })
  } else {
    res.status(500).json({ message: 'oops, thats on us' })
  }
})

export default app
