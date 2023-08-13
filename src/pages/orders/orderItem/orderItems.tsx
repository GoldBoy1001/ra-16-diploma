import { Link } from "react-router-dom";
import { IProduct, IProductCart } from "../../../models/products";
import { useCount } from "../../../hook/useCount";
import { useActions } from "../../../hook/useActions";
import { useTypedSelector } from "../../../hook/useTypedSelector";
import { useState, useEffect } from "react";

interface OrderProps {
  product: IProduct;
  productCart: IProductCart;
}

export default function OrderItem({ product, productCart }: OrderProps) {
  const [orderSize, setOrderSize] = useState(false);
  const [orderItemSize, setOrderItemSize] = useState("");
  const [isDisabled, setIsDisabled] = useState("disabled-button");
  const { quantity, increase, decrease } = useCount(1);
  const { addItem, addCount, existingProduct } = useActions();
  const cart = useTypedSelector((state) => state.cart);
  const isExistInCart = cart.some(
    (p) => p.id === productCart.id && p.size === productCart.size
  );
  console.log(isExistInCart);

  function orderSizeClick(item: string) {
    setOrderItemSize(item);
    setOrderSize(true);
    setIsDisabled("");
    addCount({ count: quantity, size: orderItemSize });
  }
  useEffect(() => {
    addCount({ count: quantity, size: orderItemSize });
  }, [quantity, orderItemSize]);

  return (
    <>
      <h2 key={product.id} className="text-center">
        {product.title}
      </h2>
      <div className="row-order">
        <div className="col-5">
          <img
            src={product.images[0]}
            className="img-fluid"
            alt={product.title}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>1000046</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>PAUL ANDREW</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>Чёрный</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>Кожа</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>Лето</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>Прогулка</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p className="">
              Размеры в наличии:{" "}
              <span
                onClick={() => orderSizeClick("18")}
                className={
                  orderItemSize === "18"
                    ? "catalog-item-size selected"
                    : `catalog-item-size`
                }
              >
                18 US
              </span>{" "}
              <span
                onClick={() => orderSizeClick("20")}
                className={
                  orderItemSize === "20"
                    ? "catalog-item-size selected"
                    : `catalog-item-size`
                }
              >
                20 US
              </span>
            </p>
            <p>
              Количество:{" "}
              <span className="btn-group btn-group-sm pl-2">
                <button onClick={decrease} className="btn btn-secondary">
                  -
                </button>
                <span className="btn btn-outline-order">{quantity}</span>
                <button onClick={increase} className="btn btn-secondary">
                  +
                </button>
              </span>
            </p>
          </div>
          <Link
            to="/cart"
            onClick={() =>
              !isExistInCart
                ? addItem(productCart)
                : existingProduct(productCart)
            }
            className={`btn btn-danger btn-block btn-lg ${isDisabled}`}
          >
            В корзину
          </Link>
        </div>
      </div>
    </>
  );
}
