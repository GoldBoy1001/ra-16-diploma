import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProductCart } from "../../models/products";

const Cart_KEY = 'cartk'
const initialState: IProductCart[] = [
	...JSON.parse(localStorage.getItem(Cart_KEY) ?? '[]')
]


export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem:(state, action:PayloadAction<IProductCart>) => {
			state.push(action.payload)
	   	localStorage.setItem(Cart_KEY, JSON.stringify(state))
		
		},
		removeItem:(state, action:PayloadAction<IProductCart>) => {
			const updateState = state.filter(p => p.id !== action.payload.id || p.size !== action.payload.size) 
			
			state = updateState
			localStorage.setItem(Cart_KEY, JSON.stringify(state))	
				return state
		},
		clearCart: (state) => {
			state = [];
			localStorage.removeItem(Cart_KEY);
			return state;
		},
		existingProduct: (state, action:PayloadAction<IProductCart>) => {
			const existProduct = state.findIndex(
				(p) => p.id === action.payload.id && p.size === action.payload.size
			 );
			 if(existProduct !== -1) {
				const isExist = state.map((p, i)=> {
					if ( i === existProduct) {
						return {
							...p,
							count: p.count + action.payload.count
						}
					}
					return p
				});
				state = isExist
			 }
			 localStorage.setItem(Cart_KEY, JSON.stringify(state))	
			 return state
		}
	}
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions