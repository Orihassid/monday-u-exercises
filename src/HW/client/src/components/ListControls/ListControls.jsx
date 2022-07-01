import { useRef, useState } from "react";
import "./ListControls.module.css";

const ListControls = ({ renderNewItems }) => {
  const [inputValue, setInputValue] = useState("");
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderNewItems(inputValue);
      
    }
  };
  const handlePressClick = () => {
    renderNewItems(inputValue);
  };

  return (
    <div>
      <div className="list-controls">
        <input
          type="text"
          id="list-item-input"
          placeholder="Add your new todo"
          onKeyPress={handleEnterPress}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" id="list-item-submit" onClick={handlePressClick}>
          +
        </button>
      </div>
    </div>
  );
};
export default ListControls;
