const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const router = require('./src/routes')

const app = express()
const port = 4000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)

const msg = `Frontend server running on port ${port}` 
app.get('/', (req, res) => {
  res.send(msg)
})

app.listen(port, () => {
  console.log(msg)
})