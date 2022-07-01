import { useEffect, useState } from "react";
import "./AppContainer.module.css";
import { fetchItems, createItem, deleteItem,updateStatus } from "../../Services/ItemClient";
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
    <div className="wrapper">
      <List
        items={items}
        deleteItemFromTodoList={deleteItemFromTodoList}
        updateStatus ={updateStatus}
      />
      <ListControls renderNewItems={renderNewItems} />
    </div>
  );
}

export default AppContainer;
