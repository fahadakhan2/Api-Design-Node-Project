const app = require('./server')

// creates and starts a server for our API on a defined port
app.listen(3001, () => {
  console.log('hello on http://localhost:3001')
})