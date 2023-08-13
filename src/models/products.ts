export interface IProduct {
	id: number,
	title: string,
	category?: number,
	price: number,
	images: [
		string,
		string
	]
}
export interface IProductCart {
	id: number,
	title: string,
	price: number,
	count: number,
	size: string
}
