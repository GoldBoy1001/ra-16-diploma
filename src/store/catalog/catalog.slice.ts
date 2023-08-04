import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products";

const initialState:IProduct[] = []

export const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		addItemCatalog:(state, action:PayloadAction<IProduct[]>) => {
			state.splice(0, state.length, ...action.payload);
		},
		addMore:(state, action:PayloadAction<IProduct[]>) => {
			action.payload.forEach((product) => {
				// Проверяем, есть ли такой товар в массиве
				const existingProduct = state.find((p) => p.id === product.id);
				if (!existingProduct) {
				  state.push(product);
				}
			 });
		},
		addItemSearch:(state, action:PayloadAction<IProduct[]>) => {
			state.splice(0, state.length, ...action.payload);
		},
		removeCatalogItem:(state) => {
			state.splice(0, state.length)
		},
	}
})

export const catalogReducer = catalogSlice.reducer
export const catalogActions = catalogSlice.actions