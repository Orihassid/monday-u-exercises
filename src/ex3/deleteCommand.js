
import { deleteItem } from "./itemManager.js";

export async function  deleteTodo(taskId)
{

    await deleteItem(taskId)
    console.log('item deleted successfully! ')

}