const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    markOrderAsPaid,
    markOrderAsDelivered,
} = require('../controllers/orderController');

const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect)

router.post('/', placeOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', markOrderAsPaid);
router.put('/:id/deliver', admin, markOrderAsDelivered);
router.get('/', admin, getAllOrders);

module.exports = router;
