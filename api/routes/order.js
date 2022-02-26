const router = require('express').Router();
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');

const CryptoJS = require('crypto-js');
const Order = require('../models/Order');

// CREATE

router.post('/', verifyToken, async (req, res) => {
	try {
		const savedOrder = await Order.create(req.body);
		res.status(200).json(savedOrder);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// UPDATE

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET USER ORDERS

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.userId });
		res.send(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET MONTHLY INCOME STATS

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{
				$match: {
					createdAt: {
						$gte: previousMonth,
					},
				},
			},
			{
				$project: { month: { $month: '$createdAt' }, sales: '$amount' },
			},
			{
				$group: {
					_id: '$month',
					total: { $sum: '$sales' },
				},
			},
		]);

		res.status(200).json(income);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
