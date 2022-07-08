import ListItem from "../ListItem/ListItem.jsx";
import "./List.css";
import PropTypes from "prop-types";
const List = ({ items, deleteItemFromDb, updateStatusDb, editTaskNameDb }) => {
  return (
    <div>
      <ul className="tasks">
        {items.map((item, index) => {
          return (
            <ListItem
              item={item}
              deleteItemFromDb={deleteItemFromDb}
              updateStatusDb={updateStatusDb}
              editTaskNameDb={editTaskNameDb}
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
