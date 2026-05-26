import { addressDummyData } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
	list: Address[];
}

const initialState: AddressState = {
	list: [addressDummyData as Address],
};

const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {
		addAddress: (state, action: PayloadAction<Address>) => {
			state.list.push(action.payload);
		},
	},
});

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;
