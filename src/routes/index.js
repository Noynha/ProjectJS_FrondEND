const router = require('express').Router()
const bookingRouter = require('./booking')
const allOrdersRouter = require('./all_orders');
// const loginRegisRouter = require('./login_regis');
const { default: axios } = require('axios');

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', async (req, res) => {
  try {
    const { data: dataProduct } = await axios.get('/product/');
    const { data: dataProgram } = await axios.get('/program/');
    
    if (!dataProduct || !dataProgram) {
      return res.send('Data not found!');
    }

    res.render('index', {
      list_product: dataProduct.data || [],
      list_program: dataProgram.data || []
    });
  } catch (error) {
    console.error('🔥 ERROR:', error.response ? error.response.data : error.message);  // เพิ่มการแสดงผลข้อผิดพลาด
    res.send('Error!!');
  }
})


// Other Routes หน้าอื่น ๆ 
router.use('/index',router)
router.use('/booking', bookingRouter)
router.use('/all_orders',allOrdersRouter)
// router.use('/login_regis', loginRegisRouter);
 
module.exports = router