import { useRef, useState } from "react";
import "./ListControls.css";

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
         className="taskInput"
          placeholder="Add your new todo"
          onKeyPress={handleEnterPress}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className = "addButton" type="button"  onClick={handlePressClick}>
          +
        </button>
      </div>
    </div>
  );
};
export default ListControls;
