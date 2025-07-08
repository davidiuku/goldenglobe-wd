const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
} = require('../controllers/orderController');

const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect)

router.post('/', placeOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.get('/', admin, getAllOrders)

module.exports = router;
