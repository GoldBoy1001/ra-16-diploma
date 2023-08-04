import { Link } from "react-router-dom"
import { IProduct } from "../../../models/products"
import { useCount } from "../../../hook/useCount"
import { useActions } from "../../../hook/useActions"
import { useTypedSelector } from "../../../hook/useTypedSelector"
import { useState } from "react"


interface OrderProps {
	product: IProduct
}

export default function OrderItem({product}: OrderProps) {
	const [orderSize, setOrderSize] = useState(false)
	const [orderItemSize, setOrderItemSize] = useState('')
	const [isDisabled, setIsDisabled] = useState('disabled-button');
	const {quantity, increase, decrease} = useCount(1)
	const {addItem} = useActions()
	const cart = useTypedSelector(state => state.cart)
	const isExistInCart = cart.some(p => p.id === product.id)


	function orderSizeClick(item:string) {
		setOrderItemSize(item)
		setOrderSize(true)
		setIsDisabled('');
	}

return (
	<>
							<h2 key={product.id} className="text-center">{product.title}</h2>
							<div className="row-order">
								<div className="col-5">
										<img src={product.images[0]}
											className="img-fluid" alt={product.title}/>
								</div>
								<div className="col-7">
										<table className="table table-bordered">
											<tbody>
												<tr>
														<td>Артикул</td>
														<td>1000046</td>
												</tr>
												<tr>
														<td>Производитель</td>
														<td>PAUL ANDREW</td>
												</tr>
												<tr>
														<td>Цвет</td>
														<td>Чёрный</td>
												</tr>
												<tr>
														<td>Материалы</td>
														<td>Кожа</td>
												</tr>
												<tr>
														<td>Сезон</td>
														<td>Лето</td>
												</tr>
												<tr>
														<td>Повод</td>
														<td>Прогулка</td>
												</tr>
											</tbody>
										</table>
										<div className="text-center">
											<p className=''>Размеры в наличии: <span
											onClick={()=> orderSizeClick('item1')}
											 className={orderItemSize === 'item1' ? 'catalog-item-size selected' : `catalog-item-size`}>18 US</span> <span
											 onClick={()=> orderSizeClick('item2')}
											  className={orderItemSize === 'item2' ? 'catalog-item-size selected' : `catalog-item-size`}>20 US</span></p>
											<p>Количество: <span className="btn-group btn-group-sm pl-2">
														<button onClick={decrease} className="btn btn-secondary">-</button>
														<span className="btn btn-outline-order">{quantity}</span>
														<button onClick={increase} className="btn btn-secondary">+</button>
												</span>
											</p>
										</div>
										 <Link to='/cart.html'
										onClick={() => !isExistInCart && addItem(product)}
										className={`btn btn-danger btn-block btn-lg ${isDisabled}`}>В корзину</Link>
								</div>
							</div>
							</>
)
}