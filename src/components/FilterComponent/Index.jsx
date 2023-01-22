import "./styles.scss";

const Filter = (props) => {
  const filterOptions = props.options.map((option) => {
    return (
      <div className="filter_option" key={option.key}>
        <input
        className="check_input"
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
      <>
      {filterOptions}
      </>
    </div>
  );
};
export default Filter;

