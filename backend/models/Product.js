const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        itemSpecifications: [
            {
                label: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
