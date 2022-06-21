// Define your endpoints here (this is your "controller file")

const express  = require("express");
const {
  createItem,
  deleteItem,
  getAllItems,
  deleteAllItems,
  updateStatus
} = require( "../controllers/itemsController.js");
const itemRouter = express.Router();

itemRouter.post("/", createItem);
itemRouter.get("/", getAllItems);
itemRouter.delete("/", deleteAllItems);
itemRouter.delete("/:id", deleteItem);
itemRouter.put("/:id", updateStatus);


module.exports =  itemRouter;
