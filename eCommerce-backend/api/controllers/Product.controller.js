const Product = require('../models/product');

exports.store = async (req, res) => {
    // console.log("session", req.session.user);

    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: No user session found" });
    }

    const { title, description, price } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const imageBase64 = req.file.buffer.toString('base64');
        const product = new Product({
            title,
            description,
            price,
            image: imageBase64,
            userId: req.user
        });

        const savedProduct = await product.save();
        res.status(200).send({ savedProduct });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



exports.getAll = async (req, res) => {
    // console.log("productSEssion:", req.session);

    try {
        let data = await Product.find();
        res.status(200).send({ "data": data })
    } catch (error) {
        res.status(500).send({ "error": error.message })
    }
}

exports.edit = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: No user session found" });
    } try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {

    try {
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId)
        if (!product) {
            return res.status(404).json({ error: "Product not deleted" });
        }
        res.status(200).json({ "message": "product deleted" });
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const productId = req.params.id;

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        };

        // If a new image is uploaded
        if (req.file) {
            updateData.image = req.file.buffer.toString('base64'); // Store image as base64 string
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

