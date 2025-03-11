const router = require('express').Router()
const bookingRouter = require('./booking')
const allOrdersRouter = require('./all_orders');
// const auth = require('./auth');
const { default: axios } = require('axios');

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', async (req, res) => {
  try {
    const { data: dataProduct } = await axios.get('http://localhost:5000/api/product');
    const { data: dataProgram } = await axios.get('http://localhost:5000/api/program');
    
    console.log("Products:", dataProduct);
    console.log("Programs:", dataProgram);

    // if (!dataProduct || !dataProgram) {
    //   return res.send('Data not found!');
    // }

    res.render('index', {
      list_product: dataProduct.product || [],  
      list_program: dataProgram.programs || [] 
    });

  } catch (error) {
    console.error('🔥 ERROR:', error.response ? error.response.data : error.message);  // เพิ่มการแสดงผลข้อผิดพลาด
    res.send(`<h1>Error!!</h1><pre>${JSON.stringify(error.response ? error.response.data : error.message, null, 2)}</pre>`);
  }
})


// Other Routes หน้าอื่น ๆ 
router.use('/index',router)
router.use('/booking', bookingRouter)
router.use('/all_orders',allOrdersRouter)
// router.use('/auth', auth);
 
module.exports = router