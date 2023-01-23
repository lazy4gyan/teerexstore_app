import { useContext } from "react";
import { GlobalContext } from "../../provider/Provider";
import Filter from "./Index";
import "./styles.scss";


const FilterComponent = () => {
  const globalStore = useContext(GlobalContext);
  const filterData = globalStore.FILTER_CATEGORY;
  const selectCategory = globalStore.selectCategory;

  const categoryComponents = filterData.map((categoryData) => {
    return (
      <Filter
        key={categoryData.id}
        type={categoryData.type}
        options={categoryData.options}
        handleClick={selectCategory}
      />
    );
  });

  return <div className="category_container">{categoryComponents}</div>;
};
export default FilterComponent;
