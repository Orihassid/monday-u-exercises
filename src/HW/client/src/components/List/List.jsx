import "./List.css";
import PropTypes from "prop-types";
import ListItemConnector from "../ListItem/ListItemConnector.js";
const List = ({ items, searchInputValue}) => {
  console.log(items)
  return (
    <div>
      <ul className="tasks">
        
        {items
          .filter((item) => item.itemName.includes(searchInputValue))
          .map((item) => {
            
            return <ListItemConnector item={item} key={item.itemId} />;
          })}
      </ul>
    </div>
  );
};
List.prototype = {
  items: PropTypes.array,
  searchInputValue: PropTypes.string,
};

export default List;
