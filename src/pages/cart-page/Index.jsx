import React from "react";
import Cart from "../../components/CartComponent/Index";
import "./styles.scss"

const CartPage = () => {
  return (
    <div>
      <h1 className="page_heading">Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
