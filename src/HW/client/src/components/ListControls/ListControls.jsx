import { useState } from "react";
import "./ListControls.css";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";

const ListControls = ({ renderNewItems }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputValue = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);
      await renderNewItems(inputValue);
      setLoading(false);
      setInputValue("");
    }
  };
  const handlePressClick = async () => {
    setLoading(true);
    await renderNewItems(inputValue);
    setLoading(false);
    setInputValue("");
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
          loading={loading}
        >
         +
        </Button>
      </div>
    </div>
  );
};
export default ListControls;
