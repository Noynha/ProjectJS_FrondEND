const express = require('express')
const axios = require('axios')

const authRouter = express.Router()

// แสดงหน้า Login
authRouter.get('/login', (req, res) => {
  res.render('login', { error: null })
})

// แสดงหน้า Register
authRouter.get('/register', (req, res) => {
  res.render('register', { error: null })
})

// ดำเนินการ Login
authRouter.post('/login', async (req, res) => {
  try {
    const { customer_name, customer_phone } = req.body

    const response = await axios.post('http://localhost:5000/api/customer', {
      type: 'login',
      name: customer_name,
      phone: customer_phone
    })

    // ถ้า Login สำเร็จ
    if (response.data.message === 'Login successful') {
      res.redirect('/')
    } else {
      res.render('login', { error: 'Invalid name or phone' })
    }
  } catch (error) {
    res.render('login', { error: 'Invalid name or phone' })
  }
})

// ดำเนินการ Register
authRouter.post('/register', async (req, res) => {
  try {
    const { customer_name, customer_phone } = req.body

    const response = await axios.post('/customer', {
      type: 'register',
      name: customer_name,
      phone: customer_phone
    })

    if (response.data.message === 'Customer created') {
      res.redirect('/login')
    } else {
      res.render('register', { error: 'Customer already exists' })
    }
  } catch (error) {
    res.render('register', { error: 'Registration failed' })
  }
})

module.exports = authRouter
