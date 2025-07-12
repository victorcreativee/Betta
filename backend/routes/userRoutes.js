const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken'); 
const { registerUser, loginUser, googleLogin } = require('../controllers/userController');

// Standard login and registration
router.post('/register', registerUser);
router.post('/login', loginUser);


// Google Login Route
router.post('/google-login', googleLogin);


module.exports = router;
