import { productDummyData } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
	list: Product[];
}

const initialState: ProductState = {
	list: productDummyData as unknown as Product[],
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProduct: (state, action: PayloadAction<Product[]>) => {
			state.list = action.payload;
		},
		clearProduct: (state) => {
			state.list = [];
		},
	},
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
