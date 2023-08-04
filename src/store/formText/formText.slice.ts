import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
	addText: string;
 }
 
 const initialState: CategoryState = {
	addText: "",
 };

export const formTextSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<string>) => {
      state.addText = action.payload;
    },
  },
});

export const formTextAction = formTextSlice.actions;
export const formTextReducer = formTextSlice.reducer;

