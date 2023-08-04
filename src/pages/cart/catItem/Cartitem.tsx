import { useActions } from "../../../hook/useActions"
import { IProduct } from "../../../models/products"

interface CartProps {
	product: IProduct 
}

export default function CartItem({product}: CartProps) {
	
	const {removeItem, removeOrder} = useActions()
return (
	<tr>
		<td scope="row">1</td>
		<td><a href="/products/1.html">{product.title}</a></td>
		<td>18 US</td>
		<td>{}</td>
		<td>{product.price}</td>
		<td>{product.price}</td>
		<td><button
	 onClick={() => [removeItem(product), removeOrder(product)]}
	 className="btn btn-outline-del btn-sm">Удалить</button></td>
	 </tr>	
)
}