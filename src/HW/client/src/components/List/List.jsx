import ListItem from "../ListItem/ListItem.jsx";
import "./List.css";
const List = ({ items, deleteItemFromTodoList,updateStatus }) => {
  return (
    <div>
        <ul className="tasks"> 
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
      
      </ul>
    </div>
  );
};
export default List;
