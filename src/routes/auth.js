const axios = require('axios')

const auth = require('express').Router()


auth.get('/register', (req, res) => {
    res.render('register');
});

auth.get('/login', (req, res) => {
    res.render('login');
});

auth.post('/register', async (req, res) => {
    try {
        const { name, phone } = req.body;

        // ส่งข้อมูลไปที่ backend
        const response = await axios.post('http://localhost:5000/api/customers', {
            type: 'register',
            name,
            phone
        });

        res.render('register', { message: response.data.message, error: null });
    } catch (error) {
        res.render('register', { message: null, error: error.response?.data?.message || 'Registration failed' });
    }
});

auth.post('/login', async (req, res) => {
    try {
        const { name, phone } = req.body;

        const response = await axios.post('http://localhost:5000/api/customers', {
            type: 'login',
            name,
            phone
        });

        res.render('login', { message: response.data.message, error: null });
    } catch (error) {
        res.render('login', { message: null, error: error.response?.data?.message || 'Login failed' });
    }
});

module.exports = auth;