import actionTypes from "./constants";
import { createItem,deleteItem } from "../Services/ItemClient";
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


const itemToDelete = (itemId) => ({
  type: actionTypes.DELETE_ITEM,
  payload:itemId
});

export const deleteItemAction = (itemId) => {
  return async (dispatch) => {
    await deleteItem(itemId)
    dispatch(itemToDelete(itemId));
  };
};
