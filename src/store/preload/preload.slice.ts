import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreloadState {
	addPreload: boolean;
	removeMore:boolean
}

const initialState: PreloadState = {
	addPreload: false,
	removeMore: false
};

export const preloadSlice = createSlice({
  name: "preload",
  initialState,
  reducers: {
    addPreload: (state, action: PayloadAction<boolean>) => {
      state.addPreload = action.payload;
    },
    removeMore: (state, action: PayloadAction<boolean>) => {
      state.removeMore = action.payload;
    },
  },
});

export const preloadAction = preloadSlice.actions;
export const preloadReducer = preloadSlice.reducer;

