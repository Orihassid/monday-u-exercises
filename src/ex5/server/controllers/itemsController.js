import itemManager from "../services/itemManager.js";
import ItemManager from "../services/itemManager.js";
import { validation } from "../utils/utils.js";

export async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, elementsArr } = validation(item);
    const data  = await ItemManager.addItem(isPokemon, elementsArr);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);
    await ItemManager.deleteItem(itemId);
    res.status(200).json(itemId);
  } catch (err) {
    next(err);
  }
}
export async function getAllItems(req, res, next) {
  try {
    const items = await itemManager.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export async function deleteAllItems(req, res, next) {
    try {
      await ItemManager.deleteAllItems();
      res.status(200).json('all items deleted');
    } catch (err) {
      next(err);
    }
  }

