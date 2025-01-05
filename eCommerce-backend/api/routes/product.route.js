const express = require('express');
const multer = require('multer');

const productController = require('../controllers/Product.controller')
const router = express.Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });


router.post('/create', upload.single('image'), productController.store);
router.get('/retrive', productController.getAll);
router.get('/edit/:id', productController.get);
router.get('/delete/:id', productController.delete)




module.exports = router