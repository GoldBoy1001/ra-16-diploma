import { Route, Routes } from 'react-router'

import Home from '../../pages/home/Home'
import About from '../../pages/about/About'
import Contacts from '../../pages/contacts/Contacts'
import Catalog from '../catalog/Catalog'
import './styleMain.css'

import banner from '../../img/banner.jpg'
import Orders from '../../pages/orders/Orders'
import Cart from '../../pages/cart/Cart'


export default function Main() {
return (
	<main className="container wr">
	<div className="row">
	  <div className="col">
		 <div className="banner">
			<img src={banner} className="img-fluid" alt="К весне готовы!"/>
			<h2 className="banner-header">К весне готовы!</h2>
		 </div>
		 <Routes>
			<Route path='/' element={<Home/>}></Route>
			<Route path='/catalog.html' element={<Catalog/>}></Route>
			<Route path='/contacts.html' element={<Contacts/>}></Route>
			<Route path='/about.html' element={<About/>}></Route>
			<Route path={`/catalog/:id.html`} element={<Orders/>}></Route>
			<Route path={`/cart.html`} element={<Cart/>}></Route>
		 </Routes>
	  </div>
	</div>
 </main>
)
}