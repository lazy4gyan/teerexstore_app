import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.scss";
import { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";

const Navigation = () => {
  const globalStore = useContext(GlobalContext);
  const cartItems = globalStore.cart;
  const cartStatus = cartItems.reduce((total, item) => total + item.amount, 0);
  return (
    <nav>
      <NavLink activeClassName='active' to="/">Teerex Store</NavLink>
      <div className="nav_category">
        <NavLink activeClassName='active' to="/product">Products</NavLink>
        <NavLink activeClassName='active' to="/cart">
          <>
            <FaShoppingCart className="cart_icon" />
            {cartStatus > 0 && (
              <span className="card_status">{cartStatus}</span>
            )}
          </>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
