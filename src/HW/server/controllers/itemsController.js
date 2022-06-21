
const  ItemManager  = require( "../services/itemManager.js");
const  valid   = require( "../utils/utils.js");

async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, elementsArr } = valid.validation(item);
    const data  = await ItemManager.addItem(isPokemon, elementsArr);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

 async function deleteItem(req, res, next) {
  try {
    const itemId =(req.params.id);
    await ItemManager.deleteItem(itemId);
    res.status(200).json(itemId);
  } catch (err) {
    next(err);
  }
}
 async function getAllItems(req, res, next) {
  try {
    const items = await ItemManager.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

 async function deleteAllItems(req, res, next) {
    try {
      await ItemManager.deleteAllItems();
      res.status(200).json('all items deleted');
    } catch (err) {
      next(err);
    }
  }
  async function updateStatus(req, res, next)
  {
    try {
      const itemId = req.params.id
      const newStatus = req.body.status
      console.log(itemId,newStatus)
      await ItemManager.updateStatusInDb(itemId,newStatus);
      res.status(200).json('status changed');
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    createItem,
    deleteItem,
    getAllItems,
    deleteAllItems,
    updateStatus
    
  }

