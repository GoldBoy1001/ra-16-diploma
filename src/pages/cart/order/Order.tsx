import axios from "axios";
import { useState } from "react";
import { useTypedSelector } from "../../../hook/useTypedSelector";
import { IOrderData } from "../../../models/orderData";
import { useActions } from "../../../hook/useActions";
import { useNavigate } from "react-router-dom";

export default function OrderCart() {
  const [valuePhone, setValuePhone] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [error, setError] = useState("");
  const { clearCart } = useActions();
  const navigate = useNavigate();

  const cart = useTypedSelector((state) => state.cart);

  const items = cart.map((obj) => {
    const { title, size, ...rest } = obj;
    return { ...rest };
  });

  const productData: IOrderData = {
    owner: {
      phone: "",
      address: "",
    },
    items: [
      {
        id: 0,
        price: 0,
        count: 0,
      },
    ],
  };

  function validatePhoneNumber(phoneNumber: string) {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.charAt(0) === "+") {
      if (cleaned.length < 12) {
        setError('Длина номера должна быть не менее 12 цифр после символа "+"');
        return false;
      }
    } else {
      if (cleaned.length < 11) {
        setError('Длина номера должна быть не менее 11 цифр без символа "+"');
        return false;
      }
    }

    return true;
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validatePhoneNumber(valuePhone)) {
      productData.owner.phone = valuePhone;
    }
    if (valueAddress.trim().length > 5) {
      productData.owner.address = valueAddress;
    }
    productData.items.splice(0, productData.items.length, ...items);

    const response = await axios.post(
      "http://localhost:7070/api/order",
      productData
    );
    if (response.status < 400) {
      clearCart();
      setValueAddress("");
      setValuePhone("");
      navigate("/decorated");
    }
  }

  function changePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setValuePhone(e.target.value);
  }
  function changeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setValueAddress(e.target.value);
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form onSubmit={submitHandler} className="card-form-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              value={valuePhone}
              onChange={changePhone}
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
            />
            {error && <p className="error">{error}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              value={valueAddress}
              onChange={changeAddress}
              className="form-control form-control-margin"
              id="address"
              placeholder="Адрес доставки"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}
