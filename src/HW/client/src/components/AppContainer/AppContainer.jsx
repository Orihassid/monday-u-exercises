import { useEffect, useState } from "react";
import styles from "./AppContainer.module.css";
import { fetchItems, createItem } from "../../Services/ItemClient";
import List from "../List/List";
import ListControls from "../ListControls/ListControls";
// import propsType from 'props-type'

function AppContainer() {
  const [items, setItems] = useState([]);
  
  const renderNewItems = async (item) => {
    console.log('hey here',item)
    const newItems = await createItem(item);
    console.log('newItems',newItems)
    newItems.forEach((item) => {
      items.push(item);
    });
    setItems([...items])
  };

  useEffect(() => {
    fetchItems().then((fetchedItems) => {
      setItems(fetchedItems);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <ListControls renderNewItems={renderNewItems} />
      </div>
      <div>
        <List items={items} />
      </div>
    </div>
  );
}

export default AppContainer;
