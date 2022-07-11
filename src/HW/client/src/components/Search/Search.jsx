import PropTypes from "prop-types";
const Search = ({updateSearchInputAction,searchInputValue }) => {
 

  const handleInputValue = (e) => {
    updateSearchInputAction(e.target.value.trim());
    
  };
  return (
    <div>
      <input
        type="text"
        placeholder="type to search todo"
        onChange={handleInputValue}
        value={searchInputValue}
      ></input>
      
    </div>
  );
};
Search.propTypes = {
  items: PropTypes.array,
};

export default Search;

Search.prototype = {
  updateSearchInputAction: PropTypes.func,
  searchInputValue: PropTypes.string,
};