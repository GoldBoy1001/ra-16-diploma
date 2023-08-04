import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products";

const Cart_KEY = 'cartk'

const initialState: IProduct[] = [
	...JSON.parse(localStorage.getItem(Cart_KEY) ?? '[]')
]


export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem:(state, action:PayloadAction<IProduct>) => {
			state.push(action.payload)
	   	localStorage.setItem(Cart_KEY, JSON.stringify(state))
		
		},
		removeItem:(state, action:PayloadAction<IProduct>) => {
			const updateState = state.filter(p => p.id !== action.payload.id)
			state = updateState
			localStorage.setItem(Cart_KEY, JSON.stringify(state))	
				return state
		},
		clearCart: (state) => {
			state = [];
			localStorage.removeItem(Cart_KEY);
			return state;
		}
	}
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions