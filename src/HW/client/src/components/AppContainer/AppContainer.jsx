import { useEffect, useState } from "react";
import "./AppContainer.css";
import List from "../List/List";
import ListControls from "../ListControls/ListControls";
import {
  fetchItems,
  createItem,
  deleteItem,
  updateStatus,
  editTaskName,
} from "../../Services/ItemClient";

function AppContainer() {
  const [items, setItems] = useState([]);

  const renderNewItems = async (item) => {
    try {
      const newItems = await createItem(item);
      newItems.forEach((item) => {
        items.push(item);
      });
      setItems([...items]);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteItemFromTodoList = async (itemId) => {
    try {
      await deleteItem(itemId);
      const idx = items.findIndex((item) => item.itemId === itemId);
      items.splice(idx, 1);
      setItems([...items]);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchItems().then((fetchedItems) => {
      setItems(fetchedItems);
    });
  }, []);

  return (
    <section className="main-section">
      <div className="todoApp" id="todoApp">
        <h1 className="">My Todo List</h1>

        <div>
          <ListControls renderNewItems={renderNewItems} />
          <List
            items={items}
            deleteItemFromDb={deleteItemFromTodoList}
            updateStatusDb={updateStatus}
            editTaskNameDb={editTaskName}
          />
        </div>
      </div>
    </section>
  );
}

export default AppContainer;
