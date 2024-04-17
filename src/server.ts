import express from 'express'

const app = express()

// respond to a get request with a route of /
// app.[method]([route], [route handler]) is the syntax
app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message : 'hello'})
})

export default app