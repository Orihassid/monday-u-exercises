import itemsEntities from "./itemsEntitiesReducer";
import itemsView from "./itemsViewsReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  itemsEntities,
  itemsView
});

export default allReducers;
