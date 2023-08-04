import './styleCatalog.css'

import SearchForm from '../searchCatalog/SearchForm'
import ErrorMessage from '../error/ErrorMeesage'
import Preload from '../preload/Preload'
import Button from '../button/Button'
import CardProduct from '../cardProduct/cardProduct'
import { useLocation, useNavigate } from 'react-router-dom'
import Categories from '../categories/Categories'
import { useProductsQuery } from '../../store/bosaNoga/bosaNoga.api'
import { useTypedSelector } from '../../hook/useTypedSelector'
import {useState,useEffect} from 'react'

export default function Catalog() {
	const {pathname} = useLocation()
	const {data = [], isLoading, isError} = useProductsQuery('')
	const catalog = useTypedSelector((state) => state.catalog)
	const preload = useTypedSelector((state) => state.preload.addPreload)
	const catalogLength = useTypedSelector((state) => state.catalogLengt.length)
	const clickedCategory = useTypedSelector((state) => state.category.isClickedCategory)
	const [more, setMore] = useState(true)
	const [onMore, setOnMore] = useState(false)
	const navigator =	useNavigate()
	function moreDel() {
		setOnMore(false)
		if (onMore) {
		     if (catalogLength === 0 || catalogLength < 6) {
		         setMore(false)
					return
		      }
		   } if (catalog.length < 6) {
		         setMore(false)
					return
		   } else {
		         setMore(true)
		   }
		}
		
	useEffect(()=> {
			moreDel();
	},[catalogLength, catalog])
	
	function handleClick() {
		if (onMore && catalog.length === 6 && catalogLength === 0) {
			setMore(false)
		}
 }
	useEffect(() => {
		if(!catalog){
			navigator('/')
		}
	}, [])
	
return (
<div>
	{!isError && <h2 className="text-center">Каталог</h2>}
		{pathname === '/catalog.html' && <SearchForm searchCategory={clickedCategory}/>}
		{!isLoading && !isError && <Categories />}
		{preload && <Preload/>}
		{isError && <ErrorMessage/>}
		<div className="catalog-row">
		{!isError && !preload && catalog?.map(product => <CardProduct product={product} key={product.id}/>)}
		</div>
		{!isError && !preload && more && <Button category={clickedCategory} onMore={() => [setOnMore(true), handleClick()]}/> }
</div>
)
}