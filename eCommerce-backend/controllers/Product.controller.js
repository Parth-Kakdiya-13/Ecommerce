const ProductModel = require('../models/product.model');

exports.store = async (req, res) => {

    const { title, description, price } = req.body;
    // console.log(req.body);
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const imageBase64 = req.file.buffer.toString('base64');
        const product = new ProductModel({
            title, description, price, image: imageBase64
        })
        const savedproduct = await product.save();
        res.status(200).send({ savedproduct })
    } catch (error) {
        res.status(500).send({ "erorr": error.message })
    }
}


exports.get = async (req, res) => {
    try {
        let data = await ProductModel.find();
        res.status(200).send({ "data": data })
    } catch (error) {
        res.status(500).send({ "error": error.message })
    }
}