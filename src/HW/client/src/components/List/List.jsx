import ListItem from "../ListItem/ListItem.jsx";
import "./List.module.css";
const List = ({ items, deleteItemFromTodoList,updateStatus }) => {
  return (
    <div className="list-container">
      {items.map((item, index) => {
        return (
          <ListItem
            item={item}
            deleteItemFromTodoList={deleteItemFromTodoList}
            updateStatus = {updateStatus}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default List;
