

import ItemManager from "../services/itemManager.js";
import { validation } from "../utils/utils.js";

export default async function createItem(req,res) {
    console.log('create123')
    const item = req.body.item;
    console.log('hryyryr',item)
    const { isPokemon, arr } = validation(item);
    await ItemManager.addItem(isPokemon,arr);
    res.status(200).json(req.body);
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




  
   