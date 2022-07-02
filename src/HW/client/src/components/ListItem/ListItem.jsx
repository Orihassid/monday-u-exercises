import { useState } from "react";
import "./ListItem.css";

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
      <li id={item.itemId} className="new-item">
        <div className="items">
          <input
            type="checkbox"
            defaultChecked={item.status}
            onChange={handleCheckboxChange}
          />

          <input
            className="inputText"
            type="text"
            readOnly="true"
            value={itemName}
          />

          {isPokemon && (
            <a>
              {" "}
              <img src={item.imageUrl} />
            </a>
          )}
        </div>
        <div>
        <IconButton aria-label="delete" size="large" color="error">
        <DeleteIcon className="deleteButton"
            onClick={() => {
              deleteItemFromTodoList(item.itemId);
            }} fontSize="inherit" />
      </IconButton>
        <IconButton aria-label="edit" size="large" color="secondary">
        <EditIcon className="editIcon"
            onClick={() => {
              deleteItemFromTodoList(item.itemId);
            }} fontSize="inherit" />
      </IconButton>
         

      
        </div>
      </li>
    </div>
  );
};

export default ListItem;
