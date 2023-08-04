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
