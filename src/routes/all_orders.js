const axios = require('axios')

const allOrdersRouter = require('express').Router()

allOrdersRouter.get('/', async (req, res) => {
  try {
    
    // const { data: dataProduct } = await axios.get('/product/')
    // const { data: dataProgram } = await axios.get('/program/')
    // const { data: dataCustumer } = await axios.get('/customer/')
    // const { data: dataOrders } = await axios.get('/orders/')
    
    res.render('all_orders', {
      // list_product: dataProduct.data,
      // list_program: dataProgram.data,
      // list_customer: dataCustumer.data,
      // list_orders: dataOrders.data
    })
  } catch (error) {
    res.send('Error!!')
  }
})


module.exports = allOrdersRouter