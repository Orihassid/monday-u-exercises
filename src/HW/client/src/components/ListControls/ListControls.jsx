import { useRef } from "react";
import "./ListControls.module.css";

const ListControls = ({renderNewItems}) => {
const inputValue = useRef()

  return (
    <div>
      <div className="list-controls">
        <input
          type="text"
          id="list-item-input"
          placeholder="Add your new todo"
          onChange={(e)=> inputValue.current = e.target.value}
        />
        
        <button type="button" id="list-item-submit" onClick={()=>{renderNewItems(inputValue.current)}}>
          +
        </button>
      </div>
    </div>
  );
};
export default ListControls;
