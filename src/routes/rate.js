const rateRouter = require('express').Router()

rateRouter.get('/', (req, res) => {
  res.render('rate')
})

module.exports = rateRouter