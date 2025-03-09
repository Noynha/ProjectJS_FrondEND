const bookingRouter = require('express').Router()

bookingRouter.get('/', (req, res) => {
  res.render('booking')
})

module.exports = bookingRouter