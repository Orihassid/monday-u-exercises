import { useEffect, useState } from "react";
import "./AppContainer.css";
import ListConnector from "../List/ListConnector";
import ListControlsConnector from "../ListControls/ListControlsConnector";
import ListFooterConnector from "../ListFooter/ListFooterConnector";

const AppContainer = ({ numOfItems, getItemsAction }) => {
  const [items, setItems] = useState([]);
  const [numOfTasks, setNumOfTasks] = useState(0);

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
          <ListConnector />
          {numOfItems > 0 && <ListFooterConnector />}
        </div>
      </div>
    </section>
  );
};

export default AppContainer;
