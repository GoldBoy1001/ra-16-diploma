import { useActions } from "../../../hook/useActions";
import { IProductCart } from "../../../models/products";

interface CartProps {
  product: IProductCart;
  numberOf: number;
}

export default function CartItem({ product, numberOf }: CartProps) {
  const { removeItem } = useActions();

  return (
    <tr>
      <td scope="row">{numberOf}</td>
      <td>
        <a href="/products/1">{product.title}</a>
      </td>
      <td> {product.size} US</td>
      <td>{product.count}</td>
      <td>{product.price}</td>
      <td>{product.price * product.count}</td>
      <td>
        <button
          onClick={() => [removeItem(product)]}
          className="btn btn-outline-del btn-sm"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}
