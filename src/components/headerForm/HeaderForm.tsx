import { useState } from 'react'
import './styleHeaderForm.css'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hook/useActions'

interface FormRemoveProps {
	removeForm: () => void
}

export default function HeaderForm({removeForm}: FormRemoveProps) {
	const [value,setValue] = useState('')
	const navigate = useNavigate()
	const {addText} = useActions()
	
	function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setValue('')
		if( value.trim().length === 0) {
			return removeForm()
		}
		addText(value)
		removeForm()
		navigate('/catalog.html')
	}
	function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)		
	}
	
return (
	<form onSubmit={submitHandler} data-id="search-form" className="header-controls-search-form form-inline invisible">
					<input
					autoFocus
					className="form-control" placeholder="Поиск"
					value={value}
					onChange={changeHandler} />
				 </form>
)
}
