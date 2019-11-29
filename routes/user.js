const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')

// router.get('/')
router.post('/register', userController.registerUser);
router.post('/login', userController.login)

module.exports = router;