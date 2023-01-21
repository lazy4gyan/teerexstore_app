import { useState, useContext, useRef } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { GlobalContext } from "../../provider/Provider";
import Filter from "../FilterComponent/Index";
import "./styles.scss";

const Search = () => {
  const [filterToggle, setFilterToggle] = useState(false);
  const globalStore = useContext(GlobalContext);

  return (
    <div className="explore--container">
      <span className="search--container">
        <input
          className="search--field"
          type="search"
          placeholder="Search for products"
          onChange={globalStore.onSearchChange}
        />
        <FaSearch className="search-icon" />
      </span>
      {globalStore?.width <= 600 && (
        <FaFilter
          className="filter-icon"
          onClick={() => setFilterToggle(!filterToggle)}
        />
      )}

      {globalStore.width < 600 && filterToggle && (
        <div className="filter-toggle">
          <Filter />
        </div>
      )}
    </div>
  );
};

export default Search;