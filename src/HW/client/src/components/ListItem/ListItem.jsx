import { useState } from "react";
import "./ListItem.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Checkbox } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import PropTypes from "prop-types";
export const ListItem = ({
  item,
  deleteItemAction,
  editItemNameAction,
  updateCheckBoxAction,
}) => {
  const [taskName, setTaskName] = useState(item.itemName);
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = async (e) => {
    try {
      await updateCheckBoxAction(item.itemId, e.target.checked);
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
          <Checkbox
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
          {item.isPokemon !== 0 && (
            <a>
              <img src={item.imageUrl} />
            </a>
          )}
        </div>
        <div>
          <IconButton
            aria-label="delete"
            size="large"
            color="error"
            onClick={handleDeleteClick}
          >
            <DeleteIcon className="deleteButton" fontSize="inherit" />
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
