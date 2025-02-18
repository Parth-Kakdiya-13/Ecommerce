const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'], // Custom error message
            trim: true, // Removes unnecessary whitespace
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'], // Validation to ensure price is non-negative
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        image: {
            type: String, // Storing image as a Base64 encoded string
            required: [true, 'Image is required'], // Ensure the image is provided
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
