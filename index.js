require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const router = require('./src/routes')
const axios = require('axios')
const bodyParser = require('body-parser');

axios.defaults.baseURL = 'http://localhost:3000/api'

const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)

app.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}`)
})