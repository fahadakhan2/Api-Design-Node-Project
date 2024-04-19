import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

// third party middleware
app.use(cors()) // gives the client access to our api
app.use(morgan('dev')) // middleware that logs requests in the terminal
app.use(express.json()) // middleware that allows a client to send us json
app.use(express.urlencoded({ extended: true }))

// respond to a get request with a route of /
// app.[method]([route], [route handler]) is the syntax
app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({ message: 'hello' })
})

// all routes from router will start with /api....
// before the user can access any route the protect middleware will authenticate the user
app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

export default app
