import { Link } from "react-router-dom";
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
      <Link to="/">Teerex Store</Link>
      <div className="nav_category">
        <Link to="/product">Products</Link>
        <Link to="/cart">
          <div>
            <FaShoppingCart className="cart_icon" />
            {cartStatus > 0 && (
              <span className="card_status">{cartStatus}</span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
