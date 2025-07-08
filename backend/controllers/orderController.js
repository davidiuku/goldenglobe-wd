const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

const placeOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items');
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
            res.json(order);
        } else {
            res.status(403);
            throw new Error('Not authorized to view this order');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}.populate('user', 'name email'));
    res.json(orders)
});

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
}
