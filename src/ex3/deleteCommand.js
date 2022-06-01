
import { deleteItem } from "./itemManager.js";
import chalk from "chalk";
export async function  deleteTodo(taskId)
{

    await deleteItem(taskId)
    console.log('item deleted successfully! ')

}