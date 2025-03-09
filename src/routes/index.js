const router = require('express').Router()
const bookingRouter = require('./booking')
const allOrdersRouter = require('./all_orders')

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', (req, res) => res.render('index'))

// Other Routes หน้าอื่น ๆ 
router.use('/booking', bookingRouter)
router.use('/all_orders',allOrdersRouter)
 
module.exports = router