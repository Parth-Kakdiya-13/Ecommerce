const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();


router.post('/login', authController.postLogin);
router.post('/signup', authController.signup);
router.get('/session', authController.checkSession);
router.post('/logout', authController.logout)

module.exports = router