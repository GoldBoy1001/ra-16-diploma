import { useDebounce } from '../../hook/debounce'
import { useState, useEffect } from 'react'
import './styleSearch.css'
import { useLazyProductsQuery } from '../../store/bosaNoga/bosaNoga.api'
import { useActions } from '../../hook/useActions'
import { useTypedSelector } from '../../hook/useTypedSelector'
import { useLocation } from 'react-router-dom'

export default function SearchForm ({searchCategory}: {searchCategory: string}) {
	const {pathname} = useLocation()
	const [fetchSearchCaregory, {data}] = useLazyProductsQuery()	
	const [search, setSearch] = useState('')
	const debounced = useDebounce(search);
	const {addItemSearch} = useActions()
	const text = useTypedSelector((state) => state.formText.addText)
	const {addText} = useActions()

	
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault()
		if (debounced.trim().length < 3) {
			return
			}	
			fetchSearchCaregory(`?categoryId=${searchCategory}&q=${debounced}`)
		
	}

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)				
	}
	
	
	useEffect(() => {
		addItemSearch(data || [])
	}, [data])
	useEffect(() => {
		setSearch(text)
	}, [text])

	useEffect(() => {
		if (searchCategory === "" || debounced.trim().length > 3 && searchCategory) {
		  fetchSearchCaregory(`?categoryId=${searchCategory}&q=${debounced}`);
		}
	 }, [searchCategory, fetchSearchCaregory]);
	
	useEffect(() => {
		if(text.trim().length > 0) {
			fetchSearchCaregory(`?categoryId=${searchCategory}&q=${text}`);
		} 
	}, [text])
	useEffect(() => {
		if (pathname != '/catalog.html') {
			addText('')
		}
	}, [pathname])

return (
	<form onSubmit={submitHandler}
	 className="catalog-search-form form-inline">
	<input
	type='text'
	 value={search}
	 onChange={changeHandler}
	 className="form-control" placeholder="Поиск"/>
 </form>
)
}