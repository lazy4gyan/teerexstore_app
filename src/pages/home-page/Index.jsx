import React, { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";
import Filter from "../../components/FilterComponent/Index";
import Products from "../../components/ProductComponent/Index";
import Search from "../../components/SearchbarComponent/Index";
import "./styles.scss";

const Home = () => {
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
          {globalStore.width > 600 && <Filter />}

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

export default Home;