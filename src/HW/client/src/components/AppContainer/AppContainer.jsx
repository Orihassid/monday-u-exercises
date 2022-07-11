import { useEffect } from "react";
import "./AppContainer.css";
import ListConnector from "../List/ListConnector";
import ListControlsConnector from "../ListControls/ListControlsConnector";
import ListFooterConnector from "../ListFooter/ListFooterConnector";
import PropTypes from "prop-types";
import SearchConnector from "../Search/SearchConnector.js";
import SelectBoxConnector from "../SelectBox/SelectBoxConnector";
import DoneTasksConnector from "../DoneTasks/DoneTasksConnector";

const AppContainer = ({ numOfItems, getItemsAction ,tasksStatusState}) => {
  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  return (
    <section className="main-section">
      <div className="todoApp" id="todoApp">
        <h1 className="">My Todo List</h1>

        <div>
          <ListControlsConnector />
          {numOfItems > 0 && <SearchConnector />}
         {tasksStatusState ?  <ListConnector />: <DoneTasksConnector/>}
          {numOfItems > 0 && <SelectBoxConnector />}
          {numOfItems > 0 && <ListFooterConnector />}
        </div>
      </div>
    </section>
  );
};
AppContainer.propTypes = {
  numOfItems: PropTypes.number,
  getItemsAction: PropTypes.func,
};

export default AppContainer;
