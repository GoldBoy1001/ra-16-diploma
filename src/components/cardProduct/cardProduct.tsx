import { Link } from 'react-router-dom'
import { IProduct } from "../../models/products"

import './styleCatalogItem.css'
import { useActions } from '../../hook/useActions'
import { useTypedSelector } from '../../hook/useTypedSelector'

interface ProductProps {
	product: IProduct
}

export default function CardProduct({product}: ProductProps) {
const {addOrder} = useActions()
const order= useTypedSelector((state) => state.order)
const {addPreload} = useActions()

const isExistInOrder = order.some(p => p.id === product.id)
function handlerClick() {
	if (!isExistInOrder) {
		addOrder(product)
	} 
	addPreload(true)
}
	
	
return (
	<div className="col-4">
                {<div className="card catalog-item-card">
						<div className="catalog-image"><img src={product.images[0]}
                    className="card-img-top catalog-img-fluid" alt="Босоножки 'MYER'"/></div>
                  
                  <div className="card-body">
                    <p className="card-text">{product.title}</p>
                    <p className="card-text">{product.price}</p>
                    <Link to={`/catalog/:${product.id}.html`}
						   onClick={handlerClick}
						   className="btn btn-outline-primary">Заказать</Link>
                  </div>
                </div>}
              </div>
)
}