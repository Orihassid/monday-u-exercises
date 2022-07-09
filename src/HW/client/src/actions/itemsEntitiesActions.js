import actionTypes from "./constants";
import { createItem } from "../Services/ItemClient";
import { showLoaderAction, hideLoaderAction } from "./itemsViewsActions";

const addItems = (newItems) => ({
  type: actionTypes.ADD_ITEMS,
  payload: newItems,
});

export const addItemsAction = (newItems) => {
    return async (dispatch) => {
        const addedItems = await createItem(newItems);
        dispatch(addItems(addedItems))

    }

};
