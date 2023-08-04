import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  isClickedCategory: string;
}

const initialState: CategoryState = {
  isClickedCategory: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setClickedCategory: (state, action: PayloadAction<string>) => {
      state.isClickedCategory = action.payload;
    },
  },
});

export const categoryAction = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;

