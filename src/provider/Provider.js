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
  const [selectedCategories, setSelectedCategories] = useState({
    Color: {
      Red: false,
      Blue: false,
      Green: false,
    },
    Gender: {
      Men: false,
      Women: false,
    },
    Price: {
      "0 - Rs. 250": false,
      "Rs. 251 - 450": false,
      "Rs. 451 & above": false,
    },
    Type: {
      Polo: false,
      Hoodie: false,
      Basic: false,
    },
  });
  const [filteredItems, setFilteredItems] = useState([]);

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

  
  function selectCategory(event) {
    const { name, value, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      return {
        ...prevSelectedCategories,
        [name]: {
          ...prevSelectedCategories[name],
          [value]: checked,
        },
      };
    });
  }

  useEffect(() => {
    let selectedOptions = [];
    let priceOptions = [];
    for (let category in selectedCategories) {
      for (let option in selectedCategories[category]) {
        if (selectedCategories[category][option]) {
          selectedOptions.push(option);
        }
      }
    }

    for (let i in selectedOptions) {
      if (selectedOptions[i].includes("0 - Rs. 250")) {
        priceOptions.push(0);
      } else if (selectedOptions[i].includes("Rs. 251 - 450")) {
        priceOptions.push(251);
      } else if (selectedOptions[i].includes("Rs. 451 & above")) {
        priceOptions.push(451);
      }
    }

    let selectedProducts = [];

      // filter for other options except price
    for (let product of productData) {
      for (let info in product) {
        if (selectedOptions.includes(product[info])) {
          selectedProducts.push(product);
        }
      }
    }
    // filter for price options
    if (priceOptions.length > 0) {

      for (let price in priceOptions) {
        if (priceOptions[price] === 0) {
          let val = [0, 250];
          productData.filter((items) => {
            if (items.price > val[0] && items.price <= val[1]) {
              selectedProducts.push(items);
            }
          });
        } else if (priceOptions[price] === 251) {
          let val = [251, 450];
          productData.filter((items) => {
            if (items.price > val[0] && items.price <= val[1]) {
              selectedProducts.push(items);
            }
          });
        } else if (priceOptions[price] === 451) {
          let val = [451, 100000];
          productData.filter((items) => {
            if (items.price > val[0] && items.price <= val[1]) {
              selectedProducts.push(items);
            }
          });
        }
      }
    }

    setFilteredItems(selectedProducts);
  }, [selectedCategories]);


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
        selectCategory,
        filteredItems,
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
