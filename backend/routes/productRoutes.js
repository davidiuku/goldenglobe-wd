const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/', getProductById);


router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/', protect, admin, createProduct);


module.exports = router;
