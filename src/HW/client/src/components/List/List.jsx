import ListItem from "../ListItem/ListItem.jsx";
import "./List.css";
const List = ({ items, deleteItemFromDb,updateStatusDb,editTaskNameDb }) => {
  return (
    <div>
        <ul className="tasks"> 
      {items.map((item, index) => {
        return (
          <ListItem
            item={item}
            deleteItemFromDb={deleteItemFromDb}
            updateStatusDb = {updateStatusDb}
            key={index}
            editTaskNameDb={editTaskNameDb}
          />
        );
      })}

      </ul>
    </div>
  );
};
export default List;
