require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// IMPORT ROUTES -- start
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/stripe');

// IMPORT ROUTES -- end

const port = process.env.PORT || 5001;
const mongoose = require('mongoose');

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log(`-----  DATABASE CONNECTED  -----`))
	.catch((err) => console.log(err));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', paymentRoute);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
