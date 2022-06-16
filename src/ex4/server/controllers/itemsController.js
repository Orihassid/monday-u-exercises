import itemManager from "../services/itemManager.js";
import ItemManager from "../services/itemManager.js";
import { validation } from "../utils/utils.js";

export async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, arr } = validation(item);
    const data  = await ItemManager.addItem(isPokemon, arr);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);
    console.log(itemId)
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

// async function readItemFile() {
//     try {
//         const data = await fs.readFile(itemFile);
//         console.log(data.toString());
//         return JSON.parse(data.toString());
//     } catch (error) {
//         console.error(`Got an error trying to read the file: ${error.message}`);
//     }
// }

// async function writeItemFile(content) {
//     try {
//         await fs.writeFile(itemFile, JSON.stringify(content));
//     } catch (error) {
//         console.error(`Failed to write to file ${error.message}`);
//     }
// }
