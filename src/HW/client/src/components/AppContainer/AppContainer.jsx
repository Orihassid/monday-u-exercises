import { useEffect, useState } from "react";
import "./AppContainer.css";
import {
  fetchItems,
  createItem,
  deleteItem,
  updateStatus,
} from "../../Services/ItemClient";
import List from "../List/List";
import ListControls from "../ListControls/ListControls";

// import propsType from 'props-type'

function AppContainer() {
  const [items, setItems] = useState([]);
  

  const renderNewItems = async (item) => {
    console.log(item);
    const newItems = await createItem(item);
    newItems.forEach((item) => {
      items.push(item);
    });
    setItems([...items]);
   
  };

  const deleteItemFromTodoList = async (itemId) => {
    await deleteItem(itemId);
    const idx = items.findIndex((item) => item.itemId === itemId);
    items.splice(idx, 1);
    setItems([...items]);
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
            deleteItemFromTodoList={deleteItemFromTodoList}
            updateStatus={updateStatus}
          />
         
        </div>
      </div>
    </section>
  );
}

export default AppContainer;
