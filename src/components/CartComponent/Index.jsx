import { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";
import "./styles.scss";

export default function Cart() {
  const globalStore = useContext(GlobalContext);
  const handleDelete = globalStore.handleCartItemDelete;
  const handleChange = globalStore.handleCartChange;
  const cartItems = globalStore.cart;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );

  const renderCart = cartItems.map((item, index) => {
    const itemLimitExceeds = () =>
      cartItems.find((x) => x.id === item.id)?.amount >= item.quantity
        ? true
        : false;
    return (
      <section className="cart_card-container" key={index}>
        <img className="cart_card-image" src={item.imageURL} alt="item" />
        <div className="cart_card-info">
          <span className="cart_card-name">{item.name}</span>
          <span className="cart_card-price"> &#x20B9; {item.price}</span>
        </div>
        <div className="cart_card-quantity">
          <span className="cart_card-label">Quantity</span>
          <div className="cart_card-quantity_container">
            <button className="plus_btn" onClick={() => handleChange(item.id, -1)}>
              &#8722;
            </button>
            <span class="cart_qty">{item.amount}</span>
            <button className="minus_btn" onClick={() => itemLimitExceeds() ? alert("limit reached") : handleChange(item.id, 1)}>
              &#43;
            </button>
          </div>
        </div>
        <button className="delete_btn" onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </section>
    );
  });

  return (
    <article className="cart_container">
      {renderCart.length > 0 ? (
        <>
          {renderCart}
          <div>
            <span style={{fontSize:"20px",fontWeight:"500", marginBottom:"2rem"}}>Total : {totalPrice}</span>
          </div>
        </>
      ) : (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh"}}>
          Your cart is empty !
        </div>
      )}
    </article>
  );
}
