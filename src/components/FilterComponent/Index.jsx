// import { useContext } from "react";
// import { GlobalContext } from "../../provider/Provider";
import "./styles.scss";

// const Filter = () => {
//   const globalStore = useContext(GlobalContext);
//   const filterData = globalStore.FILTER_CATEGORY;

//   const optionElements = filterData.map((categories) => {
//     return (
//       <section className="filter_container" key={categories.id}>
//         <h2 className="category_filter--heading">{categories.type}</h2>

//         {categories.options.map((option) => {
//           return (
//             <div className="filter_option" key={option.key}>
//               <input
//                 type="checkbox"
//                 id={option.key}
//                 name={categories.type}
//                 value={option.value}
//                 onChange={globalStore.selectCategory}
//               />
//               <label className="filter_type" htmlFor={option.key}>
//                 {option.key}
//               </label>
//             </div>
//           );
//         })}
//       </section>
//     );
//   });

//   return <div className="filters">{optionElements}</div>;
// };
// export default Filter;

const Filter = (props) => {
  const filterOptions = props.options.map((option) => {
    return (
      <div className="filter_option" key={option.key}>
        <input
          type="checkbox"
          id={option.key}
          name={props.type}
          value={option.key}
          onChange={props.handleClick}
        />
        <label htmlFor={option.key}>{option.key}</label>
      </div>
    );
  });
  return (
    <div className="filter_container">
      <h2 className="category_filter--heading">{props.type}</h2>
      {filterOptions}
    </div>
  );
};
export default Filter;

