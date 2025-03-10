const axios = require('axios');
const login_regis = require('express').Router();

// แสดงหน้า Login
login_regis.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// แสดงหน้า Register
login_regis.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// 🔹 ใช้ API เดียวกันสำหรับ Login และ Register
login_regis.post('/auth', async (req, res) => {
    const { type, customer_name, customer_phone } = req.body;

    try {
        const response = await axios.post('/customer', {
            type, // "login" หรือ "register"
            name: customer_name,
            phone: customer_phone
        });

        if (type === 'register') {
            // ลงทะเบียนสำเร็จกลับไปหน้า Login
            return res.redirect('/login');
        }

        if (type === 'login') {
            // Login สำเร็จไปหน้า All Orders
            return res.redirect('/all_orders');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong!';
        
        // แสดง error ตาม type
        if (type === 'register') {
            return res.render('register', { error: errorMessage });
        }
        return res.render('login', { error: errorMessage });
    }
});

module.exports = login_regis;
