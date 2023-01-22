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
      className="filters"
        key={categoryData.id}
        type={categoryData.type}
        options={categoryData.options}
        handleClick={selectCategory}
      />
    );
  });

  return <>{categoryComponents}</>;
};
export default FilterComponent;
