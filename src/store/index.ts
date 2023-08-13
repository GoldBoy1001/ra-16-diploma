import { configureStore } from "@reduxjs/toolkit";
import { bosaNogaApi } from "./bosaNoga/bosaNoga.api";
import { cartReducer } from "./cart/cart.slice";
import { orderReducer } from "./order/order.slice";
import { catalogReducer } from "./catalog/catalog.slice";
import { categoryReducer } from "./categories/category.slice";
import { catalogLengthReducer } from "./catalogLength/catalogLength.slice";
import { formTextReducer } from "./formText/formText.slice";
import { preloadReducer } from "./preload/preload.slice";
import { countReducer } from "./countProduct/countProduct.slice";


export const store = configureStore({
	reducer: {
		[bosaNogaApi.reducerPath]: bosaNogaApi.reducer,
		cart: cartReducer,
		order: orderReducer,
		catalog: catalogReducer,
		category: categoryReducer,
		catalogLengt: catalogLengthReducer,
		formText: formTextReducer,
		preload: preloadReducer,
		count: countReducer
	},
	middleware:(getDefaultMiddleware) =>
		getDefaultMiddleware().concat(bosaNogaApi.middleware)
})

export type TypeRootState = ReturnType<typeof store.getState>