
import "./List.css";
import PropTypes from "prop-types";
import ListItemConnector from "../ListItem/ListItemConnector.js";
const List = ({ items }) => {
  return (
    <div>
      <ul className="tasks">
        {items.map((item) => {
          return (
            <ListItemConnector
              item={item}
              key={item.itemId}
            />
          );
        })}
      </ul>
    </div>
  );
};
List.prototype = {
  items: PropTypes.array,
  deleteItemFromDb: PropTypes.func,
  updateStatusDb: PropTypes.func,
  editTaskNameDb: PropTypes.func,
};

export default List;
