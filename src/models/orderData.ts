export interface IOrderData {
	"owner": {
		"phone": string,
		"address": string,
	 },
	 "items": [
		{
		  "id": number,
		  "price": number,
		  "count": number
		}
	 ]
}