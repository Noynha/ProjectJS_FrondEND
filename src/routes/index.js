const router = require('express').Router()
const rateRouter = require('./rate')

// Routes (หน้าหลัก/หน้าแรก)
router.get('/', (req, res) => res.render('index', {
  name: 'Ham'
}))

// Other Routes หน้าอื่น ๆ 
router.use('/rate', rateRouter)

module.exports = router