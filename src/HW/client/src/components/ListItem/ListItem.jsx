import { useState } from "react";
import "./ListItem.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
const ListItem = ({
  item,
  deleteItemAction,
  editItemNameAction,
  updateCheckBoxAction,
}) => {
  const isPokemon = item.isPokemon === 0 ? false : true;
  const [taskName, setTaskName] = useState(
    isPokemon ? `catch ${item.itemName}` : item.itemName
  );
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = async (e) => {
    try {
      if (e.target.checked) {
        await updateCheckBoxAction(item.itemId, true);
      } else {
        await updateCheckBoxAction(item.itemId, false);
      }
    } catch (err) {
      throw new Error("failed to update status with checkbox");
    }
  };

  const handleEditButtonClick = () => {
    setEditClicked(false);
  };
  const handleSaveButtonClick = async () => {
    try {
      setEditClicked(true);
      const newTaskName = taskName.replace("catch", "");
      await editItemNameAction(item.itemId, newTaskName);
    } catch (err) {
      throw new Error("failed to edit task in db");
    }
  };
  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDeleteClick = async () => {
    await deleteItemAction(item.itemId);
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
              onClick={handleDeleteClick}
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

ListItem.prototype = {
  item: PropTypes.object,
  deleteItemAction: PropTypes.func,
  editItemNameAction: PropTypes.func,
  updateCheckBoxAction: PropTypes.func,
};
export default ListItem;
