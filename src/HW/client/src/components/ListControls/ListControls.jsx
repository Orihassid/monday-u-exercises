import { useState } from "react";
import "./ListControls.css";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import PropTypes from "prop-types";

const ListControls = ({
  showLoaderAction,
  hideLoaderAction,
  addItemsAction,
  showLoader,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleEnterPress = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        showLoaderAction();

        await addItemsAction(inputValue);
        hideLoaderAction()
        setInputValue("");
      }
    } catch (err) {
      throw new Error("failed to render with enter press");
    }
  };
  const handlePressClick = async () => {
    try {
      showLoaderAction();
      await addItemsAction(inputValue);
      hideLoaderAction();
      setInputValue("");
    } catch (err) {
      throw new Error("failed to render items with button clicked");
    }
  };

  return (
    <div>
      <div className="list-controls">
        <input
          type="text"
          className="taskInput"
          placeholder="Add your new todo"
          onKeyPress={handleEnterPress}
          onChange={handleInputValue}
          value={inputValue}
        />
        <Button
          id="add-button"
          type="button"
          onClick={handlePressClick}
          loading={showLoader}
        >
          +
        </Button>
      </div>
    </div>
  );
};

ListControls.propTypes = {
  renderNewItems: PropTypes.func,
};

export default ListControls;
