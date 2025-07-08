const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
    // getCart,
    // addToCart,
    // removeFromCart,
    // updateCartItem,
    // clearCart,

const getCart = asyncHandler(async  (req, res) => {
    let cart = await Cart.findOne({ user: req.user_id }).populate('items.product');

    if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
        await cart.save()
    }

    res.json(cart);
});

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user_id });

    if (!cart) {
        cart = new Cart({
            user: req.user_id,
            items: [{ product: productId, quantity }],
        });
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
    }

    const updatedCart = await cart.save()
    res.status(201).json(updatedCart)
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!item) {
        res.status(404);
        throw new Error('Product not in cart');
    }

    item.quantity = quantity;
    const updatedCart = await cart.save();
    res.json(updatedCart);
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        res.status(404);
        throw new Error('Product not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared' });
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
}
