import Preload from '../../components/preload/Preload'
import { useActions } from '../../hook/useActions'
import { useTypedSelector } from '../../hook/useTypedSelector'
import OrderItem from './orderItem/orderItems'

import './styleOreder.css'

export default function Orders() {
	const {order} = useTypedSelector(state => state)
	const {addPreload} = useActions()
	
	const addload = useTypedSelector(store => store.preload.addPreload)
	setTimeout(() => {
		if (order) {
			addPreload(false)
		}
	},300)
	


return (
	<section className="catalog-item">
						{addload ? <Preload/> : order.map(product => <OrderItem product={product} key={product.id}/>)}
                </section>
)
}