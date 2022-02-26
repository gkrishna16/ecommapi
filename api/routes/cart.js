const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');

const CryptoJS = require('crypto-js');
const router = require('express').Router();
const Cart = require('../models/Cart');

//  CREATE A CREATE

router.post('/', verifyToken, async (req, res) => {
	// const newCart = new Cart(req.body);
	try {
		const savedCart = await Cart.create(req.body);
		// await newCart.save;
		res.status(200).json(savedCart);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// UPDATE A CART

router.post('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updateCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);
		res.status(200).json(updateCart);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// DELETE USERS

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.json(`Cart has been deleted.`);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET USER CART

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.userId });
		res
			.status(200)
			.res.json({ cartDeleted: cart, message: `Cart has been deleted.` });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
