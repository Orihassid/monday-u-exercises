import { useState } from "react";

const ListItem = ({ item,deleteItemFromTodoList }) => {
  const [isPokemon, setIsPokemon] = useState(item.isPokemon);
  const itemName = isPokemon ? `catch ${item.itemName}` : item.itemName;
  //const [newName, setNewName] = useState(item.itemName);

  console.log("newItem", item.itemName);

  return (
    <div>
      <li id = {item.itemId}>
        <div>
          <input type="text" readOnly="true" value={itemName} />
        </div>
        {isPokemon && (
          <a>
            {" "}
            <img src={item.imageUrl} />
          </a>
         
        )}
         <button className = "delete fa fa-trash" onClick={()=>{deleteItemFromTodoList(item.itemId)}}> </button>
      </li>
    </div>
  );
};
export default ListItem;
