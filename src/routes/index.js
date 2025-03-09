const router = require('express').Router()

// Routes
router.get('/', (req, res) => res.render('index', {
  name: 'Ham'
}))

module.exports = router