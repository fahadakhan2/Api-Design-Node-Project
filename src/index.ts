import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'
import app from './server'

// creates and starts a server for our API on a defined port
app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`)
})
