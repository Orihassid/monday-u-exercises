import { addItem } from "./itemManager.js";
import chalk from "chalk";

export async function add(taskName) {
  const { isPokemon, arr } = validation(taskName);
  await addItem(isPokemon, arr);
  console.log(chalk.green("new todo added successfully!"));
}

export function validation(item) {
  const arr = item.split(/\s*,\s*/);
  let flag = false;
  arr.forEach((element) => {
    if (!isNum(element)) {
      return;
    }
    flag = true;
  });
  //const flag = arr.some((item) => !isNum(item));

  return { isPokemon: flag, arr: arr };
}

function isNum(val) {
  return !isNaN(val);
}
