import { useState } from "react";

const ListItem = ({ item, deleteItemFromTodoList, updateStatus }) => {
  const [isPokemon, setIsPokemon] = useState(item.isPokemon);
  const itemName = isPokemon ? `catch ${item.itemName}` : item.itemName;
  //const [newName, setNewName] = useState(item.itemName);

  console.log("newItem", item.itemName);
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateStatus(item.itemId, true);
    } else {
      updateStatus(item.itemId, false);
    }
  };
  return (
    <div>
      <li id={item.itemId}>
        <div>
          <input
            type="checkbox"
            defaultChecked ={item.status}
            onChange={handleCheckboxChange}
          />
          <input type="text" readOnly="true" value={itemName} />
        </div>
        {isPokemon && (
          <a>
            {" "}
            <img src={item.imageUrl} />
          </a>
        )}
        <button
          className="delete fa fa-trash"
          onClick={() => {
            deleteItemFromTodoList(item.itemId);
          }}
        >
          {" "}
        </button>
      </li>
    </div>
  );
};

export default ListItem;
