import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../models/products'



export const bosaNogaApi = createApi({
	reducerPath: 'bosanoga/api',
	baseQuery: fetchBaseQuery({baseUrl:'http://localhost:7070/api/'}),
	endpoints: build => ({
		products: build.query<IProduct[], string>({
			query: (i: string) => ({
				url: `items${i}`,
			})
		}),
		hits: build.query<IProduct[], string>({
			query: (i: string) => ({
				url: `top-sales${i}`,
			}),
		}),
	})
})


export const {useProductsQuery, useHitsQuery, useLazyProductsQuery} = bosaNogaApi




