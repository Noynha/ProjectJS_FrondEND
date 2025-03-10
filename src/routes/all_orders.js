const axios = require('axios')

const allOrdersRouter = require('express').Router()

allOrdersRouter.get('/', async (req, res) => {
  try {
    const { data: dataResponse } = await axios.post('http://localhost:5000/customer/login', {
      name: customer_name,
      phone: customer_phone
    });

    console.log("✅ Login Response:", dataResponse);

    res.render('all_orders', {
      list_report: dataReport.data,
    })
  } catch (error) {
    res.send('Error!!')
  }
})


module.exports = allOrdersRouter