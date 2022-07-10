import { useEffect, useState } from "react";
import "./AppContainer.css";
import ListConnector from "../List/ListConnector";
import ListControlsConnector from "../ListControls/ListControlsConnector";
import ListFooter from "../ListFooter/ListFooter";
import {
  deleteAllItems,
} from "../../Services/ItemClient";



const  AppContainer = ({ getItemsAction })=> {
  const [items, setItems] = useState([]);
  const [numOfTasks, setNumOfTasks] = useState(0);

  
  const clearAllFromDb = async () => {
    try {
      await deleteAllItems();
      setItems([]);
      setNumOfTasks(0);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getItemsAction();
      //setNumOfTasks(fetchedItems.length)  
  }, []);
  
  return (
    <section className="main-section">
      <div className="todoApp" id="todoApp">
        <h1 className="">My Todo List</h1>

        <div>
          <ListControlsConnector />
          <ListConnector
          />
          {numOfTasks > 0 && (
            <ListFooter
              numOfTasks={numOfTasks}
              clearAllFromDb={clearAllFromDb}
            ></ListFooter>
          )}
        </div>
      </div>
    </section>
  );
}

export default AppContainer;
