const axios = require('axios');
const bookingRouter = require('express').Router();
const moment = require('moment');

bookingRouter.get('/', async (req, res) => {
  try {
    const { data: dataProducts } = await axios.get('/product');
    const { data: dataPrograms } = await axios.get('/program');
    res.render('booking', {
      products: dataProducts.product || [], 
      programs: dataPrograms.programs || []
    });
  } catch (error) {
    console.error('Error fetching products or programs:', error.message);
    res.status(500).send('Error fetching booking data!');
  }
});

bookingRouter.post('/', async (req, res) => {
  try {
    //res.send(req.body)
    //res.send(req.body)
    const {
      radio_program,
      date_drop,
      radio_time_drop,
      date_take,
      radio_time_take,
      customer_name,
      customer_phone
} = req.body;


    let select_products = [];
    Object.entries(req.body).forEach(([key, value]) => {
      if (key.includes('select_product')) {
        select_products.push({
          id: key.replace('select_product|', ''),
          value: parseInt(value) || 0
        });
      }
    });
    
    //res.send(select_products);

    // ✅ ตรวจสอบว่ามีลูกค้าอยู่แล้วหรือไม่
    const { data: existingCustomer } = await axios.get(`/customer?name=${customer_name}&phone=${customer_phone}`);
    let customerId;
    if (existingCustomer && existingCustomer.customer_id) {
      customerId = existingCustomer.customer_id;
    } else {
      // ✅ ถ้ายังไม่มี → สร้างลูกค้าใหม่
      const { data: newCustomer } = await axios.post('/customer', {
        name: customer_name,
        phone: customer_phone
      });
      customerId = newCustomer.data.customer_id;
    }

    //✅ สร้าง order ใหม่
    const { data: newOrder } = await 
    axios.post('/orders', {
      customer_id: customerId,
      drop_at: `${date_drop} ${radio_time_drop}`,
      take_at: `${date_take} ${radio_time_take}`,
      status: 'pending'
    });

    const orderId = newOrder.data.orders_id;

    // ✅ บันทึก order_detail
    for (const product of select_products) {
      if (product.value > 0) { // ส่งเฉพาะสินค้าที่มีจำนวนมากกว่า 0
        await axios.post('/order_detail', {
          orders_id: orderId,
          product_id: product.id,
          program_id: radio_program,
          item: product.value
        });
      }
    }

    // ✅ ตอบกลับเมื่อทุกอย่างเสร็จสมบูรณ์
    const { data: dataReport } = await axios.get('/report/')
    
        res.render('all_orders', {
          list_report: dataReport.data,
        })
        
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = bookingRouter;
