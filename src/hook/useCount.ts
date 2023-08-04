import {useState} from 'react'

export function useCount(initialValue:number) {
	const [quantity, setQuantity] = useState(initialValue);

	const increase = () => {
		setQuantity(quantity + 1);
	 };
  
	 const decrease = () => {
		if (quantity > 1) {
		  setQuantity(quantity - 1);
		}
	 };
  
	 return {
		quantity,
		increase,
		decrease,
	 };
}