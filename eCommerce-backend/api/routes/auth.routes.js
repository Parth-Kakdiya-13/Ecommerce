const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();


router.post('/login', authController.postLogin);
router.post('/signup', authController.postRegister);
router.get('/session', authController.checkSession);
router.post('/logout', authController.logout)
router.post('/reset/:token', authController.postNewPassword);
router.post('/reset', authController.postReset);

module.exports = router