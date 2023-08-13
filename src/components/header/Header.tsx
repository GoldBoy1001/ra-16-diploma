import "./styleHeader.css";

import logo from "../../img/header-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderForm from "../headerForm/HeaderForm";
import { useTypedSelector } from "../../hook/useTypedSelector";

export default function Header() {
  const { pathname } = useLocation();
  const activeLink = "nav-link active-header";
  const normalLink = "nav-link";
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const { cart } = useTypedSelector((state) => state);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };
  const navigateClick = () => {
    navigate(`/cart`);
  };

  useEffect(() => {
    setIsClicked(false);
  }, [pathname]);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link
                    className={pathname === "/" ? activeLink : normalLink}
                    to="/"
                  >
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      pathname === "/catalog" ? activeLink : normalLink
                    }
                    to="/catalog"
                  >
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={pathname === "/about" ? activeLink : normalLink}
                    to="/about"
                  >
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      pathname === "/contacts" ? activeLink : normalLink
                    }
                    to="/contacts"
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    onClick={handleClick}
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div
                    onClick={() => cart.length > 0 && navigateClick()}
                    className="header-controls-pic header-controls-cart"
                  >
                    {cart.length > 0 ? (
                      <div className="header-controls-cart-full">
                        {cart.length}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                  {isClicked && (
                    <HeaderForm removeForm={() => setIsClicked(false)} />
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
