const router = require('express').Router()
const bookingRouter = require('./booking')

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', (req, res) => res.render('index', {
  name: 'Ham'
}))

// Other Routes หน้าอื่น ๆ 
router.use('/booking', bookingRouter)

module.exports = router