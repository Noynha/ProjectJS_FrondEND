const axios = require('axios')

const allOrdersRouter = require('express').Router()

allOrdersRouter.get('/', async (req, res) => {
  try {
    const { data: dataReport } = await axios.get('/report/')

    res.render('all_orders', {
      list_report: dataReport.data,
    })
  } catch (error) {
    res.send('Error!!')
  }
})


module.exports = allOrdersRouter