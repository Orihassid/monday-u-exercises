import { useEffect, useState } from "react";
import "./AppContainer.css";
import ListConnector from "../List/ListConnector";
import ListControlsConnector from "../ListControls/ListControlsConnector";
import ListFooterConnector from "../ListFooter/ListFooterConnector";
import PropTypes from "prop-types";

const AppContainer = ({ numOfItems, getItemsAction }) => {
  ;

  useEffect(() => {
    getItemsAction();
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
AppContainer.propTypes = {
  numOfItems:PropTypes.number,
  getItemsAction:PropTypes.func,
};

export default AppContainer;
