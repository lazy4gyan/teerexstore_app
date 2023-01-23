import React, { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";
import Products from "../../components/ProductComponent/Index";
import Search from "../../components/SearchbarComponent/Index";
import "./styles.scss";
import FilterComponent from "../../components/FilterComponent/FilterComponent";

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
          {globalStore.width > 600 
          && <div style={{border:1,borderStyle:"groove", height:"58vh"}}><FilterComponent /></div>
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

export default Home;
