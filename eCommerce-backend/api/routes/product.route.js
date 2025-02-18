const express = require('express');
const multer = require('multer');

const productController = require('../controllers/Product.controller')
const router = express.Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });


router.post('/create', upload.single('image'), productController.store);
router.get('/retrive/:category', productController.getByCategory);
router.get('/retrive', productController.getAll);
router.get('/edit/:id', productController.edit);
router.delete('/delete/:id', productController.delete)
router.put('/update/:id', upload.single('image'), productController.update)




module.exports = router