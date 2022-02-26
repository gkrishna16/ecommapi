const User = require('../models/User');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTER ---------------------------------------------------------------------------------

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = new User({
		username: username,
		email: email,
		password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
	});
	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// LOGIN  -----------------------------------------------------------------------------------

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(401).json({ error: `Wrong (username) credentials.` });

		const hashesPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC,
		);
		const OriginalPassword = hashesPassword.toString(CryptoJS.enc.Utf8);
		OriginalPassword !== req.body.password &&
			res.status(401).json({ error: `Credentials (password) invalid.` });

		const accessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SEC_KEY,
			{ expiresIn: '3d' },
		);
		const { password, ...others } = user._doc;

		res.status(200).json({ ...others, accessToken });
	} catch (error) {
		res.status(500).json({ error: error, message: error.message });
	}
});

module.exports = router;

// --------------------------------------------------------------------------------------
