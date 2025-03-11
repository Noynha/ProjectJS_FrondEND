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

allOrdersRouter.post('/update_orders_status', async (req, res) => {
  try {
    const { orders_id , status} = req.body
    await axios.put('/orders?id='+orders_id,{
      status: status
    })
    // alert("Updated!")
    const { data: dataReport } = await axios.get('/report/')
    res.render('all_orders', {
      list_report: dataReport.data,
    })
  } catch (error) {
    res.send('Error!!')
  }
})

module.exports = allOrdersRouter