import { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";
import "./styles.scss";

export default function Products() {
  const globalStore = useContext(GlobalContext);
  const productData = globalStore.productData;
  const handleChange = globalStore.handleCartChange;
  const cartItems = globalStore.cart;
  const searchedItems = globalStore.searchResult;
  const addToCartHandler = globalStore.addToCartHandler;

  let items;

  searchedItems.length > 0 ? (items = searchedItems) : (items = productData);

  const productCard = items.map((item) => {
    const present = cartItems.find((x) => x.id === item.id)?.amount;

    const itemLimitExceeds = () =>
      cartItems.find((x) => x.id === item.id)?.amount >= item.quantity
        ? true
        : false;

    return (
      <div className="product_card" key={item.id}>
        <div className="product_style">
          <span className="product_name">{item.name}</span>
          <img
            className="product_image"
            src={item.imageURL}
            alt={`${item.name}`}
          />
        </div>
        <div className="product_details">
          <span className="product_price">&#8377; {item.price}</span>
          {present > 0 ? (
            <div className="cart_card-quantity">
              <button className="btn" onClick={() => handleChange(item.id, -1)}>
                &#8722;
              </button>
              <span>{cartItems.find((x) => x.id === item.id)?.amount}</span>
              <button
                className="btn"
                onClick={() =>
                  itemLimitExceeds() ? alert("Limit") : handleChange(item.id, 1)
                }
              >
                &#43;
              </button>
            </div>
          ) : (
            <button onClick={() => addToCartHandler(item)}>Add to cart</button>
          )}
        </div>
      </div>
    );
  });

  return <div className="card_container">{productCard}</div>;
}
