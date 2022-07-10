import PropTypes from "prop-types";
import ListItemConnector from "../ListItem/ListItemConnector";
const Search = ({ items,updateSearchInputAction,searchInputValue }) => {
 

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
