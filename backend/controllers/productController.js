const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, countInStock, itemSpecifications } = req.body;

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            countInStock,
            itemSpecifications,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(500).json({ message: 'Server Error Creating Product' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, countInStock, itemSpecifications } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.imageUrl = imageUrl || product.imageUrl;
            product.countInStock = countInStock || product.countInStock;
            product.itemSpecifications = itemSpecification || product.itemSpecifications

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Server Error Updating Product' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await product.deleteOne();
        res.json({ message: 'Product Deleted'});
    } catch (err) {
        res.status(500).json({ message: 'Server Error Deleting Product' });
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
};
