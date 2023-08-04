import { useTypedSelector } from "../../hook/useTypedSelector";
import { IProduct } from "../../models/products";

import CartItem from "./catItem/Cartitem";
import OrderCart from "./order/Order";

import './styleCartItem.css'



export default function Cart() {	
	const {cart} = useTypedSelector(state => state)
	
	const allPrice = cart.map((prduct: IProduct) => prduct.price)
	const inTotal = allPrice.reduce((ac: number, i: number ) => {
		return ac + i
	}, 0);

return (
	<>
	<section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
               <tbody>
						{ cart?.map((product: IProduct) =>  <CartItem product={product} key={product.id}/> )}
                <tr>
                  <td colSpan={5} className="text-right">Общая стоимость</td>
                  <td>{inTotal}</td>
                </tr>
              </tbody> 
            </table>
          </section>
			 <OrderCart/>
	</>
)
}