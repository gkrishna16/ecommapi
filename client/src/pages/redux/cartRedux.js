// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState: {
// 		products: [],
// 		quantity: 0,
// 		total: 0,
// 	},

// 	reducers: {
// 		addProduct: (state, action) => {
// 			state.quantity += 1;
// 			state.products.push(action.payload);
// 			state.total += action.payload.price;
// 		},
// 	},
// });

// export const { addProduct } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		price: 0,
		quantity: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.price += action.payload.price;
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
