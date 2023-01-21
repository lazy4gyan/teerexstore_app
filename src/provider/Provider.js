import React, { createContext, useState, useEffect } from "react";
import { BASEURL, MOBILE_VIEW, FILTER_CATEGORY } from "../utils/Constants";

export const GlobalContext = createContext({});

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const GlobalProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function getAllData() {
      try {
        const res = await fetch(
          `${BASEURL}/coding-problems/shopping-cart/catalogue.json`
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();
        setProductData(data);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
    getAllData();
  }, []);

  const onSearchChange = (e) => {
    setSearchedText(e.target.value);
  };

  const searchResult = productData.filter((product) =>
    product.name.toLowerCase().includes(searchedText.toLowerCase())
  );

  const addToCartHandler = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                amount: cartItem.amount + 1,
              }
            : cartItem
        )
      );
      return;
    }
    setCart((cart) => [...cart, { ...item, amount: 1 }]);
  };

  const handleCartChange = (id, x) => {
    setCart((cart) =>
      cart.flatMap((cartItem) =>
        cartItem.id === id
          ? cartItem.amount + x < 1
            ? []
            : [
                {
                  ...cartItem,
                  amount: cartItem.amount + x,
                },
              ]
          : [cartItem]
      )
    );
  };

  const handleCartItemDelete = (id) => {
    const newList = cart.filter((item) => item.id !== id);
    setCart(newList);
  };

  return (
    <GlobalContext.Provider
      value={{
        productData,
        productList: productData,
        cart,
        FILTER_CATEGORY,
        onSearchChange,
        searchResult,
        addToCartHandler,
        handleCartChange,
        handleCartItemDelete,
        width: windowDimensions.width,
        error: errorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
