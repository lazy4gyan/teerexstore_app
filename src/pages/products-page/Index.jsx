import React, { useContext } from "react";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import Products from "../../components/ProductComponent/Index";
import Search from "../../components/SearchbarComponent/Index";
import { GlobalContext } from "../../provider/Provider";

const ProductPage = () => {
  const globalStore = useContext(GlobalContext);

  return (
    <div>
      <Search />
      {globalStore.error ? (
        <div style={{ width: "100%" }}>
          Sorry, there is an error. Please refresh again later.
        </div>
      ) : (
        <div className="home_container">
          {globalStore.width > 600 
          && 
          <div style={{border:1,borderStyle:"groove", height:"58vh"}}><FilterComponent /></div>
          }
          {globalStore.productList.length > 0 ? (
            <Products />
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
