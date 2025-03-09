const router = require('express').Router()
const bookingRouter = require('./booking')
const allOrdersRouter = require('./all_orders')

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', async (req, res) => {
  try {
    const { data: dataProduct } = await instance.get('/product/');
    const { data: dataProgram } = await instance.get('/program/');
    
    if (!dataProduct || !dataProgram) {
      return res.send('Data not found!');
    }

    res.render('index', {
      list_product: dataProduct.data || [],
      list_program: dataProgram.data || []
    });
  } catch (error) {
    console.error('Error:', error);  // เพิ่มการแสดงผลข้อผิดพลาด
    res.send('Error!!');
  }
})


// Other Routes หน้าอื่น ๆ 
router.use('/index',router)
router.use('/booking', bookingRouter)
router.use('/all_orders',allOrdersRouter)
 
module.exports = router