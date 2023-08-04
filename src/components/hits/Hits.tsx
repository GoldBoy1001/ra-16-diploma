import './styleHits.css'

import CardProduct from '../cardProduct/cardProduct'
import ErrorMessage from '../error/ErrorMeesage'
import Preload from '../preload/Preload'
 import { useHitsQuery } from '../../store/bosaNoga/bosaNoga.api'

export default function Hits() {
	 const {data: hits, isLoading: loadingHits, isError: errorHits} = useHitsQuery('/')
	return (
	<>
	{loadingHits && <Preload/>}
					{errorHits && <ErrorMessage/>}
					{!errorHits && <h2 className="text-center">Хиты продаж!</h2>}
            <div className="hits-row">
            {hits?.map(hits => <CardProduct product={hits} key={hits.id}/>)}
            </div>
	</>
)
}