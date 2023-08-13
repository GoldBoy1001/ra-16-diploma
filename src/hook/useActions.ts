import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { cartActions } from "../store/cart/cart.slice"
import { orderActions } from "../store/order/order.slice"
import { catalogActions } from "../store/catalog/catalog.slice"
import { categoryAction} from "../store/categories/category.slice"
import { catalogLengthActions } from "../store/catalogLength/catalogLength.slice"
import { formTextAction } from "../store/formText/formText.slice"
import { preloadAction } from "../store/preload/preload.slice"
import { countActions } from "../store/countProduct/countProduct.slice"




const AllActions = {
	...cartActions,
	...orderActions,
	...catalogActions,
	...categoryAction,
	...catalogLengthActions,
	...formTextAction,
	...preloadAction,
	...countActions
}




export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(AllActions, dispatch)
}