import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products";

const initialState:IProduct[] = []

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addOrder:(state, action:PayloadAction<IProduct>) => {
			// state.push(action.payload)
			state.splice(0, state.length, action.payload);
		},
		removeOrder:(state, action:PayloadAction<IProduct>) => {
			const updateState = state.filter(p => p.id !== action.payload.id)
			state = updateState	
			return state
		}
	}
})

export const orderReducer = orderSlice.reducer
export const orderActions = orderSlice.actions