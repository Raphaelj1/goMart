import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import addressReducer from './slices/addressSlice';
import ratingReducer from './slices/ratingSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			cart: cartReducer,
			product: productReducer,
			address: addressReducer,
			rating: ratingReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
