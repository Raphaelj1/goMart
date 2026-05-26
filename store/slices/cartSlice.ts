import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	total: number;
	cartItems: Record<string, number>;
}

const initialState: CartState = {
	total: 0,
	cartItems: {},
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<{ productId: string }>) => {
			const { productId } = action.payload;

			if (state.cartItems[productId]) {
				state.cartItems[productId]++;
			} else {
				state.cartItems[productId] = 1;
			}
			state.total += 1;
		},
		removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
			const { productId } = action.payload;

			// Safety Check: Only decrement if the item actually exists in the cart
			if (state.cartItems[productId] && state.cartItems[productId] > 0) {
				state.cartItems[productId]--;
				state.total -= 1; // Moved inside the safety check block

				if (state.cartItems[productId] === 0) {
					delete state.cartItems[productId];
				}
			}
		},
		deleteItemFromCart: (state, action: PayloadAction<{ productId: string }>) => {
			const { productId } = action.payload;

			// Safety Check: Only adjust the total if the item exists
			if (state.cartItems[productId]) {
				state.total -= state.cartItems[productId];
				delete state.cartItems[productId];
			}
		},
		clearCart: (state) => {
			state.cartItems = {};
			state.total = 0;
		},
	},
});

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
