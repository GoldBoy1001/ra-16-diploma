import { useEffect } from "react";

import './stileCategiry.css'
import { useActions } from "../../hook/useActions";
import { useLazyProductsQuery } from "../../store/bosaNoga/bosaNoga.api";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useLocation } from "react-router-dom";


export default function Categories() {
	const [fetchCategory, {data, isFetching}] = useLazyProductsQuery()
	const {pathname} = useLocation()
	const {addPreload} = useActions()

	const {addItemCatalog, setClickedCategory} = useActions()

	const clickedCategory = useTypedSelector((state) => state.category.isClickedCategory)	
	
	
	const handlerCategory =(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: string) => {
		e.preventDefault()
			if (clickedCategory === item) {
				return
			}
			fetchCategory(`?categoryId=${item}`)
			setClickedCategory(item)
	}
	
	useEffect(() => {
			addPreload(isFetching)
	}, [isFetching])
	
	
	useEffect(() => {
		if (!clickedCategory) {
			fetchCategory(``);
			setClickedCategory(' ');
		 }
		addItemCatalog(data || [])
	}, [data])
	useEffect(() => { 
			fetchCategory(``);
			setClickedCategory(' ');
		   addItemCatalog(data || [])
	}, [pathname])
	
	
return (
	<>
	<ul className="catalog-categories nav justify-content-center">
	<li className="nav-item">
	  <a
	  onClick={(e) => handlerCategory( e, ' ')}
		className={ clickedCategory === ' ' ? "nav-link active" : "nav-link"} href="">Все</a>
	</li>
	<li className="nav-item">
	  <a
	  onClick={(e) =>handlerCategory(e, '12')}
	  className={clickedCategory === '12' ? "nav-link active" : "nav-link"} href="#">Женская обувь</a>
	</li>
	<li className="nav-item">
	  <a
	  onClick={(e) => handlerCategory(e,'13')}
		className={clickedCategory === '13' ? "nav-link active" : "nav-link"} href="#">Мужская обувь</a>
	</li>
	<li className="nav-item">
	  <a
	  onClick={(e) => handlerCategory(e, '14')}
		className={clickedCategory === '14' ? "nav-link active" : "nav-link"} href="#">Обувь унисекс</a>
	</li>
	<li className="nav-item">
	  <a
	  onClick={(e) => handlerCategory(e, '15')}
		className={clickedCategory === '15' ? "nav-link active" : "nav-link"} href="#">Детская обувь</a>
	</li>
 </ul>
 </>
)
}