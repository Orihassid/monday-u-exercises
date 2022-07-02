import { useState } from "react";
import "./ListItem.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
const ListItem = ({
  item,
  deleteItemFromDb,
  updateStatusDb,
  editTaskNameDb,
}) => {
  const isPokemon = item.isPokemon;
  const [taskName, setTaskName] = useState(
    isPokemon ? `catch ${item.itemName}` : item.itemName
  );
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateStatusDb(item.itemId, true);
    } else {
      updateStatusDb(item.itemId, false);
    }
  };

  const handleEditButtonClick = () => {
    setEditClicked(false);
  };
  const handleSaveButtonClick = async () => {
    setEditClicked(true);
    const newTaskName = taskName.replace('catch','')
    await editTaskNameDb(item.itemId, taskName);
  };

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
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
            readOnly={isEditClicked}
            value={taskName}
            onChange={handleInputChange}
          />
          {isPokemon && (
            <a>
              <img src={item.imageUrl} />
            </a>
          )}
        </div>
        <div>
          <IconButton aria-label="delete" size="large" color="error">
            <DeleteIcon
              className="deleteButton"
              onClick={() => {
                deleteItemFromDb(item.itemId);
              }}
              fontSize="inherit"
            />
          </IconButton>
          {isEditClicked && (
            <IconButton
              onClick={handleEditButtonClick}
              aria-label="edit"
              size="large"
            >
              <EditIcon className="editIcon" fontSize="inherit" />
            </IconButton>
          )}
          {!isEditClicked && (
            <IconButton
              onClick={handleSaveButtonClick}
              aria-label="save"
              size="large"
            >
              <SaveIcon className="saveIcon" fontSize="inherit" />
            </IconButton>
          )}
        </div>
      </li>
    </div>
  );
};

export default ListItem;
