const axios = require('axios')
const bookingRouter = require('express').Router()


bookingRouter.get('/', async (req, res) => {

  try {
    const { data: dataProduct } = await axios.get('/product/')
    const { data: dataProgram } = await axios.get('/program/')
    
    res.render('booking', {
      list_product: dataProduct.data,
      list_program: dataProgram.data
    })
  } catch (error) {
    res.send('Error!!')
  }
})

bookingRouter.post('/', async (req, res) => {
  try {
    const {
      radio_program,
      date_drop,
      radio_time_drop,
      date_take,
      radio_time_take,
      customer_name,
      customer_phone
    } = req.body

    console.log('req.body', req.body)

    let select_products = []
    Object.entries(req.body).forEach(([key, value]) => {
      if (key.includes('select_product')) {
        select_products.push({
          id: key.replace('select_product|', ''),
          value: value
        })
      }
    })

    console.log('select_products', select_products)
    console.log('radio_program', radio_program)
    console.log('datetime_drop', date_drop ) // 10/10/2021, 10:00
    console.log('datetime_take', date_take)
    console.log('radio_time_drop', radio_time_drop)
    console.log('radio_time_take', radio_time_take ) // 10/10/2021, 10:00
    console.log('customer_name', customer_name)
    console.log('customer_phone', customer_phone)
    res.send('Booking Crreated!!')

    const user = await axios.post('/customer/',{
      name:customer_name,
      phone:customer_phone
    })

    const customerId = user.data.customer_id;

    const order = await axios.post('/orders/',{
      customer_id: customerId ,
      drop_at:date_drop,
      take_at:date_take
    })
    
    const orderId = order.data.orders_id;

    const ordersDetail = await axios.post('/order_detail/',{
      orders_id:orderId,
      product_id:select_products.id,
      program_id:radio_program,
      item:select_products.value
    })

  } catch (error) {
    res.send('Error!!')
  }
})

module.exports = bookingRouter