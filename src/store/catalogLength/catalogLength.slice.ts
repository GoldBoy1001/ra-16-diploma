import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products";

const initialState:IProduct[] = []

export const catalogLengthSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		addLengthCatalog:(state, action:PayloadAction<IProduct[]>) => {
			state.splice(0, state.length, ...action.payload);
		},
	}
})

export const catalogLengthReducer = catalogLengthSlice.reducer
export const catalogLengthActions = catalogLengthSlice.actions