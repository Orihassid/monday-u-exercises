import { useState } from "react";

const ListItem = ({ item }) => {
  const [newName, setNewName] = useState(item.itemName);
  console.log('newItem',item.itemName)

  return (
    <div>
      <li>
        <div>
          <input
            type="text"
            readOnly="true"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
      </li>
    </div>
  );
};
export default ListItem;
