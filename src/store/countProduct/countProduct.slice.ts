import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Count_KEY = 'countk'

export interface ICount {
	count: number,
	size: string
}

const initialState: ICount[] = []


export const countSlice = createSlice({
	name: 'count',
	initialState,
	reducers: {
		addCount:(state, action:PayloadAction<ICount>) => {
			state.splice(0, state.length, action.payload);
		},
		removeCount:(state, action:PayloadAction<ICount>) => {
			const updateState = state.filter(p => p.size !== action.payload.size)
			state = updateState
			localStorage.setItem(Count_KEY, JSON.stringify(state))	
				return state
		},
		clearCount: (state) => {
			state = [];
			localStorage.removeItem(Count_KEY);
			return state;
		}
	}
})

export const countReducer = countSlice.reducer
export const countActions = countSlice.actions