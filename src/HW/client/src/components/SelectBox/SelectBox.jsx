import React from "react";
import PropTypes from "prop-types";
const SelectBox = ({ updateSelectInputAction }) => {
  const handleSelcetClick = (e) => {
    if (e.target.value === "All") updateSelectInputAction(1);
    else updateSelectInputAction(0);
  };
  return (
    <select name="totdos" id="todos" onChange={handleSelcetClick}>
      <option defaultValue value="All">
        All
      </option>
      <option value="Done">Done</option>
    </select>
  );
};

export default SelectBox;

SelectBox.prototype = {
  updateSelectInputAction: PropTypes.func,
};
